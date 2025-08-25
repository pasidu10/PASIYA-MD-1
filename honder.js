// in handler.js
if (m.message?.buttonsResponseMessage) {
    const buttonId = m.message.buttonsResponseMessage.selectedButtonId
    require("./commands/settings").handleButton(sock, m, buttonId)
}
if (command === "forex" || command === "fx") {
   require("./commands/forex").handle(sock, m, args)
}
if (command === "binance" || command === "crypto" || command === "btc" || command === "eth" || command === "bnb" || command === "xrp") {
   require("./commands/binance").handle(sock, m, args, command)
}
