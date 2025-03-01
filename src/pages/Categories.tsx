
import { Plus, Edit as EditIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

// Sample categories
const initialCategories = [
  { id: 1, name: 'Chairs', products: 24, icon: '🪑' },
  { id: 2, name: 'Tables', products: 18, icon: '🛋️' },
  { id: 3, name: 'Sofas', products: 15, icon: '🛋️' },
  { id: 4, name: 'Beds', products: 12, icon: '🛏️' },
  { id: 5, name: 'Cabinets', products: 20, icon: '🗄️' },
  { id: 6, name: 'Outdoor', products: 8, icon: '⛱️' },
];

export default function Categories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(initialCategories);
  const [currentCategory, setCurrentCategory] = useState(null);
  
  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  // Form states
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryIcon, setNewCategoryIcon] = useState('🪑');
  const [editCategoryName, setEditCategoryName] = useState('');
  const [editCategoryIcon, setEditCategoryIcon] = useState('');

  // Handler for Add Category button
  const handleAddCategory = () => {
    setAddDialogOpen(true);
    setNewCategoryName('');
    setNewCategoryIcon('🪑');
  };

  // Handler for Add Category form submission
  const submitNewCategory = () => {
    if (!newCategoryName.trim()) {
      toast.error('Category name cannot be empty');
      return;
    }

    const newCategory = {
      id: categories.length > 0 ? Math.max(...categories.map(cat => cat.id)) + 1 : 1,
      name: newCategoryName,
      products: 0,
      icon: newCategoryIcon
    };

    setCategories([...categories, newCategory]);
    setAddDialogOpen(false);
    toast.success('Category added successfully');
  };

  // Handler for Edit button
  const handleEditCategory = (category) => {
    setCurrentCategory(category);
    setEditCategoryName(category.name);
    setEditCategoryIcon(category.icon);
    setEditDialogOpen(true);
  };

  // Handler for Edit form submission
  const submitEditCategory = () => {
    if (!editCategoryName.trim()) {
      toast.error('Category name cannot be empty');
      return;
    }

    const updatedCategories = categories.map(cat => 
      cat.id === currentCategory.id 
        ? { ...cat, name: editCategoryName, icon: editCategoryIcon } 
        : cat
    );

    setCategories(updatedCategories);
    setEditDialogOpen(false);
    toast.success('Category updated successfully');
  };

  // Handler for View Products button
  const handleViewProducts = (categoryId) => {
    // Navigate to products page with category filter
    navigate(`/products?category=${categoryId}`);
  };

  // Icons for selection
  const iconOptions = ['🪑', '🛋️', '🛏️', '🗄️', '⛱️', '🚪', '💡', '🪞'];

  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Product Categories</h1>
        
        <Button onClick={handleAddCategory} className="flex items-center gap-2">
          <Plus size={18} />
          <span>Add Category</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-animation">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg card-shadow p-5 hover:shadow-md transition-shadow animate-scaleIn opacity-0">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.products} products</p>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-lg">
                {category.icon}
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button 
                variant="outline" 
                className="flex-1 px-3 py-2 text-xs" 
                onClick={() => handleEditCategory(category)}
              >
                Edit
              </Button>
              <Button 
                className="flex-1 px-3 py-2 text-xs" 
                onClick={() => handleViewProducts(category.id)}
              >
                View Products
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Category Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Create a new product category to organize your inventory.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Category Name
              </label>
              <Input
                id="name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="e.g., Office Chairs"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Category Icon</label>
              <div className="flex flex-wrap gap-2">
                {iconOptions.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setNewCategoryIcon(icon)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md ${
                      newCategoryIcon === icon ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={submitNewCategory}>
              Add Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update the category name and icon.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="edit-name" className="text-sm font-medium">
                Category Name
              </label>
              <Input
                id="edit-name"
                value={editCategoryName}
                onChange={(e) => setEditCategoryName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Category Icon</label>
              <div className="flex flex-wrap gap-2">
                {iconOptions.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setEditCategoryIcon(icon)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md ${
                      editCategoryIcon === icon ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={submitEditCategory}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
