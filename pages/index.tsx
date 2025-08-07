import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button } from '@mui/material';
import PostsTable, { Post } from '../components/PostsTable';
import Stats from '../components/Stats';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const summary = {
    review: posts.filter((p) => p.status.toLowerCase() === 'review').length,
    ready: posts.filter((p) => p.status.toLowerCase() === 'ready').length,
    posted: posts.filter((p) => p.status.toLowerCase() === 'posted').length,
  };

  useEffect(() => {
    axios.get<Post[]>('/api/posts').then((res) => setPosts(res.data));
  }, []);

  async function handleGenerate() {
    setLoading(true);
    await axios.post('/api/generate');
    const res = await axios.get<Post[]>('/api/posts');
    setPosts(res.data);
    setLoading(false);
  }

  async function handleStatusChange(name: string, status: string) {
    await axios.post('/api/status', { name, status });
    setPosts((prev) =>
      prev.map((p) => (p.name === name ? { ...p, status } : p))
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        LinkedIn Content Dashboard
      </Typography>
      <Button
        variant="contained"
        onClick={handleGenerate}
        disabled={loading}
        sx={{ mb: 2 }}
      >
        Generate New Post
      </Button>
      <Stats review={summary.review} ready={summary.ready} posted={summary.posted} />
      <PostsTable posts={posts} onStatusChange={handleStatusChange} />
    </Container>
  );
}
