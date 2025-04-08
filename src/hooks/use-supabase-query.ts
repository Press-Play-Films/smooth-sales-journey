
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "sonner";

// Hook for fetching data with react-query
export function useSupabaseQuery(key: string | string[], queryFn: () => Promise<any>, options = {}) {
  return useQuery({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn,
    ...options
  });
}

// Hook for mutations with react-query
export function useSupabaseMutation(
  key: string | string[],
  mutationFn: (data: any) => Promise<any>,
  options = {}
) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn,
    onSuccess: (data, variables, context) => {
      // Invalidate queries when mutation is successful
      queryClient.invalidateQueries({ queryKey: Array.isArray(key) ? key : [key] });
      
      // Call onSuccess from options if provided
      if (options && 'onSuccess' in options && typeof options.onSuccess === 'function') {
        options.onSuccess(data, variables, context);
      }
    },
    onError: (error: any) => {
      // Show error toast by default
      toast.error(error.message || 'An error occurred');
      
      // Call onError from options if provided
      if (options && 'onError' in options && typeof options.onError === 'function') {
        options.onError(error);
      }
    },
    ...options
  });
}
