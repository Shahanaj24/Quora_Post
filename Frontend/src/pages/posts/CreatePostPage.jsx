import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';
import { useToast } from '../../hooks/useToast.jsx';
import { postService } from '../../services/postService.js';
import PostForm from '../../components/posts/PostForm.jsx';

export default function CreatePostPage() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async ({ content }) => {
    setLoading(true);
    try {
      await postService.createPost({ username: user?.username || user?.email || 'Guest', content });
      showToast('Post created successfully.');
      navigate('/');
    } catch {
      showToast('Failed to create the post.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-soft">
        <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">New post</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Create a new community post</h1>
        <p className="mt-2 text-sm leading-7 text-slate-400">Share your question or insight with the QuoraLite community.</p>
      </div>

      <PostForm author={user?.username || user?.email} submitLabel={loading ? 'Publishing…' : 'Publish post'} onSubmit={handleSubmit} />
    </section>
  );
}
