import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postService } from '../../services/postService.js';
import Loader from '../../components/common/Loader.jsx';
import { useToast } from '../../hooks/useToast.jsx';

export default function PostDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await postService.getPost(id);
        setPost(response);
      } catch {
        setError('Unable to load the post.');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this post permanently?')) return;

    try {
      await postService.deletePost(id);
      showToast('Post removed successfully.');
      navigate('/');
    } catch {
      showToast('Could not delete the post.', 'error');
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error || !post) {
    return (
      <div className="rounded-[2rem] border border-rose-500/20 bg-rose-500/10 p-8 text-slate-100">
        <p className="text-lg font-semibold">Post not available</p>
        <p className="mt-2 text-sm text-slate-300">Try refreshing or return to the homepage.</p>
      </div>
    );
  }

  return (
    <article className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-soft">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">Post details</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">{post.username}</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => navigate(`/posts/${id}/edit`)} className="rounded-full border border-cyan-400/20 bg-white/5 px-5 py-3 text-sm text-cyan-300 transition hover:border-cyan-300/40 hover:text-white">
            Edit post
          </button>
          <button onClick={handleDelete} className="rounded-full bg-rose-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-400">
            Delete post
          </button>
        </div>
      </div>

      <div className="mt-10 space-y-6 text-slate-300">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8">
          <p className="whitespace-pre-line leading-8">{post.content}</p>
        </div>
        <div className="rounded-[2rem] border border-slate-800/90 bg-slate-950/80 px-6 py-5 text-sm text-slate-400">
          <p>Posted at {new Date(post.createdAt).toLocaleString()}</p>
          <p className="mt-1">Last updated at {new Date(post.updatedAt).toLocaleString()}</p>
        </div>
      </div>
    </article>
  );
}
