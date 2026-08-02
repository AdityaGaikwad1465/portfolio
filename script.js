/**
 * Aditya Anand Gaikwad - Interactive Portfolio & Bulletproof AI Resume Chatbot
 * Features: PCB Canvas Engine, Terminal CLI, Global AI Chat Engine, Web Audio Synth, Formspree Email
 */

// --- 1. LAZY AUDIO SYNTHESIZER ---
let soundEnabled = true;
let audioCtx = null;

function getAudioContext() {
    if (!audioCtx) {
        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            audioCtx = null;
        }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
    }
    return audioCtx;
}

function playCyberBeep(freq = 800, type = 'sine', duration = 0.05) {
    if (!soundEnabled) return;
    try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
    } catch (e) {
        // Ignore audio errors safely
    }
}

// --- 2. GLOBAL CHATBOT ENGINE (AVAILABLE EVERYWHERE) ---
window.toggleAdityaChat = function () {
    const win = document.getElementById('chatbot-window');
    if (!win) return;
    const isOpen = win.classList.contains('chat-open');
    if (isOpen) {
        win.classList.remove('chat-open');
        playCyberBeep(800, 'sine', 0.05);
    } else {
        win.classList.add('chat-open');
        playCyberBeep(1100, 'sine', 0.08);
        const input = document.getElementById('chat-input');
        if (input) setTimeout(() => input.focus(), 150);
    }
};

window.sendQuickPrompt = function (promptText) {
    const win = document.getElementById('chatbot-window');
    if (win && !win.classList.contains('chat-open')) {
        win.classList.add('chat-open');
    }
    handleUserChatMessage(promptText);
};

window.handleChatFormSubmit = function (event) {
    if (event) event.preventDefault();
    const input = document.getElementById('chat-input');
    if (!input) return false;
    const userMsg = input.value.trim();
    if (!userMsg) return false;
    input.value = '';
    handleUserChatMessage(userMsg);
    return false;
};

// Comprehensive Resume Knowledge Intelligence (Updated with Antenna & RF Specs)
function getBotResponse(query) {
    const q = query.toLowerCase();

    // 1. Microstrip Patch Antenna / ANSYS HFSS / RF Project
    if (q.includes('antenna') || q.includes('hfss') || q.includes('15 ghz') || q.includes('microstrip') || q.includes('rogers') || q.includes('vswr') || q.includes('return loss') || q.includes('rf')) {
        return `📡 <strong>15 GHz Microstrip Patch Antenna</strong> (Academic Project):<br>Aditya designed and simulated a 15 GHz rectangular microstrip patch antenna using <strong>ANSYS HFSS</strong> software on a <strong>Rogers RT/duroid 5880</strong> substrate.<br><br><strong>Key Performance Metrics Achieved</strong>:<br>• <strong>Return Loss</strong>: −29.75 dB<br>• <strong>VSWR</strong>: 1.06<br>• <strong>Peak Gain</strong>: 7.77 dB`;
    }

    // 2. EV Wireless Charging Project
    if (q.includes('ev') || q.includes('wireless charging') || q.includes('power transfer') || q.includes('electric vehicle') || q.includes('inductive') || q.includes('rectification')) {
        return `⚡ <strong>Wireless Charging Station for Electric Vehicles</strong> (Academic Project):<br>Aditya simulated an inductive coil-based wireless power transfer circuit for EV charging using <strong>Proteus</strong> and <strong>Multisim</strong>. Key features include:<br>• Inductive resonance coil coupling<br>• High-frequency AC-to-DC rectification<br>• Precise voltage regulation for EV battery charging!`;
    }

    // 3. Alcohol Detection System Project
    if (q.includes('alcohol') || q.includes('mq-3') || q.includes('mq3') || q.includes('ignition') || q.includes('cutoff') || q.includes('buzzer') || q.includes('gas sensor') || q.includes('safety')) {
        return `🚗 <strong>Alcohol Detection System with Ignition Cutoff</strong> (Academic Project):<br>Aditya built an automated safety system using an <strong>Arduino MCU</strong> and an <strong>MQ-3 gas sensor</strong>. Features include:<br>• Programmed low-level <strong>Embedded C</strong> logic<br>• Triggers a loud buzzer alarm when BAC exceeds threshold<br>• Engages a relay-based engine ignition cutoff to prevent drunk driving!`;
    }

    // 4. Summary / Overview / Bio
    if (q.includes('who') || q.includes('about') || q.includes('summary') || q.includes('overview') || q.includes('bio') || q.includes('profile') || q.includes('tell me about aditya')) {
        return `<strong>Aditya Anand Gaikwad</strong> is a final-year <em>Electronics and Communication Engineering (ECE)</em> student at Anantrao Pawar College of Engineering & Research, Pune.<br><br>He has hands-on experience in <strong>embedded systems</strong> and <strong>RF/antenna design</strong>, including microcontroller systems (Arduino, Embedded C), circuit simulation (Multisim, Proteus), PCB design, antenna design in <strong>ANSYS HFSS</strong>, and <strong>C, C++, Python, MySQL</strong>. He is eager to contribute to an internship or entry-level role in embedded systems, electronics, or RF engineering! 🚀`;
    }

    // 5. Projects General
    if (q.includes('project') || q.includes('work') || q.includes('academic project') || q.includes('build')) {
        return `🛠️ <strong>Aditya's Featured Projects</strong>:<br><br>1. <strong>15 GHz Microstrip Patch Antenna</strong>: Designed in ANSYS HFSS (−29.75 dB return loss, 1.06 VSWR, 7.77 dB peak gain).<br><br>2. <strong>Wireless EV Charging Station</strong>: Simulated inductive power transfer in Proteus & Multisim.<br><br>3. <strong>Alcohol Detection System</strong>: Built an Arduino + MQ-3 sensor system with Embedded C buzzer & relay ignition cutoff.`;
    }

    // 6. Programming Languages & Database (C, C++, Python, MySQL)
    if (q.includes('c++') || q.includes('cpp') || q.includes('python') || q.includes('mysql') || q.includes('sql') || q.includes('programming') || q.includes('language') || q.includes('code') || q.includes('tech stack')) {
        return `💻 <strong>Programming & Technical Stack</strong>:<br>• <strong>Programming Languages</strong>: C, C++, Python, MySQL<br>• <strong>Hardware Coding</strong>: Embedded C, Arduino MCU<br>• <strong>RF & Circuit Tools</strong>: ANSYS HFSS, Proteus, NI Multisim, PCB Design<br>• <strong>Core Domain Interest</strong>: Embedded Systems, Electronics, Communication Networks, RF Engineering.`;
    }

    // 7. Education & Marks / Percentages (College, HSC, SSC)
    if (q.includes('education') || q.includes('college') || q.includes('school') || q.includes('marks') || q.includes('gpa') || q.includes('percentage') || q.includes('hsc') || q.includes('ssc') || q.includes('degree') || q.includes('latur') || q.includes('pune') || q.includes('study')) {
        return `🎓 <strong>Academic Qualifications</strong>:<br><br>1. <strong>Anantrao Pawar College of Engineering & Research, Pune</strong> (Aug 2023 – Present)<br>• Bachelor of Engineering (B.E.) in Electronics & Communication Engineering — <em>Final Year</em><br><br>2. <strong>Milind Junior College, Latur</strong> (2022 – 2023)<br>• Higher Secondary Certificate (HSC) — <strong>55.33%</strong><br><br>3. <strong>Shri Deshikendra School, Latur</strong> (2020 – 2021)<br>• Secondary School Certificate (SSC) — <strong>77.40%</strong>`;
    }

    // 8. Soft Skills & Languages
    if (q.includes('soft skill') || q.includes('leadership') || q.includes('team') || q.includes('collaboration') || q.includes('language') || q.includes('speak') || q.includes('english') || q.includes('hindi') || q.includes('marathi')) {
        return `🤝 <strong>Soft Skills & Spoken Languages</strong>:<br>• <strong>Soft Skills</strong>: Collaboration, Leadership, Teamwork, Time Management.<br>• <strong>Languages Spoken</strong>: English (Professional), Hindi (Fluent), Marathi (Native).`;
    }

    // 9. Certifications
    if (q.includes('certif') || q.includes('course') || q.includes('certificate')) {
        return `📜 <strong>Certifications</strong>:<br>1. <strong>Python Programming Certification</strong><br>2. <strong>Antenna Design & Simulation Certification</strong> (ANSYS HFSS)`;
    }

    // 10. Contact Info & Internship Availability
    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('number') || q.includes('reach') || q.includes('hire') || q.includes('intern') || q.includes('location') || q.includes('address')) {
        return `📡 <strong>Contact Telemetry & Internship Status</strong>:<br>• <strong>Status</strong>: Seeking ECE / RF / Embedded Systems Internship & Entry-Level Roles<br>• <strong>Email</strong>: <a href="mailto:adityagaikwad1465@gmail.com" class="text-emerald-400 underline font-bold">adityagaikwad1465@gmail.com</a><br>• <strong>Phone</strong>: <a href="tel:9730391363" class="text-cyan-400 underline font-bold">+91 9730391363</a><br>• <strong>Location</strong>: Pune, Maharashtra, India`;
    }

    // 11. Greetings
    if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('good morning') || q.includes('good evening') || q.includes('namaste')) {
        return `Hello! 👋 I am Aditya's AI Assistant. Ask me anything about his <strong>15 GHz Patch Antenna Project</strong>, <strong>EV Wireless Charging</strong>, <strong>MQ-3 Alcohol System</strong>, <strong>ANSYS HFSS &amp; C/C++/Python skills</strong>, or <strong>Contact details</strong>!`;
    }

    // Default Fallback
    return `I am programmed with full knowledge of <strong>Aditya Gaikwad's Updated Resume</strong>!<br><br>Try asking about:<br>• <em>"15 GHz Microstrip Patch Antenna"</em><br>• <em>"EV Wireless Charging project"</em><br>• <em>"Alcohol Detection System"</em><br>• <em>"ANSYS HFSS, C++, Python, MySQL skills"</em><br>• <em>"Education, College & Marks"</em><br>• <em>"Contact & Phone number"</em>`;
}

function handleUserChatMessage(userText) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;

    // Append User Message
    const userDiv = document.createElement('div');
    userDiv.className = 'flex gap-2.5 items-start justify-end';
    userDiv.innerHTML = `
        <div class="bg-emerald-500 text-slate-950 font-bold p-3 rounded-xl rounded-tr-none leading-relaxed max-w-[85%] shadow-sm">
            ${userText}
        </div>
        <div class="w-7 h-7 rounded bg-emerald-400 flex items-center justify-center text-slate-950 shrink-0 font-bold text-xs">
            U
        </div>
    `;
    chatMessages.appendChild(userDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    playCyberBeep(1200, 'sine', 0.05);

    // Bot Response with realistic typing delay
    setTimeout(() => {
        const botReply = getBotResponse(userText);
        const botDiv = document.createElement('div');
        botDiv.className = 'flex gap-2.5 items-start';
        botDiv.innerHTML = `
            <div class="w-7 h-7 rounded bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 font-bold text-xs">
                AI
            </div>
            <div class="bg-slate-900 border border-emerald-500/30 text-slate-200 p-3 rounded-xl rounded-tl-none leading-relaxed max-w-[88%] shadow-md">
                ${botReply}
            </div>
        `;
        chatMessages.appendChild(botDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        playCyberBeep(1400, 'square', 0.08);
    }, 300);
}


// --- 3. PAGE INITIALIZATION ---
function initPortfolio() {
    console.log("Aditya Gaikwad Portfolio Initialized");

    // Sound toggle listener
    const soundBtn = document.getElementById('sound-toggle');
    if (soundBtn) {
        soundBtn.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            soundBtn.classList.toggle('text-emerald-400', soundEnabled);
            soundBtn.classList.toggle('text-slate-600', !soundEnabled);
            playCyberBeep(1200, 'square', 0.08);
        });
    }

    // PCB Background Canvas
    const canvas = document.getElementById('circuit-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let nodes = [];
        let mouse = { x: null, y: null, radius: 150 };

        function resizeCanvas() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initNodes();
        }

        class Node {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 2.5 + 1.5;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.pulse = Math.random() * Math.PI * 2;
                this.color = Math.random() > 0.3 ? '#10b981' : '#06b6d4';
            }

            update() {
                this.pulse += 0.03;
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                if (mouse.x && mouse.y) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.radius) {
                        let force = (mouse.radius - dist) / mouse.radius;
                        this.x -= (dx / dist) * force * 2;
                        this.y -= (dy / dist) * force * 2;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size + Math.sin(this.pulse) * 0.8, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.shadowBlur = 8;
                ctx.shadowColor = this.color;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        function initNodes() {
            nodes = [];
            const count = Math.floor((width * height) / 18000);
            for (let i = 0; i < count; i++) {
                nodes.push(new Node(Math.random() * width, Math.random() * height));
            }
        }

        function animateCircuit() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    let dx = nodes[i].x - nodes[j].x;
                    let dy = nodes[i].y - nodes[j].y;
                    let dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 130) {
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[i].x, nodes[j].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);

                        let alpha = (1 - dist / 130) * 0.25;
                        ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            nodes.forEach(n => {
                n.update();
                n.draw();
            });

            requestAnimationFrame(animateCircuit);
        }

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        resizeCanvas();
        animateCircuit();
    }

    // Terminal Commands
    const termInput = document.getElementById('terminal-input');
    const termBody = document.getElementById('terminal-body');
    const clearBtn = document.getElementById('clear-term-btn');

    const commands = {
        help: `Available commands:
 - <span class="text-purple-400 font-bold">projects</span>   : Show academic projects (Patch Antenna, EV Charging & Alcohol System)
 - <span class="text-cyan-400 font-bold">skills</span>     : Display technical skills & software/hardware stack
 - <span class="text-teal-400 font-bold">education</span>  : Show academic qualifications & college details
 - <span class="text-emerald-400 font-bold">contact</span>   : Print email, phone & location info
 - <span class="text-amber-400 font-bold">clear</span>     : Clear the terminal screen`,

        projects: `<span class="text-purple-400 font-bold">[FEATURED ACADEMIC PROJECTS]</span>
 1. <strong class="text-white">15 GHz Microstrip Patch Antenna</strong>
    • ANSYS HFSS simulation on Rogers RT/duroid 5880 substrate.
    • Specs: -29.75 dB return loss, 1.06 VSWR, 7.77 dB peak gain.
 2. <strong class="text-white">Wireless Charging Station for Electric Vehicles</strong>
    • Simulated inductive coil power transfer using Proteus & Multisim.
    • Built AC-DC rectification and LC resonant voltage regulation logic.
 3. <strong class="text-white">Alcohol Detection System with Ignition Cutoff</strong>
    • Integrated Arduino MCU with MQ-3 alcohol sensor.
    • Embedded C buzzer alert & relay engine cutoff logic.`,

        skills: `<span class="text-cyan-400 font-bold">[TECHNICAL SKILLS MATRIX]</span>
 • RF & Antenna     : ANSYS HFSS, Antenna Design & Simulation, S-Parameters
 • Hardware & MCUs  : Arduino, Embedded C, Microcontroller Interfacing
 • Circuit Design   : Multisim, Proteus, PCB Layout Basics
 • Programming      : C, C++, Python, MySQL
 • Core Focus       : Embedded Systems, Electronics, Communication Networks, RF Engineering
 • Soft Skills      : Leadership, Collaboration, Time Management`,

        education: `<span class="text-teal-400 font-bold">[ACADEMIC CREDENTIALS]</span>
 1. Anantrao Pawar College of Engineering & Research, Pune (Aug 2023 - Present)
    Degree: Bachelor of Engineering (ECE) - Final Year Student
 2. Milind Junior College, Latur (2022 - 2023)
    HSC: 55.33%
 3. Shri Deshikendra School, Latur (2020 - 2021)
    SSC: 77.40%`,

        contact: `<span class="text-emerald-400 font-bold">[CONTACT TELEMETRY]</span>
 • Name     : ADITYA ANAND GAIKWAD
 • Location : Pune, Maharashtra, India
 • Email    : adityagaikwad1465@gmail.com
 • Phone    : +91 9730391363`
    };

    function appendTermOutput(cmd, output) {
        if (!termBody) return;
        const line = document.createElement('div');
        line.className = 'space-y-1';
        line.innerHTML = `<div class="text-emerald-400 font-bold">aditya@ece:~$ ${cmd}</div><div class="text-slate-300 pl-4 whitespace-pre-wrap">${output}</div>`;
        termBody.appendChild(line);
        termBody.scrollTop = termBody.scrollHeight;
    }

    if (termInput) {
        termInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const rawCmd = termInput.value.trim().toLowerCase();
                termInput.value = '';
                playCyberBeep(1000, 'sine', 0.04);

                if (rawCmd === 'clear') {
                    termBody.innerHTML = `<div><span class="text-emerald-400">Terminal reset.</span> Type <span class="text-cyan-400 font-bold">'help'</span> for list of commands.</div>`;
                    return;
                }

                if (commands[rawCmd]) {
                    appendTermOutput(rawCmd, commands[rawCmd]);
                } else if (rawCmd !== '') {
                    appendTermOutput(rawCmd, `<span class="text-red-400">Command not recognized: '${rawCmd}'. Type 'help' for available commands.</span>`);
                }
            }
        });
    }

    document.querySelectorAll('.cmd-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            const cmd = pill.textContent.trim().toLowerCase();
            if (cmd === 'clear') {
                if (termBody) termBody.innerHTML = `<div><span class="text-emerald-400">Terminal reset.</span> Type <span class="text-cyan-400 font-bold">'help'</span> for list of commands.</div>`;
            } else if (commands[cmd]) {
                appendTermOutput(cmd, commands[cmd]);
            }
        });
    });

    if (clearBtn && termBody) {
        clearBtn.addEventListener('click', () => {
            termBody.innerHTML = `<div><span class="text-emerald-400">Terminal reset.</span> Type <span class="text-cyan-400 font-bold">'help'</span> for list of commands.</div>`;
        });
    }

    // Utilities
    const copyBtn = document.getElementById('copy-email-btn');
    const copyText = document.getElementById('copy-text');

    if (copyBtn && copyText) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText('adityagaikwad1465@gmail.com').then(() => {
                const original = copyText.textContent;
                copyText.textContent = 'COPIED TO CLIPBOARD!';
                copyText.classList.add('text-emerald-400', 'font-bold');
                playCyberBeep(1400, 'square', 0.1);
                setTimeout(() => {
                    copyText.textContent = original;
                    copyText.classList.remove('text-emerald-400', 'font-bold');
                }, 2000);
            });
        });
    }

    const themePulseBtn = document.getElementById('theme-pulse');
    if (themePulseBtn) {
        themePulseBtn.addEventListener('click', () => {
            document.body.classList.add('pulse-active');
            playCyberBeep(1500, 'sawtooth', 0.15);
            setTimeout(() => document.body.classList.remove('pulse-active'), 1500);
        });
    }

    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Direct Email Form Handling (Formspree AJAX + Mailto Fallback)
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const message = document.getElementById('contact-message').value;

            formStatus.classList.remove('hidden');
            formStatus.textContent = 'Transmitting message to adityagaikwad1465@gmail.com...';
            playCyberBeep(1200, 'sine', 0.1);

            // Attempt Formspree Post
            fetch('https://formspree.io/f/adityagaikwad1465@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            }).then(response => {
                if (response.ok) {
                    formStatus.textContent = 'Transmission Successful! Message delivered to Aditya\'s email inbox.';
                    formStatus.className = 'text-center font-mono text-xs text-emerald-400 pt-2 font-bold';
                    contactForm.reset();
                } else {
                    throw new Error('Formspree endpoint fallback trigger');
                }
            }).catch(() => {
                // Direct Mailto Fallback
                const mailtoUri = `mailto:adityagaikwad1465@gmail.com?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AFrom:%20${encodeURIComponent(email)}`;
                window.location.href = mailtoUri;
                formStatus.textContent = 'Opening your email client to complete transmission to adityagaikwad1465@gmail.com...';
                contactForm.reset();
            });
        });
    }
}

// Execute initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
    initPortfolio();
}
