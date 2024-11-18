import axiosInstance from '../api/axios';

function setHeader(key: string, value: string) {
  // AccessToken Header 에 세팅
  // 하지만 대부분의 요청은 Header 에 AccessToken 이 있어야함.
  // 그때마다 AccessToken 을 Header 에 넣기 보다는
  // 기본적으로 Header 에 넣어놓을 수 있음.
  // 아래와 같이 하면 요청에 일일히 헤더를 설정해주지 않고 디폴트로 헤더가 들어가게 됨.
  axiosInstance.defaults.headers.common[key] = value;
}

function removeHeader(key: string) {
  if (!axiosInstance.defaults.headers.common[key]) {
    return;
  }

  delete axiosInstance.defaults.headers.common[key];
}

export { setHeader, removeHeader };
