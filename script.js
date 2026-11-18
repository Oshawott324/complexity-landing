/* Complexity AI — behaviour
   1. Nav background once you scroll.
   2. Blocks fade up as they enter the screen.
   3. Links that preselect the contact form.
   4. Contact form -> /api/submit. */

(() => {
    'use strict';

    document.documentElement.classList.add('js');

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const $ = (sel, el = document) => el.querySelector(sel);
    const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));

    /* ---------- 1. nav ---------- */

    const nav = $('#nav');
    const onScroll = () => nav.classList.toggle('is-stuck', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ---------- 2. entrance ---------- */

    (function entrance() {
        const items = $$('.rise');
        // Stagger siblings: the 2nd and 3rd block in a group arrive a beat later.
        items.forEach((el) => {
            const group = $$(':scope > .rise', el.parentElement);
            el.style.setProperty('--i', Math.max(0, group.indexOf(el)));
        });
        if (reduceMotion || !('IntersectionObserver' in window)) {
            items.forEach((el) => el.classList.add('is-in'));
            return;
        }
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-in');
                io.unobserve(entry.target);
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
        items.forEach((el) => io.observe(el));
    })();

    /* ---------- 3. links that preselect the form ---------- */

    $$('[data-interest]').forEach((link) => {
        link.addEventListener('click', () => {
            const select = $('#f-interest');
            if (select) select.value = link.dataset.interest;
        });
    });

    /* ---------- 4. contact form ---------- */

    (function form() {
        const formEl = $('#contactForm');
        if (!formEl) return;
        const btn = $('#formBtn');
        const status = $('#formStatus');
        const fields = ['name', 'email', 'interest', 'message'];

        const setStatus = (html, kind) => {
            status.className = 'form-status' + (kind ? ' is-' + kind : '');
            status.innerHTML = html;
        };

        formEl.addEventListener('input', (e) => e.target.classList.remove('is-bad'));

        formEl.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = {};
            let firstBad = null;
            fields.forEach((name) => {
                const input = formEl.elements[name];
                const value = input.value.trim();
                const bad = !value || (name === 'email' && !/^\S+@\S+\.\S+$/.test(value));
                input.classList.toggle('is-bad', bad);
                if (bad && !firstBad) firstBad = input;
                data[name] = value;
            });
            if (firstBad) {
                setStatus('Fill in every field.', 'err');
                firstBad.focus();
                return;
            }

            btn.disabled = true;
            btn.textContent = 'Sending…';
            setStatus('', '');
            try {
                const res = await fetch('/api/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                const out = await res.json().catch(() => ({}));
                if (!res.ok || !out.success) throw new Error(out.error || 'Request failed');
                formEl.reset();
                setStatus('Got it. We\'ll be in touch.', 'ok');
            } catch (err) {
                setStatus('Couldn\'t send. Email <a href="mailto:contact@complexity-ai.com">contact@complexity-ai.com</a> instead.', 'err');
            } finally {
                btn.disabled = false;
                btn.textContent = 'Send';
            }
        });
    })();
})();
