
import { Plus, Search, Edit, Eye, X } from 'lucide-react';
import { formatCurrency } from '../utils/currency';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

// Sample products
const products = [
  { 
    id: 1,
    image: '/lovable-uploads/f4ddfc1e-5234-4910-a77e-ccc4cb1bc157.png',
    name: 'Grace Accent Chair',
    category: 'Chairs',
    price: 12799,
    stock: 50,
    orders: 34
  },
  { 
    id: 2,
    image: '/lovable-uploads/f4ddfc1e-5234-4910-a77e-ccc4cb1bc157.png',
    name: 'Carven Lounge Chair',
    category: 'Chairs',
    price: 11799,
    stock: 417,
    orders: 28
  },
  { 
    id: 3,
    image: '/lovable-uploads/f4ddfc1e-5234-4910-a77e-ccc4cb1bc157.png',
    name: 'Paine Chair',
    category: 'Chairs',
    price: 4799,
    stock: 357,
    orders: 20
  },
  { 
    id: 4,
    image: '/lovable-uploads/f4ddfc1e-5234-4910-a77e-ccc4cb1bc157.png',
    name: 'Caria Patio Table',
    category: 'Tables',
    price: 5399,
    stock: 490,
    orders: 18
  },
  { 
    id: 5,
    image: '/lovable-uploads/f4ddfc1e-5234-4910-a77e-ccc4cb1bc157.png',
    name: 'Wooden Dining Table',
    category: 'Tables',
    price: 8599,
    stock: 125,
    orders: 15
  }
];

// Product categories
const categories = ['Chairs', 'Tables', 'Sofas', 'Beds', 'Cabinets', 'Accessories'];

export default function Products() {
  const [allProducts, setAllProducts] = useState(products);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [isViewProductOpen, setIsViewProductOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: categories[0],
    price: '',
    stock: '',
  });
  const [currentProduct, setCurrentProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Handler for the Add Product button
  const openAddProductModal = () => {
    setIsAddProductOpen(true);
  };

  // Handler for the Edit Product button
  const openEditProductModal = (product) => {
    setCurrentProduct(product);
    setNewProduct({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
    });
    setIsEditProductOpen(true);
  };

  // Handler for the View Product button
  const openViewProductModal = (product) => {
    setCurrentProduct(product);
    setIsViewProductOpen(true);
  };

  // Handler for form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  // Handler for adding a new product
  const handleAddProduct = () => {
    // Validate form
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Create new product object
    const price = parseInt(newProduct.price, 10);
    const stock = parseInt(newProduct.stock, 10);
    
    // Validate numbers
    if (isNaN(price) || isNaN(stock)) {
      toast.error("Price and stock must be valid numbers");
      return;
    }

    const newProductItem = {
      id: allProducts.length + 1,
      image: '/lovable-uploads/f4ddfc1e-5234-4910-a77e-ccc4cb1bc157.png', // Default image
      name: newProduct.name,
      category: newProduct.category,
      price: price,
      stock: stock,
      orders: 0
    };

    // Add new product to state
    setAllProducts([...allProducts, newProductItem]);
    
    // Reset form and close modal
    setNewProduct({
      name: '',
      category: categories[0],
      price: '',
      stock: '',
    });
    setIsAddProductOpen(false);
    
    // Show success message
    toast.success(`Product "${newProductItem.name}" added successfully`);
  };

  // Handler for updating a product
  const handleUpdateProduct = () => {
    // Validate form
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Create updated product object
    const price = parseInt(newProduct.price, 10);
    const stock = parseInt(newProduct.stock, 10);
    
    // Validate numbers
    if (isNaN(price) || isNaN(stock)) {
      toast.error("Price and stock must be valid numbers");
      return;
    }

    // Update product in state
    const updatedProducts = allProducts.map(product => {
      if (product.id === currentProduct.id) {
        return {
          ...product,
          name: newProduct.name,
          category: newProduct.category,
          price: price,
          stock: stock
        };
      }
      return product;
    });

    setAllProducts(updatedProducts);
    setIsEditProductOpen(false);
    
    // Show success message
    toast.success(`Product "${newProduct.name}" updated successfully`);
  };

  // Filter products based on search term
  const filteredProducts = allProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Products</h1>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input 
              type="search" 
              className="block w-full py-2 pl-10 pr-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary"
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button 
            className="flex items-center gap-2 px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
            onClick={openAddProductModal}
          >
            <Plus size={18} />
            <span>Add Product</span>
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg card-shadow p-5">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="pb-3 font-medium">
                  <input type="checkbox" className="rounded text-primary focus:ring-primary"/>
                </th>
                <th className="pb-3 font-medium">Product</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Price</th>
                <th className="pb-3 font-medium">Stock</th>
                <th className="pb-3 font-medium">Orders</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="stagger-animation">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b last:border-b-0 hover:bg-gray-50 animate-slideIn opacity-0">
                  <td className="py-4">
                    <input type="checkbox" className="rounded text-primary focus:ring-primary"/>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-md bg-gray-100 overflow-hidden flex items-center justify-center">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm">{product.category}</td>
                  <td className="py-4 text-sm font-medium">{formatCurrency(product.price)}</td>
                  <td className="py-4 text-sm">{product.stock}</td>
                  <td className="py-4 text-sm">{product.orders}</td>
                  <td className="py-4 text-sm">
                    <div className="flex gap-2">
                      <button 
                        className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                        onClick={() => openEditProductModal(product)}
                      >
                        Edit
                      </button>
                      <button 
                        className="px-3 py-1 text-xs text-white bg-primary hover:bg-primary/90 rounded-full transition-colors"
                        onClick={() => openViewProductModal(product)}
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex justify-between items-center mt-6 text-sm">
          <div className="text-gray-500">Showing {filteredProducts.length} of {allProducts.length} products</div>
          <div className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-md">1</button>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md">2</button>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md">3</button>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md">→</button>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Enter the details for the new product below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right font-medium">Name</label>
              <input
                id="name"
                name="name"
                className="col-span-3 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={newProduct.name}
                onChange={handleInputChange}
                placeholder="Product name"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="category" className="text-right font-medium">Category</label>
              <select
                id="category"
                name="category"
                className="col-span-3 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={newProduct.category}
                onChange={handleInputChange}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="price" className="text-right font-medium">Price (DH)</label>
              <input
                id="price"
                name="price"
                type="number"
                className="col-span-3 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={newProduct.price}
                onChange={handleInputChange}
                placeholder="0"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="stock" className="text-right font-medium">Stock</label>
              <input
                id="stock"
                name="stock"
                type="number"
                className="col-span-3 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={newProduct.stock}
                onChange={handleInputChange}
                placeholder="0"
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddProduct}>Add Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Modal */}
      <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the product details below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-name" className="text-right font-medium">Name</label>
              <input
                id="edit-name"
                name="name"
                className="col-span-3 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={newProduct.name}
                onChange={handleInputChange}
                placeholder="Product name"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-category" className="text-right font-medium">Category</label>
              <select
                id="edit-category"
                name="category"
                className="col-span-3 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={newProduct.category}
                onChange={handleInputChange}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-price" className="text-right font-medium">Price (DH)</label>
              <input
                id="edit-price"
                name="price"
                type="number"
                className="col-span-3 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={newProduct.price}
                onChange={handleInputChange}
                placeholder="0"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-stock" className="text-right font-medium">Stock</label>
              <input
                id="edit-stock"
                name="stock"
                type="number"
                className="col-span-3 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={newProduct.stock}
                onChange={handleInputChange}
                placeholder="0"
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleUpdateProduct}>Update Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Product Modal */}
      <Dialog open={isViewProductOpen} onOpenChange={setIsViewProductOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
            <DialogDescription>
              Detailed information about the selected product.
            </DialogDescription>
          </DialogHeader>
          
          {currentProduct && (
            <div className="py-4">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-md bg-gray-100 overflow-hidden flex items-center justify-center">
                  <img 
                    src={currentProduct.image} 
                    alt={currentProduct.name}
                    className="w-20 h-20 object-contain"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-sm font-medium text-gray-500">Product Name:</div>
                  <div className="col-span-2 font-medium">{currentProduct.name}</div>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-sm font-medium text-gray-500">Category:</div>
                  <div className="col-span-2">{currentProduct.category}</div>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-sm font-medium text-gray-500">Price:</div>
                  <div className="col-span-2 font-medium">{formatCurrency(currentProduct.price)}</div>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-sm font-medium text-gray-500">Stock:</div>
                  <div className="col-span-2">{currentProduct.stock} units</div>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-sm font-medium text-gray-500">Orders:</div>
                  <div className="col-span-2">{currentProduct.orders} orders</div>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-sm font-medium text-gray-500">Product ID:</div>
                  <div className="col-span-2">{currentProduct.id}</div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsViewProductOpen(false);
                openEditProductModal(currentProduct);
              }}
            >
              Edit Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
