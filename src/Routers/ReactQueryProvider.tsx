import { QueryClient, QueryClientProvider } from "react-query";

type propsType = {
  children: React.ReactNode;
};
export default function ReactQueryProvider({ children }: propsType) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
