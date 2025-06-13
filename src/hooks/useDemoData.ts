
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { demoBackendApi, demoWebSocket } from '@/services/demoBackendService';
import { Client, Sale, ActivePresentation } from '@/types/dashboard';
import { toast } from 'sonner';

// Hook for clients data with real-time updates
export const useClientsData = () => {
  const queryClient = useQueryClient();
  
  const query = useQuery({
    queryKey: ['clients'],
    queryFn: demoBackendApi.getClients,
    refetchInterval: 30000, // Refetch every 30 seconds for demo
  });

  // Listen for real-time updates
  useEffect(() => {
    const handleUpdate = (data: any) => {
      if (data.type === 'CLIENT_STATUS_UPDATE') {
        queryClient.setQueryData(['clients'], (oldData: Client[] | undefined) => {
          if (!oldData) return oldData;
          return oldData.map(client => 
            client.id === data.data.id ? data.data : client
          );
        });
        
        toast.info(`Client ${data.data.names} status updated to ${data.data.status}`);
      }
    };

    demoWebSocket.onMessage(handleUpdate);
  }, [queryClient]);

  return query;
};

// Hook for updating client status
export const useUpdateClientStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ clientId, status }: { clientId: string; status: Client['status'] }) =>
      demoBackendApi.updateClientStatus(clientId, status),
    onSuccess: (updatedClient) => {
      queryClient.setQueryData(['clients'], (oldData: Client[] | undefined) => {
        if (!oldData) return oldData;
        return oldData.map(client => 
          client.id === updatedClient.id ? updatedClient : client
        );
      });
      toast.success(`Client status updated successfully`);
    },
    onError: () => {
      toast.error('Failed to update client status');
    }
  });
};

// Hook for sales data
export const useSalesData = () => {
  return useQuery({
    queryKey: ['sales'],
    queryFn: demoBackendApi.getSales,
    refetchInterval: 60000, // Refetch every minute
  });
};

// Hook for presentations data
export const usePresentationsData = () => {
  return useQuery({
    queryKey: ['presentations'],
    queryFn: demoBackendApi.getPresentations,
    refetchInterval: 30000,
  });
};

// Hook for analytics data
export const useAnalyticsData = () => {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: demoBackendApi.getAnalytics,
    refetchInterval: 60000,
  });
};

// Hook for team data
export const useTeamData = () => {
  return useQuery({
    queryKey: ['team'],
    queryFn: demoBackendApi.getTeamMembers,
    refetchInterval: 120000, // Refetch every 2 minutes
  });
};
