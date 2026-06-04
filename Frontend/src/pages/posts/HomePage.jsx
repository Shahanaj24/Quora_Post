import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';
import { useToast } from '../../hooks/useToast.jsx';
import { postService } from '../../services/postService.js';
import Loader from '../../components/common/Loader.jsx';
import PostCard from '../../components/posts/PostCard.jsx';
import SearchBar from '../../components/common/SearchBar.jsx';
import SkeletonLoader from '../../components/common/SkeletonLoader.jsx';

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await postService.getPosts();
        setPosts(response);
      } catch (err) {
        setError('Unable to load posts. Please refresh the page.');
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

  const filteredPosts = useMemo(
    () =>
      posts.filter((post) => {
        const query = search.toLowerCase();
        return (
          post.content.toLowerCase().includes(query) ||
          post.username.toLowerCase().includes(query)
        );
      }),
    [posts, search]
  );

  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-soft">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">Home feed</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">Latest QuoraLite posts</h1>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-400">
              Browse the latest community content, create new posts, and manage your contribution from a modern dashboard.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link to="/posts/new" className="rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
              Create post
            </Link>
            <Link to="/dashboard" className="rounded-full border border-white/10 bg-slate-800 px-5 py-3 text-sm text-slate-100 transition hover:border-cyan-400/30 hover:text-white">
              My dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <SearchBar value={search} onChange={setSearch} />

          {loading && <SkeletonLoader count={3} />}
          {error && <div className="rounded-[2rem] border border-rose-500/20 bg-rose-500/10 p-6 text-sm text-rose-100">{error}</div>}

          {!loading && !error && filteredPosts.length === 0 && (
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 text-slate-300">
              <p className="text-lg font-semibold text-white">No posts found</p>
              <p className="mt-2 text-sm text-slate-400">Try a different search or create the first post in the community.</p>
            </div>
          )}

          <div className="grid gap-6">
            {filteredPosts.map((post) => (
              <PostCard key={post._id || post.id} post={post} currentUser={user?.username || user?.email} onDelete={handleDelete} />
            ))}
          </div>
        </div>

        <aside className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">Your profile</p>
          <div className="mt-4 space-y-3 text-slate-300">
            <p className="text-lg font-semibold text-white">{user?.username || 'Community member'}</p>
            <p className="text-sm leading-7 text-slate-400">Manage content from your dashboard and keep the conversation flowing.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
