// in handler.js
if (m.message?.buttonsResponseMessage) {
    const buttonId = m.message.buttonsResponseMessage.selectedButtonId
    require("./commands/settings").handleButton(sock, m, buttonId)
}
if (command === "forex" || command === "fx") {
   require("./commands/forex").handle(sock, m, args)
}
