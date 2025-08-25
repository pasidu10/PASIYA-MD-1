const axios = require("axios")

module.exports = {
    name: "forex",
    command: ["forex", "fx"],
    description: "Check Forex rates",
    async handle(sock, chat, args) {
        try {
            let base = args[0] ? args[0].toUpperCase() : "USD"
            let target = args[1] ? args[1].toUpperCase() : "LKR" // Default Sri Lankan Rupee

            let url = `https://api.exchangerate.host/latest?base=${base}&symbols=${target}`
            let res = await axios.get(url)

            if (!res.data || !res.data.rates) {
                return sock.sendMessage(chat.key.remoteJid, { text: "❌ Could not fetch forex data." })
            }

            let rate = res.data.rates[target]

            let msg = `📊 *Forex Trading Update*  
            
💱 1 ${base} = ${rate} ${target}

⚡ Powered by PASIYA-MD Forex Bot`

            await sock.sendMessage(chat.key.remoteJid, { text: msg })
        } catch (e) {
            console.log("Forex Error:", e)
            await sock.sendMessage(chat.key.remoteJid, { text: "❌ Error fetching Forex data." })
        }
    }
}
