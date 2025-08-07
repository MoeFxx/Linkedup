import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean }>
) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const url = process.env.N8N_WEBHOOK_URL;
  if (!url) {
    console.warn('N8N_WEBHOOK_URL missing; skipping');
    res.status(200).json({ success: true });
    return;
  }

  await fetch(url, { method: 'POST' });
  res.status(200).json({ success: true });
}
