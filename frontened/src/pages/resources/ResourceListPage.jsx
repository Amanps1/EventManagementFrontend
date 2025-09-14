import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Calendar,
  Users,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  MoreVertical
} from 'lucide-react';

const ResourceListPage = () => {
  const [resources, setResources] = useState([
    {
      id: 1,
      name: 'Conference Room A',
      type: 'ROOM',
      capacity: 50,
      location: 'Building 1, Floor 2',
      description: 'Large conference room with projector and whiteboard',
      isAvailable: true,
      hourlyRate: 25,
      amenities: ['Projector', 'Whiteboard', 'AC', 'WiFi']
    },
    {
      id: 2,
      name: 'Sound System Pro',
      type: 'EQUIPMENT',
      capacity: null,
      location: 'Equipment Storage',
      description: 'Professional sound system with microphones',
      isAvailable: false,
      hourlyRate: 15,
      amenities: ['Microphones', 'Speakers', 'Mixer']
    },
    {
      id: 3,
      name: 'Outdoor Pavilion',
      type: 'VENUE',
      capacity: 200,
      location: 'Garden Area',
      description: 'Open-air pavilion perfect for outdoor events',
      isAvailable: true,
      hourlyRate: 40,
      amenities: ['Covered Area', 'Lighting', 'Power Outlets']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [newResource, setNewResource] = useState({
    name: '',
    type: 'ROOM',
    capacity: '',
    location: '',
    description: '',
    hourlyRate: '',
    amenities: []
  });

  const resourceTypes = ['all', 'ROOM', 'EQUIPMENT', 'VENUE'];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type) => {
    const icons = {
      ROOM: MapPin,
      EQUIPMENT: Users,
      VENUE: Calendar
    };
    return icons[type] || MapPin;
  };

  const getTypeColor = (type) => {
    const colors = {
      ROOM: 'from-blue-500 to-indigo-500',
      EQUIPMENT: 'from-green-500 to-emerald-500',
      VENUE: 'from-purple-500 to-violet-500'
    };
    return colors[type] || 'from-gray-500 to-slate-500';
  };

  const handleAddResource = () => {
    const resource = {
      id: Date.now(),
      ...newResource,
      capacity: newResource.capacity ? parseInt(newResource.capacity) : null,
      hourlyRate: parseFloat(newResource.hourlyRate),
      isAvailable: true,
      amenities: newResource.amenities.filter(a => a.trim())
    };
    
    setResources([...resources, resource]);
    setNewResource({
      name: '',
      type: 'ROOM',
      capacity: '',
      location: '',
      description: '',
      hourlyRate: '',
      amenities: []
    });
    setShowAddModal(false);
  };

  const handleDeleteResource = (id) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      setResources(resources.filter(r => r.id !== id));
    }
  };

  const toggleAvailability = (id) => {
    setResources(resources.map(r => 
      r.id === id ? { ...r, isAvailable: !r.isAvailable } : r
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Resource Management
          </h1>
          <p className="text-gray-600 mt-2">Manage rooms, equipment, and venues</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Add Resource</span>
        </motion.button>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {resourceTypes.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredResources.map((resource, index) => {
            const TypeIcon = getTypeIcon(resource.type);
            return (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${getTypeColor(resource.type)}`}>
                        <TypeIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{resource.name}</h3>
                        <p className="text-sm text-gray-600">{resource.type}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${resource.isAvailable ? 'bg-green-400' : 'bg-red-400'}`}></div>
                      <div className="relative">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDropdown(activeDropdown === resource.id ? null : resource.id);
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        
                        {activeDropdown === resource.id && (
                          <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]">
                            <button
                              onClick={() => {
                                toggleAvailability(resource.id);
                                setActiveDropdown(null);
                              }}
                              className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                            >
                              {resource.isAvailable ? <XCircle className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                              <span>{resource.isAvailable ? 'Mark Unavailable' : 'Mark Available'}</span>
                            </button>
                            <button
                              onClick={() => {
                                handleDeleteResource(resource.id);
                                setActiveDropdown(null);
                              }}
                              className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Delete</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{resource.location}</span>
                    </div>
                    {resource.capacity && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>Capacity: {resource.capacity}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>${resource.hourlyRate}/hour</span>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-4">
                  <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                  
                  {resource.amenities.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-gray-700 mb-2">Amenities:</p>
                      <div className="flex flex-wrap gap-1">
                        {resource.amenities.map((amenity, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                      resource.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${resource.isAvailable ? 'bg-green-400' : 'bg-red-400'}`}></div>
                      <span>{resource.isAvailable ? 'Available' : 'Unavailable'}</span>
                    </div>
                    
                    <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Add New Resource</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={newResource.name}
                    onChange={(e) => setNewResource({...newResource, name: e.target.value})}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Resource name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={newResource.type}
                    onChange={(e) => setNewResource({...newResource, type: e.target.value})}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="ROOM">Room</option>
                    <option value="EQUIPMENT">Equipment</option>
                    <option value="VENUE">Venue</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={newResource.location}
                    onChange={(e) => setNewResource({...newResource, location: e.target.value})}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Location"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                  <input
                    type="number"
                    value={newResource.capacity}
                    onChange={(e) => setNewResource({...newResource, capacity: e.target.value})}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Maximum capacity"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newResource.hourlyRate}
                    onChange={(e) => setNewResource({...newResource, hourlyRate: e.target.value})}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="0.00"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newResource.description}
                    onChange={(e) => setNewResource({...newResource, description: e.target.value})}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows="3"
                    placeholder="Resource description"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 pt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddResource}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  Add Resource
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ResourceListPage;