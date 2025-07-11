const { ven } = require('../pasiya');
const os = require('os');
const { runtime } = require('../lib/functions');
const config = require('../settings');
const { createBox, successBox } = require('../lib/msg-formatter');
const yts = require('yt-search');
const fetch = require('node-fetch');
const path = require('path');

const newsletterContext = {
    mentionedJid: [],
    forwardingScore: 1000,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
        newsletterJid: '120363402825685029@newsletter',
        newsletterName: "PASIYA MD",
        serverMessageId: 143,
    }
};

// Error handling function
const sendError = async (reply, message) => {
    return await reply(`❌ *Error:* ${message}`);
};

ven({
    pattern: "alive",
    alias: ["status", "online", "a"],
    desc: "Check if bot is alive and running",
    category: "main",
    react: "⚡",
    filename: __filename
}, async (conn, mek, m, { from, sender, reply }) => {
    try {
        const heapUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const totalMem = (os.totalmem() / 1024 / 1024).toFixed(2);
        const uptime = runtime(process.uptime());

        const caption = `
█▓▒▒〔 🕶️ *${config.BOT_NAME}* 〕▒▒▓█
█ ⚡ *En ligne & opérationnel*
█ 👑 *Owner:* ${config.OWNER_NAME}
█ 🔖 *Version:* ${config.version}
█ 🛠️ *Préfixe:* ${config.PREFIX}
█ ⚙️ *Mode:* ${config.MODE}
█ 💾 *RAM:* ${heapUsed}MB / ${totalMem}MB
█ 🖥️ *Hôte:* ${os.hostname()}
█ ⏱️ *Uptime:* ${uptime}
█████████████████████████████
📝 *${config.DESCRIPTION}*
`.trim();

        await conn.sendMessage(from, {
            image: { url: config.MENU_IMAGE_URL },
            caption,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 1000,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402825685029@newsletter',
                    newsletterName: 'PASIYA-𝗠�_D',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Alive Error:", e);
        await sendError(reply, e.message);
    }
});

ven({
    pattern: "video",
    alias: ['ytdl', 'youtube'],
    react: "🎥",
    desc: "Download video from YouTube by prompt or URL",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, q, reply, sender }) => {
    const retryLimit = 3;
    let attempt = 0;

    const fetchVideo = async () => {
        try {
            if (!q) return await sendError(reply, "Please provide a video title or YouTube URL");

            let videoUrl = q;

            // If input is not a direct YouTube URL, search for video
            if (!q.includes('youtu')) {
                const search = await yts(q);
                const video = search.videos[0];
                if (!video) return await sendError(reply, "No results found");
                videoUrl = video.url;
            }

            const messageContext = {
                ...newsletterContext,
                mentionedJid: [sender]
            };

            // Fetch video info from API
            const apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(videoUrl)}`;
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (!data.success || !data.result) {
                return await sendError(reply, "Failed to get video download info");
            }

            const { title, thumbnail, download_url, quality } = data.result;

            const infoMsg = `
╭════════════⊷❍
│
│ *🎥 Video Downloader*
│──────────────────────
│ 📌 Title: ${title}
│ 🎞️ Quality: ${quality}
╰──────────●●►
*📥 Downloaded via PASIYA MD*`.trim();

            await conn.sendMessage(from, {
                image: { url: thumbnail },
                caption: infoMsg,
                contextInfo: messageContext
            }, { quoted: mek });

            // Send video
            await conn.sendMessage(from, {
                video: { url: download_url },
                mimetype: 'video/mp4',
                caption: "*🎥 PASIYA MD DOWNLOAD*",
                contextInfo: messageContext
            }, { quoted: mek });

        } catch (error) {
            console.error('Video Error:', error);
            attempt++;
            if (attempt < retryLimit) {
                console.log(`Retrying... Attempt ${attempt + 1}`);
                return await fetchVideo();
            } else {
                return await sendError(reply, `Failed after ${retryLimit} attempts: ${error.message}`);
            }
        }
    };

    await fetchVideo();
});
