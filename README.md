# ReleaseHub

A React + Vite single-page dashboard for tracking product releases and exploring an AI tools directory. The UI supports Firebase-backed data with a mock release service for simulated updates.

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file in the project root with your Firebase settings:
   ```bash
   VITE_FIREBASE_CONFIG={"apiKey":"...","authDomain":"...","projectId":"..."}
   VITE_APP_ID=releasehub-dev
   VITE_AUTH_TOKEN= # optional custom auth token
   ```

3. (Optional) Enable live trending tools via Gemini:
   ```bash
   cp .env.example .env
   # then set GEMINI_API_KEY=your_real_key_here
   ```
   Run the tiny backend alongside Vite:
   ```bash
   npm start   # starts Express on :3000 with hourly Gemini refresh
   npm run dev # Vite proxies /api to :3000 in development
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The mock release API can be exercised from the "Check Updates" button in the header or from each tool modal.
