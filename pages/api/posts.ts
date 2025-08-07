import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import type { Post } from '../../components/PostsTable';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post[]>
) {
  if (
    !process.env.GOOGLE_CLIENT_EMAIL ||
    !process.env.GOOGLE_PRIVATE_KEY ||
    !process.env.GOOGLE_SHEET_ID
  ) {
    // fallback sample data when credentials missing
    res.status(200).json([
      {
        name: 'Sample Post',
        idea: 'Growth hack: Example idea',
        text: 'Example text',
        image: '',
        status: 'Review',
      },
    ]);
    return;
  }

  const auth = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    undefined,
    process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    ['https://www.googleapis.com/auth/spreadsheets.readonly']
  );

  const sheets = google.sheets({ version: 'v4', auth });
  const sheetId = process.env.GOOGLE_SHEET_ID;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: 'Posts!A:E',
  });

  const rows = response.data.values || [];
  const [header, ...data] = rows;
  const posts: Post[] = data.map((row) => ({
    name: row[0],
    idea: row[1],
    text: row[2],
    image: row[3],
    status: row[4],
  }));

  res.status(200).json(posts);
}
