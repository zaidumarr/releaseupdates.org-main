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

3. Start the development server:
   ```bash
   npm run dev
   ```

The mock release API can be exercised from the "Check Updates" button in the header or from each tool modal.
