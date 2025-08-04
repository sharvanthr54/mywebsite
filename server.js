const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3019;

// MongoDB connection
mongoose.connect('mongodb+srv://shravanrhpeoples:1E0ROKBlBTOoaC4x@newusers.nqyrxpq.mongodb.net/')
.then(() => {
  console.log("✅ Connected to MongoDB");
}).catch(err => {
  console.error("❌ MongoDB connection error:", err);
});

// Mongoose Schema and Model
const visitorSchema = new mongoose.Schema({
  name: String,
  date: { type: Date, default: Date.now }
});
const Visitor = mongoose.model('Visitor', visitorSchema);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
 // Serve static files (HTML, CSS, JS, images)

// Routes
app.get('/portfolio.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'portfolio.html'));
});


app.post('/api/visitors', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  try {
    const visitor = new Visitor({ name });
    await visitor.save();
    res.status(201).json({ message: "Visitor saved successfully" });
  } catch (err) {
    console.error("Error saving visitor:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get('/portfolio.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'portfolio.html'));
});


// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
