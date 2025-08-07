# Linkedup

Linkedin Automation Dashboard

This project provides a small Next.js dashboard for managing LinkedIn post ideas generated via an n8n workflow. It displays posts stored in Google Sheets and lets you trigger new idea generation.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set environment variables in `.env`:

```
GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=spreadsheet_id
N8N_WEBHOOK_URL=https://your-n8n-host/webhook/generate
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

The API falls back to sample data if Google credentials are not provided.
