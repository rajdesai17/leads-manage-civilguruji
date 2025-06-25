import React, { useEffect, useState } from "react";
import api from "../api";
import LeadForm, { Lead } from "../components/LeadForm";
import LeadList from "../components/LeadList";
import Modal from "../components/Modal";

const App: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCondition, setFilterCondition] = useState("AND");
  const [statusFilter, setStatusFilter] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const fetchLeads = async () => {
    try {
      const res = await api.get<Lead[]>("/leads");
      setLeads(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch leads. Please ensure the backend is running.");
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.phone.includes(searchTerm);
    const matchesStatus = !statusFilter || lead.status === statusFilter;
    
    return filterCondition === "AND" ? (matchesSearch && matchesStatus) : (matchesSearch || matchesStatus);
  });

  const hasActiveFilters = searchTerm || statusFilter;

  const clearAllFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setFilterCondition("AND");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white border-r border-gray-200 flex-shrink-0 transition-all duration-300`}>
        <div className={`${sidebarCollapsed ? 'p-3' : 'p-6'}`}>
          <div className="flex items-center justify-between mb-8">
            <div className={`flex items-center gap-2 ${sidebarCollapsed ? 'justify-center w-full' : ''}`}>
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              {!sidebarCollapsed && (
                <h1 className="text-xl font-bold text-gray-900">LeadCRM</h1>
              )}
            </div>
            {!sidebarCollapsed && (
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                title="Collapse sidebar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
          </div>
          
          {/* Expand button when collapsed */}
          {sidebarCollapsed && (
            <div className="mb-6">
              <button
                onClick={() => setSidebarCollapsed(false)}
                className="w-full flex justify-center p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                title="Expand sidebar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
          
          <nav className="space-y-1">
            <a href="#" className={`flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-lg ${sidebarCollapsed ? 'justify-center' : ''}`} title={sidebarCollapsed ? 'Leads' : ''}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {!sidebarCollapsed && 'Leads'}
            </a>
            <a href="#" className={`flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg ${sidebarCollapsed ? 'justify-center' : ''}`} title={sidebarCollapsed ? 'Dashboard' : ''}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              {!sidebarCollapsed && 'Dashboard'}
            </a>
            <a href="#" className={`flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg ${sidebarCollapsed ? 'justify-center' : ''}`} title={sidebarCollapsed ? 'Follow-Ups' : ''}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {!sidebarCollapsed && 'Follow-Ups'}
            </a>
            <a href="#" className={`flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg ${sidebarCollapsed ? 'justify-center' : ''}`} title={sidebarCollapsed ? 'Sales Activity' : ''}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              {!sidebarCollapsed && 'Sales Activity'}
            </a>
            <a href="#" className={`flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg ${sidebarCollapsed ? 'justify-center' : ''}`} title={sidebarCollapsed ? 'Products' : ''}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              {!sidebarCollapsed && 'Products'}
            </a>
            <a href="#" className={`flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg ${sidebarCollapsed ? 'justify-center' : ''}`} title={sidebarCollapsed ? 'Notifications' : ''}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM15 17H9a4 4 0 01-4-4V5a2 2 0 012-2h4" />
              </svg>
              {!sidebarCollapsed && 'Notifications'}
            </a>
            <a href="#" className={`flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg ${sidebarCollapsed ? 'justify-center' : ''}`} title={sidebarCollapsed ? 'Settings' : ''}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {!sidebarCollapsed && 'Settings'}
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
              <p className="text-sm text-gray-600">Manage and track your leads</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 2v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filters
                </button>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Clear all filters"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Lead
              </button>
            </div>
          </div>
        </header>

        {/* Search Bar */}
        <div className="bg-white px-6 py-4 border-b border-gray-200">
          <div className="relative">
            <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 p-6 bg-gray-50">
          <LeadList leads={filteredLeads} />
        </main>
      </div>

      {/* Add Lead Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Add Lead</h3>
          <button 
            onClick={() => setIsAddModalOpen(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <LeadForm
          onSuccess={() => {
            setIsAddModalOpen(false);
            fetchLeads();
          }}
        />
      </Modal>

      {/* Filters Modal */}
      <Modal isOpen={showFilters} onClose={() => setShowFilters(false)}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Advanced Filters</h3>
          <button 
            onClick={() => setShowFilters(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-6">
          {/* Match Condition */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">Match</label>
            <div className="flex gap-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="condition"
                  value="AND"
                  checked={filterCondition === "AND"}
                  onChange={(e) => setFilterCondition(e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-900">ALL conditions (AND)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="condition"
                  value="OR"
                  checked={filterCondition === "OR"}
                  onChange={(e) => setFilterCondition(e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-900">ANY condition (OR)</span>
              </label>
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-4">
            <div className="w-48">
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select status</option>
                <option value="Follow-Up">Follow-Up</option>
                <option value="Qualified">Qualified</option>
                <option value="Converted">Converted</option>
                <option value="New">New</option>
              </select>
            </div>
            {statusFilter && (
              <button
                onClick={() => setStatusFilter("")}
                className="mt-6 p-2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <button className="mt-6 px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
              Add Filter
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("");
                setFilterCondition("AND");
              }}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Clear
            </button>
            <button 
              onClick={() => setShowFilters(false)}
              className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default App;