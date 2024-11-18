import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // 요청 실패 시 3번 재요청 비활성화
    },
    mutations: {
      retry: false, // 요청 실패 시 3번 재요청 비활성화
    },
  },
});

export default queryClient;
