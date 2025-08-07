import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
  Select,
  MenuItem,
  TableContainer,
  Paper,
} from '@mui/material';


export interface Post {
  name: string;
  idea: string;
  text: string;
  image: string;
  status: string;
}

interface Props {
  posts: Post[];
  onStatusChange: (name: string, status: string) => void;
}

export default function PostsTable({ posts, onStatusChange }: Props) {
  const statuses = ['Review', 'Ready', 'Posted'];
  return (
    <TableContainer component={Paper}>
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
            <TableRow key={p.name} hover>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.idea}</TableCell>
              <TableCell>
                <Select
                  size="small"
                  value={p.status}
                  onChange={(e) =>
                    onStatusChange(p.name, e.target.value as string)
                  }
                >
                  {statuses.map((s) => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
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
    </TableContainer>

}
