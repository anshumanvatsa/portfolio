const fs = require('fs');
const path = 'src/index.css';
let content = fs.readFileSync(path, 'utf8');

// Replace CSS variables
content = content.replace(/--color-primary: #6c47ff;/g, '--color-primary: #fbbf24;');
content = content.replace(/--color-primary-container: #8b6dff;/g, '--color-primary-container: #b45309;');
content = content.replace(/--color-on-primary: #ffffff;/g, '--color-on-primary: #000000;');
content = content.replace(/--color-on-primary-container: #e8e0ff;/g, '--color-on-primary-container: #fef3c7;');
content = content.replace(/--color-secondary: #71717a;/g, '--color-secondary: #a1a1aa;');
content = content.replace(/--color-on-surface: #09090b;/g, '--color-on-surface: #f4f4f5;');
content = content.replace(/--color-on-surface-variant: #3f3f46;/g, '--color-on-surface-variant: #d4d4d8;');
content = content.replace(/--color-surface: #fafafa;/g, '--color-surface: #111111;');
content = content.replace(/--color-surface-bright: #ffffff;/g, '--color-surface-bright: #1a1a1a;');
content = content.replace(/--color-surface-dim: #d4d4d8;/g, '--color-surface-dim: #0a0a0a;');
content = content.replace(/--color-surface-container: #f4f4f5;/g, '--color-surface-container: #18181b;');
content = content.replace(/--color-surface-container-high: #e4e4e7;/g, '--color-surface-container-high: #27272a;');
content = content.replace(/--color-surface-container-low: #f9f9fb;/g, '--color-surface-container-low: #0a0a0a;');
content = content.replace(/--color-surface-container-lowest: #ffffff;/g, '--color-surface-container-lowest: #000000;');
content = content.replace(/--color-outline: #a1a1aa;/g, '--color-outline: #3f3f46;');
content = content.replace(/--color-outline-variant: #d4d4d8;/g, '--color-outline-variant: #27272a;');
content = content.replace(/--color-background: #ffffff;/g, '--color-background: #09090b;');
content = content.replace(/--color-accent: #06b6d4;/g, '--color-accent: #f59e0b;');
content = content.replace(/--color-accent2: #f59e0b;/g, '--color-accent2: #fcd34d;');

// Base html background
content = content.replace(/background: #ffffff; color: #09090b;/g, 'background: #09090b; color: #f4f4f5;');

// Hex replacements in gradients/effects
content = content.replace(/#6c47ff/g, '#fbbf24');
content = content.replace(/#a855f7/g, '#f59e0b');
content = content.replace(/#06b6d4/g, '#d97706');
content = content.replace(/#09090b/g, '#f4f4f5'); // Text to light
content = content.replace(/#ffffff/g, '#09090b'); // Backgrounds to dark
content = content.replace(/#fafafa/g, '#111111');
content = content.replace(/#f9f9fb/g, '#18181b');
content = content.replace(/#f0f0f2/g, '#27272a');
content = content.replace(/rgba\(108,71,255/g, 'rgba(251,191,36');
content = content.replace(/rgba\(168,85,247/g, 'rgba(245,158,11');
content = content.replace(/rgba\(6,182,212/g, 'rgba(217,119,6');
content = content.replace(/rgba\(0,0,0,0\.1\)/g, 'rgba(0,0,0,0.6)');
content = content.replace(/rgba\(255,255,255,0\.88\)/g, 'rgba(9,9,11,0.7)'); // Glass card
content = content.replace(/rgba\(255,255,255,0\.7\)/g, 'rgba(255,255,255,0.05)'); // Glass border
content = content.replace(/rgba\(255,255,255,0\.2\)/g, 'rgba(255,255,255,0.1)'); // Button glow overlay

fs.writeFileSync(path, content);
console.log("Successfully rewrote index.css for Option 3 (Carbon & Gold)");
