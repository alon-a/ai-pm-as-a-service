"use client";
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

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
        <button className="btn-secondary" onClick={() => {
          document.cookie = 'isAdmin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
          onLogout();
        }}>Logout</button>
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

function ToolsAdmin({ onLogout }: { onLogout: () => void }) {
  const [categories, setCategories] = useState<any[]>([]);
  const [categoryEditId, setCategoryEditId] = useState<string|null>(null);
  const [categoryName, setCategoryName] = useState('');
  const [addingCategory, setAddingCategory] = useState(false);
  const [toolEdit, setToolEdit] = useState<{categoryId: string, toolId: string|null}|null>(null);
  const [toolForm, setToolForm] = useState({ name: '', url: '', description: '', tutorialUrl: '' });
  const [tools, setTools] = useState<{[catId: string]: any[]}>({});
  const [addingToolCat, setAddingToolCat] = useState<string|null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await fetch('/api/tools/categories');
    const data = await res.json();
    setCategories(data);
    // Fetch tools for each category
    for (const cat of data) {
      fetchTools(cat.id);
    }
  };

  const fetchTools = async (categoryId: string) => {
    const res = await fetch(`/api/tools?categoryId=${categoryId}`);
    const data = await res.json();
    setTools(t => ({ ...t, [categoryId]: data }));
  };

  // Category CRUD
  const handleAddCategory = async () => {
    await fetch('/api/tools/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: categoryName }),
    });
    setCategoryName('');
    setAddingCategory(false);
    fetchCategories();
  };
  const handleEditCategory = (cat: any) => {
    setCategoryEditId(cat.id);
    setCategoryName(cat.name);
  };
  const handleUpdateCategory = async (catId: string) => {
    await fetch('/api/tools/categories', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: catId, name: categoryName }),
    });
    setCategoryEditId(null);
    setCategoryName('');
    fetchCategories();
  };
  const handleDeleteCategory = async (catId: string) => {
    if (!window.confirm('Delete this category?')) return;
    await fetch(`/api/tools/categories?id=${catId}`, { method: 'DELETE' });
    fetchCategories();
  };

  // Tool CRUD
  const handleAddTool = async (catId: string) => {
    await fetch('/api/tools', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...toolForm, categoryId: catId }),
    });
    setToolForm({ name: '', url: '', description: '', tutorialUrl: '' });
    setAddingToolCat(null);
    fetchTools(catId);
  };
  const handleEditTool = (catId: string, tool: any) => {
    setToolEdit({ categoryId: catId, toolId: tool.id });
    setToolForm({ name: tool.name, url: tool.url, description: tool.description, tutorialUrl: tool.tutorialUrl });
  };
  const handleUpdateTool = async (catId: string, toolId: string) => {
    await fetch('/api/tools', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: toolId, ...toolForm, categoryId: catId }),
    });
    setToolEdit(null);
    setToolForm({ name: '', url: '', description: '', tutorialUrl: '' });
    fetchTools(catId);
  };
  const handleDeleteTool = async (catId: string, toolId: string) => {
    if (!window.confirm('Delete this tool?')) return;
    await fetch(`/api/tools?id=${toolId}`, { method: 'DELETE' });
    fetchTools(catId);
  };

  // Drag-and-drop
  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    // Category reorder
    if (result.type === 'category') {
      const reordered = Array.from(categories);
      const [removed] = reordered.splice(result.source.index, 1);
      reordered.splice(result.destination.index, 0, removed);
      setCategories(reordered);
      // Persist order to backend
      await fetch('/api/tools/categories/order', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderedIds: reordered.map(c => c.id) }),
      });
    } else if (result.type.startsWith('tools-')) {
      const catId = result.type.replace('tools-', '');
      const reordered = Array.from(tools[catId] || []);
      const [removed] = reordered.splice(result.source.index, 1);
      reordered.splice(result.destination.index, 0, removed);
      setTools(t => ({ ...t, [catId]: reordered }));
      // Persist order to backend
      await fetch('/api/tools/order', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoryId: catId, orderedIds: reordered.map(t => t.id) }),
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-16">
      <div className="flex justify-between mb-8">
        <h1 className="heading-2">Tools Admin</h1>
        <button className="btn-secondary" onClick={() => {
          document.cookie = 'isAdmin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
          onLogout();
        }}>Logout</button>
      </div>
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="heading-3 mb-4">Manage Categories & Tools</h2>
        <button className="btn-primary mb-4" onClick={() => setAddingCategory(true)}>Add Category</button>
        {addingCategory && (
          <div className="mb-4 flex gap-2">
            <input className="border p-2 rounded" value={categoryName} onChange={e => setCategoryName(e.target.value)} placeholder="Category name" />
            <button className="btn-primary" onClick={handleAddCategory}>Save</button>
            <button className="btn-secondary" onClick={() => { setAddingCategory(false); setCategoryName(''); }}>Cancel</button>
          </div>
        )}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="categories" type="category">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {categories.map((cat, idx) => (
                  <Draggable key={cat.id} draggableId={cat.id} index={idx}>
                    {(prov) => (
                      <div ref={prov.innerRef} {...prov.draggableProps} className="mb-6 p-4 border rounded bg-gray-50">
                        <div className="flex items-center gap-2 mb-2">
                          <span {...prov.dragHandleProps} className="cursor-move">☰</span>
                          {categoryEditId === cat.id ? (
                            <>
                              <input className="border p-2 rounded" value={categoryName} onChange={e => setCategoryName(e.target.value)} />
                              <button className="btn-primary" onClick={() => handleUpdateCategory(cat.id)}>Save</button>
                              <button className="btn-secondary" onClick={() => { setCategoryEditId(null); setCategoryName(''); }}>Cancel</button>
                            </>
                          ) : (
                            <>
                              <span className="font-semibold text-lg">{cat.name}</span>
                              <button className="btn-secondary" onClick={() => handleEditCategory(cat)}>Edit</button>
                              <button className="btn-secondary" onClick={() => handleDeleteCategory(cat.id)}>Delete</button>
                            </>
                          )}
                        </div>
                        {/* Tools for this category */}
                        <div className="ml-6">
                          <button className="btn-primary mb-2" onClick={() => setAddingToolCat(cat.id)}>Add Tool</button>
                          {addingToolCat === cat.id && (
                            <div className="mb-2 flex flex-col gap-2">
                              <input className="border p-2 rounded" value={toolForm.name} onChange={e => setToolForm(f => ({ ...f, name: e.target.value }))} placeholder="Tool name" />
                              <input className="border p-2 rounded" value={toolForm.url} onChange={e => setToolForm(f => ({ ...f, url: e.target.value }))} placeholder="Tool URL" />
                              <textarea className="border p-2 rounded" value={toolForm.description} onChange={e => setToolForm(f => ({ ...f, description: e.target.value }))} placeholder="Description" />
                              <input className="border p-2 rounded" value={toolForm.tutorialUrl} onChange={e => setToolForm(f => ({ ...f, tutorialUrl: e.target.value }))} placeholder="Tutorial URL" />
                              <div className="flex gap-2">
                                <button className="btn-primary" onClick={() => handleAddTool(cat.id)}>Save</button>
                                <button className="btn-secondary" onClick={() => { setAddingToolCat(null); setToolForm({ name: '', url: '', description: '', tutorialUrl: '' }); }}>Cancel</button>
                              </div>
                            </div>
                          )}
                          <Droppable droppableId={`tools-${cat.id}`} type={`tools-${cat.id}`}>
                            {(provided) => (
                              <div ref={provided.innerRef} {...provided.droppableProps}>
                                {(tools[cat.id] || []).map((tool, tIdx) => (
                                  <Draggable key={tool.id} draggableId={tool.id} index={tIdx}>
                                    {(provTool) => (
                                      <div ref={provTool.innerRef} {...provTool.draggableProps} className="mb-2 p-2 border rounded bg-white">
                                        <div className="flex items-center gap-2">
                                          <span {...provTool.dragHandleProps} className="cursor-move">⋮</span>
                                          {toolEdit && toolEdit.categoryId === cat.id && toolEdit.toolId === tool.id ? (
                                            <>
                                              <input className="border p-2 rounded" value={toolForm.name} onChange={e => setToolForm(f => ({ ...f, name: e.target.value }))} />
                                              <input className="border p-2 rounded" value={toolForm.url} onChange={e => setToolForm(f => ({ ...f, url: e.target.value }))} />
                                              <textarea className="border p-2 rounded" value={toolForm.description} onChange={e => setToolForm(f => ({ ...f, description: e.target.value }))} />
                                              <input className="border p-2 rounded" value={toolForm.tutorialUrl} onChange={e => setToolForm(f => ({ ...f, tutorialUrl: e.target.value }))} />
                                              <button className="btn-primary" onClick={() => handleUpdateTool(cat.id, tool.id)}>Save</button>
                                              <button className="btn-secondary" onClick={() => { setToolEdit(null); setToolForm({ name: '', url: '', description: '', tutorialUrl: '' }); }}>Cancel</button>
                                            </>
                                          ) : (
                                            <>
                                              <span className="font-semibold">{tool.name}</span>
                                              <button className="btn-secondary" onClick={() => handleEditTool(cat.id, tool)}>Edit</button>
                                              <button className="btn-secondary" onClick={() => handleDeleteTool(cat.id, tool.id)}>Delete</button>
                                            </>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [tab, setTab] = useState<'blog' | 'tools'>('blog');

  function handleLogin(password: string) {
    fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
      .then(r => r.json())
      .then(res => {
        if (res.success) {
          document.cookie = 'isAdmin=true; path=/; max-age=86400';
          setLoggedIn(true);
        } else setError('Incorrect password');
      });
  }

  if (!loggedIn) return <LoginForm onLogin={handleLogin} />;
  return (
    <div>
      <div className="flex justify-center gap-4 mt-8">
        <button
          className={`px-4 py-2 rounded-t ${tab === 'blog' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setTab('blog')}
        >
          Blog
        </button>
        <button
          className={`px-4 py-2 rounded-t ${tab === 'tools' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setTab('tools')}
        >
          Tools
        </button>
      </div>
      <div>
        {tab === 'blog' ? (
          <BlogAdmin onLogout={() => setLoggedIn(false)} />
        ) : (
          <ToolsAdmin onLogout={() => setLoggedIn(false)} />
        )}
      </div>
    </div>
  );
} 