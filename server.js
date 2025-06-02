const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// 🔗 MongoDB connection (replace <password> with your real password if not done already)
mongoose.connect('mongodb+srv://Atharav:atharav2008@cluster0.xxxxx.mongodb.net/Website?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected!'))
.catch(err => console.error('❌ MongoDB connection failed:', err));

// ✅ Define schema and model
const userSchema = new mongoose.Schema({
  name: String,
  phone: String
});
const User = mongoose.model('User', userSchema);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve HTML/CSS/JS from the "public" folder

// ✅ Handle login and save to MongoDB
app.post('/login', async (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ message: 'Missing name or phone number' });
  }

  try {
    await User.create({ name, phone }); // Save user to MongoDB
    res.json({ message: '✅ Details saved to MongoDB. Thank you!' });
  } catch (err) {
    console.error('❌ MongoDB Save Error:', err);
    res.status(500).json({ message: '❌ Failed to save to database' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
