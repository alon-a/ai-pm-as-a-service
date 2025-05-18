'use client';

import { useState, useEffect } from 'react';
import { Category, Tool } from '@/types/tools';

export default function ToolsPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [categoryTools, setCategoryTools] = useState<{ [key: string]: Tool[] }>({});
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState<string | null>(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [isAddingTool, setIsAddingTool] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newTool, setNewTool] = useState({
    name: '',
    url: '',
    description: '',
    tutorialUrl: ''
  });

  useEffect(() => {
    if (document.cookie.includes('isAdmin=true')) {
      setIsAdmin(true);
    }
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/tools/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchTools = async (categoryId: string) => {
    try {
      const response = await fetch(`/api/tools?categoryId=${categoryId}`);
      const data = await response.json();
      setCategoryTools((prev) => ({ ...prev, [categoryId]: data }));
    } catch (error) {
      console.error('Error fetching tools:', error);
    }
  };

  const handleToggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        fetchTools(categoryId);
        return [...prev, categoryId];
      }
    });
  };

  const handleAddCategory = async () => {
    try {
      const response = await fetch('/api/tools/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newCategoryName }),
      });
      if (response.ok) {
        setNewCategoryName('');
        setIsAddingCategory(false);
        fetchCategories();
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleEditCategory = (category: Category) => {
    setIsEditingCategory(category.id);
    setEditCategoryName(category.name);
  };

  const handleUpdateCategory = async (categoryId: string) => {
    try {
      const response = await fetch('/api/tools/categories', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: categoryId, name: editCategoryName }),
      });
      if (response.ok) {
        setIsEditingCategory(null);
        setEditCategoryName('');
        fetchCategories();
      }
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      const response = await fetch(`/api/tools/categories?id=${categoryId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setExpandedCategories((prev) => prev.filter((id) => id !== categoryId));
        fetchCategories();
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleAddTool = async (categoryId: string) => {
    try {
      const response = await fetch('/api/tools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newTool,
          categoryId,
        }),
      });
      if (response.ok) {
        setNewTool({
          name: '',
          url: '',
          description: '',
          tutorialUrl: ''
        });
        setIsAddingTool(null);
        fetchTools(categoryId);
      }
    } catch (error) {
      console.error('Error adding tool:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">AI Tools Directory</h1>
      
      {/* Categories Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Categories</h2>
        </div>
        <div className="flex flex-col gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`p-4 border rounded ${expandedCategories.includes(category.id) ? 'border-blue-500 bg-blue-50' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 cursor-pointer" onClick={() => handleToggleCategory(category.id)}>
                  <h3 className="text-xl font-semibold flex items-center">
                    <span className="mr-2">{category.name}</span>
                    <button
                      className="ml-2 text-xs px-2 py-1 border rounded"
                      onClick={(e) => { e.stopPropagation(); handleToggleCategory(category.id); }}
                    >
                      {expandedCategories.includes(category.id) ? 'Hide Tools' : 'Show Tools'}
                    </button>
                  </h3>
                </div>
              </div>
              {expandedCategories.includes(category.id) && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Tools</span>
                  </div>
                  <div className="flex flex-col gap-4">
                    {(categoryTools[category.id] || []).map((tool) => (
                      <div key={tool.id} className="p-4 border rounded">
                        <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                        <p className="text-gray-600 mb-2">{tool.description}</p>
                        <div className="space-y-2">
                          <a
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline block"
                          >
                            Visit Tool
                          </a>
                          {tool.tutorialUrl && (
                            <a
                              href={tool.tutorialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-500 hover:underline block"
                            >
                              View Tutorial
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 