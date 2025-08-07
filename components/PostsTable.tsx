import { Table, TableHead, TableRow, TableCell, TableBody, Link } from '@mui/material';

export interface Post {
  name: string;
  idea: string;
  text: string;
  image: string;
  status: string;
}

interface Props {
  posts: Post[];
}

export default function PostsTable({ posts }: Props) {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Idea</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Image</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {posts.map((p) => (
          <TableRow key={p.name}>
            <TableCell>{p.name}</TableCell>
            <TableCell>{p.idea}</TableCell>
            <TableCell>{p.status}</TableCell>
            <TableCell>
              {p.image ? (
                <Link href={p.image} target="_blank" rel="noreferrer">
                  View
                </Link>
              ) : null}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
