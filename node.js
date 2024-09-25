const express = require('express');
const fetch = require('node-fetch');
const app = express();

const BOT_TOKEN = 'MTI4ODUxMDEyODM2MTgzMjQ2OA.Gy-9w7.NCCkLbaS1SuLcDZwJgYxjscaKw-JytvWNQyMKg';

app.get('/getPfp/:userId', async (req, res) => {
    const userId = req.params.userId;
    
    try {
        const response = await fetch(`https://discord.com/api/v10/users/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bot ${BOT_TOKEN}`
            }
        });
        
        if (!response.ok) throw new Error('Error fetching user data');
        
        const data = await response.json();
        const pfpUrl = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`;
        
        res.json({ pfpUrl });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
