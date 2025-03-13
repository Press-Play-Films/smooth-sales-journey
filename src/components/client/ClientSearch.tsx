
import React, { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Client } from '@/types/dashboard';
import { getStatusStyles } from '@/utils/clientUtils';

interface ClientSearchProps {
  clients: Client[];
  onFilteredClientsChange?: (clients: Client[]) => void;
}

const ClientSearch: React.FC<ClientSearchProps> = ({ 
  clients, 
  onFilteredClientsChange 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [locationFilter, setLocationFilter] = useState<string | null>(null);
  const [filteredClients, setFilteredClients] = useState<Client[]>(clients);
  const [activeFilters, setActiveFilters] = useState<number>(0);

  // Extract unique locations from clients
  const locations = [...new Set(clients.filter(client => client.location).map(client => client.location))];

  useEffect(() => {
    const filtered = clients.filter(client => {
      // Filter by search term (client names)
      const matchesSearch = searchTerm === '' || 
        client.names.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by status if selected
      const matchesStatus = !statusFilter || client.status === statusFilter;
      
      // Filter by location if selected
      const matchesLocation = !locationFilter || client.location === locationFilter;
      
      return matchesSearch && matchesStatus && matchesLocation;
    });
    
    setFilteredClients(filtered);
    
    // Update parent component with filtered results if callback provided
    if (onFilteredClientsChange) {
      onFilteredClientsChange(filtered);
    }
    
    // Count active filters
    let count = 0;
    if (searchTerm) count++;
    if (statusFilter) count++;
    if (locationFilter) count++;
    setActiveFilters(count);
    
  }, [clients, searchTerm, statusFilter, locationFilter, onFilteredClientsChange]);

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter(null);
    setLocationFilter(null);
  };
  
  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search clients by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-2.5 text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        {/* Filters */}
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="flex gap-2 h-10"
                aria-label="Filter clients"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                {activeFilters > 0 && (
                  <Badge variant="secondary" className="ml-1 bg-brio-navy text-white">
                    {activeFilters}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium">Filter Clients</h4>
                <Separator />
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select 
                    value={statusFilter || ""} 
                    onValueChange={(value) => setStatusFilter(value || null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Statuses</SelectItem>
                      <SelectItem value="engaged">Engaged</SelectItem>
                      <SelectItem value="distracted">Distracted</SelectItem>
                      <SelectItem value="away">Away</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Select 
                    value={locationFilter || ""} 
                    onValueChange={(value) => setLocationFilter(value || null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Locations</SelectItem>
                      {locations.map((location, index) => (
                        <SelectItem key={index} value={location || ""}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-between pt-2">
                  <Button variant="outline" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                  <Button size="sm" className="bg-brio-navy hover:bg-brio-navy/90">
                    Apply
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          {activeFilters > 0 && (
            <Button variant="ghost" onClick={clearFilters} className="h-10">
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
          )}
        </div>
      </div>
      
      {/* Show result count */}
      <div className="text-sm text-gray-500">
        {filteredClients.length === 0 ? (
          <p>No clients match your search criteria</p>
        ) : (
          <p>
            Showing {filteredClients.length} {filteredClients.length === 1 ? 'client' : 'clients'}
            {activeFilters > 0 ? ' with applied filters' : ''}
          </p>
        )}
      </div>
      
      {/* Display filter tags */}
      {activeFilters > 0 && (
        <div className="flex flex-wrap gap-2">
          {statusFilter && (
            <FilterTag 
              label={`Status: ${getStatusStyles(statusFilter).label}`} 
              onRemove={() => setStatusFilter(null)} 
            />
          )}
          {locationFilter && (
            <FilterTag 
              label={`Location: ${locationFilter}`} 
              onRemove={() => setLocationFilter(null)} 
            />
          )}
          {searchTerm && (
            <FilterTag 
              label={`Search: ${searchTerm}`} 
              onRemove={() => setSearchTerm('')} 
            />
          )}
        </div>
      )}
    </div>
  );
};

// Helper component for filter tags
const FilterTag: React.FC<{ label: string; onRemove: () => void }> = ({ label, onRemove }) => {
  return (
    <div className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
      {label}
      <button 
        onClick={onRemove}
        className="ml-1 text-gray-500 hover:text-gray-700"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
};

export default ClientSearch;
