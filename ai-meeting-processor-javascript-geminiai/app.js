const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { extractMeetingData } = require('./openaiClient');
require('dotenv').config();

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(express.text({ type: 'text/plain' }));

// POST /process-meeting (raw text or .txt file)
app.post('/process-meeting', upload.single('file'), async (req, res) => {
  let meetingText = '';

  // Accept raw text in body
  if (req.is('text/plain') || req.is('application/json')) {
    meetingText = req.body;
  }
  // Or accept file upload
  else if (req.file) {
    meetingText = fs.readFileSync(req.file.path, 'utf8');
    fs.unlinkSync(req.file.path); // Clean up
  }

  if (!meetingText || meetingText.trim().length === 0) {
    return res.status(400).json({ error: 'No meeting notes provided.' });
  }

  try {
    const result = await extractMeetingData(meetingText);
    res.json(result);
  } catch (err) {
    // Return error details in JSON
    res.status(502).json({
      error: err.message || 'Gemini API request failed',
      details: err.details || err.stack || err,
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Internal server error.' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
