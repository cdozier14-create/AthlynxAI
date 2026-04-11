// tRPC mock client — replace with real implementation when backend is connected
const createMockProcedure = () => ({
  useQuery: (_input?: any, _opts?: any) => ({ data: null, isLoading: false, error: null, refetch: async () => ({ data: null }) }),
  useMutation: (_opts?: any) => ({ mutate: async () => {}, mutateAsync: async () => {}, isLoading: false }),
  useInfiniteQuery: (_input?: any, _opts?: any) => ({ data: null, isLoading: false, fetchNextPage: async () => {} }),
});

const createMockRouter = (): any =>
  new Proxy({}, {
    get: (_target, prop) => {
      if (prop === 'useUtils') return () => ({});
      return new Proxy(createMockProcedure(), {
        get: (target: any, key) => {
          if (key in target) return target[key];
          return createMockRouter();
        }
      });
    }
  });

export const trpc = createMockRouter();
