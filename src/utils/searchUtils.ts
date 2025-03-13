
import { ActivePresentation, UpcomingPresentation, Client, TeamMemberAssignment } from '@/types/dashboard';
import { format } from 'date-fns';

// Function to search for clients by various criteria
export const searchClients = (
  clients: Client[], 
  searchTerm: string = '',
  filters: {
    status?: string;
    location?: string;
    room?: string;
    waveTime?: string;
  } = {}
) => {
  return clients.filter(client => {
    // Filter by search term
    const matchesSearch = searchTerm === '' || 
      client.names.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by status if selected
    const matchesStatus = !filters.status || client.status === filters.status;
    
    // Filter by location if selected
    const matchesLocation = !filters.location || client.location === filters.location;
    
    // Filter by room if selected
    const matchesRoom = !filters.room || client.roomNumber === filters.room;
    
    // Filter by wave time if selected
    const matchesWaveTime = !filters.waveTime || client.presentationTime === filters.waveTime;
    
    return matchesSearch && matchesStatus && matchesLocation && matchesRoom && matchesWaveTime;
  });
};

// Function to search presentations by various criteria
export const searchPresentations = (
  activePresentations: ActivePresentation[],
  upcomingPresentations: UpcomingPresentation[],
  searchTerm: string = '',
  filters: {
    presenter?: string;
    date?: Date;
    room?: string;
    waveTime?: string;
  } = {}
) => {
  const filterActive = activePresentations.filter(presentation => {
    // Filter by search term (presentation title)
    const matchesSearch = searchTerm === '' || 
      presentation.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by presenter if selected
    const matchesPresenter = !filters.presenter || 
      presentation.presenter.toLowerCase().includes(filters.presenter.toLowerCase());
    
    // Filter by date if selected
    const matchesDate = !filters.date || 
      format(presentation.startTime, 'yyyy-MM-dd') === format(filters.date, 'yyyy-MM-dd');
    
    // Filter by room if selected
    const matchesRoom = !filters.room || presentation.roomNumber === filters.room;
    
    // Filter by wave time if selected
    const matchesWaveTime = !filters.waveTime || presentation.waveTime === filters.waveTime;
    
    return matchesSearch && matchesPresenter && matchesDate && matchesRoom && matchesWaveTime;
  });
  
  const filterUpcoming = upcomingPresentations.filter(presentation => {
    // Filter by search term (presentation title)
    const matchesSearch = searchTerm === '' || 
      presentation.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by presenter if selected
    const matchesPresenter = !filters.presenter || 
      presentation.presenter.toLowerCase().includes(filters.presenter.toLowerCase());
    
    // Filter by date if selected
    const matchesDate = !filters.date || 
      format(presentation.startTime, 'yyyy-MM-dd') === format(filters.date, 'yyyy-MM-dd');
    
    // Filter by room if selected
    const matchesRoom = !filters.room || presentation.roomNumber === filters.room;
    
    // Filter by wave time if selected
    const matchesWaveTime = !filters.waveTime || presentation.waveTime === filters.waveTime;
    
    return matchesSearch && matchesPresenter && matchesDate && matchesRoom && matchesWaveTime;
  });
  
  return { active: filterActive, upcoming: filterUpcoming };
};

// Function to search team members by various criteria
export const searchTeamMembers = (
  teamMembers: TeamMemberAssignment[],
  searchTerm: string = '',
  filters: {
    role?: string;
    room?: string;
    waveTime?: string;
  } = {}
) => {
  return teamMembers.filter(member => {
    // Filter by search term (member name)
    const matchesSearch = searchTerm === '' || 
      member.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by role if selected
    const matchesRole = !filters.role || member.role === filters.role;
    
    // Filter by room if selected
    const matchesRoom = !filters.room || 
      member.waveAssignments.some(assignment => 
        assignment.roomNumbers.includes(filters.room || '')
      );
    
    // Filter by wave time if selected
    const matchesWaveTime = !filters.waveTime || 
      member.waveAssignments.some(assignment => 
        assignment.time === filters.waveTime
      );
    
    return matchesSearch && matchesRole && matchesRoom && matchesWaveTime;
  });
};

