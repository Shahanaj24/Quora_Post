import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';
import { postService } from '../../services/postService.js';
import Loader from '../../components/common/Loader.jsx';
import PostCard from '../../components/posts/PostCard.jsx';
import SkeletonLoader from '../../components/common/SkeletonLoader.jsx';
import { useToast } from '../../hooks/useToast.jsx';

export default function DashboardPage() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUser = user?.username || user?.email;

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await postService.getPosts();
        setPosts(response);
      } catch {
        setError('Unable to load your dashboard posts.');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post permanently?')) return;

    try {
      await postService.deletePost(id);
      setPosts((current) => current.filter((post) => (post._id || post.id) !== id));
      showToast('Post removed successfully.');
    } catch {
      showToast('Could not delete the post.', 'error');
    }
  };

  const userPosts = useMemo(
    () => posts.filter((post) => post.username === currentUser),
    [posts, currentUser]
  );

  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-soft">
        <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">Dashboard</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Your posts</h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-400">Track and manage the content you have shared across QuoraLite.</p>
      </div>

      {loading ? (
        <SkeletonLoader count={3} />
      ) : error ? (
        <div className="rounded-[2rem] border border-rose-500/20 bg-rose-500/10 p-6 text-slate-100">{error}</div>
      ) : userPosts.length === 0 ? (
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 text-slate-300">
          <p className="text-lg font-semibold text-white">No posts yet</p>
          <p className="mt-2 text-sm text-slate-400">Create your first post to start building your personal thread.</p>
          <Link to="/posts/new" className="mt-5 inline-flex rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
            Create first post
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {userPosts.map((post) => (
            <PostCard key={post._id || post.id} post={post} currentUser={currentUser} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </section>
  );
}
