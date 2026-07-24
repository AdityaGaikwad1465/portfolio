/**
 * Aditya Anand Gaikwad - Interactive Portfolio & Bulletproof AI Resume Chatbot
 * Features: PCB Canvas Engine, Terminal CLI, Global AI Chat Engine, Web Audio Synth
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

// Comprehensive Resume Knowledge Intelligence
function getBotResponse(query) {
    const q = query.toLowerCase();

    // 1. Professional Summary / Overview / Bio
    if (q.includes('who') || q.includes('about') || q.includes('summary') || q.includes('overview') || q.includes('bio') || q.includes('profile') || q.includes('tell me about aditya')) {
        return `<strong>Aditya Anand Gaikwad</strong> is a final-year <em>Electronics and Communication Engineering (ECE)</em> student at Anantrao Pawar College of Engineering & Research, Pune.<br><br>He has hands-on laboratory experience in <strong>embedded systems</strong>, <strong>microcontroller programming</strong>, <strong>circuit design & simulation</strong> (Arduino, Embedded C, Multisim, Proteus, PCB Layout), and <strong>Python</strong>. He is reliable, detail-oriented, and seeking an internship or entry-level role in electronics or hardware engineering! 🚀`;
    }

    // 2. EV Wireless Charging Project
    if (q.includes('ev') || q.includes('wireless charging') || q.includes('power transfer') || q.includes('electric vehicle') || q.includes('inductive') || q.includes('rectification')) {
        return `⚡ <strong>Wireless Charging Station for Electric Vehicles</strong> (Academic Project):<br>Aditya simulated an inductive coil-based wireless power transfer circuit for EV charging using <strong>Proteus</strong> and <strong>Multisim</strong>. Key features include:<br>• Inductive resonance coil coupling<br>• High-frequency AC-to-DC rectification<br>• Precise voltage regulation for EV battery charging!`;
    }

    // 3. Alcohol Detection System Project
    if (q.includes('alcohol') || q.includes('mq-3') || q.includes('mq3') || q.includes('ignition') || q.includes('cutoff') || q.includes('buzzer') || q.includes('gas sensor') || q.includes('safety')) {
        return `🚗 <strong>Alcohol Detection System with Ignition Cutoff</strong> (Academic Project):<br>Aditya built an automated safety system using an <strong>Arduino MCU</strong> and an <strong>MQ-3 gas sensor</strong>. Features include:<br>• Programmed low-level <strong>Embedded C</strong> logic<br>• Triggers a loud buzzer alarm when BAC exceeds threshold<br>• Engages a relay-based engine ignition cutoff to prevent drunk driving!`;
    }

    // 4. Projects General
    if (q.includes('project') || q.includes('work') || q.includes('academic project') || q.includes('build')) {
        return `🛠️ <strong>Aditya's Academic Projects</strong>:<br><br>1. <strong>Wireless Charging Station for EVs</strong>: Simulated inductive coil wireless power transfer using Proteus & Multisim.<br><br>2. <strong>Alcohol Detection System</strong>: Built an Arduino + MQ-3 sensor safety system with Embedded C buzzer alarm & relay ignition cutoff.`;
    }

    // 5. Hardware & MCU Skills (Arduino, Embedded C, Interfacing)
    if (q.includes('arduino') || q.includes('embedded c') || q.includes('microcontroller') || q.includes('mcu') || q.includes('interfacing') || q.includes('hardware') || q.includes('sensor')) {
        return `📟 <strong>Embedded Systems & Hardware Skills</strong>:<br>• <strong>Microcontrollers</strong>: Arduino & MCU pin interfacing<br>• <strong>Programming</strong>: Embedded C for low-level I/O & sensor reading<br>• <strong>Interfacing</strong>: Gas sensors (MQ-3), relays, buzzers, analog-to-digital signals.`;
    }

    // 6. Circuit Simulation & PCB Design (Multisim, Proteus, PCB)
    if (q.includes('multisim') || q.includes('proteus') || q.includes('pcb') || q.includes('circuit') || q.includes('simulation') || q.includes('schematic')) {
        return `🔌 <strong>Circuit Design & Simulation Tools</strong>:<br>• <strong>NI Multisim</strong>: Analog & digital circuit testing and AC/DC signal analysis.<br>• <strong>Proteus Design Suite</strong>: Circuit schematic capture & hardware simulation.<br>• <strong>PCB Design</strong>: Hands-on PCB layout fundamentals and component routing.`;
    }

    // 7. Programming & Technical Stack (Python, IoT, Communication)
    if (q.includes('python') || q.includes('programming') || q.includes('code') || q.includes('iot') || q.includes('communication') || q.includes('network') || q.includes('tech stack')) {
        return `💻 <strong>Programming & Core Domains</strong>:<br>• <strong>Python</strong>: Certified basic programming skills.<br>• <strong>Embedded C</strong>: Intermediate firmware coding.<br>• <strong>Core Knowledge</strong>: Internet of Things (IoT), Communication Networks, Electronics.`;
    }

    // 8. Education & Marks / Percentages (College, HSC, SSC)
    if (q.includes('education') || q.includes('college') || q.includes('school') || q.includes('marks') || q.includes('gpa') || q.includes('percentage') || q.includes('hsc') || q.includes('ssc') || q.includes('degree') || q.includes('latur') || q.includes('pune') || q.includes('study')) {
        return `🎓 <strong>Academic Qualifications</strong>:<br><br>1. <strong>Anantrao Pawar College of Engineering & Research, Pune</strong> (Aug 2023 – Present)<br>• Bachelor of Engineering (B.E.) in Electronics & Communication Engineering — <em>Final Year</em><br><br>2. <strong>Milind Junior College, Latur</strong> (2022 – 2023)<br>• Higher Secondary Certificate (HSC) — <strong>55.33%</strong><br><br>3. <strong>Shri Deshikendra School, Latur</strong> (2020 – 2021)<br>• Secondary School Certificate (SSC) — <strong>77.40%</strong>`;
    }

    // 9. Soft Skills & Languages
    if (q.includes('soft skill') || q.includes('leadership') || q.includes('team') || q.includes('collaboration') || q.includes('language') || q.includes('speak') || q.includes('english') || q.includes('hindi') || q.includes('marathi')) {
        return `🤝 <strong>Soft Skills & Languages</strong>:<br>• <strong>Soft Skills</strong>: Collaboration, Leadership, Teamwork, Time Management.<br>• <strong>Languages Spoken</strong>: English (Professional), Hindi (Fluent), Marathi (Native).`;
    }

    // 10. Certifications
    if (q.includes('certif') || q.includes('course') || q.includes('certificate')) {
        return `📜 <strong>Certifications</strong>:<br>• <strong>Python Programming Certification</strong>`;
    }

    // 11. Contact Info & Internship Availability
    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('number') || q.includes('reach') || q.includes('hire') || q.includes('intern') || q.includes('location') || q.includes('address')) {
        return `📡 <strong>Contact Telemetry & Internship Status</strong>:<br>• <strong>Status</strong>: Seeking ECE / Embedded Systems Internship & Entry-Level Roles<br>• <strong>Email</strong>: <a href="mailto:adityagaikwad1465@gmail.com" class="text-emerald-400 underline">adityagaikwad1465@gmail.com</a><br>• <strong>Phone</strong>: <a href="tel:9730391363" class="text-cyan-400 underline">+91 9730391363</a><br>• <strong>Location</strong>: Pune, Maharashtra, India`;
    }

    // 12. Greetings / Salutations
    if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('good morning') || q.includes('good evening') || q.includes('namaste')) {
        return `Hello! 👋 I am Aditya's AI Assistant. Ask me anything about his <strong>EV Wireless Charging Project</strong>, <strong>Alcohol Detection System</strong>, <strong>Embedded C / Arduino skills</strong>, <strong>Education & Marks</strong>, or <strong>Contact info</strong>!`;
    }

    // Default Fallback
    return `I am programmed with full knowledge of <strong>Aditya Gaikwad's Resume</strong>!<br><br>Try asking about:<br>• <em>"EV Wireless Charging project"</em><br>• <em>"Alcohol Detection System"</em><br>• <em>"Technical skills & Proteus/Multisim"</em><br>• <em>"Education, College & Marks"</em><br>• <em>"Contact & Phone number"</em>`;
}

function handleUserChatMessage(userText) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;

    // Append User Message
    const userDiv = document.createElement('div');
    userDiv.className = 'flex gap-2.5 items-start justify-end';
    userDiv.innerHTML = `
        <div class="bg-emerald-500 text-slate-950 font-bold p-3 rounded-xl rounded-tr-none leading-relaxed max-w-[85%]">
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
 - <span class="text-emerald-400 font-bold">projects</span>   : Show academic projects (EV Wireless & Alcohol System)
 - <span class="text-cyan-400 font-bold">skills</span>     : Display technical skills & microcontroller specs
 - <span class="text-teal-400 font-bold">education</span>  : Show academic qualifications & college details
 - <span class="text-purple-400 font-bold">contact</span>   : Print email, phone & location info
 - <span class="text-amber-400 font-bold">clear</span>     : Clear the terminal screen`,

        projects: `<span class="text-emerald-400 font-bold">[ACADEMIC PROJECTS]</span>
 1. <strong class="text-white">Wireless Charging Station for Electric Vehicles</strong>
    • Simulated inductive coil power transfer using Proteus & Multisim.
    • Built AC-DC rectification and LC resonant voltage regulation logic.
 2. <strong class="text-white">Alcohol Detection System with Ignition Cutoff</strong>
    • Integrated Arduino MCU with MQ-3 alcohol sensor.
    • Written in Embedded C to trigger buzzer alarm and relay engine cutoff above threshold.`,

        skills: `<span class="text-cyan-400 font-bold">[TECHNICAL SKILLS MATRIX]</span>
 • Hardware & MCUs  : Arduino, Embedded C, Microcontroller Interfacing (Sensors/IO)
 • Circuit Design   : Multisim, Proteus, PCB Layout Basics
 • Programming      : Python (Certified basic)
 • Core Knowledge   : Embedded Systems, IoT, Communication Networks, Electronics
 • Soft Skills      : Leadership, Collaboration, Time Management`,

        education: `<span class="text-teal-400 font-bold">[ACADEMIC CREDENTIALS]</span>
 1. Anantrao Pawar College of Engineering & Research, Pune (Aug 2023 - Present)
    Degree: Bachelor of Engineering (ECE) - Final Year Student
 2. Milind Junior College, Latur (2022 - 2023)
    HSC: 55.33%
 3. Shri Deshikendra School, Latur (2020 - 2021)
    SSC: 77.40%`,

        contact: `<span class="text-purple-400 font-bold">[CONTACT TELEMETRY]</span>
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
}

// Execute initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
    initPortfolio();
}
