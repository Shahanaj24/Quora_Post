import { useEffect, useState } from 'react';

export default function PostForm({ initialContent = '', onSubmit, submitLabel, author }) {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({ content });
      }}
      className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-soft"
    >
      <div>
        <label htmlFor="post-content" className="mb-3 block text-sm font-semibold text-slate-200">
          Post content
        </label>
        <textarea
          id="post-content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows="8"
          placeholder="Share your idea, question, or insight..."
          className="w-full rounded-3xl border border-slate-800/90 bg-slate-950/90 px-4 py-4 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
        />
      </div>

      {author && (
        <div className="rounded-3xl border border-slate-800/90 bg-slate-950/70 px-4 py-4 text-sm text-slate-300">
          <p className="font-medium text-slate-100">Author</p>
          <p>{author}</p>
        </div>
      )}

      <button type="submit" className="inline-flex items-center justify-center rounded-3xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
        {submitLabel}
      </button>
    </form>
  );
}
