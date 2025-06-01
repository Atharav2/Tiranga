const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve HTML/CSS/JS

// When user clicks "Log in" — receive and store their data
app.post('/login', (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ message: 'Missing name or phone number' });
  }

  // Read the existing file
  fs.readFile('names.json', 'utf8', (err, data) => {
    let users = [];

    if (!err && data) {
      try {
        users = JSON.parse(data);
      } catch (e) {
        users = [];
      }
    }

    // Add new entry
    users.push({ name, phone });

    // Save updated list
    fs.writeFile('names.json', JSON.stringify(users, null, 2), err => {
      if (err) {
        return res.status(500).json({ message: 'Failed to save details' });
      }
      res.json({ message: 'Details received. Thank you!' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
