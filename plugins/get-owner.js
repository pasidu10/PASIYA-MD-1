const { ven } = require('../pasiya');
const config = require('../settings');
const os = require("os");
const fs = require("fs");
const { runtime } = require('../lib/functions');
const { exec } = require("child_process");


ven({
    pattern: "owner",
    react: "✅", 
    desc: "Get owner number",
    category: "main",
    filename: __filename
}, 
async (conn, mek, m, { from }) => {
    try {
        const ownerNumber = config.OWNER_NUMBER;
        const ownerName = config.OWNER_NAME;

        const vcard = 'BEGIN:VCARD\n' +
                      'VERSION:3.0\n' +
                      `FN:${ownerName}\n` +  
                      `TEL;type=CELL;type=VOICE;waid=${ownerNumber.replace('+', '')}:${ownerNumber}\n` + 
                      'END:VCARD';

        // Only send contact card
        await conn.sendMessage(from, {
            contacts: {
                displayName: ownerName,
                contacts: [{ vcard }]
            }
        });

    } catch (error) {
        console.error(error);
        reply(`An error occurred: ${error.message}`);
    }
});

ven({
    pattern: "system",
    alias: ["status", "botinfo"],
    desc: "Check bot system details, RAM, CPU, disk usage, uptime, and more",
    category: "main",
    react: "💻",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        // System information
        const cpu = os.cpus()[0]; // First CPU core details
        const cpuUsage = os.loadavg()[0].toFixed(2); // 1-minute load average
        const totalMem = (os.totalmem() / 1024 / 1024).toFixed(2); // Total memory in MB
        const freeMem = (os.freemem() / 1024 / 1024).toFixed(2);
        const usedMem = (totalMem - freeMem).toFixed(2);
        const nodeVersion = process.version;
        const osType = os.type();
        const osRelease = os.release();
        const osArch = os.arch();
        const botUptime = runtime(process.uptime()); // Bot uptime
        const sysUptime = runtime(os.uptime()); // System uptime
        const cpuSpeed = cpu.speed; // CPU speed in MHz
        const processId = process.pid; // Bot's process ID
        const processCount = os.loadavg()[1].toFixed(2); // Average processes running

        // Asynchronously get disk space info (Linux/macOS only)
        let diskUsage = "N/A";
        try {
            diskUsage = await new Promise((resolve, reject) => {
                exec("df -h / | tail -1 | awk '{print $3 \" used / \" $2 \" total\"}'", (error, stdout, stderr) => {
                    if (error) {
                        console.error("Disk usage check failed:", error);
                        return resolve("N/A");
                    }
                    resolve(stdout.toString().trim());
                });
            });
        } catch (e) {
            console.log("Disk usage check failed.");
        }

        // Get network interface
        const networkInterfaces = os.networkInterfaces();
        let networkInfo = "N/A";
        for (let key in networkInterfaces) {
            if (networkInterfaces[key][0] && networkInterfaces[key][0].address) {
                networkInfo = `${key}: ${networkInterfaces[key][0].address}`;
                break;
            }
        }

        // Create a fancy status string using cool fonts and extra special characters
        let status = `╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃  ⏰ 𝗕𝗢𝗧 𝗨𝗣𝗧𝗜𝗠𝗘: ${botUptime}
┃  🖥️ 𝗦𝗬𝗦𝗧𝗘𝗠 𝗨𝗣𝗧𝗜𝗠𝗘: ${sysUptime}
┃  📟 𝗥𝗔𝗠 𝗨𝗦𝗔𝗚𝗘: ${usedMem}MB / ${totalMem}MB
┃  🆓 𝗙𝗥𝗘𝗘 𝗥𝗔𝗠: ${freeMem}MB
┃  ⚡ 𝗖𝗣𝗨 𝗠𝗢𝗗𝗘𝗟: ${cpu.model}
┃  🚀 𝗖𝗣𝗨 𝗦𝗣𝗘𝗘𝗗: ${cpuSpeed} MHz
┃  📊 𝗖𝗣𝗨 𝗨𝗦𝗔𝗚𝗘: ${cpuUsage}%
┃  🏷️ 𝗢𝗦 𝗧𝗬𝗣𝗘: ${osType} (${osArch})
┃  🔄 𝗢𝗦 𝗩𝗘𝗥𝗦𝗜𝗢𝗡: ${osRelease}
┃  💾 𝗗𝗜𝗦𝗞 𝗨𝗦𝗔𝗚𝗘: ${diskUsage}
┃  🌐 𝗡𝗘𝗧𝗪𝗢𝗥𝗞: ${networkInfo}
┃  🏷️ 𝗔𝗖𝗧𝗜𝗩𝗘 𝗣𝗥𝗢𝗖𝗘𝗦𝗦𝗘𝗦: ${processCount}
┃  🔢 𝗕𝗢𝗧 𝗣𝗜𝗗: ${processId}
┃  ⚙️ 𝗡𝗢𝗗𝗘.𝗝𝗦 𝗩𝗘𝗥𝗦𝗜𝗢𝗡: ${nodeVersion}
┃  👨‍💻 𝗗𝗘𝗩𝗘𝗟𝗢𝗣𝗘𝗥: Hans Tech
┃  🧬 𝗕𝗢𝗧 𝗩𝗘𝗥𝗦𝗜𝗢𝗡: ${config.VERSION}
┃  ✞ 𝗢𝗪𝗡𝗘𝗥: ${config.OWNER_NAME || "Unknown"}
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯


       𓆩 𝒑𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 *PASIYA MD* 𓆪`;

        // Send image with system info as caption
        return await conn.sendMessage(from, { 
            image: { url: "https://i.ibb.co/Hp93NXGs/6d677926ce5b1c4f53914fb156058f0d.jpg" }, 
            caption: status 
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});

