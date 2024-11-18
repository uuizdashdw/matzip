// Axios
import axiosInstance from './axios';

// Type
import { Category, Profile } from '../types/domain';

// Util
import { getEncryptStorage } from '../utils';

// 회원가입
type RequestUser = {
  email: string;
  password: string;
};

const postSignup = async ({ email, password }: RequestUser): Promise<void> => {
  const { data } = await axiosInstance.post('auth/signup', {
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
  const { data } = await axiosInstance.post('auth/signin', {
    email,
    password,
  });

  return data;
};

// 로그인 유저 조회
type ResponseProfile = Profile & Category;

const getProfile = async (): Promise<ResponseProfile> => {
  const { data } = await axiosInstance.get('auth/me');
  return data;
};

// AccessToken 조회
// getAccessToken API 를 호출할 때 EncryptStorage 에 저장되어 있는
// refreshToken 을 불러와 { data } 를 불러올 때 headers 에 넣어준다.
// refreshToken 발행 성공 자체가 이미 로그인 기록이 있기 때문.
const getAccessToken = async (): Promise<ResponseToken> => {
  const refreshToken = await getEncryptStorage('refreshToken');
  const { data } = await axiosInstance.get('auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return data;
};

// 로그아웃
const logout = async () => {
  await axiosInstance.post('auth/logout');
};

export { postSignup, postLogin, getProfile, getAccessToken, logout };
export type { RequestUser, ResponseToken, ResponseProfile };
