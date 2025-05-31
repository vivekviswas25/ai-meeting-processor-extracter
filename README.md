# ai-meeting-processor-extracter
A Node.js backend service that accepts meeting notes (via API) - Calls an AI API (Gemini) to extract a 2–3 sentence summary. Describing a list of key decisions. Also a structured list of action items with task, owner etc. . And returns the results in clean JSON


**Setup**
1. Clone repo and enter folder:
git clone (https://github.com/vivekviswas25/ai-meeting-processor-extracter.git)
2. set directory
cd meeting-notes-ai
3. Install dependencies:
npm install
4. Create .env file with:
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
5. Run the app
6. Terminal
set directory
cd meeting-notes-ai
7. Start the server:
node app.js

Output : ✅ Server running on port 3001

Test
Send meeting notes as raw text:

--curl -X POST http://localhost:3001/process-meeting -H "Content-Type: text/plain" -d "Your meeting notes here"
Or upload a .txt file:

--curl -X POST http://localhost:3001/process-meeting -F "file=@test-notes/sample1.txt"


--Output
Returns JSON with summary, decisions, and action items.



Notes
Ensure your Gemini API key is valid.
Run curl commands from project root for file paths to work.
