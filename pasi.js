const sendButton = async (jid, sock) => {
  const buttons = [
    { buttonId: 'help', buttonText: { displayText: '📜 HELP' }, type: 1 },
    { buttonId: 'owner', buttonText: { displayText: '👑 OWNER' }, type: 1 },
    { buttonId: 'menu', buttonText: { displayText: '📂 MENU' }, type: 1 }
  ]

  const buttonMessage = {
    text: "🔥 Hello, I am *PASIYA-MD BOT* \nChoose an option 👇",
    footer: "© PASIYA-MD",
    buttons: buttons,
    headerType: 2
  }

  await sock.sendMessage(jid, buttonMessage)
}
