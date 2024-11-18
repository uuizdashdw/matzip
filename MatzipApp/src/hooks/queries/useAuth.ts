// React Query 는 데이터 패칭을 위한 useQuery 와
// 데이터 업데이트를 위한 useMutataion 을 제공한다.
// 위 2가지를 맵핑하는 커스텀 훅이다.

import { useMutation, useQuery } from '@tanstack/react-query';

// API
import {
  getAccessToken,
  getProfile,
  postLogin,
  postSignup,
} from '../../api/auth';

// Type
import {
  UseMutaionCustomOptions,
  UseQueryCustomOptions,
} from '../../types/common';

// Utils
import { removeEcryptStorage, setEncryptStorage } from '../../utils';
import { removeHeader, setHeader } from '../../utils/header';

// Hook
import { useEffect } from 'react';

// API
import queryClient from '../../api/queryClient';

// V5
function useSignup(mutationOptions?: UseMutaionCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    throwOnError: error => Number(error.response?.status) >= 500,
    ...mutationOptions,
  });
}

// V4
// function useSignup() {
//   return useMutation(postSignup, {
//     onSuccess: () => {},
//   });
// }

function useLogin(mutationOptions?: UseMutaionCustomOptions) {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: ({ accessToken, refreshToken }) => {
      // setHeader 파일 들어가서 설명 참고.
      setHeader('Authorization', `Bearer ${accessToken}`);
      setEncryptStorage('refreshToken', refreshToken);
    },

    onSettled: () => {
      // 첫 로그인 후 옵션에 따라 로직 훅 호출
      queryClient.refetchQueries({ queryKey: ['auth', 'getAccessToken'] });

      // 로그인 한 뒤, 다시 남아있는 프로필 데이터도 변경해야할 수 있기 때문에
      // 쿼리를 stale 한 데이터로 만듦으로써 useGetProfile 훅을 한번 무효화
      queryClient.invalidateQueries({ queryKey: ['auth', 'getProfile'] });
    },
    throwOnError: error => Number(error.response?.status) >= 500,

    ...mutationOptions,
  });
}

// Refresh Token 으로 AccessToken 갱신
// 첫 로그인 후 옵션에 따라 로직이 돌도록 해야함.
function useGetRefreshToken() {
  const { isSuccess, isError, data } = useQuery({
    // 캐싱된 데이터 식별하는 쿼리의 고유 키
    queryKey: ['auth', 'getAccessToken'],
    // 서버에 요청을 보내고 결과(AccessToken)를 반환
    queryFn: getAccessToken,
    // 설정된 시간동안 데이터를 가져오지 않고 캐시된 데이터 사용
    staleTime: 1000 * 60 * 30 - 1000 * 60 * 3,
    // 설정된 시간 주기에 따라 리패치
    refetchInterval: 1000 * 60 * 30 - 1000 * 60 * 3,
    // 앱을 종료하지 않고 다른 작업 후 돌아와도 자동 갱신
    refetchOnReconnect: true,
    // 앱을 백그라운드로 전환했을 때도 데이터 자동 갱신
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (isSuccess) {
      // AccessToken 갱신
      // setHeader 파일 들어가서 설명 참고.
      setHeader('Authorization', `$Bearer ${data.accessToken}`);
      // RefreshToken 갱신
      setEncryptStorage('refreshToken', data.refreshToken);

      console.log('## 리프레시 토큰 성공 :: ', isSuccess);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeader('Authorization');
      removeEcryptStorage('refreshToken');

      console.log('## 리프레시 토큰 실패 :: ', isError);
    }
  }, [isError]);

  return { isSuccess, isError };
}

// 로그인 후 프로필 조회
function useGetProfile(queryOptions?: UseQueryCustomOptions) {
  return useQuery({
    queryKey: ['auth', 'getProfile'],
    queryFn: getProfile,
    ...queryOptions,
  });
}

function useAuth() {
  const signupMutation = useSignup();
  const refreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({
    // 이 훅이 true 일 때 쿼리가 실행될 수 있도록 해주는 옵션.
    // 즉, refreshToken 이 성공했다면 profileQuery 도 가져오면 되기 때문.
    // refreshTokenQuery 가 성공한 이후에 프로필을 가져오도록 함.
    enabled: refreshTokenQuery.isSuccess,
  });
  // 로그인 성공 여부
  const isLogin = getProfileQuery.isSuccess;
  const loginMutation = useLogin();

  return { signupMutation, loginMutation, isLogin, getProfileQuery };
}

export default useAuth;