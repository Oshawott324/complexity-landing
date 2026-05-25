document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');

    window.addEventListener('scroll', () => {
        if (!navbar) {
            return;
        }

        const isScrolled = window.scrollY > 60;
        navbar.style.boxShadow = isScrolled ? '0 10px 28px rgba(17, 24, 39, 0.08)' : 'none';
        navbar.style.background = isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.94)';
    });

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('mobile-open');
            mobileToggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') {
                return;
            }

            const target = document.querySelector(targetId);
            if (!target) {
                return;
            }

            event.preventDefault();

            if (navMenu) {
                navMenu.classList.remove('mobile-open');
            }

            if (mobileToggle) {
                mobileToggle.setAttribute('aria-expanded', 'false');
            }

            window.scrollTo({
                top: target.getBoundingClientRect().top + window.scrollY - 78,
                behavior: 'smooth',
            });
        });
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
    });

    document.querySelectorAll('.reveal').forEach((element) => {
        revealObserver.observe(element);
    });

    const contactForm = document.querySelector('.form');
    if (!contactForm) {
        return;
    }

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = contactForm.querySelector('input[name="name"]').value.trim();
        const email = contactForm.querySelector('input[name="email"]').value.trim();
        const interest = contactForm.querySelector('select[name="interest"]').value;
        const message = contactForm.querySelector('textarea[name="message"]').value.trim();

        if (!name || !email || !interest || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalContent = submitButton.innerHTML;

        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, interest, message }),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error || 'Submission failed');
            }

            submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent';
            showNotification(result.message || 'Message sent.', 'success');
            contactForm.reset();
        } catch (error) {
            showNotification(`Failed to send message: ${error.message}`, 'error');
        } finally {
            setTimeout(() => {
                submitButton.innerHTML = originalContent;
                submitButton.disabled = false;
            }, 2500);
        }
    });
});

function showNotification(message, type = 'info') {
    document.querySelectorAll('.notification').forEach((notification) => notification.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${escapeHtml(message)}</span>
            <button class="notification-close" type="button" aria-label="Close notification">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    document.body.appendChild(notification);

    const close = () => {
        notification.remove();
    };

    notification.querySelector('.notification-close').addEventListener('click', close);
    setTimeout(close, 5000);
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
