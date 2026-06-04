import api from './api';
import { serializePayload } from '../utils/serialize';

export const postService = {
  getPosts: () => api.get('/posts').then((res) => res.data),
  getPost: (id) => api.get(`/posts/${id}`).then((res) => res.data),
  createPost: ({ username, content }) =>
    api.post('/posts', serializePayload({ username, content }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }),
  updatePost: (id, { content }) =>
    api.patch(`/posts/${id}`, serializePayload({ content }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }),
  deletePost: (id) => api.delete(`/posts/${id}`),
};
