
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from "@/components/ui/button";
import { demoActivePresentations, demoUpcomingPresentations } from '@/utils/demoData';
import { searchPresentations } from '@/utils/searchUtils';
import NewPresentationForm from '@/components/presentation/NewPresentationForm';
import PresentationFilters from '@/components/presentation/PresentationFilters';
import PresentationList from '@/components/presentation/PresentationList';

const PresentationsPage: React.FC = () => {
  const [showNewPresentationForm, setShowNewPresentationForm] = useState(false);
  
  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedWave, setSelectedWave] = useState('');
  const [selectedPresenter, setSelectedPresenter] = useState('');

  // Get unique list of rooms
  const allRooms = [
    ...new Set([
      ...demoActivePresentations.map(p => p.roomNumber),
      ...demoUpcomingPresentations.map(p => p.roomNumber)
    ])
  ].sort();

  // Get unique list of presenters
  const allPresenters = [
    ...new Set([
      ...demoActivePresentations.map(p => p.presenter),
      ...demoUpcomingPresentations.map(p => p.presenter)
    ])
  ].sort();

  // Filter presentations based on search and filters
  const filteredPresentations = searchPresentations(
    demoActivePresentations,
    demoUpcomingPresentations,
    searchTerm,
    {
      presenter: selectedPresenter,
      room: selectedRoom,
      waveTime: selectedWave
    }
  );

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedRoom('');
    setSelectedWave('');
    setSelectedPresenter('');
  };

  const openNewPresentationForm = () => {
    setShowNewPresentationForm(true);
  };
  
  const closeNewPresentationForm = () => {
    setShowNewPresentationForm(false);
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-brio-navy">Presentations</h2>
          <Button 
            onClick={openNewPresentationForm}
            className="bg-brio-navy hover:bg-brio-navy/90"
          >
            <span className="mr-2">+</span> New Presentation
          </Button>
        </div>
        
        {/* Search and filters */}
        <PresentationFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
          selectedWave={selectedWave}
          setSelectedWave={setSelectedWave}
          selectedPresenter={selectedPresenter}
          setSelectedPresenter={setSelectedPresenter}
          allRooms={allRooms}
          allPresenters={allPresenters}
          clearFilters={clearFilters}
        />
        
        {/* Active Presentations */}
        <PresentationList
          title="Active Presentations"
          presentations={filteredPresentations.active}
          status="active"
        />
        
        {/* Upcoming Presentations */}
        <PresentationList
          title="Upcoming Presentations"
          presentations={filteredPresentations.upcoming}
          status="scheduled"
        />
        
        {/* New Presentation Form Modal */}
        {showNewPresentationForm && (
          <NewPresentationForm onClose={closeNewPresentationForm} />
        )}
      </div>
    </Layout>
  );
};

export default PresentationsPage;
