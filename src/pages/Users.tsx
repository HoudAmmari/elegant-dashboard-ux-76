
import { Plus, Search } from 'lucide-react';

// Sample users
const users = [
  { 
    id: 1,
    name: 'John Smith',
    email: 'john@maestrofurniture.com',
    role: 'Admin',
    status: 'Active',
    lastActive: '15 min ago',
    avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=6C5DD3&color=fff',
  },
  { 
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah@maestrofurniture.com',
    role: 'Manager',
    status: 'Active',
    lastActive: '2 hours ago',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=4ECDC4&color=fff',
  },
  { 
    id: 3,
    name: 'Arjun Patel',
    email: 'arjun@maestrofurniture.com',
    role: 'Sales',
    status: 'Inactive',
    lastActive: '2 days ago',
    avatar: 'https://ui-avatars.com/api/?name=Arjun+Patel&background=FF8C42&color=fff',
  },
  { 
    id: 4,
    name: 'Priya Singh',
    email: 'priya@maestrofurniture.com',
    role: 'Inventory',
    status: 'Active',
    lastActive: '1 hour ago',
    avatar: 'https://ui-avatars.com/api/?name=Priya+Singh&background=7367F0&color=fff',
  },
  { 
    id: 5,
    name: 'Rahul Sharma',
    email: 'rahul@maestrofurniture.com',
    role: 'Support',
    status: 'Active',
    lastActive: 'Just now',
    avatar: 'https://ui-avatars.com/api/?name=Rahul+Sharma&background=F8B400&color=fff',
  },
];

const getStatusColor = (status: string) => {
  switch(status) {
    case 'Active':
      return 'bg-green-100 text-green-700';
    case 'Inactive':
      return 'bg-gray-100 text-gray-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export default function Users() {
  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Users</h1>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input 
              type="search" 
              className="block w-full py-2 pl-10 pr-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary"
              placeholder="Search users..." 
            />
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors">
            <Plus size={18} />
            <span>Add User</span>
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg card-shadow p-5">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="pb-3 font-medium">User</th>
                <th className="pb-3 font-medium">Email</th>
                <th className="pb-3 font-medium">Role</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Last Active</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="stagger-animation">
              {users.map((user) => (
                <tr key={user.id} className="border-b last:border-b-0 hover:bg-gray-50 animate-slideIn opacity-0">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm">{user.email}</td>
                  <td className="py-4 text-sm">{user.role}</td>
                  <td className="py-4 text-sm">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 text-sm">{user.lastActive}</td>
                  <td className="py-4 text-sm">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                        Edit
                      </button>
                      <button className="px-3 py-1 text-xs text-white bg-primary hover:bg-primary/90 rounded-full transition-colors">
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
          <div className="text-gray-500">Showing 5 of 10 users</div>
          <div className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-md">1</button>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md">2</button>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md">→</button>
          </div>
        </div>
      </div>
    </div>
  );
}
