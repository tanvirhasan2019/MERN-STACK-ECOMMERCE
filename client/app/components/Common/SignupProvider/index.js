/**
 *
 * SignupProvider
 *
 */

import React from 'react';
import { GoogleLogin } from 'react-google-login';

import { GoogleIcon, FacebookIcon } from '../Icon';
import { BASE_API_URL } from '../../../constants';

const SignupProvider = () => {

  const responseGoogle = (response) => {
    
  }
 
  const googlUrl = `${BASE_API_URL}/auth/google`;
  console.log('GOOGLE URL CHECK ', googlUrl);

  const FacebookYs = `${BASE_API_URL}/auth/facebook`;
  console.log('FACEBOOK LOGIN ', FacebookYs);
  
  return (
    <div className='signup-provider'>
     
      
      <a href={`${BASE_API_URL}/auth/google`} className='mb-2 google-btn'>
        <GoogleIcon />
        <span className='btn-text'>Login with Google</span>
      </a>

      <a href={`${BASE_API_URL}/auth/facebook`} className='facebook-btn'>
        <FacebookIcon />
        <span className='btn-text'>Login with Facebook</span>
      </a>
     

  {  /* <GoogleLogin
        clientId="142668273907-1fo7geu1ne41ac9ng5etdl3rd67m3jlm.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}

      /> */
  }

    </div>
  );
};

export default SignupProvider;
