import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { toast } from './use-toast';

/**
 * Custom hook for mutations with optimistic updates and automatic cache invalidation
 * This ensures real-time sync between admin panel changes and frontend display
 */
export function useOptimisticMutation<TData = unknown, TError = Error, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: {
    queryKeys?: string[][]; // Query keys to invalidate after mutation
    successMessage?: string;
    errorMessage?: string;
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: TError, variables: TVariables) => void;
  }
) {
  const queryClient = useQueryClient();

  return useMutation<TData, TError, TVariables>({
    mutationFn,
    onSuccess: (data, variables) => {
      // Invalidate all specified query keys for real-time sync
      if (options?.queryKeys) {
        options.queryKeys.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey });
        });
      }

      // Show success toast
      if (options?.successMessage) {
        toast({
          title: 'Success',
          description: options.successMessage,
        });
      }

      // Call custom onSuccess handler
      options?.onSuccess?.(data, variables);
    },
    onError: (error, variables) => {
      // Show error toast
      const errorMessage = options?.errorMessage || 'An error occurred';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });

      // Call custom onError handler
      options?.onError?.(error, variables);
    },
  });
}
