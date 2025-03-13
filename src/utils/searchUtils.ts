
import { ActivePresentation, UpcomingPresentation } from '@/types/dashboard';

interface FilterCriteria {
  presenter?: string;
  room?: string;
  waveTime?: string;
}

export function searchPresentations(
  activeList: ActivePresentation[],
  upcomingList: UpcomingPresentation[],
  searchTerm: string = '',
  filters: FilterCriteria = {}
) {
  // Function to apply search and filters
  const applyFilters = <T extends ActivePresentation | UpcomingPresentation>(
    presentations: T[],
    term: string,
    criteria: FilterCriteria
  ): T[] => {
    return presentations.filter(presentation => {
      // Search term filter
      const matchesSearch = term === '' || 
        presentation.title.toLowerCase().includes(term.toLowerCase()) ||
        presentation.presenter.toLowerCase().includes(term.toLowerCase());
      
      // Room filter
      const matchesRoom = !criteria.room || presentation.roomNumber === criteria.room;
      
      // Wave time filter
      const matchesWave = !criteria.waveTime || presentation.waveTime === criteria.waveTime;
      
      // Presenter filter
      const matchesPresenter = !criteria.presenter || presentation.presenter === criteria.presenter;
      
      return matchesSearch && matchesRoom && matchesWave && matchesPresenter;
    });
  };
  
  // Apply filters to active and upcoming presentations
  const filteredActive = applyFilters(activeList, searchTerm, filters);
  const filteredUpcoming = applyFilters(upcomingList, searchTerm, filters);
  
  return {
    active: filteredActive,
    upcoming: filteredUpcoming
  };
}
