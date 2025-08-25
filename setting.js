const fs = require("fs")
const settingsPath = "./settings.json"

function loadSettings() {
    return JSON.parse(fs.readFileSync(settingsPath))
}

function saveSettings(newSettings) {
    fs.writeFileSync(settingsPath, JSON.stringify(newSettings, null, 2))
}

module.exports = {
    name: "settings",
    command: ["settings", "config"],
    description: "Change bot settings inside WhatsApp",
    async handle(sock, chat) {
        const settings = loadSettings()

        const buttons = [
            { buttonId: "toggle_WELCOME", buttonText: { displayText: `WELCOME MSG : ${settings.WELCOME ? "✅ ON" : "❌ OFF"}` }, type: 1 },
            { buttonId: "toggle_AUTO_REPLY", buttonText: { displayText: `AUTO REPLY : ${settings.AUTO_REPLY ? "✅ ON" : "❌ OFF"}` }, type: 1 },
            { buttonId: "toggle_AUTO_VOICE", buttonText: { displayText: `AUTO VOICE : ${settings.AUTO_VOICE ? "✅ ON" : "❌ OFF"}` }, type: 1 },
            { buttonId: "toggle_AI_BOT", buttonText: { displayText: `AI BOT : ${settings.AI_BOT ? "✅ ON" : "❌ OFF"}` }, type: 1 },
            { buttonId: "toggle_TYPING", buttonText: { displayText: `TYPING : ${settings.TYPING ? "✅ ON" : "❌ OFF"}` }, type: 1 },
            { buttonId: "toggle_RECORDING", buttonText: { displayText: `RECORDING : ${settings.RECORDING ? "✅ ON" : "❌ OFF"}` }, type: 1 },
            { buttonId: "toggle_ONLINE", buttonText: { displayText: `ONLINE : ${settings.ONLINE ? "✅ ON" : "❌ OFF"}` }, type: 1 },
            { buttonId: "toggle_FOREX_BOT", buttonText: { displayText: `FOREX BOT : ${settings.FOREX_BOT ? "✅ ON" : "❌ OFF"}` }, type: 1 },
            { buttonId: "toggle_BINANCE_BOT", buttonText: { displayText: `BINANCE BOT : ${settings.BINANCE_BOT ? "✅ ON" : "❌ OFF"}` }, type: 1 },
            { buttonId: "toggle_AUTO_STATUS_SEEN", buttonText: { displayText: `AUTO STATUS SEEN : ${settings.AUTO_STATUS_SEEN ? "✅ ON" : "❌ OFF"}` }, type: 1 },
            { buttonId: "toggle_AUTO_STATUS_REPLY", buttonText: { displayText: `AUTO STATUS REPLY : ${settings.AUTO_STATUS_REPLY ? "✅ ON" : "❌ OFF"}` }, type: 1 },
            { buttonId: "toggle_ANTI_DELETE", buttonText: { displayText: `ANTI DELETE : ${settings.ANTI_DELETE ? "✅ ON" : "❌ OFF"}` }, type: 1 },
            { buttonId: "toggle_ONE_VIEW", buttonText: { displayText: `ONE VIEW : ${settings.ONE_VIEW ? "✅ ON" : "❌ OFF"}` }, type: 1 }
        ]

        const buttonMessage = {
            text: "⚙️ *PASIYA-MD SETTINGS* \n\nClick to toggle ON/OFF",
            footer: "© PASIYA-MD",
            buttons: buttons,
            headerType: 1
        }

        await sock.sendMessage(chat.key.remoteJid, buttonMessage)
    },

    async handleButton(sock, chat, buttonId) {
        const settings = loadSettings()

        if (buttonId.startsWith("toggle_")) {
            const key = buttonId.replace("toggle_", "")
            settings[key] = !settings[key] // toggle true/false
            saveSettings(settings)

            await sock.sendMessage(chat.key.remoteJid, {
                text: `✅ *${key}* set to *${settings[key] ? "ON" : "OFF"}*`
            })
        }
    }
}
