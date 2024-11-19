// Axios
import axiosInstance from './axios';

// Type
import { Category, Profile } from '../types/domain';

// Util
import { getEncryptStorage } from '../utils';
import { AxiosError } from 'axios';
import { setHeader } from '@/utils/header';

// 회원가입
type RequestUser = {
  email: string;
  password: string;
};

const postSignup = async ({ email, password }: RequestUser): Promise<void> => {
  const { data } = await axiosInstance.post('/auth/signup', {
    email,
    password,
  });

  return data;
};

// 로그인
type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

const postLogin = async ({
  email,
  password,
}: RequestUser): Promise<ResponseToken> => {
  const { data } = await axiosInstance.post('/auth/signin', {
    email,
    password,
  });

  return data;
};

// 로그인 유저 조회
type ResponseProfile = Profile & Category;

const getProfile = async (): Promise<ResponseProfile> => {
  try {
    const { data } = await axiosInstance.get('/auth/me');
    return data;
  } catch (err) {
    // 인증 관련 오류 핸들링
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      try {
        const { accessToken } = await getAccessToken();
        setHeader('Authorization', `Bearer ${accessToken}`);

        const { data } = await axiosInstance.get('/auth/me');
        return data;
      } catch (refreshError) {
        // 토큰 갱신 실패 시 로그아웃 처리 또는 에러 처리
        throw new Error('로그인 상태가 유효하지 않습니다.'); // 예시 에러 메시지
      }
    }
    throw err;
  }
};

// AccessToken 조회
// getAccessToken API 를 호출할 때 EncryptStorage 에 저장되어 있는
// refreshToken 을 불러와 { data } 를 불러올 때 headers 에 넣어준다.
// refreshToken 발행 성공 자체가 이미 로그인 기록이 있기 때문.
const getAccessToken = async (): Promise<ResponseToken> => {
  const refreshToken = await getEncryptStorage('refreshToken');
  const { data } = await axiosInstance.get('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return data;
};

// 로그아웃
const logout = async () => {
  try {
    await axiosInstance.post('/auth/logout');
  } catch (err) {
    console.error('로그아웃 실패', err);
  }
};

export { postSignup, postLogin, getProfile, getAccessToken, logout };
export type { RequestUser, ResponseToken, ResponseProfile };
