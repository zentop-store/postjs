// api/auto-post.js
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { token, channelId, message, delay } = req.body;

  if (!token || !channelId || !message || !delay) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const payload = {
    content: message,
  };

  const headers = {
    Authorization: `Bot ${token}`, // If you're using a bot token
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(`https://discord.com/api/v9/channels/${channelId}/messages`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload),
    });

    if (response.status === 200) {
      res.status(200).json({ success: true, message: 'Message sent successfully' });
    } else {
      const errorText = await response.text();
      res.status(response.status).json({ success: false, message: `Failed to send message: ${response.status}`, details: errorText });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};
