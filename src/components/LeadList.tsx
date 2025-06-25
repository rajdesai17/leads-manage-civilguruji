import React, { useState } from "react";
import { Lead } from "./LeadForm";

interface LeadListProps {
  leads: Lead[];
}

const LeadList: React.FC<LeadListProps> = ({ leads }) => {
  const [sortField, setSortField] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRowExpansion = (leadId: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(leadId)) {
      newExpandedRows.delete(leadId);
    } else {
      newExpandedRows.add(leadId);
    }
    setExpandedRows(newExpandedRows);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedLeads = [...leads].sort((a, b) => {
    if (!sortField) return 0;
    
    const aValue = (a as any)[sortField] || "";
    const bValue = (b as any)[sortField] || "";
    
    if (sortDirection === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      "Follow-Up": "bg-orange-100 text-orange-700 border-orange-200",
      "Qualified": "bg-green-100 text-green-700 border-green-200",
      "Converted": "bg-purple-100 text-purple-700 border-purple-200",
      "New": "bg-blue-100 text-blue-700 border-blue-200",
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyles[status as keyof typeof statusStyles] || "bg-gray-100 text-gray-700 border-gray-200"}`}>
        {status}
      </span>
    );
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) {
      return (
        <svg className="w-3 h-3 text-gray-400 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    
    return sortDirection === "asc" ? (
      <svg className="w-3 h-3 text-blue-600 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-3 h-3 text-blue-600 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  if (leads.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No leads found</h3>
        <p className="text-gray-600">Get started by adding your first lead.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="overflow-hidden">
        <table className="min-w-full">
        <thead>
            <tr className="border-b border-gray-200 bg-gray-50/50">
              <th 
                onClick={() => handleSort("name")}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none"
              >
                <div className="flex items-center">
                  Name
                  <SortIcon field="name" />
                </div>
              </th>
              <th 
                onClick={() => handleSort("phone")}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none"
              >
                <div className="flex items-center">
                  Contact
                  <SortIcon field="phone" />
                </div>
              </th>
              <th 
                onClick={() => handleSort("status")}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none"
              >
                <div className="flex items-center">
                  Status
                  <SortIcon field="status" />
                </div>
              </th>
              <th 
                onClick={() => handleSort("qualification")}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none"
              >
                <div className="flex items-center">
                  Qualification
                  <SortIcon field="qualification" />
                </div>
              </th>
              <th 
                onClick={() => handleSort("interestField")}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none"
              >
                <div className="flex items-center">
                  Interest
                  <SortIcon field="interestField" />
                </div>
              </th>
              <th 
                onClick={() => handleSort("source")}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none"
              >
                <div className="flex items-center">
                  Source
                  <SortIcon field="source" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assigned To
              </th>
              <th 
                onClick={() => handleSort("updatedAt")}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none"
              >
                <div className="flex items-center">
                  Updated At
                  <SortIcon field="updatedAt" />
                </div>
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8">
                {/* Empty header for expand button column */}
              </th>
          </tr>
        </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedLeads.map((lead, index) => {
              const leadId = lead._id || lead.email;
              const isExpanded = expandedRows.has(leadId);
              
              return (
                <React.Fragment key={leadId}>
                                     {/* Main Row */}
                   <tr className="hover:bg-gray-50/50 transition-colors">
                     <td className="px-4 py-4 whitespace-nowrap">
                       <div className="text-sm font-medium text-blue-500 hover:text-blue-800 cursor-pointer">
                         {lead.name}
                       </div>
                     </td>
                     <td className="px-4 py-4 whitespace-nowrap">
                       <div className="text-sm font-medium text-gray-900">{lead.phone}</div>
                       <div className="text-sm font-medium text-gray-500">{lead.email}</div>
                     </td>
                     <td className="px-4 py-4 whitespace-nowrap">
                       {getStatusBadge(lead.status)}
                     </td>
                     <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                       {lead.qualification}
                     </td>
                     <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                       {lead.interestField}
                     </td>
                     <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                       {lead.source}
                     </td>
                     <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                       {lead.assignedTo}
                     </td>
                     <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                       {new Date(lead.updatedAt || lead.createdAt || '').toLocaleDateString('en-US', {
                         month: 'short',
                         day: 'numeric',
                         year: 'numeric'
                       })}
                       <div className="text-xs font-medium text-gray-400">
                         {new Date(lead.updatedAt || lead.createdAt || '').toLocaleTimeString('en-US', {
                           hour: '2-digit',
                           minute: '2-digit'
                         })}
                       </div>
                     </td>
                     <td className="px-2 py-4 whitespace-nowrap w-8">
                       <button
                         onClick={() => toggleRowExpansion(leadId)}
                         className="p-1 rounded hover:bg-gray-200 transition-colors"
                       >
                         <svg 
                           className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
                           fill="none" 
                           stroke="currentColor" 
                           viewBox="0 0 24 24"
                         >
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                         </svg>
                       </button>
                     </td>
                   </tr>
                  
                                     {/* Expanded Details Row */}
                   {isExpanded && (
                     <tr className="bg-gray-50/30">
                       <td colSpan={9} className="px-4 py-4">
                        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm relative z-10">
                          <h4 className="text-sm font-semibold text-gray-900 mb-3">Additional Details</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Contact Information */}
                            <div className="space-y-2">
                              <h5 className="text-xs font-medium text-gray-700 uppercase tracking-wider">Contact Info</h5>
                              {lead.altPhone && (
                                <div>
                                  <span className="text-xs text-gray-500">Alt. Phone:</span>
                                  <p className="text-sm text-gray-900">{lead.altPhone}</p>
                                </div>
                              )}
                              {lead.altEmail && (
                                <div>
                                  <span className="text-xs text-gray-500">Alt. Email:</span>
                                  <p className="text-sm text-gray-900">{lead.altEmail}</p>
                                </div>
                              )}
                            </div>

                            {/* Location Information */}
                            <div className="space-y-2">
                              <h5 className="text-xs font-medium text-gray-700 uppercase tracking-wider">Location</h5>
                              {lead.state && (
                                <div>
                                  <span className="text-xs text-gray-500">State:</span>
                                  <p className="text-sm text-gray-900">{lead.state}</p>
                                </div>
                              )}
                              {lead.city && (
                                <div>
                                  <span className="text-xs text-gray-500">City:</span>
                                  <p className="text-sm text-gray-900">{lead.city}</p>
                                </div>
                              )}
                            </div>

                            {/* Professional Information */}
                            <div className="space-y-2">
                              <h5 className="text-xs font-medium text-gray-700 uppercase tracking-wider">Professional</h5>
                              {lead.jobInterest && (
                                <div>
                                  <span className="text-xs text-gray-500">Job Interest:</span>
                                  <p className="text-sm text-gray-900">{lead.jobInterest}</p>
                                </div>
                              )}
                              {lead.passoutYear && (
                                <div>
                                  <span className="text-xs text-gray-500">Passout Year:</span>
                                  <p className="text-sm text-gray-900">{lead.passoutYear}</p>
                                </div>
                              )}
                              {lead.heardFrom && (
                                <div>
                                  <span className="text-xs text-gray-500">Heard From:</span>
                                  <p className="text-sm text-gray-900">{lead.heardFrom}</p>
                                </div>
                              )}
                            </div>

                            {/* Timestamps */}
                            <div className="space-y-2">
                              <h5 className="text-xs font-medium text-gray-700 uppercase tracking-wider">Timeline</h5>
                              {lead.createdAt && (
                                <div>
                                  <span className="text-xs text-gray-500">Created:</span>
                                  <p className="text-sm text-gray-900">
                                    {new Date(lead.createdAt).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
            </tr>
                  )}
                </React.Fragment>
              );
            })}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default LeadList; 