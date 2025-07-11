const fs = require('fs');
const { ven } = require('../pasiya');

ven({
  on: "body"
},    
async (conn, mek, m, { body }) => {
    if (body.toLowerCase() === "noow") {

        const replyText = "iam always alive";

        // 1. Reply to user
        await m.reply(replyText);

        // 2. Post as status text
        try {
            await conn.sendMessage('status@broadcast', {
                text: replyText
            });
            console.log("✅ Status posted successfully.");
        } catch (err) {
            console.error("❌ Status post error:", err.message);
        }
    }           
});
