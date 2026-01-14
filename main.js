// Terminal Portfolio - Ultimate Enhanced Version
// Boot sequence, themes, sound, Konami code, and more!

// ========== DOM ELEMENTS ==========
const terminal = document.getElementById('terminalContent');
const input = document.getElementById('commandInput');
const suggestions = document.getElementById('suggestions');
const datetime = document.getElementById('datetime');
const bootScreen = document.getElementById('bootScreen');
const bootText = document.getElementById('bootText');
const progressFill = document.getElementById('progressFill');
const progressPercent = document.getElementById('progressPercent');
const uptimeEl = document.getElementById('uptime');
const commandCountEl = document.getElementById('commandCount');
const glitchOverlay = document.getElementById('glitchOverlay');
const inputHint = document.getElementById('inputHint');

// ========== STATE ==========
let commandHistory = [];
let historyIndex = -1;
let commandCount = 0;
let startTime = Date.now();
let soundEnabled = true;
let currentTheme = 'green';
let bootSkipped = false;
let suggestionIndex = -1;

// Konami code tracker
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

// ========== COMMANDS ==========
const commands = {
    // Main
    help: 'Show all available commands',
    about: 'About Dev Lahrani',
    projects: 'View featured projects',
    skills: 'Technical skill matrix',
    contact: 'Contact information',
    // Links
    github: 'Open GitHub profile',
    linkedin: 'Open LinkedIn profile',
    email: 'Copy email to clipboard',
    instagram: 'Open Instagram',
    // Fun
    neofetch: 'System information',
    matrix: 'Enter the matrix',
    hack: 'Hacking simulation',
    whoami: 'Who are you?',
    fortune: 'Random hacker quote',
    weather: 'Current conditions',
    // Utils
    clear: 'Clear terminal',
    history: 'Command history',
    theme: 'Change color theme',
    sound: 'Toggle sound effects',
    date: 'Current date/time',
    uptime: 'Session uptime',
    // System
    ls: 'List directory',
    pwd: 'Print working directory',
    cat: 'Read a file',
    sudo: 'Superuser mode',
    exit: 'Exit terminal'
};

// ========== DATA ==========
const data = {
    about: `
<span class="section-title">╔══════════════════════════════════════════════════════════════╗</span>
<span class="section-title">║              DEV LAHRANI - CYBERSECURITY SPECIALIST          ║</span>
<span class="section-title">╚══════════════════════════════════════════════════════════════╝</span>

📍 <span class="tag">Pune, India</span>  🎓 <span class="tag">VIT Pune</span>  🔒 <span class="tag">2nd Year CS</span>

<span class="section-title">💭 PHILOSOPHY</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"THE GRIND IS ETERNAL 💪"

Inspired by legends like <span class="cmd">Kevin Mitnick</span> & <span class="cmd">Edward Snowden</span>.
Cybersecurity = deep understanding + relentless pursuit of mastery.

<span class="section-title">🎯 SPECIALIZATIONS</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✓ Ethical Hacking & Penetration Testing
  ✓ Digital Forensics & Cyber Investigation
  ✓ Network Security & Protocol Analysis
  ✓ Cryptographic Systems & Threshold Crypto
  ✓ Systems Programming (Rust 🦀, C++, Go)
  ✓ IoT Security & Embedded Systems

<span class="section-title">🌊 OUTSIDE THE CODE</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🏊 Swimming (best debugger ever)
  📚 Webnovels & MTL (100+ conquered!)
  ⚙️ N8N Automation workflows
  🎯 Time-blocking for deep work`,

    projects: `
<span class="section-title">╔══════════════════════════════════════════════════════════════╗</span>
<span class="section-title">║                   FEATURED PROJECTS (7)                      ║</span>
<span class="section-title">╚══════════════════════════════════════════════════════════════╝</span>

<span class="section-title">🔥 [1] HVAC HEALTH MONITOR</span>
    <span class="tag">IoT</span> <span class="tag">ML</span> <span class="tag">Python</span>
    Predictive maintenance • Anomaly detection (RF/LSTM)

<span class="section-title">👶 [2] SMART INFANT CARE SYSTEM</span>
    <span class="tag">AI/ML</span> <span class="tag">React</span> <span class="tag">IoT</span> <span class="tag">Cloud</span>
    Vital signs tracking • Cry analysis • Wellness scoring

<span class="section-title">🔍 [3] PY-PORT-CHECKER</span>
    <span class="tag">Python</span> <span class="tag">Network Security</span>
    Port scanning & management • <a class="link" href="https://github.com/Dev-Lahrani/py-port-checker" target="_blank">View on GitHub →</a>

<span class="section-title">🔐 [4] THRESHOLD CRYPTOGRAPHY EDITOR</span>
    <span class="tag">Cryptography</span> <span class="tag">Node.js</span> <span class="tag">WebSockets</span>
    Secure collaborative editing • Distributed trust

<span class="section-title">🌍 [5] LIVE DISASTER TRACKER</span>
    <span class="tag">JavaScript</span> <span class="tag">Leaflet</span> <span class="tag">APIs</span>
    Real-time disaster alerts • Interactive map

<span class="section-title">📷 [6] ESP32 IoT SUITE</span>
    <span class="tag">C++</span> <span class="tag">Arduino</span> <span class="tag">Embedded</span>
    ESP32-CAM motion detection • Wi-Fi file server

<span class="section-title">📰 [7] NEWS WEB SCRAPER</span>
    <span class="tag">Python</span> <span class="tag">BeautifulSoup</span> <span class="tag">Selenium</span>
    Automated news aggregation • Threat intelligence

<span class="hint">💡 Type <span class="cmd" onclick="runCommand('github')">github</span> to view all repositories</span>`,

    skills: `
<span class="section-title">╔══════════════════════════════════════════════════════════════╗</span>
<span class="section-title">║                   TECHNICAL SKILL MATRIX                     ║</span>
<span class="section-title">╚══════════════════════════════════════════════════════════════╝</span>

<span class="section-title">🦀 SYSTEMS PROGRAMMING</span>
<span class="tag">Rust</span> <span class="tag">C++</span> <span class="tag">C</span> <span class="tag">Go</span>
Memory safety • Performance • Low-level security

<span class="section-title">🐍 SCRIPTING & AUTOMATION</span>
<span class="tag">Python</span> <span class="tag">JavaScript</span> <span class="tag">Bash</span> <span class="tag">TypeScript</span>

<span class="section-title">🔐 SECURITY TOOLS</span>
<span class="tag">Kali Linux</span> <span class="tag">Wireshark</span> <span class="tag">Nmap</span> <span class="tag">Metasploit</span>
<span class="tag">Burp Suite</span> <span class="tag">GDB</span> <span class="tag">Ghidra</span> <span class="tag">Forensics</span>

<span class="section-title">💻 WEB & FRAMEWORKS</span>
<span class="tag">React</span> <span class="tag">Node.js</span> <span class="tag">WebSockets</span> <span class="tag">REST APIs</span>

<span class="section-title">📊 DATA & ML</span>
<span class="tag">TensorFlow</span> <span class="tag">Scikit-Learn</span> <span class="tag">LSTM</span> <span class="tag">Random Forest</span>

<span class="section-title">🔧 INFRASTRUCTURE</span>
<span class="tag">Docker</span> <span class="tag">Git</span> <span class="tag">Linux</span> <span class="tag">Valgrind</span> <span class="tag">N8N</span>

<span class="section-title">📈 PROFICIENCY</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Python         <span class="progress-bar">█████████░</span> 90%
Cybersecurity  <span class="progress-bar">████████░░</span> 85%
C++            <span class="progress-bar">████████░░</span> 80%
Cryptography   <span class="progress-bar">████████░░</span> 80%
Network Sec    <span class="progress-bar">███████░░░</span> 75%
Rust           <span class="progress-bar">████░░░░░░</span> 40%
Go             <span class="progress-bar">█████░░░░░</span> 50%`,

    contact: `
<span class="section-title">╔══════════════════════════════════════════════════════════════╗</span>
<span class="section-title">║                       GET IN TOUCH                           ║</span>
<span class="section-title">╚══════════════════════════════════════════════════════════════╝</span>

📧 <span class="section-title">EMAIL</span>
   <span class="cmd" onclick="copyEmail()">devlahrani10@gmail.com</span> <span class="hint">(click to copy)</span>

👨‍💻 <span class="section-title">GITHUB</span>
   <a class="link" href="https://github.com/Dev-Lahrani" target="_blank">github.com/Dev-Lahrani</a>

💼 <span class="section-title">LINKEDIN</span>
   <a class="link" href="https://in.linkedin.com/in/dev-lahrani-788520358" target="_blank">linkedin.com/in/dev-lahrani</a>

📱 <span class="section-title">INSTAGRAM</span>
   <a class="link" href="https://instagram.com/dev.lahrani" target="_blank">@dev.lahrani</a>

<span class="section-title">💬 OPEN TO</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  • Security discussions & collaboration
  • Internship opportunities
  • Open-source contributions
  • Bug bounty partnerships`,

    help: `
<span class="section-title">╔══════════════════════════════════════════════════════════════╗</span>
<span class="section-title">║                    TERMINAL COMMANDS                         ║</span>
<span class="section-title">╚══════════════════════════════════════════════════════════════╝</span>

<span class="section-title">📋 MAIN</span>
  <span class="cmd" onclick="runCommand('about')">about</span>      About Dev Lahrani
  <span class="cmd" onclick="runCommand('projects')">projects</span>   View featured projects
  <span class="cmd" onclick="runCommand('skills')">skills</span>     Technical skill matrix
  <span class="cmd" onclick="runCommand('contact')">contact</span>    Contact information

<span class="section-title">🔗 LINKS</span>
  <span class="cmd" onclick="runCommand('github')">github</span>     Open GitHub profile
  <span class="cmd" onclick="runCommand('linkedin')">linkedin</span>   Open LinkedIn
  <span class="cmd" onclick="runCommand('email')">email</span>      Copy email to clipboard
  <span class="cmd" onclick="runCommand('instagram')">instagram</span>  Open Instagram

<span class="section-title">🎮 FUN</span>
  <span class="cmd" onclick="runCommand('neofetch')">neofetch</span>   System information
  <span class="cmd" onclick="runCommand('matrix')">matrix</span>     Enter the matrix
  <span class="cmd" onclick="runCommand('hack')">hack</span>       Hacking simulation
  <span class="cmd" onclick="runCommand('fortune')">fortune</span>    Random hacker quote
  <span class="cmd" onclick="runCommand('weather')">weather</span>    Current conditions

<span class="section-title">⚙️ UTILS</span>
  <span class="cmd" onclick="runCommand('clear')">clear</span>      Clear terminal
  <span class="cmd" onclick="runCommand('history')">history</span>    Command history
  <span class="cmd" onclick="runCommand('theme')">theme</span>      Change color theme
  <span class="cmd" onclick="runCommand('sound')">sound</span>      Toggle sound

<span class="hint">💡 Use ↑↓ for history • Tab for autocomplete • Click commands to run</span>
<span class="hint">🎮 Try the Konami Code for a secret! ↑↑↓↓←→←→BA</span>`,

    neofetch: `
<span class="success">       ████████████████</span>          <span class="cmd">dev@lahrani</span>
<span class="success">     ████████████████████</span>        ───────────────────────
<span class="success">   ██████████████████████</span>        <span class="text">OS:</span> Arch Linux x86_64
<span class="success">  ████████</span>      <span class="success">████████</span>        <span class="text">Host:</span> Terminal Portfolio v3.0
<span class="success"> ████████</span>        <span class="success">████████</span>       <span class="text">Kernel:</span> 6.1.0-security
<span class="success">████████</span>          <span class="success">████████</span>      <span class="text">Uptime:</span> THE GRIND IS ETERNAL
<span class="success">████████</span>          <span class="success">████████</span>      <span class="text">Shell:</span> zsh 5.9
<span class="success">████████</span>          <span class="success">████████</span>      <span class="text">DE:</span> Cybersecurity
<span class="success"> ████████</span>        <span class="success">████████</span>       <span class="text">WM:</span> i3-gaps
<span class="success">  ████████</span>      <span class="success">████████</span>        <span class="text">Theme:</span> Hacker [Dark]
<span class="success">   ██████████████████████</span>        <span class="text">Terminal:</span> alacritty
<span class="success">     ████████████████████</span>        <span class="text">CPU:</span> Rust 🦀 Powered
<span class="success">       ████████████████</span>          <span class="text">Memory:</span> 100+ Novels / ∞

                                  <span class="tag">█</span><span style="color:#ff5555">█</span><span style="color:#50fa7b">█</span><span style="color:#f1fa8c">█</span><span style="color:#6699ff">█</span><span style="color:#ff79c6">█</span><span style="color:#8be9fd">█</span><span style="color:#f8f8f2">█</span>`
};

const fortunes = [
    '"The quieter you become, the more you can hear." - Kali Linux',
    '"There is no patch for human stupidity." - Kevin Mitnick',
    '"Hackers are breaking systems for profit. Before, it was about curiosity." - Kevin Mitnick',
    '"Privacy is not for the passive." - Edward Snowden',
    '"The only truly secure system is one that is powered off." - Gene Spafford',
    '"Security is always excessive until it\'s not enough." - Robbie Sinclair',
    '"If you think technology can solve your security problems, you don\'t understand technology." - Bruce Schneier',
    '"THE GRIND IS ETERNAL 💪" - Dev Lahrani'
];

// ========== BOOT SEQUENCE ==========
const bootMessages = [
    'BIOS POST... OK',
    'Initializing kernel modules...',
    'Loading security framework...',
    'Mounting encrypted filesystems...',
    'Starting network services...',
    'Loading hacker toolkit...',
    'Initializing terminal interface...',
    'Welcome to DEV_OS v3.0'
];

async function runBootSequence() {
    let progress = 0;
    
    for (let i = 0; i < bootMessages.length; i++) {
        if (bootSkipped) break;
        
        bootText.textContent = bootMessages[i];
        progress = Math.min(100, ((i + 1) / bootMessages.length) * 100);
        progressFill.style.width = progress + '%';
        progressPercent.textContent = Math.round(progress) + '%';
        
        await sleep(bootSkipped ? 0 : 300 + Math.random() * 200);
    }
    
    progressFill.style.width = '100%';
    progressPercent.textContent = '100%';
    await sleep(bootSkipped ? 0 : 300);
    
    bootScreen.classList.add('hidden');
    initTerminal();
}

function skipBoot() {
    bootSkipped = true;
    bootScreen.classList.add('hidden');
    initTerminal();
}

// ========== TERMINAL INIT ==========
function initTerminal() {
    // Show welcome
    addOutput(`<div class="ascii-banner line no-animate">
<pre class="banner-text"> ██████╗ ███████╗██╗   ██╗    ██╗      █████╗ ██╗  ██╗██████╗  █████╗ ███╗   ██╗██╗
 ██╔══██╗██╔════╝██║   ██║    ██║     ██╔══██╗██║  ██║██╔══██╗██╔══██╗████╗  ██║██║
 ██║  ██║█████╗  ██║   ██║    ██║     ███████║███████║██████╔╝███████║██╔██╗ ██║██║
 ██║  ██║██╔══╝  ╚██╗ ██╔╝    ██║     ██╔══██║██╔══██║██╔══██╗██╔══██║██║╚██╗██║██║
 ██████╔╝███████╗ ╚████╔╝     ███████╗██║  ██║██║  ██║██║  ██║██║  ██║██║ ╚████║██║
 ╚═════╝ ╚══════╝  ╚═══╝      ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝</pre>
</div>`, false);
    
    addOutput('<span class="success">[✓]</span> <span class="text">Secure connection established</span>');
    addOutput('<span class="success">[✓]</span> <span class="text">Terminal ready</span>');
    addOutput('');
    addOutput('<span class="text">Welcome! Type <span class="cmd" onclick="runCommand(\'help\')">help</span> to explore available commands.</span>');
    addOutput('');
    
    input.focus();
    startTime = Date.now();
}

// ========== HELPERS ==========
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, m => map[m]);
}

function addOutput(text, animate = true) {
    const line = document.createElement('div');
    line.className = 'line' + (animate ? '' : ' no-animate');
    line.innerHTML = text;
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
}

function addCommand(cmd) {
    const line = document.createElement('div');
    line.className = 'line';
    line.innerHTML = `<span class="prompt">$</span> <span class="text">${escapeHtml(cmd)}</span>`;
    terminal.appendChild(line);
}

function updateDateTime() {
    const now = new Date();
    datetime.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function updateUptime() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    uptimeEl.textContent = `↑ ${mins}:${secs.toString().padStart(2, '0')}`;
}

function updateCommandCount() {
    commandCountEl.textContent = `${commandCount} cmds`;
}

function triggerGlitch() {
    glitchOverlay.classList.add('active');
    setTimeout(() => glitchOverlay.classList.remove('active'), 300);
}

function shakeTerminal() {
    document.querySelector('.terminal').classList.add('shake');
    setTimeout(() => document.querySelector('.terminal').classList.remove('shake'), 500);
}

// ========== COMMANDS ==========
function copyEmail() {
    navigator.clipboard.writeText('devlahrani10@gmail.com').then(() => {
        addOutput('<span class="success">✓ Email copied to clipboard!</span>');
    });
}
window.copyEmail = copyEmail;

function runCommand(cmd) {
    input.value = cmd;
    processCommand(cmd);
    input.value = '';
}
window.runCommand = runCommand;

function startMatrix() {
    addOutput('<span class="success">Entering the Matrix...</span>');
    triggerGlitch();
    
    const chars = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789ABCDEF';
    let count = 0;
    
    const interval = setInterval(() => {
        let line = '';
        for (let i = 0; i < 60; i++) {
            line += chars[Math.floor(Math.random() * chars.length)];
        }
        const opacity = 0.3 + Math.random() * 0.7;
        addOutput(`<span style="color: var(--accent); opacity: ${opacity}">${line}</span>`);
        count++;
        if (count > 12) {
            clearInterval(interval);
            addOutput('<span class="success">Wake up, Neo...</span>');
            addOutput('<span class="cmd">The Matrix has you...</span>');
        }
    }, 80);
}

function startHack() {
    triggerGlitch();
    const steps = [
        '[*] Initializing exploit framework...',
        '[*] Scanning target: 192.168.1.1',
        '[+] Port 22 (SSH) - OPEN',
        '[+] Port 80 (HTTP) - OPEN',
        '[+] Port 443 (HTTPS) - OPEN',
        '[!] Vulnerability detected: CVE-2024-XXXX',
        '[*] Attempting exploitation...',
        '[+] Shell obtained!',
        '[*] Escalating privileges...',
        '[+] ROOT ACCESS GRANTED',
        '',
        '<span class="error">⚠️ Just kidding! This is a simulation.</span>',
        '<span class="success">✓ Remember: Always hack ethically! 🔐</span>'
    ];
    
    let i = 0;
    const interval = setInterval(() => {
        if (i < steps.length) {
            const cls = steps[i].includes('[+]') ? 'success' : steps[i].includes('[!]') ? 'warning' : 'text';
            addOutput(`<span class="${cls}">${steps[i]}</span>`);
            i++;
        } else {
            clearInterval(interval);
        }
    }, 250);
}

function secretUnlocked() {
    triggerGlitch();
    addOutput('<span class="warning">🎮 KONAMI CODE ACTIVATED!</span>');
    addOutput('');
    addOutput('<span class="success">╔════════════════════════════════════════╗</span>');
    addOutput('<span class="success">║   SECRET UNLOCKED: GOD MODE ENABLED    ║</span>');
    addOutput('<span class="success">╚════════════════════════════════════════╝</span>');
    addOutput('');
    addOutput('<span class="text">You found the secret! You\'re a true hacker 🔓</span>');
    addOutput('<span class="hint">Fun fact: The Konami Code was first used in Gradius (1986)</span>');
    shakeTerminal();
}

function toggleTheme() {
    const themes = ['', 'theme-amber', 'theme-blue'];
    const themeNames = ['green', 'amber', 'blue'];
    const currentIndex = themes.indexOf(document.body.className);
    const nextIndex = (currentIndex + 1) % themes.length;
    
    document.body.className = themes[nextIndex];
    currentTheme = themeNames[nextIndex];
    addOutput(`<span class="success">✓ Theme changed to ${currentTheme}</span>`);
}
window.toggleTheme = toggleTheme;

function toggleSound() {
    soundEnabled = !soundEnabled;
    const toggle = document.getElementById('soundToggle');
    toggle.textContent = soundEnabled ? '🔊' : '🔇';
    toggle.classList.toggle('muted', !soundEnabled);
}
window.toggleSound = toggleSound;

// ========== PROCESS COMMAND ==========
function processCommand(cmd) {
    const rawCmd = cmd.trim();
    const command = rawCmd.toLowerCase();
    
    if (!command) return;
    
    // History
    if (commandHistory[commandHistory.length - 1] !== rawCmd) {
        commandHistory.push(rawCmd);
    }
    historyIndex = commandHistory.length;
    
    // Count
    commandCount++;
    updateCommandCount();
    
    // Echo
    addCommand(rawCmd);
    
    // Process
    switch (command) {
        case 'help':
        case '?':
            addOutput(data.help);
            break;
            
        case 'about':
        case 'whoami':
            addOutput(data.about);
            break;
            
        case 'projects':
            addOutput(data.projects);
            break;
            
        case 'skills':
            addOutput(data.skills);
            break;
            
        case 'contact':
            addOutput(data.contact);
            break;
            
        case 'github':
        case 'gh':
            addOutput('<span class="success">Opening GitHub...</span>');
            setTimeout(() => window.open('https://github.com/Dev-Lahrani', '_blank'), 400);
            break;
            
        case 'linkedin':
        case 'li':
            addOutput('<span class="success">Opening LinkedIn...</span>');
            setTimeout(() => window.open('https://in.linkedin.com/in/dev-lahrani-788520358', '_blank'), 400);
            break;
            
        case 'instagram':
        case 'ig':
            addOutput('<span class="success">Opening Instagram...</span>');
            setTimeout(() => window.open('https://instagram.com/dev.lahrani', '_blank'), 400);
            break;
            
        case 'email':
            copyEmail();
            break;
            
        case 'clear':
        case 'cls':
            terminal.innerHTML = '';
            addOutput('<span class="success">Terminal cleared.</span>');
            break;
            
        case 'neofetch':
            addOutput(data.neofetch);
            break;
            
        case 'matrix':
            startMatrix();
            break;
            
        case 'hack':
        case 'hax':
            startHack();
            break;
            
        case 'fortune':
            const quote = fortunes[Math.floor(Math.random() * fortunes.length)];
            addOutput(`<span class="text">${quote}</span>`);
            break;
            
        case 'weather':
            addOutput('<span class="section-title">☁️ CURRENT CONDITIONS</span>');
            addOutput('<span class="text">Location: Pune, India</span>');
            addOutput('<span class="text">Status: Coding weather ☔💻</span>');
            addOutput('<span class="text">Temp: Perfect for hacking</span>');
            addOutput('<span class="hint">THE GRIND IS ETERNAL 💪</span>');
            break;
            
        case 'history':
            if (commandHistory.length === 0) {
                addOutput('<span class="text">No commands in history</span>');
            } else {
                addOutput('<span class="section-title">Command History</span>');
                commandHistory.forEach((cmd, i) => {
                    addOutput(`<span class="text">${(i + 1).toString().padStart(3)}  ${escapeHtml(cmd)}</span>`);
                });
            }
            break;
            
        case 'theme':
            toggleTheme();
            break;
            
        case 'sound':
            toggleSound();
            addOutput(`<span class="success">Sound ${soundEnabled ? 'enabled' : 'disabled'}</span>`);
            break;
            
        case 'date':
            addOutput(`<span class="success">${new Date().toString()}</span>`);
            break;
            
        case 'uptime':
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            const mins = Math.floor(elapsed / 60);
            const secs = elapsed % 60;
            addOutput(`<span class="success">Session uptime: ${mins}m ${secs}s</span>`);
            addOutput(`<span class="text">Commands executed: ${commandCount}</span>`);
            break;
            
        case 'ls':
        case 'dir':
            addOutput('drwxr-xr-x  about/');
            addOutput('drwxr-xr-x  projects/');
            addOutput('-rw-r--r--  skills.txt');
            addOutput('-rw-r--r--  contact.txt');
            addOutput('drwx------  .secrets/');
            break;
            
        case 'pwd':
            addOutput('/home/dev-lahrani/portfolio');
            break;
            
        case 'cat .secrets':
        case 'cat secrets':
        case 'cat .secrets/':
            shakeTerminal();
            addOutput('<span class="error">Permission denied: Nice try, hacker! 🔐</span>');
            break;
            
        case 'sudo':
        case 'sudo su':
        case 'sudo -i':
            shakeTerminal();
            addOutput('<span class="error">Nice try! But you don\'t have sudo privileges here. 😏</span>');
            addOutput('<span class="hint">Type <span class="cmd">help</span> to see what you CAN do.</span>');
            break;
            
        case 'exit':
        case 'quit':
            addOutput('<span class="text">Thanks for visiting! 👋</span>');
            addOutput('<span class="success">THE GRIND IS ETERNAL 💪</span>');
            break;
            
        case 'rm -rf /':
        case 'rm -rf /*':
            shakeTerminal();
            triggerGlitch();
            addOutput('<span class="error">🚨 SYSTEM DESTRUCTION PREVENTED 🚨</span>');
            addOutput('<span class="hint">Nice try! This terminal is hacker-proof. 😎</span>');
            break;
            
        case 'uname':
        case 'uname -a':
            addOutput('Linux dev-lahrani 6.1.0-security #1 SMP x86_64 GNU/Linux');
            break;
            
        // ========== EASTER EGGS & GAMES ==========
        case 'snake':
            startSnakeGame();
            break;
            
        case 'pong':
            startPongGame();
            break;
            
        case 'tictactoe':
        case 'ttt':
            startTicTacToe();
            break;
            
        case 'rps':
        case 'rockpaperscissors':
            startRPS();
            break;
            
        case 'guess':
        case 'guessnumber':
            startGuessNumber();
            break;
            
        case 'dice':
            rollDice();
            break;
            
        case 'coinflip':
        case 'flip':
            flipCoin();
            break;
            
        case '8ball':
        case 'magic8ball':
            magic8Ball();
            break;
            
        case 'joke':
            tellJoke();
            break;
            
        case 'ascii':
        case 'asciiart':
            showRandomAscii();
            break;
            
        case 'cmatrix':
            startCMatrix();
            break;
            
        case 'rain':
            startRain();
            break;
            
        case 'fire':
            startFire();
            break;
            
        case 'cowsay':
            cowsay();
            break;
            
        case 'sl':
            trainAnimation();
            break;
            
        case 'rickroll':
        case 'rick':
            rickRoll();
            break;
            
        case 'coffee':
        case 'brew':
            brewCoffee();
            break;
            
        case 'lolcat':
        case 'rainbow':
            rainbowText();
            break;
            
        case 'ping':
            fakePing();
            break;
            
        case 'traceroute':
            fakeTraceroute();
            break;
            
        case 'whoami':
            addOutput('<span class="success">dev-lahrani</span>');
            addOutput('<span class="text">uid=1337(hacker) gid=31337(elite) groups=31337(elite),27(sudo)</span>');
            break;
            
        case 'cat /etc/passwd':
            addOutput('root:x:0:0:root:/root:/bin/bash');
            addOutput('dev-lahrani:x:1337:31337:THE GRIND IS ETERNAL:/home/dev-lahrani:/bin/zsh');
            addOutput('guest:x:65534:65534:Guest:/tmp:/bin/false');
            break;
            
        case 'vim':
        case 'vi':
            addOutput('<span class="warning">vim: Entering vim... Good luck exiting! 😈</span>');
            addOutput('<span class="hint">Just kidding. Type :q! and pray.</span>');
            break;
            
        case 'nano':
            addOutput('<span class="success">nano: The sensible choice. 👍</span>');
            break;
            
        case 'emacs':
            addOutput('<span class="error">emacs: Great OS, terrible text editor.</span>');
            break;
            
        case 'apt install girlfriend':
        case 'apt-get install girlfriend':
            addOutput('<span class="error">E: Package "girlfriend" has no installation candidate</span>');
            addOutput('<span class="hint">Try focusing on THE GRIND instead 💪</span>');
            break;
            
        case 'make sandwich':
            addOutput('<span class="error">What? Make it yourself.</span>');
            break;
            
        case 'sudo make sandwich':
            addOutput('<span class="success">Okay. 🥪</span>');
            break;
            
        case 'hello':
        case 'hi':
        case 'hey':
            addOutput('<span class="success">Hello there! 👋</span>');
            addOutput('<span class="text">Nice to meet you, fellow hacker!</span>');
            break;
            
        case 'thanks':
        case 'thank you':
        case 'thx':
            addOutput('<span class="success">You\'re welcome! 😊</span>');
            addOutput('<span class="hint">THE GRIND IS ETERNAL 💪</span>');
            break;
            
        case 'please':
            addOutput('<span class="success">Since you asked nicely... type <span class="cmd">help</span> 😊</span>');
            break;
            
        case 'leet':
        case '1337':
            addOutput('<span class="success">Y0U 4R3 1337 H4X0R! 🔥</span>');
            triggerGlitch();
            break;
            
        case 'glitch':
            triggerGlitch();
            addOutput('<span class="warning">G̷L̷I̷T̷C̷H̷ ̷A̷C̷T̷I̷V̷A̷T̷E̷D̷</span>');
            break;
            
        case 'credits':
            showCredits();
            break;
            
        case 'version':
        case 'ver':
            addOutput('<span class="section-title">Terminal Portfolio v3.0</span>');
            addOutput('<span class="text">Built with ❤️ by Dev Lahrani</span>');
            addOutput('<span class="hint">Pure HTML, CSS, JavaScript - No frameworks!</span>');
            break;
            
        case 'time':
            const now = new Date();
            addOutput(`<span class="success">${now.toLocaleTimeString()}</span>`);
            break;
            
        case 'banner':
            showBanner();
            break;
            
        case 'party':
            startParty();
            break;
            
        case 'motivate':
        case 'motivation':
            showMotivation();
            break;
            
        case 'crypto':
            showCryptoQuote();
            break;
            
        case 'binary':
            showBinary();
            break;
            
        case 'hexdump':
            showHexdump();
            break;
            
        case 'color':
        case 'colors':
            showColors();
            break;
            
        case 'typing':
        case 'typetest':
            typingTest();
            break;
            
        case 'reaction':
            reactionTest();
            break;
            
        case 'memory':
            memoryGame();
            break;
            
        case 'trivia':
            techTrivia();
            break;
            
        case 'encrypt':
            encryptDemo();
            break;
            
        case 'decode':
            decodeDemo();
            break;
            
        case 'whois dev':
        case 'whois':
            whoisDev();
            break;
            
        case 'nmap':
            fakeNmap();
            break;
            
        case 'ssh':
            fakeSSH();
            break;
            
        case 'cal':
        case 'calendar':
            showCalendar();
            break;
            
        case 'countdown':
            startCountdown();
            break;
            
        case 'clock':
            showClock();
            break;

        case 'b3':
            ultraSecret();
            break;
            
        default:
            shakeTerminal();
            addOutput(`<span class="error">Command not found:</span> <span class="cmd">${escapeHtml(command)}</span>`);
            addOutput('<span class="hint">Type <span class="cmd" onclick="runCommand(\'help\')">help</span> for available commands.</span>');
    }
    
    terminal.scrollTop = terminal.scrollHeight;
    hideSuggestions();
}

// ========== EASTER EGG GAMES ==========

// Snake Game (Text-based)
let snakeGame = null;
function startSnakeGame() {
    addOutput('<span class="section-title">🐍 SNAKE GAME</span>');
    addOutput('<span class="text">Use W/A/S/D to move. Press Q to quit.</span>');
    addOutput('<span class="hint">Eat the @ symbols to grow!</span>');
    
    const width = 20, height = 10;
    let snake = [{x: 10, y: 5}];
    let food = {x: 15, y: 5};
    let direction = {x: 1, y: 0};
    let score = 0;
    let gameOver = false;
    
    function draw() {
        let grid = '';
        for (let y = 0; y < height; y++) {
            let row = '';
            for (let x = 0; x < width; x++) {
                if (snake.some(s => s.x === x && s.y === y)) {
                    row += snake[0].x === x && snake[0].y === y ? '█' : '▓';
                } else if (food.x === x && food.y === y) {
                    row += '@';
                } else {
                    row += '·';
                }
            }
            grid += row + '\n';
        }
        return grid;
    }
    
    const gameDiv = document.createElement('div');
    gameDiv.id = 'snakeGame';
    gameDiv.innerHTML = `<pre class="success">${draw()}</pre><span class="text">Score: ${score}</span>`;
    terminal.appendChild(gameDiv);
    
    function update() {
        const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
        
        if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height || 
            snake.some(s => s.x === head.x && s.y === head.y)) {
            gameOver = true;
            addOutput(`<span class="error">Game Over! Final Score: ${score}</span>`);
            document.removeEventListener('keydown', handleKey);
            return;
        }
        
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            score += 10;
            food = {x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height)};
        } else {
            snake.pop();
        }
        
        gameDiv.innerHTML = `<pre class="success">${draw()}</pre><span class="text">Score: ${score}</span>`;
    }
    
    function handleKey(e) {
        if (gameOver) return;
        const key = e.key.toLowerCase();
        if (key === 'w' && direction.y !== 1) direction = {x: 0, y: -1};
        if (key === 's' && direction.y !== -1) direction = {x: 0, y: 1};
        if (key === 'a' && direction.x !== 1) direction = {x: -1, y: 0};
        if (key === 'd' && direction.x !== -1) direction = {x: 1, y: 0};
        if (key === 'q') {
            gameOver = true;
            clearInterval(snakeGame);
            addOutput('<span class="warning">Snake game ended.</span>');
            document.removeEventListener('keydown', handleKey);
        }
        e.preventDefault();
    }
    
    document.addEventListener('keydown', handleKey);
    snakeGame = setInterval(() => { if (!gameOver) update(); }, 200);
}

// Pong Game
function startPongGame() {
    addOutput('<span class="section-title">🏓 PONG</span>');
    addOutput('<span class="text">Use W/S to move paddle. First to 5 wins!</span>');
    
    let playerY = 4, aiY = 4, ballX = 15, ballY = 4;
    let ballDX = -1, ballDY = 0.5;
    let playerScore = 0, aiScore = 0;
    const width = 30, height = 9;
    let gameRunning = true;
    
    function draw() {
        let grid = '';
        for (let y = 0; y < height; y++) {
            let row = '';
            for (let x = 0; x < width; x++) {
                if (x === 1 && Math.abs(y - playerY) <= 1) row += '█';
                else if (x === width - 2 && Math.abs(y - aiY) <= 1) row += '█';
                else if (Math.round(ballX) === x && Math.round(ballY) === y) row += 'O';
                else if (x === 0 || x === width - 1) row += '│';
                else if (y === 0 || y === height - 1) row += '─';
                else row += ' ';
            }
            grid += row + '\n';
        }
        return grid;
    }
    
    const gameDiv = document.createElement('div');
    gameDiv.id = 'pongGame';
    gameDiv.innerHTML = `<pre class="success">${draw()}</pre><span class="text">You: ${playerScore} | AI: ${aiScore}</span>`;
    terminal.appendChild(gameDiv);
    
    function handleKey(e) {
        if (!gameRunning) return;
        if (e.key.toLowerCase() === 'w' && playerY > 1) playerY--;
        if (e.key.toLowerCase() === 's' && playerY < height - 2) playerY++;
        if (e.key.toLowerCase() === 'q') {
            gameRunning = false;
            addOutput('<span class="warning">Pong ended.</span>');
        }
        e.preventDefault();
    }
    
    document.addEventListener('keydown', handleKey);
    
    const pongInterval = setInterval(() => {
        if (!gameRunning) { clearInterval(pongInterval); return; }
        
        ballX += ballDX; ballY += ballDY;
        if (ballY <= 0 || ballY >= height - 1) ballDY *= -1;
        
        // AI movement
        if (aiY < ballY && aiY < height - 2) aiY += 0.5;
        if (aiY > ballY && aiY > 1) aiY -= 0.5;
        
        // Paddle collision
        if (ballX <= 2 && Math.abs(ballY - playerY) <= 1) { ballDX = 1; ballDY = (ballY - playerY) * 0.5; }
        if (ballX >= width - 3 && Math.abs(ballY - aiY) <= 1) { ballDX = -1; ballDY = (ballY - aiY) * 0.5; }
        
        // Scoring
        if (ballX <= 0) { aiScore++; ballX = 15; ballY = 4; ballDX = -1; }
        if (ballX >= width - 1) { playerScore++; ballX = 15; ballY = 4; ballDX = 1; }
        
        gameDiv.innerHTML = `<pre class="success">${draw()}</pre><span class="text">You: ${playerScore} | AI: ${aiScore}</span>`;
        
        if (playerScore >= 5 || aiScore >= 5) {
            gameRunning = false;
            clearInterval(pongInterval);
            addOutput(playerScore >= 5 ? '<span class="success">🎉 YOU WIN!</span>' : '<span class="error">AI wins! Try again.</span>');
            document.removeEventListener('keydown', handleKey);
        }
    }, 100);
}

// Tic Tac Toe
let tttBoard = null;
function startTicTacToe() {
    addOutput('<span class="section-title">⭕ TIC TAC TOE</span>');
    addOutput('<span class="text">Enter position 1-9 to place X</span>');
    
    tttBoard = Array(9).fill(' ');
    
    function draw() {
        return `
 ${tttBoard[0]} │ ${tttBoard[1]} │ ${tttBoard[2]}    1 │ 2 │ 3
───┼───┼───    ───┼───┼───
 ${tttBoard[3]} │ ${tttBoard[4]} │ ${tttBoard[5]}    4 │ 5 │ 6
───┼───┼───    ───┼───┼───
 ${tttBoard[6]} │ ${tttBoard[7]} │ ${tttBoard[8]}    7 │ 8 │ 9`;
    }
    
    addOutput(`<pre class="text">${draw()}</pre>`);
    addOutput('<span class="hint">Type a number 1-9 to place your X</span>');
}

// Rock Paper Scissors
function startRPS() {
    const choices = ['rock', 'paper', 'scissors'];
    const emojis = {rock: '🪨', paper: '📄', scissors: '✂️'};
    const playerChoice = choices[Math.floor(Math.random() * 3)];
    const cpuChoice = choices[Math.floor(Math.random() * 3)];
    
    addOutput('<span class="section-title">🎮 ROCK PAPER SCISSORS</span>');
    addOutput(`<span class="text">You chose: ${emojis[playerChoice]} ${playerChoice}</span>`);
    addOutput(`<span class="text">CPU chose: ${emojis[cpuChoice]} ${cpuChoice}</span>`);
    
    if (playerChoice === cpuChoice) {
        addOutput('<span class="warning">It\'s a tie! 🤝</span>');
    } else if ((playerChoice === 'rock' && cpuChoice === 'scissors') ||
               (playerChoice === 'paper' && cpuChoice === 'rock') ||
               (playerChoice === 'scissors' && cpuChoice === 'paper')) {
        addOutput('<span class="success">You win! 🎉</span>');
    } else {
        addOutput('<span class="error">You lose! 😢</span>');
    }
}

// Guess the Number
let guessNumber = null;
function startGuessNumber() {
    guessNumber = Math.floor(Math.random() * 100) + 1;
    addOutput('<span class="section-title">🔢 GUESS THE NUMBER</span>');
    addOutput('<span class="text">I\'m thinking of a number between 1-100</span>');
    addOutput('<span class="hint">Type a number to guess!</span>');
}

// Dice Roll
function rollDice() {
    const dice = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    const roll1 = Math.floor(Math.random() * 6);
    const roll2 = Math.floor(Math.random() * 6);
    addOutput('<span class="section-title">🎲 DICE ROLL</span>');
    addOutput(`<span class="success" style="font-size: 2em">${dice[roll1]} ${dice[roll2]}</span>`);
    addOutput(`<span class="text">You rolled: ${roll1 + 1} + ${roll2 + 1} = ${roll1 + roll2 + 2}</span>`);
}

// Coin Flip
function flipCoin() {
    const result = Math.random() < 0.5 ? 'HEADS' : 'TAILS';
    addOutput('<span class="section-title">🪙 COIN FLIP</span>');
    addOutput('<span class="text">Flipping...</span>');
    setTimeout(() => {
        addOutput(`<span class="success" style="font-size: 1.5em">${result === 'HEADS' ? '👑' : '🦅'} ${result}!</span>`);
    }, 500);
}

// Magic 8 Ball
function magic8Ball() {
    const responses = [
        'It is certain 🎯', 'Without a doubt ✨', 'Yes definitely 👍',
        'Reply hazy, try again 🌫️', 'Ask again later ⏳', 'Cannot predict now 🔮',
        'Don\'t count on it 👎', 'My sources say no 🚫', 'Outlook not so good 😬',
        'Very doubtful 🤔', 'Signs point to yes ➡️', 'THE GRIND IS ETERNAL 💪'
    ];
    addOutput('<span class="section-title">🎱 MAGIC 8-BALL</span>');
    addOutput(`<span class="success">${responses[Math.floor(Math.random() * responses.length)]}</span>`);
}

// Jokes
function tellJoke() {
    const jokes = [
        { q: 'Why do programmers prefer dark mode?', a: 'Because light attracts bugs! 🐛' },
        { q: 'Why did the developer go broke?', a: 'Because he used up all his cache! 💰' },
        { q: 'How many programmers does it take to change a light bulb?', a: 'None, that\'s a hardware problem! 💡' },
        { q: 'Why do Java developers wear glasses?', a: 'Because they don\'t C#! 👓' },
        { q: 'What\'s a hacker\'s favorite season?', a: 'Phishing season! 🎣' },
        { q: 'Why was the JavaScript developer sad?', a: 'Because he didn\'t Node how to Express himself! 😢' },
        { q: '!false', a: 'It\'s funny because it\'s true! 😂' }
    ];
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    addOutput('<span class="section-title">😂 JOKE</span>');
    addOutput(`<span class="text">${joke.q}</span>`);
    setTimeout(() => addOutput(`<span class="success">${joke.a}</span>`), 1500);
}

// ASCII Art
function showRandomAscii() {
    const arts = [
        `    /\\_/\\  
   ( o.o ) 
    > ^ <`,
        `  ╔═╗╔═╗╔╦╗╔═╗
  ║  ║ ║ ║║║╣ 
  ╚═╝╚═╝═╩╝╚═╝`,
        `   ┌─┐
   │ │
  ─┴─┴─`,
        `  (•_•)
  <)   )╯
   /    \\`,
        `   ___
  |   |
  | O |
  |___|`
    ];
    addOutput('<span class="section-title">🎨 ASCII ART</span>');
    addOutput(`<pre class="success">${arts[Math.floor(Math.random() * arts.length)]}</pre>`);
}

// CMatrix (More intense matrix)
function startCMatrix() {
    addOutput('<span class="success">Starting cmatrix...</span>');
    triggerGlitch();
    const chars = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789ZXCVBNM';
    let count = 0;
    const interval = setInterval(() => {
        let line = '';
        for (let i = 0; i < 50; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const bright = Math.random() > 0.7;
            line += bright ? `<span style="color: #fff">${char}</span>` : char;
        }
        addOutput(`<span style="color: var(--accent)">${line}</span>`);
        if (++count > 20) { clearInterval(interval); addOutput('<span class="hint">Press Ctrl+C to exit... just kidding!</span>'); }
    }, 50);
}

// Rain Animation
function startRain() {
    addOutput('<span class="section-title">🌧️ RAIN</span>');
    let count = 0;
    const interval = setInterval(() => {
        let line = '';
        for (let i = 0; i < 40; i++) {
            line += Math.random() > 0.85 ? '│' : ' ';
        }
        addOutput(`<span style="color: #6699ff">${line}</span>`);
        if (++count > 10) { clearInterval(interval); addOutput('<span class="hint">☔ Stay dry!</span>'); }
    }, 100);
}

// Fire Animation
function startFire() {
    addOutput('<span class="section-title">🔥 FIRE</span>');
    const fireChars = ' .,:;+*?%S#@';
    let count = 0;
    const interval = setInterval(() => {
        let line = '';
        for (let i = 0; i < 40; i++) {
            const intensity = Math.random();
            const char = fireChars[Math.floor(intensity * fireChars.length)];
            const color = intensity > 0.7 ? '#ff0' : intensity > 0.4 ? '#f80' : '#f00';
            line += `<span style="color:${color}">${char}</span>`;
        }
        addOutput(line);
        if (++count > 8) { clearInterval(interval); }
    }, 100);
}

// Cowsay
function cowsay() {
    const messages = ['THE GRIND IS ETERNAL!', 'Moo! I mean... Code!', 'Hello, hacker!', 'Security is important!'];
    const msg = messages[Math.floor(Math.random() * messages.length)];
    const border = '─'.repeat(msg.length + 2);
    addOutput(`<pre class="success">
 ┌${border}┐
 │ ${msg} │
 └${border}┘
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||</pre>`);
}

// Train Animation (sl command easter egg)
function trainAnimation() {
    addOutput('<span class="hint">🚂 Choo choo!</span>');
    const train = [
        '      ====        ________',
        '  _D _|  |_______/        \\__I_I_____===__|_',
        '   |(_)---  |   H\\________/ |   |        =|_',
        '   /     |  |   H  |  |     |   |         ||',
        '  |      |  |   H  |__--------------------| [_',
        '  | ________|___H__/__|_____/[][]~\\_______|  |',
        '  |/ |   |-----------I_____I [][] []  D   |=|',
    ];
    train.forEach((line, i) => {
        setTimeout(() => addOutput(`<span class="text">${line}</span>`), i * 100);
    });
}

// Rick Roll
function rickRoll() {
    addOutput('<span class="warning">🎵 Never gonna give you up!</span>');
    addOutput('<span class="warning">🎵 Never gonna let you down!</span>');
    addOutput('<span class="warning">🎵 Never gonna run around and desert you!</span>');
    addOutput('<span class="hint">You just got Rick Rolled! 🕺</span>');
    triggerGlitch();
}

// Brew Coffee
function brewCoffee() {
    addOutput('<span class="section-title">☕ BREWING COFFEE...</span>');
    const stages = ['Grinding beans...', 'Heating water...', 'Brewing...', 'Pouring...', '☕ Coffee ready!'];
    stages.forEach((stage, i) => {
        setTimeout(() => addOutput(`<span class="${i === 4 ? 'success' : 'text'}">${stage}</span>`), i * 800);
    });
}

// Rainbow Text
function rainbowText() {
    const text = 'THE GRIND IS ETERNAL!';
    const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];
    let rainbow = '';
    for (let i = 0; i < text.length; i++) {
        rainbow += `<span style="color:${colors[i % colors.length]}">${text[i]}</span>`;
    }
    addOutput(rainbow);
}

// Fake Ping
function fakePing() {
    addOutput('<span class="text">PING github.com (140.82.112.4): 56 data bytes</span>');
    for (let i = 0; i < 4; i++) {
        const time = (10 + Math.random() * 20).toFixed(1);
        setTimeout(() => addOutput(`<span class="success">64 bytes from 140.82.112.4: icmp_seq=${i} ttl=55 time=${time} ms</span>`), i * 500);
    }
    setTimeout(() => addOutput('<span class="text">--- github.com ping statistics ---</span>'), 2500);
}

// Fake Traceroute
function fakeTraceroute() {
    const hops = [
        '1  router.local (192.168.1.1)  1.234 ms',
        '2  isp-gateway (10.0.0.1)  12.456 ms',
        '3  core-router (72.14.215.85)  25.789 ms',
        '4  github-edge (140.82.112.4)  42.123 ms'
    ];
    addOutput('<span class="text">traceroute to github.com (140.82.112.4)</span>');
    hops.forEach((hop, i) => {
        setTimeout(() => addOutput(`<span class="success">${hop}</span>`), i * 600);
    });
}

// Show Credits
function showCredits() {
    addOutput('<span class="section-title">📜 CREDITS</span>');
    addOutput('<span class="text">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>');
    addOutput('<span class="success">Created by: Dev Lahrani</span>');
    addOutput('<span class="text">Built with: HTML, CSS, JavaScript</span>');
    addOutput('<span class="text">Font: JetBrains Mono</span>');
    addOutput('<span class="text">Inspiration: Linux Terminal + Hacker Culture</span>');
    addOutput('<span class="hint">THE GRIND IS ETERNAL 💪</span>');
}

// Show Banner
function showBanner() {
    addOutput(`<pre class="success">
 ██████╗ ███████╗██╗   ██╗    ██╗      █████╗ ██╗  ██╗██████╗  █████╗ ███╗   ██╗██╗
 ██╔══██╗██╔════╝██║   ██║    ██║     ██╔══██╗██║  ██║██╔══██╗██╔══██╗████╗  ██║██║
 ██║  ██║█████╗  ██║   ██║    ██║     ███████║███████║██████╔╝███████║██╔██╗ ██║██║
 ██║  ██║██╔══╝  ╚██╗ ██╔╝    ██║     ██╔══██║██╔══██║██╔══██╗██╔══██║██║╚██╗██║██║
 ██████╔╝███████╗ ╚████╔╝     ███████╗██║  ██║██║  ██║██║  ██║██║  ██║██║ ╚████║██║
 ╚═════╝ ╚══════╝  ╚═══╝      ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝</pre>`);
}

// Party Mode
function startParty() {
    addOutput('<span class="warning">🎉 PARTY MODE ACTIVATED! 🎉</span>');
    triggerGlitch();
    const emojis = '🎉🎊🥳🪩💃🕺🎈🎁';
    let count = 0;
    const interval = setInterval(() => {
        let line = '';
        for (let i = 0; i < 30; i++) {
            line += emojis[Math.floor(Math.random() * emojis.length)];
        }
        addOutput(`<span>${line}</span>`);
        if (++count > 5) clearInterval(interval);
    }, 200);
}

// Motivation
function showMotivation() {
    const quotes = [
        '"The only way to do great work is to love what you do." - Steve Jobs',
        '"First, solve the problem. Then, write the code." - John Johnson',
        '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
        '"THE GRIND IS ETERNAL 💪" - Dev Lahrani',
        '"Simplicity is the soul of efficiency." - Austin Freeman',
        '"Make it work, make it right, make it fast." - Kent Beck'
    ];
    addOutput('<span class="section-title">💪 MOTIVATION</span>');
    addOutput(`<span class="success">${quotes[Math.floor(Math.random() * quotes.length)]}</span>`);
}

// Crypto Quote
function showCryptoQuote() {
    const quotes = [
        '"Cryptography is the ultimate form of non-violent direct action." - Julian Assange',
        '"Privacy is not something that I\'m merely entitled to, it\'s an absolute prerequisite." - Marlon Brando',
        '"The only truly secure system is one that is powered off." - Gene Spafford'
    ];
    addOutput('<span class="section-title">🔐 CRYPTO WISDOM</span>');
    addOutput(`<span class="success">${quotes[Math.floor(Math.random() * quotes.length)]}</span>`);
}

// Binary
function showBinary() {
    const text = 'THE GRIND IS ETERNAL';
    let binary = '';
    for (let char of text) {
        binary += char.charCodeAt(0).toString(2).padStart(8, '0') + ' ';
    }
    addOutput('<span class="section-title">💻 BINARY</span>');
    addOutput(`<span class="text">${text}</span>`);
    addOutput(`<span class="success">${binary}</span>`);
}

// Hexdump
function showHexdump() {
    addOutput('<span class="section-title">🔢 HEXDUMP</span>');
    for (let i = 0; i < 4; i++) {
        let hex = '';
        let ascii = '';
        for (let j = 0; j < 16; j++) {
            const val = Math.floor(Math.random() * 256);
            hex += val.toString(16).padStart(2, '0') + ' ';
            ascii += (val >= 32 && val <= 126) ? String.fromCharCode(val) : '.';
        }
        addOutput(`<span class="text">${(i * 16).toString(16).padStart(8, '0')}  ${hex} |${ascii}|</span>`);
    }
}

// Colors
function showColors() {
    addOutput('<span class="section-title">🎨 TERMINAL COLORS</span>');
    const colors = [
        ['Black', '#000'], ['Red', '#f00'], ['Green', '#0f0'], ['Yellow', '#ff0'],
        ['Blue', '#00f'], ['Magenta', '#f0f'], ['Cyan', '#0ff'], ['White', '#fff']
    ];
    colors.forEach(([name, color]) => {
        addOutput(`<span style="background:${color};color:${color === '#000' || color === '#00f' ? '#fff' : '#000'}">  ${name.padEnd(10)}  </span>`);
    });
}

// Typing Test
function typingTest() {
    addOutput('<span class="section-title">⌨️ TYPING TEST</span>');
    addOutput('<span class="text">How fast can you type "THE GRIND IS ETERNAL"?</span>');
    addOutput('<span class="hint">Start typing in the input field!</span>');
}

// Reaction Test
function reactionTest() {
    addOutput('<span class="section-title">⚡ REACTION TEST</span>');
    addOutput('<span class="text">Wait for the green light then press ENTER!</span>');
    const delay = 2000 + Math.random() * 3000;
    setTimeout(() => {
        addOutput('<span class="success" style="font-size:2em">GO! 🟢</span>');
        const startTime = Date.now();
        const handler = (e) => {
            if (e.key === 'Enter') {
                const reaction = Date.now() - startTime;
                addOutput(`<span class="success">Reaction time: ${reaction}ms</span>`);
                if (reaction < 200) addOutput('<span class="warning">SUPERHUMAN! 🦸</span>');
                else if (reaction < 300) addOutput('<span class="success">Excellent! 🎯</span>');
                else addOutput('<span class="text">Keep practicing! 💪</span>');
                document.removeEventListener('keydown', handler);
            }
        };
        document.addEventListener('keydown', handler);
    }, delay);
}

// Memory Game
function memoryGame() {
    const sequence = [];
    for (let i = 0; i < 5; i++) sequence.push(Math.floor(Math.random() * 10));
    
    addOutput('<span class="section-title">🧠 MEMORY GAME</span>');
    addOutput('<span class="text">Remember this sequence:</span>');
    addOutput(`<span class="success" style="font-size:1.5em">${sequence.join(' ')}</span>`);
    addOutput('<span class="hint">Quick! Type the numbers before you forget!</span>');
}

// Tech Trivia
function techTrivia() {
    const trivia = [
        { q: 'What year was Python first released?', a: '1991' },
        { q: 'Who created Linux?', a: 'Linus Torvalds' },
        { q: 'What does CPU stand for?', a: 'Central Processing Unit' },
        { q: 'What port does HTTPS use?', a: '443' },
        { q: 'What does SQL stand for?', a: 'Structured Query Language' }
    ];
    const item = trivia[Math.floor(Math.random() * trivia.length)];
    addOutput('<span class="section-title">🎓 TECH TRIVIA</span>');
    addOutput(`<span class="text">${item.q}</span>`);
    setTimeout(() => addOutput(`<span class="success">Answer: ${item.a}</span>`), 3000);
}

// Encrypt Demo
function encryptDemo() {
    const text = 'THE GRIND IS ETERNAL';
    let encrypted = '';
    for (let char of text) {
        encrypted += String.fromCharCode(char.charCodeAt(0) + 3);
    }
    addOutput('<span class="section-title">🔐 CAESAR CIPHER</span>');
    addOutput(`<span class="text">Original: ${text}</span>`);
    addOutput(`<span class="success">Encrypted (ROT3): ${encrypted}</span>`);
}

// Decode Demo
function decodeDemo() {
    addOutput('<span class="section-title">🔓 DECODE CHALLENGE</span>');
    addOutput('<span class="text">Decode this Base64:</span>');
    addOutput('<span class="success">VEhFIEdSSU5EIElTIEVURVJOQUw=</span>');
    setTimeout(() => addOutput('<span class="hint">Answer: THE GRIND IS ETERNAL</span>'), 3000);
}

// Whois
function whoisDev() {
    addOutput('<span class="section-title">🔍 WHOIS DEV-LAHRANI</span>');
    addOutput('<span class="text">Domain: dev-lahrani.dev</span>');
    addOutput('<span class="text">Registrant: Dev Lahrani</span>');
    addOutput('<span class="text">Organization: VIT Pune</span>');
    addOutput('<span class="text">Status: Actively Grinding 💪</span>');
    addOutput('<span class="text">Created: 2024</span>');
    addOutput('<span class="text">Expires: Never (THE GRIND IS ETERNAL)</span>');
}

// Fake Nmap
function fakeNmap() {
    addOutput('<span class="text">Starting Nmap 7.94 ( https://nmap.org )</span>');
    const ports = ['22/tcp open ssh', '80/tcp open http', '443/tcp open https', '3000/tcp open nodejs', '8080/tcp open http-proxy'];
    setTimeout(() => {
        addOutput('<span class="text">Nmap scan report for localhost (127.0.0.1)</span>');
        ports.forEach((port, i) => setTimeout(() => addOutput(`<span class="success">${port}</span>`), i * 200));
    }, 1000);
}

// Fake SSH
function fakeSSH() {
    addOutput('<span class="text">ssh: connect to host github.com port 22</span>');
    addOutput('<span class="success">PTY allocation request failed on channel 0</span>');
    addOutput('<span class="success">Hi Dev-Lahrani! You\'ve successfully authenticated! 🎉</span>');
}

// Calendar
function showCalendar() {
    const now = new Date();
    const month = now.toLocaleString('default', { month: 'long' });
    addOutput(`<span class="section-title">📅 ${month.toUpperCase()} ${now.getFullYear()}</span>`);
    addOutput('<span class="text">Su Mo Tu We Th Fr Sa</span>');
    
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    
    let calendar = '   '.repeat(firstDay);
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === now.getDate();
        calendar += isToday ? `<span class="success">[${day.toString().padStart(2)}]</span>` : day.toString().padStart(2) + ' ';
        if ((firstDay + day) % 7 === 0) { addOutput(`<span class="text">${calendar}</span>`); calendar = ''; }
    }
    if (calendar) addOutput(`<span class="text">${calendar}</span>`);
}

// Countdown
function startCountdown() {
    addOutput('<span class="section-title">⏱️ COUNTDOWN</span>');
    let count = 10;
    const interval = setInterval(() => {
        if (count > 0) {
            addOutput(`<span class="success" style="font-size:1.5em">${count}...</span>`);
            count--;
        } else {
            addOutput('<span class="warning" style="font-size:2em">🚀 LIFTOFF! 🚀</span>');
            triggerGlitch();
            clearInterval(interval);
        }
    }, 1000);
}

// Clock
function showClock() {
    addOutput('<span class="section-title">🕐 CLOCK</span>');
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour12: true });
    addOutput(`<span class="success" style="font-size:2em">${time}</span>`);
    addOutput(`<span class="text">${now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>`);
}

// Ultra Secret
function ultraSecret() {
    triggerGlitch();
    shakeTerminal();
    addOutput('<span class="warning">🔥 ULTRA SECRET UNLOCKED 🔥</span>');
    addOutput('<span class="success">You found the ultimate easter egg!</span>');
    addOutput('<span class="text">You are a true terminal explorer. 🏆</span>');
    addOutput('<span class="hint">How did you even find this? 🤔</span>');
    document.body.style.animation = 'pulse 0.5s ease 3';
}

// ========== SUGGESTIONS ==========
function showSuggestions(matches) {
    if (matches.length === 0) {
        hideSuggestions();
        return;
    }
    
    suggestions.innerHTML = matches.map((cmd, i) => 
        `<div class="suggestion-item${i === suggestionIndex ? ' active' : ''}" onclick="selectSuggestion('${cmd}')">
            <span class="cmd-name">${cmd}</span>
            <span class="cmd-desc">${commands[cmd] || ''}</span>
        </div>`
    ).join('');
    suggestions.classList.add('show');
}

function hideSuggestions() {
    suggestions.classList.remove('show');
    suggestionIndex = -1;
}

function selectSuggestion(cmd) {
    input.value = cmd;
    hideSuggestions();
    input.focus();
}
window.selectSuggestion = selectSuggestion;

// ========== EVENT LISTENERS ==========
// Boot skip
document.addEventListener('keydown', (e) => {
    if ((e.key === ' ' || e.key === 'Enter') && !bootScreen.classList.contains('hidden')) {
        e.preventDefault();
        skipBoot();
    }
    
    // Konami code
    konamiCode.push(e.key);
    if (konamiCode.length > 10) konamiCode.shift();
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        secretUnlocked();
        konamiCode = [];
    }
});

// Input handling
input.addEventListener('keydown', (e) => {
    const matches = Object.keys(commands).filter(cmd => 
        cmd.startsWith(input.value.toLowerCase()) && input.value.length > 0
    );
    
    if (e.key === 'Enter') {
        processCommand(input.value);
        input.value = '';
        hideSuggestions();
    }
    
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (suggestions.classList.contains('show') && matches.length > 0) {
            suggestionIndex = Math.max(0, suggestionIndex - 1);
            showSuggestions(matches);
        } else if (historyIndex > 0) {
            historyIndex--;
            input.value = commandHistory[historyIndex] || '';
        }
    }
    
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (suggestions.classList.contains('show') && matches.length > 0) {
            suggestionIndex = Math.min(matches.length - 1, suggestionIndex + 1);
            showSuggestions(matches);
        } else if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            input.value = commandHistory[historyIndex] || '';
        } else {
            historyIndex = commandHistory.length;
            input.value = '';
        }
    }
    
    if (e.key === 'Tab') {
        e.preventDefault();
        if (matches.length === 1) {
            input.value = matches[0];
            hideSuggestions();
        } else if (matches.length > 1) {
            if (suggestionIndex >= 0 && suggestionIndex < matches.length) {
                input.value = matches[suggestionIndex];
                hideSuggestions();
            } else {
                showSuggestions(matches);
            }
        }
    }
    
    if (e.key === 'Escape') {
        hideSuggestions();
    }
});

// Live suggestions on input
input.addEventListener('input', () => {
    const val = input.value.toLowerCase();
    if (val.length === 0) {
        hideSuggestions();
        inputHint.textContent = '';
        return;
    }
    
    const matches = Object.keys(commands).filter(cmd => cmd.startsWith(val));
    if (matches.length > 0 && matches.length <= 6) {
        showSuggestions(matches);
        inputHint.textContent = matches[0].slice(val.length);
    } else {
        hideSuggestions();
        inputHint.textContent = '';
    }
});

// Focus
document.addEventListener('click', (e) => {
    if (!e.target.closest('.status-bar') && !e.target.closest('.suggestion-item')) {
        input.focus();
    }
});

// ========== INIT ==========
updateDateTime();
setInterval(updateDateTime, 1000);
setInterval(updateUptime, 1000);

// Start boot or skip if already loaded
if (document.readyState === 'complete') {
    runBootSequence();
} else {
    window.addEventListener('load', runBootSequence);
}

// Console easter egg
console.log('%c' + `
 ██████╗ ███████╗██╗   ██╗    ██╗      █████╗ ██╗  ██╗██████╗  █████╗ ███╗   ██╗██╗
 ██╔══██╗██╔════╝██║   ██║    ██║     ██╔══██╗██║  ██║██╔══██╗██╔══██╗████╗  ██║██║
 ██║  ██║█████╗  ██║   ██║    ██║     ███████║███████║██████╔╝███████║██╔██╗ ██║██║
 ██║  ██║██╔══╝  ╚██╗ ██╔╝    ██║     ██╔══██║██╔══██║██╔══██╗██╔══██║██║╚██╗██║██║
 ██████╔╝███████╗ ╚████╔╝     ███████╗██║  ██║██║  ██║██║  ██║██║  ██║██║ ╚████║██║
 ╚═════╝ ╚══════╝  ╚═══╝      ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝
`, 'color: #00ff41; font-family: monospace; font-size: 8px;');
console.log('%cTHE GRIND IS ETERNAL 💪', 'color: #00ff41; font-size: 20px; font-weight: bold;');
console.log('%c🔐 Try the Konami Code: ↑↑↓↓←→←→BA', 'color: #ffee00; font-size: 12px;');
console.log('%c🎮 Or type "hack" in the terminal', 'color: #6699ff; font-size: 12px;');
