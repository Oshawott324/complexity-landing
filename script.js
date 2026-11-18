document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeScrollSpy();
    initializeLabLoop();
    initializeTwinFilm();
    initializeContactForm();
});

function initializeNavigation() {
    const nav = document.querySelector('.nav-menu');
    const toggle = document.querySelector('.mobile-menu-toggle');
    const close = () => {
        nav.classList.remove('mobile-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation');
    };
    toggle.addEventListener('click', () => {
        const open = nav.classList.toggle('mobile-open');
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    nav.addEventListener('click', (event) => {
        if (event.target.closest('a')) close();
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && nav.classList.contains('mobile-open')) {
            close();
            toggle.focus();
        }
    });
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.navbar')) close();
    });
    window.matchMedia('(min-width: 861px)').addEventListener('change', close);
}

function initializeScrollSpy() {
    const links = [...document.querySelectorAll('.nav-link')];
    const sections = links.map((link) => document.getElementById(link.getAttribute('href').slice(1)));
    if (!sections.every(Boolean) || typeof window.requestAnimationFrame !== 'function') return;
    let queued = false;
    const update = () => {
        queued = false;
        const line = window.innerHeight * 0.3;
        const current = sections.findIndex((section) => {
            const bounds = section.getBoundingClientRect();
            return bounds.top <= line && bounds.bottom > line;
        });
        links.forEach((link, index) => {
            if (index === current) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
    };
    window.addEventListener('scroll', () => {
        if (queued) return;
        queued = true;
        window.requestAnimationFrame(update);
    }, { passive: true });
    update();
}

function initializeLabLoop() {
    const stages = [
        { owner: 'Discover', title: 'Real failures found.', description: 'We find where AI breaks on real lab work, in paid analysis jobs and expert sessions with AI.', icon: 'search', instrument: 'Paid jobs and expert sessions' },
        { owner: 'Rebuild', title: 'Built on real data.', description: 'Each failure becomes a task rebuilt on public data, with a planted change if needed and a real answer key.', icon: 'database', instrument: 'Public data with a real answer key' },
        { owner: 'Training', title: 'Models practice.', description: 'Frontier labs and RL environment vendors train their models on the tasks.', icon: 'brain', instrument: 'Frontier labs and RL environment vendors' },
        { owner: 'Grading', title: 'Failures show up.', description: 'Graders find where models misjudge real data, checked against what the lab actually measured.', icon: 'check', instrument: 'Graders tested on real outcomes' },
        { owner: 'Next sessions', title: 'We target the gap.', description: 'The next expert sessions go where models still fail.', icon: 'crosshair', instrument: 'Expert sessions' },
        { owner: 'Harder tiers', title: 'The frontier moves.', description: 'Solved tasks become regression tests, and new work moves on to harder tiers.', icon: 'trending-up', instrument: 'Regression tests and harder tiers' },
    ];
    const tabs = [...document.querySelectorAll('[data-stage]')];
    const rows = [...document.querySelectorAll('[data-loop-row]')];
    const panel = document.querySelector('#loop-panel');
    const activate = (index, focus = false) => {
        const stage = stages[index];
        tabs.forEach((tab, i) => {
            tab.setAttribute('aria-selected', String(index === i));
            tab.tabIndex = index === i ? 0 : -1;
        });
        rows.forEach((row, i) => row.classList.toggle('is-active', index === i));
        panel.setAttribute('aria-labelledby', tabs[index].id);
        panel.querySelector('[data-loop-number]').textContent = String(index + 1).padStart(2, '0');
        for (const key of ['owner', 'title', 'description', 'instrument']) {
            panel.querySelector('[data-loop-' + key + ']').textContent = stage[key];
        }
        panel.querySelector('[data-loop-icon]').setAttribute('href', '#i-' + stage.icon);
        if (focus) tabs[index].focus();
    };
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => activate(index));
        tab.addEventListener('keydown', (event) => {
            const directions = { ArrowRight: (index + 1) % tabs.length, ArrowLeft: (index + tabs.length - 1) % tabs.length, Home: 0, End: tabs.length - 1 };
            if (Object.hasOwn(directions, event.key)) {
                event.preventDefault();
                activate(directions[event.key], true);
            }
        });
    });
}

function initializeContactForm() {
    const form = document.querySelector('.form');
    const status = form.querySelector('.form-status');
    const button = form.querySelector('button[type="submit"]');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (button.disabled || !form.reportValidity()) return;
        const fields = new FormData(form);
        const payload = Object.fromEntries(['name', 'email', 'interest', 'message'].map((key) => [key, String(fields.get(key) || '').trim()]));
        status.classList.remove('error');
        if (Object.values(payload).some((value) => !value)) {
            status.textContent = 'Please fill in all fields.';
            status.classList.add('error');
            return;
        }
        const original = button.innerHTML;
        button.disabled = true;
        button.textContent = 'Sending...';
        status.textContent = '';
        form.setAttribute('aria-busy', 'true');
        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                signal: AbortSignal.timeout(15000),
            });
            const result = await response.json();
            if (!response.ok || result.success !== true) throw new Error('Submission failed');
            status.textContent = "Thank you. Your message is with our team.";
            form.reset();
        } catch {
            status.textContent = 'Your message was not sent. Please try again or email contact@complexity-ai.com.';
            status.classList.add('error');
        } finally {
            button.innerHTML = original;
            button.disabled = false;
            form.removeAttribute('aria-busy');
        }
    });
}

function initializeTwinFilm() {
    const video = document.querySelector('[data-twin-film] video');
    if (!video || typeof IntersectionObserver === 'undefined') {
        return;
    }
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        }
    }, { threshold: 0.4 });
    observer.observe(video);
}
