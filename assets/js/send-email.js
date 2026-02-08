
(function () {
    'use strict';

    const WEB3FORMS_ACCESS_KEY = 'd2006551-4421-47de-ab28-b1de698965d7';

    const API_URL = 'https://api.web3forms.com/submit';

    // Strict email regex (RFC 5322 simplified)
    const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

    /* ── DOM refs ── */
    let nameInput, emailInput, messageInput, sendBtn;
    let nameError, emailError, messageError;

    function init() {
        nameInput    = document.getElementById('c-name');
        emailInput   = document.getElementById('c-email');
        messageInput = document.getElementById('textarea-message');
        sendBtn      = document.getElementById('btn-add');

        if (!nameInput || !emailInput || !messageInput || !sendBtn) return;

        // Grab validation spans
        nameError    = nameInput.closest('.contact-name')?.querySelector('.validation-text');
        emailError   = emailInput.closest('.contact-email')?.querySelector('.validation-text');
        messageError = messageInput.closest('.contact-textarea')?.querySelector('.validation-textarea');

        // Real-time validation
        nameInput.addEventListener('input', function () { validateName(); });
        emailInput.addEventListener('input', function () { validateEmail(); });
        messageInput.addEventListener('input', function () { validateMessage(); });

        // Submit
        sendBtn.addEventListener('click', handleSubmit);
    }

    /* ── Validators ── */
    function validateName() {
        var val = nameInput.value.trim();
        if (val === '') {
            showError(nameError, 'Name is required');
            return false;
        }
        if (val.length < 2) {
            showError(nameError, 'Name must be at least 2 characters');
            return false;
        }
        hideError(nameError);
        return true;
    }

    function validateEmail() {
        var val = emailInput.value.trim();
        if (val === '') {
            showError(emailError, 'Email is required');
            return false;
        }
        if (!EMAIL_REGEX.test(val)) {
            showError(emailError, 'Please enter a valid email address');
            return false;
        }
        hideError(emailError);
        return true;
    }

    function validateMessage() {
        var val = messageInput.value.trim();
        if (val === '') {
            showError(messageError, 'Message is required');
            return false;
        }
        hideError(messageError);
        return true;
    }

    function showError(el, msg) {
        if (!el) return;
        el.textContent = msg;
        el.style.display = 'block';
    }

    function hideError(el) {
        if (!el) return;
        el.textContent = '';
        el.style.display = 'none';
    }

    /* ── Submit handler ── */
    function handleSubmit(e) {
        e.preventDefault();

        var isNameValid    = validateName();
        var isEmailValid   = validateEmail();
        var isMessageValid = validateMessage();

        if (!isNameValid || !isEmailValid || !isMessageValid) return;

        // Disable button and show loading state
        sendBtn.disabled = true;
        var originalText = sendBtn.textContent;
        sendBtn.innerHTML = '<i class="ti ti-loader-2 animate-spin me-1"></i> Sending...';

        var formData = {
            access_key: WEB3FORMS_ACCESS_KEY,
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim(),
            subject: 'New Portfolio Message from ' + nameInput.value.trim(),
            from_name: 'Portfolio Contact Form',
            replyto: emailInput.value.trim()
        };

        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(function (response) { return response.json(); })
        .then(function (data) {
            if (data.success) {
                showToast('success', 'Message sent successfully! I\'ll get back to you soon.');
                // Clear form
                nameInput.value = '';
                emailInput.value = '';
                messageInput.value = '';
                // Close modal after a short delay
                setTimeout(function () {
                    if (typeof HSOverlay !== 'undefined') {
                        HSOverlay.close('#MessageModal');
                    }
                }, 1500);
            } else {
                showToast('error', data.message || 'Failed to send message. Please try again.');
            }
        })
        .catch(function () {
            showToast('error', 'Network error. Please check your connection and try again.');
        })
        .finally(function () {
            sendBtn.disabled = false;
            sendBtn.textContent = originalText;
        });
    }

    /* ── Toast notification ── */
    function showToast(type, message) {
        // Remove existing toast if any
        var existing = document.getElementById('email-toast');
        if (existing) existing.remove();

        var toast = document.createElement('div');
        toast.id = 'email-toast';
        toast.style.cssText = 'position:fixed;top:24px;right:24px;z-index:9999;max-width:400px;padding:14px 20px;border-radius:10px;font-size:14px;font-weight:500;color:#fff;display:flex;align-items:center;gap:10px;box-shadow:0 8px 24px rgba(0,0,0,.18);transform:translateX(120%);transition:transform .35s ease;';

        if (type === 'success') {
            toast.style.background = '#10b981';
            toast.innerHTML = '<i class="ti ti-circle-check text-xl"></i> ' + message;
        } else {
            toast.style.background = '#ef4444';
            toast.innerHTML = '<i class="ti ti-alert-circle text-xl"></i> ' + message;
        }

        document.body.appendChild(toast);

        // Slide in
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                toast.style.transform = 'translateX(0)';
            });
        });

        // Auto-dismiss after 4s
        setTimeout(function () {
            toast.style.transform = 'translateX(120%)';
            setTimeout(function () { toast.remove(); }, 400);
        }, 4000);
    }

    /* ── Boot ── */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
