"use client";
import { useState, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { marked } from 'marked';

function LoginForm({ onLogin, onForgot, error }: { onLogin: (email: string, pw: string) => void, onForgot: (email: string) => void, error?: string }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <form
      className="max-w-sm mx-auto mt-32 bg-white p-8 rounded-xl shadow"
      onSubmit={e => {
        e.preventDefault();
        onLogin(email, password);
      }}
    >
      <h1 className="heading-2 mb-6 text-center">Admin Login</h1>
      {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
      <input
        type="email"
        className="w-full border rounded px-4 py-2 mb-4"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        className="w-full border rounded px-4 py-2 mb-4"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button className="btn-primary w-full" type="submit">Login</button>
      <button type="button" className="text-blue-600 mt-2 underline w-full" onClick={() => onForgot(email)}>Forgot Password?</button>
    </form>
  );
}

function BlogAdmin({ adminEmail, onLogout }: { adminEmail: string; onLogout: () => void }) {
  const [posts, setPosts] = useState<any[]>([]);
  const [editing, setEditing] = useState<any|null>(null);
  const [form, setForm] = useState({ title: '', content: '', image: '', url: '' });
  const [password, setPassword] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [message, setMessage] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const addFileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

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
        setShowPreview(false);
        setMessage('Post saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      });
  }

  function deletePost(id: string) {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
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
    setShowPreview(false);
  }

  function cancelEdit() {
    setEditing(null);
    setForm({ title: '', content: '', image: '', url: '' });
    setShowPreview(false);
  }

  async function handleAddImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        setForm(f => ({ ...f, image: data.url }));
        setMessage('Image uploaded successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  }

  async function handleEditImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        setForm(f => ({ ...f, image: data.url }));
        setMessage('Image uploaded successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  }

  function changePassword(e: any) {
    e.preventDefault();
    fetch('/api/admin', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: adminEmail, password }),
    })
      .then(r => r.json())
      .then(res => setMessage(res.success ? 'Password changed!' : 'Error changing password.'));
  }

  const renderMarkdown = (content: string) => {
    try {
      return marked(content);
    } catch (error) {
      return content;
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-16 px-4">
      <div className="flex justify-between mb-8">
        <h1 className="heading-2">Blog Admin</h1>
        <button className="btn-secondary" onClick={() => {
          document.cookie = 'isAdmin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
          onLogout();
        }}>Logout</button>
      </div>

      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {message}
        </div>
      )}

      {/* Add New Post Form - only show when not editing */}
      {!editing && (
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="heading-3 mb-4">Add New Post</h2>
          <form onSubmit={savePost}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                className="w-full border rounded px-4 py-2"
                placeholder="Enter post title"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                required
              />
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className={`px-3 py-1 text-sm rounded ${!showPreview ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setShowPreview(false)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className={`px-3 py-1 text-sm rounded ${showPreview ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setShowPreview(true)}
                  >
                    Preview
                  </button>
                </div>
              </div>
              
              {!showPreview ? (
                <div>
                  <textarea
                    className="w-full border rounded px-4 py-2 font-mono text-sm"
                    placeholder="Write your content in Markdown format. You can copy-paste from LLM results here..."
                    value={form.content}
                    onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                    rows={15}
                    required
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    Supports Markdown: **bold**, *italic*, # headers, - lists, [links](url), etc.
                  </div>
                </div>
              ) : (
                <div className="border rounded px-4 py-2 min-h-[300px] bg-gray-50">
                  <div 
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(form.content) }}
                  />
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    className="flex-1 border rounded px-4 py-2"
                    placeholder="Image URL (or upload below)"
                    value={form.image}
                    onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                  />
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => addFileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    {uploading ? 'Uploading...' : 'Upload'}
                  </button>
                </div>
                <input
                  ref={addFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAddImageUpload}
                  className="hidden"
                />
                {form.image && (
                  <div className="mt-2">
                    <img src={form.image} alt="Preview" className="max-h-32 rounded border" />
                  </div>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">External URL (Optional)</label>
              <input
                className="w-full border rounded px-4 py-2"
                placeholder="https://example.com (optional external link)"
                value={form.url}
                onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
              />
            </div>

            <div className="flex gap-2">
              <button className="btn-primary" type="submit">Add Post</button>
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => setForm({ title: '', content: '', image: '', url: '' })}
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="heading-3 mb-4">All Posts ({posts.length})</h2>
        {posts.length === 0 && <p className="text-gray-500">No posts yet.</p>}
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="border-b pb-6 last:border-b-0">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{post.title}</h3>
                  <span className="text-xs text-gray-400">{post.date}</span>
                </div>
                <div className="flex gap-2">
                  <button className="btn-secondary text-sm" onClick={() => startEdit(post)}>Edit</button>
                  <button className="btn-secondary text-sm text-red-600" onClick={() => deletePost(post.id)}>Delete</button>
                </div>
              </div>
              
              {post.image && (
                <div className="mb-3">
                  <img src={post.image} alt="" className="max-h-32 rounded border" />
                </div>
              )}
              
              {post.url && (
                <div className="mb-3">
                  <a href={post.url} className="text-primary-600 underline text-sm" target="_blank" rel="noopener noreferrer">
                    External Link →
                  </a>
                </div>
              )}
              
              <div className="prose prose-sm max-w-none text-gray-700 line-clamp-3">
                <div dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content.substring(0, 200) + '...') }} />
              </div>
              
              {/* Edit Form - show inline under the selected post */}
              {editing && editing.id === post.id && (
                <div className="bg-gray-50 p-6 rounded-xl shadow mt-4">
                  <h3 className="heading-3 mb-4">Edit Post</h3>
                  <form onSubmit={savePost}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        className="w-full border rounded px-4 py-2"
                        placeholder="Enter post title"
                        value={form.title}
                        onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700">Content</label>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            className={`px-3 py-1 text-sm rounded ${!showPreview ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => setShowPreview(false)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className={`px-3 py-1 text-sm rounded ${showPreview ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => setShowPreview(true)}
                          >
                            Preview
                          </button>
                        </div>
                      </div>
                      
                      {!showPreview ? (
                        <div>
                          <textarea
                            className="w-full border rounded px-4 py-2 font-mono text-sm"
                            placeholder="Write your content in Markdown format..."
                            value={form.content}
                            onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                            rows={15}
                            required
                          />
                          <div className="text-xs text-gray-500 mt-1">
                            Supports Markdown: **bold**, *italic*, # headers, - lists, [links](url), etc.
                          </div>
                        </div>
                      ) : (
                        <div className="border rounded px-4 py-2 min-h-[300px] bg-white">
                          <div 
                            className="prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: renderMarkdown(form.content) }}
                          />
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <input
                            className="flex-1 border rounded px-4 py-2"
                            placeholder="Image URL (or upload below)"
                            value={form.image}
                            onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                          />
                          <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => editFileInputRef.current?.click()}
                            disabled={uploading}
                          >
                            {uploading ? 'Uploading...' : 'Upload'}
                          </button>
                        </div>
                        <input
                          ref={editFileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleEditImageUpload}
                          className="hidden"
                        />
                        {form.image && (
                          <div className="mt-2">
                            <img src={form.image} alt="Preview" className="max-h-32 rounded border" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">External URL (Optional)</label>
                      <input
                        className="w-full border rounded px-4 py-2"
                        placeholder="https://example.com (optional external link)"
                        value={form.url}
                        onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
                      />
                    </div>

                    <div className="flex gap-2">
                      <button className="btn-primary" type="submit">Update Post</button>
                      <button className="btn-secondary" type="button" onClick={cancelEdit}>Cancel</button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
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
  const [adminEmail, setAdminEmail] = useState('');
  const [error, setError] = useState('');
  const [tab, setTab] = useState<'blog' | 'tools'>('blog');
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleLogin(email: string, password: string) {
    fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then(r => r.json())
      .then(res => {
        if (res.success) {
          document.cookie = 'isAdmin=true; path=/; max-age=86400';
          setAdminEmail(email);
          setLoggedIn(true);
        } else setError('Incorrect email or password');
      });
  }

  function handleForgot(email: string) {
    setShowReset(true);
    setResetEmail(email);
  }

  function handleRequestReset(e: any) {
    e.preventDefault();
    fetch('/api/admin/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: resetEmail }),
    })
      .then(r => r.json())
      .then(res => setResetMessage(res.success ? 'Reset email sent!' : 'Error sending reset email.'));
  }

  function handleSetNewPassword(e: any) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setResetMessage('Passwords do not match!');
      return;
    }
    fetch('/api/admin/reset', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: resetToken, password: newPassword }),
    })
      .then(r => r.json())
      .then(res => setResetMessage(res.success ? 'Password updated!' : 'Error updating password.'));
  }

  if (showReset) {
    return (
      <div className="max-w-sm mx-auto mt-32 bg-white p-8 rounded-xl shadow">
        <h1 className="heading-2 mb-6 text-center">Reset Password</h1>
        <form onSubmit={handleRequestReset}>
          <input
            type="email"
            className="w-full border rounded px-4 py-2 mb-4"
            placeholder="Email"
            value={resetEmail}
            onChange={e => setResetEmail(e.target.value)}
            required
          />
          <button className="btn-primary w-full" type="submit">Send Reset Email</button>
          {resetMessage && <p className="mt-2 text-green-600">{resetMessage}</p>}
        </form>
        <button className="btn-secondary mt-4 w-full" onClick={() => setShowReset(false)}>Back to Login</button>
      </div>
    );
  }

  if (!loggedIn) return <LoginForm onLogin={handleLogin} onForgot={handleForgot} error={error} />;
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
          <BlogAdmin adminEmail={adminEmail} onLogout={() => setLoggedIn(false)} />
        ) : (
          <ToolsAdmin onLogout={() => setLoggedIn(false)} />
        )}
      </div>
    </div>
  );
} 