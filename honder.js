// in handler.js
if (m.message?.buttonsResponseMessage) {
    const buttonId = m.message.buttonsResponseMessage.selectedButtonId
    require("./commands/settings").handleButton(sock, m, buttonId)
}
