
const { ven } = require('../pasiya');
const config = require('../settings');

// Auto-tag tous les membres
ven({
    pattern: "tagall",
    react: "📢",
    desc: "Tag tous les membres du groupe",
    category: "group",
    filename: __filename,
    use: "[message]"
}, async (conn, mek, m, { from, isGroup, isGroupAdmins, isOwner, args, reply }) => {
    if (!isGroup) return reply("⚠️ Cette commande ne fonctionne que dans les groupes !");
    if (!isGroupAdmins && !isOwner) return reply("⚠️ Seuls les admins peuvent utiliser cette commande !");

    try {
        const groupMetadata = await conn.groupMetadata(from);
        const participants = groupMetadata.participants;
        const message = args.join(' ') || '*Attention générale !*';
        
        let tagMessage = `
🔔 **ANNONCE GÉNÉRALE**

📢 **Message :** ${message}

👥 **Membres concernés :**
`;

        const mentions = [];
        participants.forEach((participant, index) => {
            const jid = participant.id;
            mentions.push(jid);
            tagMessage += `${index + 1}. @${jid.split('@')[0]}\n`;
        });

        tagMessage += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 **Total :** ${participants.length} membres tagués
👤 **Par :** @${m.sender.split('@')[0]}
🕒 **Heure :** ${new Date().toLocaleTimeString()}

> *Message envoyé à tous les membres du groupe*
`;

        await conn.sendMessage(from, {
            text: tagMessage,
            mentions: mentions,
            contextInfo: {
                mentionedJid: mentions,
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402825685029@newsletter',
                    newsletterName: 'PASIYA MD ❔',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error('TagAll error:', error);
        reply(`❌ Erreur lors du tag : ${error.message}`);
    }
});

// Tag seulement les admins
ven({
    pattern: "tagadmins",
    react: "👑",
    desc: "Tag tous les admins du groupe",
    category: "group",
    filename: __filename,
    use: "[message]"
}, async (conn, mek, m, { from, isGroup, isGroupAdmins, isOwner, args, reply }) => {
    if (!isGroup) return reply("⚠️ Cette commande ne fonctionne que dans les groupes !");
    if (!isGroupAdmins && !isOwner) return reply("⚠️ Seuls les admins peuvent utiliser cette commande !");

    try {
        const groupMetadata = await conn.groupMetadata(from);
        const participants = groupMetadata.participants;
        const admins = participants.filter(p => p.admin !== null);
        const message = args.join(' ') || '*Réunion des admins !*';
        
        if (admins.length === 0) {
            return reply("ℹ️ Aucun admin trouvé dans ce groupe.");
        }

        let tagMessage = `
👑 **APPEL AUX ADMINS**

📢 **Message :** ${message}

👥 **Admins concernés :**
`;

        const mentions = [];
        admins.forEach((admin, index) => {
            const jid = admin.id;
            mentions.push(jid);
            const role = admin.admin === 'superadmin' ? '🔱 Super Admin' : '👑 Admin';
            tagMessage += `${index + 1}. @${jid.split('@')[0]} (${role})\n`;
        });

        tagMessage += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 **Total :** ${admins.length} admins tagués
👤 **Par :** @${m.sender.split('@')[0]}
🕒 **Heure :** ${new Date().toLocaleTimeString()}

> *Message envoyé aux administrateurs du groupe*
`;

        await conn.sendMessage(from, {
            text: tagMessage,
            mentions: mentions,
            contextInfo: {
                mentionedJid: mentions,
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402825685029@newsletter',
                    newsletterName: 'PASIYA MD ❔',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error('TagAdmins error:', error);
        reply(`❌ Erreur lors du tag des admins : ${error.message}`);
    }
});

// Tag les membres actifs
ven({
    pattern: "tagactive",
    react: "⚡",
    desc: "Tag les membres actifs du groupe",
    category: "group",
    filename: __filename,
    use: "[message]"
}, async (conn, mek, m, { from, isGroup, isGroupAdmins, isOwner, args, reply }) => {
    if (!isGroup) return reply("⚠️ Cette commande ne fonctionne que dans les groupes !");
    if (!isGroupAdmins && !isOwner) return reply("⚠️ Seuls les admins peuvent utiliser cette commande !");

    try {
        const groupMetadata = await conn.groupMetadata(from);
        const participants = groupMetadata.participants;
        const message = args.join(' ') || '*Appel aux membres actifs !*';
        
        // Simuler les membres actifs (en production, utilisez une vraie DB)
        global.memberActivity = global.memberActivity || {};
        if (!global.memberActivity[from]) {
            global.memberActivity[from] = {};
        }

        const activeMembers = participants.filter(p => {
            const activity = global.memberActivity[from][p.id];
            if (!activity) return false;
            
            // Considérer comme actif si message dans les 7 derniers jours
            const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
            return activity.lastActive > sevenDaysAgo;
        });

        if (activeMembers.length === 0) {
            return reply(`
ℹ️ **Aucun membre actif détecté**

*Les membres actifs sont ceux qui ont envoyé un message dans les 7 derniers jours.*
*Utilisez \`.tagall\` pour tagger tous les membres.*
            `);
        }

        let tagMessage = `
⚡ **APPEL AUX MEMBRES ACTIFS**

📢 **Message :** ${message}

👥 **Membres actifs (7 derniers jours) :**
`;

        const mentions = [];
        activeMembers.forEach((member, index) => {
            const jid = member.id;
            mentions.push(jid);
            const activity = global.memberActivity[from][jid];
            const lastActive = new Date(activity.lastActive).toLocaleDateString();
            tagMessage += `${index + 1}. @${jid.split('@')[0]} (${activity.messages} msg, ${lastActive})\n`;
        });

        tagMessage += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 **Total :** ${activeMembers.length} membres actifs tagués
👤 **Par :** @${m.sender.split('@')[0]}
🕒 **Heure :** ${new Date().toLocaleTimeString()}

> *Message envoyé aux membres actifs récents*
`;

        await conn.sendMessage(from, {
            text: tagMessage,
            mentions: mentions,
            contextInfo: {
                mentionedJid: mentions,
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402825685029@newsletter',
                    newsletterName: 'PASIYA MD ❔',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error('TagActive error:', error);
        reply(`❌ Erreur lors du tag des membres actifs : ${error.message}`);
    }
});
