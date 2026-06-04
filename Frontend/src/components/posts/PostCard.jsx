import { Link } from 'react-router-dom';
import { FaArrowRight, FaEdit, FaTrash } from 'react-icons/fa';

export default function PostCard({ post, currentUser, onDelete }) {
  const isOwner = currentUser && (post.username === currentUser || post.username === currentUser?.username);
  const excerpt = post.content.length > 170 ? `${post.content.slice(0, 170)}...` : post.content;

  return (
    <article className="group rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-soft transition hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-slate-900/95">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-cyan-300/80">Author</p>
          <h2 className="mt-1 text-xl font-semibold text-white">{post.username}</h2>
        </div>
        <span className="rounded-full bg-slate-800/90 px-3 py-1 text-xs text-slate-300">{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>

      <p className="mb-6 leading-7 text-slate-300">{excerpt}</p>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          to={`/posts/${post._id || post.id}`}
          className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-400"
        >
          Read more <FaArrowRight />
        </Link>

        <div className="flex items-center gap-2">
          {isOwner && (
            <>
              <Link
                to={`/posts/${post._id || post.id}/edit`}
                className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-white/5 px-4 py-2 text-sm text-cyan-300 transition hover:border-cyan-300/40 hover:text-white"
              >
                <FaEdit /> Edit
              </Link>
              <button
                type="button"
                onClick={() => onDelete(post._id || post.id)}
                className="inline-flex items-center gap-2 rounded-full bg-rose-500/90 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-500"
              >
                <FaTrash /> Delete
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
