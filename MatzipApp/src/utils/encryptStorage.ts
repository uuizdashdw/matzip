import EncryptedStorage from 'react-native-encrypted-storage';

// 스토리지 저장
const setEncryptStorage = async <T>(key: string, data: T) => {
  await EncryptedStorage.setItem(key, JSON.stringify(data));
};

// 스토리지 조회
const getEncryptStorage = async (key: string) => {
  const storedData = await EncryptedStorage.getItem(key);

  return storedData ? JSON.parse(storedData) : null;
};

// 스토리지 삭제
const removeEcryptStorage = async (key: string) => {
  const data = await getEncryptStorage(key);

  if (data) {
    await EncryptedStorage.removeItem(key);
  }
};

export { setEncryptStorage, getEncryptStorage, removeEcryptStorage };
