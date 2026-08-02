/**
 * Aditya Anand Gaikwad Portfolio - Clean & Lightweight Script
 * Features: Email Copy, Direct Email Transmission Form (Formspree + Mailto)
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Aditya Gaikwad Portfolio Loaded Successfully");

    // Copy Email to Clipboard Function
    window.copyEmailToClipboard = function () {
        const email = 'adityagaikwad1465@gmail.com';
        const copyBtnText = document.getElementById('copy-btn-text');

        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(() => {
                showCopySuccess();
            }).catch(() => {
                fallbackCopy(email);
            });
        } else {
            fallbackCopy(email);
        }

        function showCopySuccess() {
            if (copyBtnText) {
                const originalText = copyBtnText.textContent;
                copyBtnText.textContent = 'COPIED TO CLIPBOARD!';
                copyBtnText.classList.add('text-emerald-400', 'font-bold');
                setTimeout(() => {
                    copyBtnText.textContent = originalText;
                    copyBtnText.classList.remove('text-emerald-400', 'font-bold');
                }, 2500);
            }
        }

        function fallbackCopy(text) {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            showCopySuccess();
        }
    };

    // Direct Email Form Handling
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const message = document.getElementById('contact-message').value;

            formStatus.classList.remove('hidden');
            formStatus.textContent = 'Transmitting message to adityagaikwad1465@gmail.com...';

            fetch('https://formspree.io/f/adityagaikwad1465@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ name: name, email: email, message: message })
            }).then(function (response) {
                if (response.ok) {
                    formStatus.textContent = 'Transmission Successful! Message delivered to Aditya\'s email.';
                    formStatus.className = 'text-center font-mono text-xs text-emerald-400 pt-2 font-bold';
                    contactForm.reset();
                } else {
                    triggerMailtoFallback(name, email, message);
                }
            }).catch(function () {
                triggerMailtoFallback(name, email, message);
            });
        });
    }

    function triggerMailtoFallback(name, email, message) {
        const mailtoUri = `mailto:adityagaikwad1465@gmail.com?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AFrom:%20${encodeURIComponent(email)}`;
        window.location.href = mailtoUri;
        if (formStatus) {
            formStatus.textContent = 'Opening your email client to send message directly to adityagaikwad1465@gmail.com...';
            formStatus.className = 'text-center font-mono text-xs text-emerald-400 pt-2 font-bold';
        }
        if (contactForm) contactForm.reset();
    }
});
