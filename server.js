const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Твой токен сообщества VK
const ACCESS_TOKEN = 'vk1.a.vzy3NfPPyC55liIjknGXxXGlrrPWAB8sk6zSbJ_1yr7Nkm7gVge229XihEHEpic9WH-y5iGpFEfVd8hSLrG_MGbIXLa8G1p1D3ZpTxyBYziAXyimfAtryDZOV7dWiVu-4araBfhQkFSgOra7Ca79jtLs77zZKbh7l_jJ_rCHchwMtV-V2YLaLAciNhtEkaLLDRoH-f7rcxRio5qr3qALJQ';
const PEER_ID = 2000000146;

app.post('/webhook', async (req, res) => {
    const { first_name, last_name, user_id, text } = req.body;
    const message = text; // Senler присылает текст здесь

    const vkMessage = `🔔 Новое обращение!\n\nПользователь: ${first_name} ${last_name}\nСсылка: vk.com/id${user_id}\nСообщение:\n${message}`;

    console.log('Incoming:', req.body);
    console.log('To VK:', vkMessage);

    try {
        await fetch(`https://api.vk.com/method/messages.send`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                peer_id: PEER_ID.toString(),
                random_id: Math.floor(Math.random() * 1e9),
                message: vkMessage,
                access_token: ACCESS_TOKEN,
                v: '5.131'
            })
        });
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running');
});
