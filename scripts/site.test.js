const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { parseHTML } = require('linkedom');

const html = fs.readFileSync('index.html', 'utf8');
const script = fs.readFileSync('script.js', 'utf8');
const flush = () => new Promise((resolve) => setImmediate(resolve));

function setup(fetch = async () => ({ ok: true, json: async () => ({ success: true }) })) {
    const { document, window: dom } = parseHTML(html);
    const window = { matchMedia: () => ({ addEventListener() {} }), addEventListener() {}, setTimeout, clearTimeout };
    dom.HTMLElement.prototype.getBoundingClientRect = () => ({ top: 0, left: 0, bottom: 100, width: 100, height: 100 });
    const form = document.querySelector('.form');
    form.reportValidity = () => true;
    let resets = 0;
    form.reset = () => { resets++; };
    class FormData {
        constructor(element) { this.element = element; }
        get(key) { return this.element.querySelector('[name="' + key + '"]').value; }
    }
    const context = vm.createContext({ document, window, FormData, fetch, AbortSignal, console });
    vm.runInContext(script, context);
    const run = (expression) => vm.runInContext(expression, context);
    const event = (type, properties = {}) => Object.assign(new dom.Event(type, { bubbles: true, cancelable: true }), properties);
    return { document, form, run, event, resets: () => resets };
}

test('mobile navigation exposes state and closes on a navigation action or Escape', () => {
    const { document, run, event } = setup();
    run('initializeNavigation()');
    const toggle = document.querySelector('.mobile-menu-toggle');
    toggle.click();
    assert.equal(toggle.getAttribute('aria-expanded'), 'true');
    document.querySelector('.nav-link').click();
    assert.equal(toggle.getAttribute('aria-expanded'), 'false');
    toggle.click();
    document.dispatchEvent(event('keydown', { key: 'Escape' }));
    assert.equal(toggle.getAttribute('aria-expanded'), 'false');
});

test('scroll spy marks only the section under the reading line', () => {
    const { document, run } = setup();
    const place = (layout) => {
        for (const [id, [top, bottom]] of Object.entries(layout)) document.getElementById(id).getBoundingClientRect = () => ({ top, bottom });
    };
    const current = () => [...document.querySelectorAll('.nav-link[aria-current="location"]')].map((link) => link.getAttribute('href'));
    place({ problem: [-700, -100], environments: [-100, 600], loop: [600, 1300], customers: [1300, 2200], roadmap: [2200, 2800] });
    run('window.innerHeight = 900; window.requestAnimationFrame = (fn) => fn(); initializeScrollSpy()');
    assert.deepEqual(current(), ['#environments']);
    place({ problem: [300, 1000], environments: [1000, 1700], loop: [1700, 2600], customers: [2600, 3200], roadmap: [3200, 3800] });
    run('initializeScrollSpy()');
    assert.deepEqual(current(), [], 'Nothing is marked while the hero is in view');
});

test('all six stages update content, ownership, and keyboard selection', () => {
    const { document, run, event } = setup();
    run('initializeLabLoop()');
    const tabs = [...document.querySelectorAll('[data-stage]')];
    tabs.forEach((tab, i) => {
        tab.click();
        assert.equal(tab.getAttribute('aria-selected'), 'true');
        assert.equal(document.querySelectorAll('[aria-selected="true"]').length, 1);
        assert.equal(document.querySelector('[data-loop-number]').textContent, String(i + 1).padStart(2, '0'));
        assert.equal(document.querySelector('#loop-panel').getAttribute('aria-labelledby'), tab.id);
        assert.equal(document.querySelectorAll('[data-loop-row].is-active').length, 1);
        assert.ok(document.querySelectorAll('[data-loop-row]')[i].classList.contains('is-active'));
        assert.match(document.querySelector('[data-loop-icon]').getAttribute('href'), /^#i-[a-z-]+$/);
    });
    tabs[5].dispatchEvent(event('keydown', { key: 'ArrowRight' }));
    assert.equal(tabs[0].getAttribute('aria-selected'), 'true');
    tabs[0].dispatchEvent(event('keydown', { key: 'End' }));
    assert.equal(tabs[5].getAttribute('aria-selected'), 'true');
    tabs[5].dispatchEvent(event('keydown', { key: 'Home' }));
    assert.equal(tabs[0].getAttribute('aria-selected'), 'true');
    tabs[0].dispatchEvent(event('keydown', { key: 'ArrowLeft' }));
    assert.equal(tabs[5].getAttribute('aria-selected'), 'true');
});

test('the OT-2 twin film starts muted and skips autoplay without IntersectionObserver', () => {
    const { document, run } = setup();
    run('initializeTwinFilm()');
    const video = document.querySelector('[data-twin-film] video');
    assert.ok(video.hasAttribute('muted'));
    assert.ok(video.hasAttribute('playsinline'));
    assert.ok(video.hasAttribute('controls'));
});

function fillForm(form) {
    form.querySelector('[name="name"]').value = ' Test Scientist ';
    form.querySelector('[name="email"]').value = ' test@example.com ';
    form.querySelector('[name="interest"] option[value="rl-environments"]').selected = true;
    form.querySelector('[name="message"]').value = ' Test workflow ';
}

test('contact submission trims fields, prevents duplicates, and resets only after success', async () => {
    const calls = [];
    let complete;
    const pending = new Promise((resolve) => { complete = resolve; });
    const env = setup(async (url, options) => { calls.push({ url, options }); return pending; });
    env.run('initializeContactForm()');
    fillForm(env.form);
    env.form.dispatchEvent(env.event('submit'));
    env.form.dispatchEvent(env.event('submit'));
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, '/api/submit');
    assert.equal(calls[0].options.method, 'POST');
    assert.deepEqual(JSON.parse(calls[0].options.body), { name: 'Test Scientist', email: 'test@example.com', interest: 'rl-environments', message: 'Test workflow' });
    assert.ok(env.form.querySelector('button').disabled);
    assert.equal(env.resets(), 0);
    complete({ ok: true, json: async () => ({ success: true }) });
    await flush();
    assert.equal(env.resets(), 1);
    assert.ok(!env.form.querySelector('button').disabled);
    assert.match(env.document.querySelector('.form-status').textContent, /Thank you/);
});

for (const [name, response] of [
    ['HTTP error', async () => ({ ok: false, json: async () => ({ success: false }) })],
    ['application failure', async () => ({ ok: true, json: async () => ({ success: false }) })],
    ['invalid JSON', async () => ({ ok: true, json: async () => { throw new SyntaxError(); } })],
    ['network error', async () => { throw new TypeError('Network error'); }],
    ['timeout', async () => { throw new DOMException('Timed out', 'TimeoutError'); }],
]) {
    test('contact retains the message after ' + name, async () => {
        const env = setup(response);
        env.run('initializeContactForm()');
        fillForm(env.form);
        env.form.dispatchEvent(env.event('submit'));
        await flush();
        assert.equal(env.resets(), 0);
        assert.ok(!env.form.querySelector('button').disabled);
        assert.equal(env.form.querySelector('[name="message"]').value, ' Test workflow ');
        assert.match(env.document.querySelector('.form-status').textContent, /not sent/);
        assert.ok(env.document.querySelector('.form-status').classList.contains('error'));
    });
}

test('empty or browser-invalid contact fields never send a request', async () => {
    let calls = 0;
    const env = setup(async () => { calls++; });
    env.run('initializeContactForm()');
    env.form.dispatchEvent(env.event('submit'));
    await flush();
    assert.equal(calls, 0);
    fillForm(env.form);
    env.form.reportValidity = () => false;
    env.form.dispatchEvent(env.event('submit'));
    await flush();
    assert.equal(calls, 0);
});
