const axios = require("axios")
const cron = require("node-cron")
const settings = require("../settings.json")

// GROUP ID එක (ඔයාගේ WhatsApp Group JID එක දාන්න)
const GROUP_ID = "1203630xxxxx-123456@g.us"

async function getForex() {
    try {
        let res = await axios.get("https://api.exchangerate.host/latest?base=USD&symbols=LKR,EUR,GBP")
        let rates = res.data.rates
        return `💱 *Forex Rates (Base: USD)*  
🇱🇰 LKR: ${rates.LKR}  
🇪🇺 EUR: ${rates.EUR}  
🇬🇧 GBP: ${rates.GBP}`
    } catch (e) {
        return "❌ Forex data not available"
    }
}

async function getBinance() {
    try {
        let symbols = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "XRPUSDT", "SOLUSDT"]
        let results = []

        for (let s of symbols) {
            let res = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${s}`)
            results.push(`${s.replace("USDT", "/USDT")}: $${parseFloat(res.data.price).toFixed(2)}`)
        }

        return `📊 *Binance Market Update*  
${results.join("\n")}`
    } catch (e) {
        return "❌ Binance data not available"
    }
}

module.exports = function autoUpdates(sock) {
    // Run every 6 hours (0 0,6,12,18 * * *)
    cron.schedule("0 */6 * * *", async () => {
        try {
            if (!settings.FOREX_BOT && !settings.BINANCE_BOT) return

            let forex = settings.FOREX_BOT ? await getForex() : ""
            let binance = settings.BINANCE_BOT ? await getBinance() : ""

            let msg = `📢 *PASIYA-MD Daily Market Update*  

${forex}

${binance}

⚡ _Auto Update Every 6 Hours_`

            await sock.sendMessage(GROUP_ID, { text: msg })
        } catch (e) {
            console.log("Auto Update Error:", e)
        }
    })
}
const { getBinanceChart } = require("./chartHelper")
const cron = require("node-cron")
const axios = require("axios")
const settings = require("../settings.json")

const GROUP_ID = "1203630xxxxx-123456@g.us"

async function getForex() {
    let res = await axios.get("https://api.exchangerate.host/latest?base=USD&symbols=LKR,EUR,GBP")
    let r = res.data.rates
    return `💱 *Forex Rates (Base: USD)*  
🇱🇰 LKR: ${r.LKR}  
🇪🇺 EUR: ${r.EUR}  
🇬🇧 GBP: ${r.GBP}`
}

async function getBinance() {
    let coins = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "XRPUSDT"]
    let results = []
    for (let s of coins) {
        let res = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${s}`)
        results.push(`${s.replace("USDT", "/USDT")}: $${parseFloat(res.data.price).toFixed(2)}`)
    }
    return results.join("\n")
}

module.exports = function autoUpdates(sock) {
    // Every 6 hours
    cron.schedule("0 */6 * * *", async () => {
        try {
            let forex = settings.FOREX_BOT ? await getForex() : ""
            let binance = settings.BINANCE_BOT ? await getBinance() : ""

            let msg = `📢 *PASIYA-MD Daily Market Update*  

${forex}

📊 *Binance Market Update*  
${binance}

⚡ _Auto Update Every 6 Hours_`

            // Send text
            await sock.sendMessage(GROUP_ID, { text: msg })

            // Send BTC/USDT Chart
            if (settings.BINANCE_BOT) {
                let chartBuffer = await getBinanceChart("BTCUSDT", "1h", 24)
                if (chartBuffer) {
                    await sock.sendMessage(GROUP_ID, {
                        image: chartBuffer,
                        caption: "📈 BTC/USDT 24h Chart"
                    })
                }
            }
        } catch (e) {
            console.log("Auto Update Error:", e)
        }
    })
}
