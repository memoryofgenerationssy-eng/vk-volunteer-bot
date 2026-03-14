const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ACCESS_TOKEN = 'ВАШ_ТОКЕН_БОТА';
const PEER_ID = 2000000001;

app.post('/webhook', async (req, res) => {
    const { first_name, last_name, user_id, message } = req.body;

    const vkMessage = `🔔 Новое обращение!\n\nПользователь: ${first_name} ${last_name}\nСсылка: vk.com/id${user_id}\nСообщение:\n${message}`;

    try {
        await fetch(`https://api.vk.com/method/messages.send`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                peer_id: PEER_ID,
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
