const axios = require("axios")

module.exports = {
    name: "binance",
    command: ["binance", "crypto", "btc", "eth", "bnb", "xrp"],
    description: "Check Binance crypto prices",
    async handle(sock, chat, args, command) {
        try {
            // If user only types .btc / .eth / .bnb / .xrp
            let symbol
            if (command === "btc") symbol = "BTCUSDT"
            else if (command === "eth") symbol = "ETHUSDT"
            else if (command === "bnb") symbol = "BNBUSDT"
            else if (command === "xrp") symbol = "XRPUSDT"
            else symbol = args[0] ? args[0].toUpperCase() : "BTCUSDT"

            let url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
            let res = await axios.get(url)

            if (!res.data || !res.data.price) {
                return sock.sendMessage(chat.key.remoteJid, { text: "❌ Could not fetch Binance data." })
            }

            let price = parseFloat(res.data.price).toFixed(2)

            let msg = `📊 *Binance Market Update*  
            
💰 Symbol: ${symbol}  
💵 Price: $${price}  

⚡ Powered by PASIYA-MD Binance Bot`

            await sock.sendMessage(chat.key.remoteJid, { text: msg })
        } catch (e) {
            console.log("Binance Error:", e)
            await sock.sendMessage(chat.key.remoteJid, { text: "❌ Error fetching Binance data." })
        }
    }
}
