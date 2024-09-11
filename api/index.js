// api/index.js
const autoPost = require('./auto-post');

module.exports = (req, res) => {
  if (req.url === '/api/auto-post') {
    autoPost(req, res);
  } else {
    res.status(404).json({ success: false, message: 'Not Found' });
  }
};
