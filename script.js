/**
 * Aditya Anand Gaikwad Portfolio - Interactive Script
 * Features: Inline Profile Image, FormSubmit Direct Email Transmission, Small Floating AI Resume Assistant
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("Aditya Gaikwad Portfolio Initialized");

    // --- 1. COPY EMAIL UTILITY ---
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

    // --- 2. DIRECT EMAIL FORM (FORMSUBMIT.CO AJAX) ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const message = document.getElementById('contact-message').value;

            formStatus.classList.remove('hidden');
            formStatus.textContent = 'Sending message to adityagaikwad1465@gmail.com...';
            formStatus.className = 'text-center font-mono text-xs text-amber-400 pt-2 font-bold';

            fetch('https://formsubmit.co/ajax/adityagaikwad1465@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message,
                    _subject: "New Portfolio Inquiry from " + name
                })
            }).then(function (response) {
                if (response.ok) {
                    formStatus.textContent = 'Message sent successfully! Your email has been delivered to Aditya.';
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
            formStatus.textContent = 'Opening your mail client to send message to adityagaikwad1465@gmail.com...';
            formStatus.className = 'text-center font-mono text-xs text-emerald-400 pt-2 font-bold';
        }
        if (contactForm) contactForm.reset();
    }

    // --- 3. SMALL FLOATING AI RESUME ASSISTANT ---
    window.toggleAiChat = function () {
        const modal = document.getElementById('ai-chat-modal');
        if (!modal) return;
        if (modal.classList.contains('hidden')) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            const input = document.getElementById('ai-chat-input');
            if (input) setTimeout(() => input.focus(), 150);
        } else {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    };

    window.askAi = function (promptText) {
        const modal = document.getElementById('ai-chat-modal');
        if (modal && modal.classList.contains('hidden')) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }
        processUserQuestion(promptText);
    };

    window.submitAiQuestion = function (event) {
        if (event) event.preventDefault();
        const input = document.getElementById('ai-chat-input');
        if (!input) return false;
        const q = input.value.trim();
        if (!q) return false;
        input.value = '';
        processUserQuestion(q);
        return false;
    };

    function processUserQuestion(questionText) {
        const chatBody = document.getElementById('ai-chat-body');
        if (!chatBody) return;

        // Add User Message
        const userMsg = document.createElement('div');
        userMsg.className = 'p-2.5 bg-emerald-500 text-slate-950 font-bold rounded-xl ml-auto max-w-[85%] text-right shadow-sm';
        userMsg.textContent = questionText;
        chatBody.appendChild(userMsg);
        chatBody.scrollTop = chatBody.scrollHeight;

        // Bot Answer
        setTimeout(() => {
            const botAnswerText = generateResumeAnswer(questionText);
            const botMsg = document.createElement('div');
            botMsg.className = 'p-3 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl leading-relaxed max-w-[90%] shadow-md';
            botMsg.innerHTML = botAnswerText;
            chatBody.appendChild(botMsg);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 300);
    }

    function generateResumeAnswer(q) {
        const query = q.toLowerCase();

        // 1. Antenna Project
        if (query.includes('antenna') || query.includes('hfss') || query.includes('15 ghz') || query.includes('patch') || query.includes('rf') || query.includes('rogers')) {
            return `📡 <strong>Microstrip Patch Antenna (15 GHz)</strong>:<br>Aditya designed & simulated a 15 GHz antenna in <strong>ANSYS HFSS</strong> on Rogers RT/duroid 5880 substrate.<br>• <strong>Return Loss</strong>: −29.75 dB<br>• <strong>VSWR</strong>: 1.06<br>• <strong>Peak Gain</strong>: 7.77 dB`;
        }

        // 2. EV Wireless Charging Project
        if (query.includes('ev') || query.includes('wireless charging') || query.includes('power transfer') || query.includes('inductive') || query.includes('electric vehicle')) {
            return `⚡ <strong>EV Wireless Charging Station</strong>:<br>Simulated an inductive power transfer circuit in <strong>Proteus</strong> & <strong>Multisim</strong> with AC-DC rectification, high-frequency LC resonance, and battery voltage regulation.`;
        }

        // 3. Alcohol Detection System Project
        if (query.includes('alcohol') || query.includes('mq-3') || query.includes('mq3') || query.includes('ignition') || query.includes('cutoff') || query.includes('buzzer') || query.includes('safety')) {
            return `🚗 <strong>Alcohol Detection System</strong>:<br>Built an automated safety system using <strong>Arduino MCU</strong> + <strong>MQ-3 gas sensor</strong> programmed in <strong>Embedded C</strong> to sound a buzzer alarm and trigger relay engine ignition cutoff!`;
        }

        // 4. Projects General
        if (query.includes('project') || query.includes('work') || query.includes('build')) {
            return `🛠️ <strong>Featured Academic Projects</strong>:<br>1. <strong>15 GHz Microstrip Patch Antenna</strong> (ANSYS HFSS)<br>2. <strong>EV Wireless Charging Station</strong> (Proteus / Multisim)<br>3. <strong>Alcohol Detection System</strong> (Arduino & Embedded C)`;
        }

        // 5. Skills & Programming Stack
        if (query.includes('skill') || query.includes('python') || query.includes('c++') || query.includes('c') || query.includes('sql') || query.includes('code') || query.includes('tool')) {
            return `💻 <strong>Technical Stack</strong>:<br>• <strong>Languages</strong>: C, C++, Python, MySQL<br>• <strong>Hardware & MCU</strong>: Arduino, Embedded C, Microcontroller Interfacing<br>• <strong>Simulation Tools</strong>: ANSYS HFSS, Proteus, NI Multisim, PCB Design`;
        }

        // 6. Education & Marks
        if (query.includes('education') || query.includes('college') || query.includes('marks') || query.includes('percentage') || query.includes('degree') || query.includes('hsc') || query.includes('ssc')) {
            return `🎓 <strong>Academics</strong>:<br>• <strong>B.E. ECE</strong>: Anantrao Pawar College of Engg, Pune (Final Year)<br>• <strong>HSC</strong>: Milind Jr College, Latur (55.33%)<br>• <strong>SSC</strong>: Shri Deshikendra School, Latur (77.40%)`;
        }

        // 7. Contact Details
        if (query.includes('contact') || query.includes('email') || query.includes('phone') || query.includes('reach') || query.includes('number') || query.includes('hire') || query.includes('intern')) {
            return `📡 <strong>Contact Information</strong>:<br>• <strong>Email</strong>: adityagaikwad1465@gmail.com<br>• <strong>Phone</strong>: +91 9730391363<br>• <strong>Location</strong>: Pune, Maharashtra, India<br>• <strong>Status</strong>: Seeking ECE / RF Engineering Internships`;
        }

        // 8. Overview / Summary
        if (query.includes('who') || query.includes('about') || query.includes('summary') || query.includes('bio') || query.includes('aditya')) {
            return `<strong>Aditya Anand Gaikwad</strong> is a final-year Electronics & Communication Engineering student at Anantrao Pawar College of Engg, Pune, specializing in <strong>Embedded Systems</strong> & <strong>RF/Antenna Design</strong>.`;
        }

        // Fallback
        return `Ask me about Aditya's <strong>15 GHz Antenna Project</strong>, <strong>EV Wireless Charging</strong>, <strong>Alcohol System</strong>, <strong>C/C++/Python skills</strong>, or <strong>Education & Contact</strong> details!`;
    }
});
