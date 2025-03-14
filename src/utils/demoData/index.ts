// Export all demo data from respective files
export * from './clients';
export * from './presentations';
export * from './sales';
export * from './statistics';
export * from './transfers';
export * from './performance';

/**
 * Hook to retrieve presentation data
 */
export function usePresentations() {
  // This would normally fetch data from an API or context
  return {
    presentations: [
      // Sample presentations data
      {
        id: '1',
        title: 'Luxury Vacation Packages',
        client: 'John & Sarah Thompson',
        date: new Date(),
        room: 'Oceanview Suite',
        status: 'scheduled'
      },
      {
        id: '2',
        title: 'Premium Membership Overview',
        client: 'Robert & Lisa Martinez',
        date: new Date(),
        room: 'Executive Room',
        status: 'completed'
      }
    ],
    status: 'success' as const
  };
}
