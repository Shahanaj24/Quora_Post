import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '../../hooks/useToast.jsx';
import { postService } from '../../services/postService.js';
import PostForm from '../../components/posts/PostForm.jsx';
import Loader from '../../components/common/Loader.jsx';

export default function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await postService.getPost(id);
        setContent(response.content || '');
      } catch {
        setError('Unable to load the post for editing.');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  const handleSubmit = async ({ content: updatedContent }) => {
    setSaving(true);
    try {
      await postService.updatePost(id, { content: updatedContent });
      showToast('Post updated successfully.');
      navigate(`/posts/${id}`);
    } catch {
      showToast('Unable to save changes.', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-soft">
        <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">Edit post</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Update your post content</h1>
        <p className="mt-2 text-sm leading-7 text-slate-400">Make changes before saving to keep your community thread fresh.</p>
      </div>

      {error ? (
        <div className="rounded-[2rem] border border-rose-500/20 bg-rose-500/10 p-6 text-slate-100">{error}</div>
      ) : (
        <PostForm
          initialContent={content}
          author="Current author"
          submitLabel={saving ? 'Saving…' : 'Save changes'}
          onSubmit={handleSubmit}
        />
      )}
    </section>
  );
}
