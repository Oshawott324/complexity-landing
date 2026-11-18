const assert = require('node:assert/strict');
const fs = require('node:fs');
const { parseHTML } = require('linkedom');

const html = fs.readFileSync('index.html', 'utf8');
const { document } = parseHTML(html);
const summary = fs.readFileSync('llms.txt', 'utf8');
const jsonLd = JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent);
assert.equal(jsonLd.name, 'Complexity AI');
assert.equal(jsonLd['@type'], 'Organization');
assert.equal(document.querySelectorAll('h1').length, 1);

for (const phrase of ['We train AI scientists', 'real lab work.']) {
    assert.ok(document.querySelector('h1').textContent.includes(phrase));
}
for (const link of document.querySelectorAll('.nav-link')) {
    assert.ok(document.getElementById(link.getAttribute('href').slice(1)), 'Navigation link without a section: ' + link.getAttribute('href'));
}
for (const id of ['top', 'problem', 'environments', 'loop', 'customers', 'twin', 'roadmap', 'contact']) {
    assert.ok(document.getElementById(id), 'Missing section: ' + id);
}
assert.equal(document.querySelectorAll('.problem-grid article').length, 4);
assert.deepEqual([...document.querySelectorAll('#environments .card-head .chip')].map((chip) => chip.textContent.trim()), ['Now', 'Next']);
assert.ok(!document.getElementById('team') && !document.querySelector('.team-member'), 'Individual team profiles are not published');
for (const text of [html, summary]) {
    assert.ok(!/\b(CEO|CTO|COO|Chief Scientist)\b/.test(text), 'Individual team roles are not published');
}
for (const text of [html, summary]) {
    assert.ok(!/\bMIT\b|Harvard|U\. Michigan|U\. Chicago|University of/.test(text), 'Universities are not listed');
}
assert.equal(document.querySelector('.quote-card figcaption').textContent.trim(), 'Member of Technical StaffFleet AI', 'Quote stays unattributed by name');
assert.deepEqual([...document.querySelectorAll('.partner-logos li')].map((item) => item.textContent.trim()), ['fleet', 'micro1.']);
assert.ok(summary.includes('Design partners: Fleet and micro1.'));
assert.equal(document.querySelectorAll('[role="tab"]').length, 6);
assert.equal(document.querySelectorAll('[role="tab"][aria-selected="true"]').length, 1);
assert.ok(document.getElementById('roadmap').textContent.includes('Targets, not commitments'));
assert.ok(document.getElementById('twin').textContent.includes('prototype'));
assert.ok(document.querySelector('.grounding-note').textContent.includes('No live hardware'));
assert.ok(summary.includes('Next: Task Engine'));

const ids = new Set();
for (const element of document.querySelectorAll('[id]')) {
    assert.ok(!ids.has(element.id), 'Duplicate id: ' + element.id);
    ids.add(element.id);
}
for (const link of document.querySelectorAll('a[href^="#"]')) {
    assert.ok(ids.has(link.getAttribute('href').slice(1)), 'Broken anchor: ' + link.getAttribute('href'));
}
for (const element of document.querySelectorAll('[aria-controls], [aria-labelledby]')) {
    for (const attribute of ['aria-controls', 'aria-labelledby']) {
        for (const id of (element.getAttribute(attribute) || '').split(' ').filter(Boolean)) {
            assert.ok(ids.has(id), 'Broken accessibility reference: ' + id);
        }
    }
}
for (const image of document.querySelectorAll('img')) {
    const src = image.getAttribute('src');
    assert.ok(image.hasAttribute('alt'), 'Image missing alt text');
    if (!src.startsWith('https://')) {
        assert.ok(fs.statSync(src).size > 1000, 'Missing or empty image: ' + src);
    }
}
for (const input of document.querySelectorAll('.form input, .form select, .form textarea')) {
    assert.ok(document.querySelector('label[for="' + input.id + '"]'), 'Missing field label');
    assert.ok(input.hasAttribute('required'));
}
assert.equal(document.querySelector('.form-status').getAttribute('role'), 'status');
for (const phrase of ['Science is one example world, not the product boundary.', 'Grounding coverage', 'Infrastructure for autonomous science', 'In talks', 'Market analysis']) {
    for (const text of [html, summary]) assert.ok(!text.includes(phrase), 'Obsolete or investor-only copy: ' + phrase);
}
for (const text of [html, summary]) {
    // Market sizing, growth multiples, and contract sizes stay in the investor deck.
    assert.ok(!/\$\s?\d[\d.,]*(\s?[–-]\s?\d[\d.,]*)?\s?(B|bn|billion)\b/i.test(text), 'Market-size figure on the public site');
    assert.ok(!/\b\d+\s?[–-]\s?\d+\s?x\b/.test(text), 'Growth multiple on the public site');
    assert.ok(!/figures per quarter/i.test(text), 'Contract-size claim on the public site');
}
const symbols = new Set([...document.querySelectorAll('symbol')].map((symbol) => symbol.id));
for (const use of document.querySelectorAll('use')) {
    assert.ok(symbols.has(use.getAttribute('href').slice(1)), 'Missing icon: ' + use.getAttribute('href'));
}
for (const [, name] of fs.readFileSync('script.js', 'utf8').matchAll(/icon: '([a-z-]+)'/g)) {
    assert.ok(symbols.has('i-' + name), 'Missing stage icon: ' + name);
}
for (const name of ['i-play', 'i-pause']) assert.ok(symbols.has(name), 'Missing player icon: ' + name);
assert.equal(document.querySelectorAll('[data-loop-row]').length, 6);
const twinVideo = document.querySelector('[data-twin-film] video');
assert.ok(twinVideo, 'OT-2 twin film is present');
for (const attribute of ['src', 'poster']) {
    assert.ok(fs.statSync(twinVideo.getAttribute(attribute)).size > 1000, 'Missing twin film asset: ' + twinVideo.getAttribute(attribute));
}
assert.ok(document.getElementById('twin').textContent.includes('one real robot'));
assert.ok(!/crash|bend|crack|break/i.test(document.getElementById('twin-title').textContent), 'Twin claims contact, not damage');
assert.equal(document.querySelectorAll('#twin .check-steps li').length, 5);
assert.equal(document.querySelectorAll('#twin .practice-list li').length, 4);
console.log('Content, assets, icons, anchors, accessibility references, and product boundaries: passed');
