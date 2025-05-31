// prompts.js

/**
 * Builds a prompt for extracting summary, decisions, and action items from meeting notes.
 * @param {string} meetingText - The raw meeting notes.
 * @returns {string} - The formatted prompt for the AI model.
 */
function buildPrompt(meetingText) {
  return `
You are an assistant that extracts structured information from meeting notes.

Meeting Notes:
${meetingText}

Extract:
1. A 2–3 sentence summary.
2. A list of key decisions.
3. A structured list of action items with task, owner (if mentioned), and deadline (if mentioned).

Respond in this JSON format:
{
  "summary": "...",
  "decisions": ["...", "..."],
  "actionItems": [
    { "task": "...", "owner": "...", "due": "..." },
    ...
  ]
}
If owner or due is missing, omit the field.
`.trim();
}

module.exports = { buildPrompt };
