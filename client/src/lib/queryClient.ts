import { QueryClient, QueryFunction } from "@tanstack/react-query";

// Function to handle unauthorized responses
const handleUnauthorized = () => {
  // Clear auth data
  localStorage.removeItem('cms-jwt');
  localStorage.removeItem('cms-user');
  
  // Get current path to redirect back after login
  const currentPath = window.location.pathname;
  const isAdminRoute = currentPath.startsWith('/admin');
  
  // Only redirect if on admin route
  if (isAdminRoute) {
    // Store the return path if it's not the login page itself
    if (currentPath !== '/admin/login') {
      localStorage.setItem('auth-redirect', currentPath);
    }
    
    // Redirect to login
    window.location.href = '/admin/login';
  }
};

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    if (res.status === 401) {
      handleUnauthorized();
    }
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const token = localStorage.getItem('cms-jwt');
  const headers: Record<string, string> = data ? { "Content-Type": "application/json" } : {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(url, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });
  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const token = localStorage.getItem('cms-jwt');
    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
      headers,
    });
    if (res.status === 401) {
      if (unauthorizedBehavior === "returnNull") {
      return null;
      }
      handleUnauthorized();
    }
    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false, // Disable automatic polling (we use manual invalidation)
      refetchOnWindowFocus: true, // Refetch when user returns to tab
      refetchOnMount: true, // Refetch when component mounts
      refetchOnReconnect: true, // Refetch when network reconnects
      staleTime: 0, // Data becomes stale immediately for real-time sync
      gcTime: 5 * 60 * 1000, // Keep unused data in cache for 5 minutes (previously cacheTime)
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      networkMode: 'always',
    },
    mutations: {
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      networkMode: 'always',
      // Automatically refetch queries after mutations
      onSuccess: () => {
        // This ensures related queries are refetched after any mutation
      },
    },
  },
});
