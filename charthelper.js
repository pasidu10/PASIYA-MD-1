const axios = require("axios")
const { ChartJSNodeCanvas } = require("chartjs-node-canvas")

const width = 600
const height = 400
const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height })

async function getBinanceChart(symbol = "BTCUSDT", interval = "1h", limit = 24) {
    try {
        // Binance Kline Data
        let url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
        let res = await axios.get(url)

        let times = res.data.map(k => new Date(k[0]).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}))
        let prices = res.data.map(k => parseFloat(k[4])) // Close price

        // Chart Config
        const config = {
            type: "line",
            data: {
                labels: times,
                datasets: [{
                    label: `${symbol} Price`,
                    data: prices,
                    borderColor: "blue",
                    backgroundColor: "rgba(0,0,255,0.1)",
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: false,
                plugins: {
                    title: {
                        display: true,
                        text: `${symbol} Price (Last ${limit}h)`
                    }
                },
                scales: {
                    x: { ticks: { maxRotation: 90, minRotation: 45 }},
                    y: { beginAtZero: false }
                }
            }
        }

        // Generate Image Buffer
        return await chartJSNodeCanvas.renderToBuffer(config)
    } catch (e) {
        console.log("Chart Error:", e)
        return null
    }
}

module.exports = { getBinanceChart }
