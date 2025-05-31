const { GoogleGenerativeAI } = require('@google/generative-ai');
const { buildPrompt } = require('./prompts');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function extractMeetingData(meetingText) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const prompt = buildPrompt(meetingText);

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Remove code block formatting if present
    const cleaned = responseText.replace(/``````/g, '').trim();

    try {
      return JSON.parse(cleaned);
    } catch (e) {
      throw {
        message: 'Failed to parse Gemini response as JSON',
        details: responseText,
      };
    }
  } catch (err) {
    // Always include error details for API errors
    throw {
      message: 'Gemini API request failed',
      details: err?.message || err,
    };
  }
}

module.exports = { extractMeetingData };
