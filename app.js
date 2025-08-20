{
  "name": "pasiya-md-bot",
  "description": "WhatsApp Bot - PASIYA MD",
  "logo": "",
  "keywords": ["nodejs", "bot", "whatsapp bot", "multi device", "pasiya-md"],
  "repository": "https://github.com/",
  "stack": "heroku-22",
  "env": {
    "SESSION_ID": {
      "description": "Your WhatsApp session ID",
      "value": "",
      "required": true
    },
    "PREFIX": {
      "description": "Bot command prefix",
      "value": "."
    },
    "BOT_NAME": {
      "description": "Bot display name",
      "value": "PASIYA MD"
    },
    "MODE": {
      "description": "Bot mode (public/private)",
      "value": "public"
    },
    "LINK_WHITELIST": {
      "description": "Comma separated whitelist domains",
      "value": "youtube.com,github.com"
    },
    "LINK_WARN_LIMIT": {
      "description": "Number of warnings before action",
      "value": "3"
    },
    "LINK_ACTION": {
      "description": "Action on violating links (kick/mute/none)",
      "value": "kick"
    },
    "AUTO_STATUS_SEEN": {
      "description": "Auto mark status as seen",
      "value": "true"
    },
    "AUTO_STATUS_REPLY": {
      "description": "Auto reply on status",
      "value": "false"
    },
    "AUTO_STATUS_REACT": {
      "description": "Auto react on status",
      "value": "true"
    },
    "AUTO_STATUS_MSG": {
      "description": "Auto status reply message",
      "value": "SEEN YOUR STATUS"
    },
    "WELCOME": {
      "description": "Enable welcome/goodbye messages",
      "value": "true"
    },
    "ADMIN_EVENTS": {
      "description": "Notify when someone is promoted/demoted",
      "value": "false"
    },
    "ANTI_LINK": {
      "description": "Enable anti-link in groups",
      "value": "true"
    },
    "MENTION_REPLY": {
      "description": "Auto voice reply on mention",
      "value": "false"
    },
    "MENU_IMAGE_URL": {
      "description": "Custom menu image URL",
      "value": "https://i.ibb.co/PGXs1vqB/temp-image.jpg"
    },
    "ALIVE_IMG": {
      "description": "Image for alive message",
      "value": "https://i.ibb.co/PGXs1vqB/temp-image.jpg"
    },
    "LIVE_MSG": {
      "description": "Alive message text",
      "value": "> ʙᴏᴛ ɪs sᴘᴀʀᴋɪɴɢ ᴀᴄᴛɪᴠᴇ ᴀɴᴅ ᴀʟɪᴠᴇ\n\nᴋᴇᴇᴘ ᴜsɪɴɢ ✦ᴘᴀꜱɪʏᴀ ᴍᴅ✦\n\n© ᴘᴀꜱɪʏᴀ - ᴍᴅ"
    },
    "STICKER_NAME": {
      "description": "Sticker pack name",
      "value": "ᴘᴀꜱɪʏᴀ ᴍᴅ ᴍᴀᴋᴇ"
    },
    "CUSTOM_REACT": {
      "description": "Enable custom emoji react",
      "value": "false"
    },
    "CUSTOM_REACT_EMOJIS": {
      "description": "Custom react emojis",
      "value": "💝,💖,💗,❤️‍🩹,❤️,💛,💚,💙,💜,🤎,🖤,🤍"
    },
    "DELETE_LINKS": {
      "description": "Auto delete links without removing member",
      "value": "false"
    },
    "OWNER_NUMBER": {
      "description": "Bot owner WhatsApp number",
      "value": "94784548818"
    },
    "OWNER_NAME": {
      "description": "Bot owner name",
      "value": "ᴘᴀꜱɪʏᴀ"
    },
    "DESCRIPTION": {
      "description": "Bot description",
      "value": "© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘᴀꜱɪʏᴀ ᴍᴅ"
    },
    "READ_MESSAGE": {
      "description": "Auto read messages",
      "value": "false"
    },
    "AUTO_REACT": {
      "description": "Auto react on all messages",
      "value": "false"
    },
    "ANTI_BAD": {
      "description": "Enable anti bad words",
      "value": "false"
    },
    "ANTI_LINK_KICK": {
      "description": "Enable anti-link kick",
      "value": "false"
    },
    "AUTO_STICKER": {
      "description": "Auto sticker messages",
      "value": "true"
    },
    "AUTO_VOICE": {
      "description": "Auto voice messages",
      "value": "true"
    },
    "AUTO_REPLY": {
      "description": "Auto text reply",
      "value": "true"
    },
    "ALWAYS_ONLINE": {
      "description": "Bot always online",
      "value": "false"
    },
    "PUBLIC_MODE": {
      "description": "Bot public mode",
      "value": "false"
    },
    "AUTO_TYPING": {
      "description": "Show typing automatically",
      "value": "false"
    },
    "READ_CMD": {
      "description": "Mark commands as read",
      "value": "false"
    },
    "DEV": {
      "description": "Developer WhatsApp number",
      "value": "94784548818"
    },
    "ANTI_VV": {
      "description": "Anti once-view",
      "value": "true"
    },
    "ANTI_DEL_PATH": {
      "description": "Where to resend deleted message (inbox/same)",
      "value": "inbox"
    },
    "AUTO_RECORDING": {
      "description": "Auto recording",
      "value": "true"
    },
    "version": {
      "description": "Bot version",
      "value": "0.0.5"
    },
    "START_MSG": {
      "description": "Bot start message",
      "value": "*Hᴇʟʟᴏ ᴛʜᴇʀᴇ PASIYA MD ᴄᴏɴɴᴇᴄᴛᴇᴅ! 👋🏻*"
    }
  },
  "formation": {
    "worker": {
      "quantity": 1,
      "size": "standard-1X"
    }
  }
    }
