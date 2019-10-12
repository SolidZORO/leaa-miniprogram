import Taro, { useEffect, useState } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';

import { Oauth } from '@leaa/common/src/entrys';
import { LoginButton } from '@/pages/account/_components/LoginButton/LoginButton';
import { LogoutButton } from '@/pages/account/_components/LogoutButton/LogoutButton';
import { UserCard } from '@/pages/account/_components/UserCard/UserCard';

import style from './style.less';

export const Account = () => {
  const getUserInfo = (): Oauth => Taro.getStorageSync('userInfo');
  const [hash, setHash] = useState<number>(0);

  useEffect(() => {
    console.log(getUserInfo());
  }, [hash]);

  const onLogEvent = (e: number) => {
    setHash(e);
  };

  return (
    <View className={style['wrapper']}>
      <UserCard userInfo={getUserInfo()} />

      {getUserInfo() ? <LogoutButton onLogoutCallback={onLogEvent} /> : <LoginButton onLoginCallback={onLogEvent} />}
    </View>
  );
};
