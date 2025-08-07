import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean }>
) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const { name, status } = req.body as { name?: string; status?: string };
  if (!name || !status) {
    res.status(400).json({ success: false });
    return;
  }

  if (
    !process.env.GOOGLE_CLIENT_EMAIL ||
    !process.env.GOOGLE_PRIVATE_KEY ||
    !process.env.GOOGLE_SHEET_ID
  ) {
    console.warn('Missing Google credentials; skipping update');
    res.status(200).json({ success: true });
    return;
  }

  const auth = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    undefined,
    process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    ['https://www.googleapis.com/auth/spreadsheets']
  );

  const sheets = google.sheets({ version: 'v4', auth });
  const sheetId = process.env.GOOGLE_SHEET_ID;

  // Find row by name
  const namesRes = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: 'Posts!A:A',
  });
  const names = namesRes.data.values || [];
  const index = names.findIndex((row) => row[0] === name);
  if (index === -1) {
    res.status(404).json({ success: false });
    return;
  }
  const rowNumber = index + 1; // 1-indexed including header
  const range = `Posts!E${rowNumber}`;

  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range,
    valueInputOption: 'RAW',
    requestBody: { values: [[status]] },
  });

  res.status(200).json({ success: true });
}
