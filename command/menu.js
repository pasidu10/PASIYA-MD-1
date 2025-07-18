
const { ven } = require('../handler');

ven({ pattern: 'menu' }, async (m, sock) => {
  const msg = `
🌟 *PASIYA-MD MENU* 🌟

📌 .menu - Show this menu  
📌 .about - Bot info  
📌 .owner - Contact owner

⚡ Powered by Pasiya-MD Team
  `;
  await sock.sendMessage(m.key.remoteJid, { text: msg });
});
```
