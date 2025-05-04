"use client";
import { useState, useEffect } from 'react';

function LoginForm({ onLogin }: { onLogin: (pw: string) => void }) {
  const [password, setPassword] = useState('');
  return (
    <form
      className="max-w-sm mx-auto mt-32 bg-white p-8 rounded-xl shadow"
      onSubmit={e => {
        e.preventDefault();
        onLogin(password);
      }}
    >
      <h1 className="heading-2 mb-6 text-center">Admin Login</h1>
      <input
        type="password"
        className="w-full border rounded px-4 py-2 mb-4"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button className="btn-primary w-full" type="submit">Login</button>
    </form>
  );
}

function BlogAdmin({ onLogout }: { onLogout: () => void }) {
  const [posts, setPosts] = useState<any[]>([]);
  const [editing, setEditing] = useState<any|null>(null);
  const [form, setForm] = useState({ title: '', content: '', image: '', url: '' });
  const [password, setPassword] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/blog').then(r => r.json()).then(setPosts);
  }, []);

  function savePost(e: any) {
    e.preventDefault();
    const method = editing ? 'PUT' : 'POST';
    fetch('/api/blog', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, id: editing?.id }),
    })
      .then(r => r.json())
      .then(data => {
        setPosts(data);
        setEditing(null);
        setForm({ title: '', content: '', image: '', url: '' });
      });
  }

  function deletePost(id: string) {
    fetch('/api/blog', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
      .then(r => r.json())
      .then(setPosts);
  }

  function startEdit(post: any) {
    setEditing(post);
    setForm({ title: post.title, content: post.content, image: post.image, url: post.url || '' });
  }

  function changePassword(e: any) {
    e.preventDefault();
    fetch('/api/admin', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
      .then(r => r.json())
      .then(res => setMessage(res.success ? 'Password changed!' : 'Error changing password.'));
  }

  return (
    <div className="max-w-2xl mx-auto mt-16">
      <div className="flex justify-between mb-8">
        <h1 className="heading-2">Blog Admin</h1>
        <button className="btn-secondary" onClick={onLogout}>Logout</button>
      </div>
      <form className="bg-white p-6 rounded-xl shadow mb-8" onSubmit={savePost}>
        <h2 className="heading-3 mb-4">{editing ? 'Edit Post' : 'Add New Post'}</h2>
        <input
          className="w-full border rounded px-4 py-2 mb-3"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          required
        />
        <textarea
          className="w-full border rounded px-4 py-2 mb-3"
          placeholder="Content (markdown or HTML allowed)"
          value={form.content}
          onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
          required
        />
        <input
          className="w-full border rounded px-4 py-2 mb-3"
          placeholder="Image URL"
          value={form.image}
          onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
        />
        <input
          className="w-full border rounded px-4 py-2 mb-3"
          placeholder="External URL (optional)"
          value={form.url}
          onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
        />
        <div className="flex gap-2">
          <button className="btn-primary" type="submit">{editing ? 'Update' : 'Add'} Post</button>
          {editing && (
            <button className="btn-secondary" type="button" onClick={() => { setEditing(null); setForm({ title: '', content: '', image: '', url: '' }); }}>Cancel</button>
          )}
        </div>
      </form>
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="heading-3 mb-4">All Posts</h2>
        {posts.length === 0 && <p className="text-gray-500">No posts yet.</p>}
        <ul className="space-y-4">
          {posts.map(post => (
            <li key={post.id} className="border-b pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <strong>{post.title}</strong> <span className="text-xs text-gray-400">({post.date})</span>
                </div>
                <div className="flex gap-2">
                  <button className="btn-secondary" onClick={() => startEdit(post)}>Edit</button>
                  <button className="btn-secondary" onClick={() => deletePost(post.id)}>Delete</button>
                </div>
              </div>
              {post.image && <img src={post.image} alt="" className="mt-2 max-h-32" />}
              {post.url && <a href={post.url} className="text-primary-600 underline" target="_blank" rel="noopener noreferrer">External Link</a>}
              <div className="mt-2 text-gray-700" dangerouslySetInnerHTML={{ __html: post.content }} />
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="heading-3 mb-4">Change Admin Password</h2>
        <form onSubmit={changePassword} className="flex gap-2 items-center">
          <input
            type="password"
            className="border rounded px-4 py-2"
            placeholder="New password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button className="btn-primary" type="submit">Change Password</button>
        </form>
        {message && <p className="mt-2 text-green-600">{message}</p>}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');

  function handleLogin(password: string) {
    fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
      .then(r => r.json())
      .then(res => {
        if (res.success) setLoggedIn(true);
        else setError('Incorrect password');
      });
  }

  if (!loggedIn) return <LoginForm onLogin={handleLogin} />;
  return <BlogAdmin onLogout={() => setLoggedIn(false)} />;
} 