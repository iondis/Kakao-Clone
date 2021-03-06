
import { SocialBox } from 'components/Login/SocialLogin';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { loginProcess } from 'src/containers/Login/loginProcess';
import { app, providerType } from 'src/firebase/Firebase';
import { asyncToken } from 'src/reducer/token';

const socialContainer: React.SFC = () => {
  const dispatch = useDispatch()
  const onClick = async (provider: providerType) => {
    const sign = await app.auth().signInWithPopup(provider)
    const user = loginProcess(sign);
    dispatch(asyncToken(user))
  }

  return <SocialBox LoginEvent={onClick} />
};

export { socialContainer as SocialContainer };

