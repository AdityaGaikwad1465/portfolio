/**
 * Aditya Anand Gaikwad - Interactive Portfolio Engine
 * PCB Circuit Canvas, Live Oscilloscope Simulator, Terminal CLI, Audio Synth
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. AUDIO SYNTHESIZER (Cyber Beep FX) ---
    let soundEnabled = true;
    const soundBtn = document.getElementById('sound-toggle');
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    function playCyberBeep(freq = 800, type = 'sine', duration = 0.05) {
        if (!soundEnabled) return;
        try {
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch (e) {
            // Audio context fallback
        }
    }

    if (soundBtn) {
        soundBtn.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            soundBtn.classList.toggle('text-emerald-400', soundEnabled);
            soundBtn.classList.toggle('text-slate-600', !soundEnabled);
            playCyberBeep(1200, 'square', 0.08);
        });
    }

    // Attach beep to interactive buttons
    document.querySelectorAll('button, a').forEach(el => {
        el.addEventListener('mouseenter', () => playCyberBeep(600, 'sine', 0.03));
        el.addEventListener('click', () => playCyberBeep(900, 'triangle', 0.06));
    });


    // --- 2. INTERACTIVE PCB CIRCUIT CANVAS BACKGROUND ---
    const canvas = document.getElementById('circuit-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let nodes = [];
    let connections = [];
    let mouse = { x: null, y: null, radius: 150 };

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initNodes();
    }

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    class Node {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.baseX = x;
            this.baseY = y;
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

            // Mouse magnet effect
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

        // Draw connections (PCB Traces)
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                let dx = nodes[i].x - nodes[j].x;
                let dy = nodes[i].y - nodes[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    ctx.beginPath();
                    // Orthogonal / PCB trace style step line
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

    resizeCanvas();
    animateCircuit();


    // --- 3. LIVE OSCILLOSCOPE SIGNAL SIMULATOR ---
    const scopeCanvas = document.getElementById('scope-canvas');
    const scopeCtx = scopeCanvas ? scopeCanvas.getContext('2d') : null;
    let waveType = 'sine';
    let frequency = 2.5;
    let amplitude = 5.0;
    let timePhase = 0;

    const freqSlider = document.getElementById('freq-slider');
    const ampSlider = document.getElementById('amp-slider');
    const freqDisp = document.getElementById('freq-disp');
    const ampDisp = document.getElementById('amp-disp');
    const scopeWaveName = document.getElementById('scope-wave-name');
    const scopeFreqVal = document.getElementById('scope-freq-val');
    const scopeAmpVal = document.getElementById('scope-amp-val');

    if (freqSlider) {
        freqSlider.addEventListener('input', (e) => {
            frequency = parseFloat(e.target.value);
            freqDisp.textContent = `${frequency.toFixed(1)} kHz`;
            if (scopeFreqVal) scopeFreqVal.textContent = `${frequency.toFixed(1)} kHz`;
        });
    }

    if (ampSlider) {
        ampSlider.addEventListener('input', (e) => {
            amplitude = parseFloat(e.target.value);
            ampDisp.textContent = `${amplitude.toFixed(1)} Vpp`;
            if (scopeAmpVal) scopeAmpVal.textContent = `${amplitude.toFixed(1)} Vpp`;
        });
    }

    document.querySelectorAll('.wave-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.wave-btn').forEach(b => {
                b.className = 'wave-btn px-4 py-2 bg-slate-950 text-slate-400 border border-slate-800 hover:text-emerald-400 rounded-lg transition-all';
            });
            btn.className = 'wave-btn px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-lg transition-all';
            waveType = btn.dataset.type;
            if (scopeWaveName) scopeWaveName.textContent = waveType.toUpperCase() + ' WAVE';
        });
    });

    function drawOscilloscope() {
        if (!scopeCanvas || !scopeCtx) return;

        const w = scopeCanvas.width = scopeCanvas.clientWidth;
        const h = scopeCanvas.height = scopeCanvas.clientHeight;
        const centerY = h / 2;

        scopeCtx.clearRect(0, 0, w, h);

        // Draw Scope Grid Lines
        scopeCtx.strokeStyle = 'rgba(16, 185, 129, 0.08)';
        scopeCtx.lineWidth = 1;
        const gridStep = 30;

        for (let x = 0; x < w; x += gridStep) {
            scopeCtx.beginPath();
            scopeCtx.moveTo(x, 0);
            scopeCtx.lineTo(x, h);
            scopeCtx.stroke();
        }
        for (let y = 0; y < h; y += gridStep) {
            scopeCtx.beginPath();
            scopeCtx.moveTo(0, y);
            scopeCtx.lineTo(w, y);
            scopeCtx.stroke();
        }

        // Center Axis Lines
        scopeCtx.strokeStyle = 'rgba(16, 185, 129, 0.25)';
        scopeCtx.beginPath();
        scopeCtx.moveTo(0, centerY);
        scopeCtx.lineTo(w, centerY);
        scopeCtx.moveTo(w / 2, 0);
        scopeCtx.lineTo(w / 2, h);
        scopeCtx.stroke();

        // Draw Signal Trace
        scopeCtx.beginPath();
        scopeCtx.strokeStyle = '#10b981';
        scopeCtx.lineWidth = 2.5;
        scopeCtx.shadowBlur = 12;
        scopeCtx.shadowColor = '#10b981';

        const scaleAmp = (amplitude / 10) * (h * 0.35);

        for (let x = 0; x < w; x++) {
            let angle = (x * 0.015 * frequency) + timePhase;
            let y = centerY;

            if (waveType === 'sine') {
                y = centerY - Math.sin(angle) * scaleAmp;
            } else if (waveType === 'square') {
                y = centerY - (Math.sin(angle) >= 0 ? scaleAmp : -scaleAmp);
            } else if (waveType === 'triangle') {
                let norm = (angle % (Math.PI * 2)) / (Math.PI * 2);
                y = centerY - (Math.abs(norm - 0.5) * 4 - 1) * scaleAmp;
            } else if (waveType === 'pwm') {
                let norm = (angle % (Math.PI * 2)) / (Math.PI * 2);
                y = centerY - (norm < 0.25 ? scaleAmp : -scaleAmp);
            }

            if (x === 0) scopeCtx.moveTo(x, y);
            else scopeCtx.lineTo(x, y);
        }

        scopeCtx.stroke();
        scopeCtx.shadowBlur = 0;

        timePhase += 0.08 * (frequency / 2);
        requestAnimationFrame(drawOscilloscope);
    }

    if (scopeCanvas) drawOscilloscope();


    // --- 4. HARDWARE CLI TERMINAL CONSOLE ---
    const termInput = document.getElementById('terminal-input');
    const termBody = document.getElementById('terminal-body');
    const clearBtn = document.getElementById('clear-term-btn');

    const commands = {
        help: `Available commands:
 - <span class="text-emerald-400 font-bold">skills</span>     : Display technical skills & microcontroller specs
 - <span class="text-cyan-400 font-bold">education</span>  : Show academic qualifications & college details
 - <span class="text-teal-400 font-bold">lab-exp</span>    : List hands-on ECE lab experience
 - <span class="text-purple-400 font-bold">contact</span>   : Print email, phone & location info
 - <span class="text-amber-400 font-bold">clear</span>     : Clear the terminal screen`,

        skills: `<span class="text-emerald-400 font-bold">[TECHNICAL SKILLS MATRIX]</span>
 • Hardware & MCUs  : Arduino, Embedded C, Microcontroller Interfacing (Sensors/IO)
 • Circuit Design   : Multisim, Proteus, PCB Layout Basics
 • Programming      : Python (Certified basic)
 • Core Knowledge   : Embedded Systems, IoT, Communication Networks, Electronics
 • Soft Skills      : Leadership, Collaboration, Time Management`,

        education: `<span class="text-cyan-400 font-bold">[ACADEMIC CREDENTIALS]</span>
 1. Anantrao Pawar College of Engineering & Research, Pune (Aug 2023 - Present)
    Degree: Bachelor of Engineering (ECE) - Final Year Student
 2. Milind Junior College, Latur (2022 - 2023)
    HSC: 55.33%
 3. Shri Deshikendra School, Latur (2020 - 2021)
    SSC: 77.40%`,

        'lab-exp': `<span class="text-teal-400 font-bold">[ACADEMIC LAB EXPERIENCES]</span>
 [1] Microcontroller Programming: Sensor & I/O interfacing with Arduino & Embedded C.
 [2] Circuit Simulation: Analog & digital testing with Multisim & Proteus.
 [3] PCB Layout: Practical routing & layout design in ECE lab modules.`,

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


    // --- 5. UTILITY HANDLERS (Copy Email, Mobile Menu, Form) ---
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

    // System Pulse button animation effect
    const themePulseBtn = document.getElementById('theme-pulse');
    if (themePulseBtn) {
        themePulseBtn.addEventListener('click', () => {
            document.body.classList.add('pulse-active');
            playCyberBeep(1500, 'sawtooth', 0.15);
            setTimeout(() => document.body.classList.remove('pulse-active'), 1500);
        });
    }

    // Mobile Menu
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const message = document.getElementById('contact-message').value;

            // Direct mailto trigger
            const mailtoUri = `mailto:adityagaikwad1465@gmail.com?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AFrom:%20${encodeURIComponent(email)}`;
            window.location.href = mailtoUri;

            formStatus.classList.remove('hidden');
            formStatus.textContent = 'Opening your email client to send transmission...';
            playCyberBeep(1200, 'square', 0.1);
            contactForm.reset();
        });
    }

});
