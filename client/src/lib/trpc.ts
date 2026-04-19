// tRPC mock client — all methods return safe defaults
const createMockProcedure = () => ({
  useQuery: (_input?: any, _opts?: any) => ({ data: null, isLoading: false, error: null, refetch: async () => ({ data: null }) }),
  useMutation: (_opts?: any) => ({ mutate: (_input?: any) => {}, mutateAsync: async (_input?: any) => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, reset: () => {} }),
  useInfiniteQuery: (_input?: any, _opts?: any) => ({ data: null, isLoading: false, fetchNextPage: async () => {} }),
  useInitialization: (_opts?: any) => ({ data: null, isLoading: false }),
  useSubscription: (_input?: any, _opts?: any) => ({ data: null }),
});

const createMockRouter = (): any =>
  new Proxy({}, {
    get: (_target, prop) => {
      if (prop === 'useUtils') return () => ({ invalidate: async () => {}, refetch: async () => {}, setData: () => {}, getData: () => null });
      if (prop === 'Provider') return ({ children }: any) => children;
      if (prop === 'createClient') return () => ({});
      return new Proxy(createMockProcedure(), {
        get: (target: any, key) => {
          if (key in target) return target[key];
          return createMockRouter();
        }
      });
    }
  });

export const trpc = createMockRouter();
