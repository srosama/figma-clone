import { useEffect, useState } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../utils/firebase-config';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { googleIcon, outlookIcon, verifyImg } from '../../utils';
import OutLinkBtn from '../../components/common/ui/OutLinkBtn';

const Verify = () => {
  const authUser = useAuth();
  const isEmailVerified = !!authUser.state.user?.emailVerified;

  const [verify, setVerify] = useState(false);
  useEffect(() => {
    setVerify(isEmailVerified);
  }, [isEmailVerified])

  const onSubmitGoogle = () => {
    // Implement logic to open Gmail link
    window.open('https://mail.google.com/', '_blank');
  };


  const onSubmitOutlook = () => {
    // Implement logic to open Outlook mail link
    window.open('https://outlook.live.com/', '_blank');
  };

  const user = useAuth();
  const userEmail = user.state.user?.email;

  // useEffect(() => {
  //   const checkEmailVerification = () => {
  //     onAuthStateChanged(auth, (user) => {
  //       if (user) {
  //         const isEmailVerified = user.emailVerified;
  //         if (isEmailVerified) {
  //           console.log('Email is verified!');
  //           // Redirect the user to the main app or dashboard
  //           // Example: history.push('/dashboard');
  //         } else {
  //           console.log('Email is not verified. Please check your email.');
  //         }
  //       } else {
  //         console.log('No user logged in.');
  //       }
  //     });
  //   };

  //   checkEmailVerification();

  //   return () => {
  //   };
  // }, []); // Empty dependency array ensures effect runs only once

  return (
    <div className='flex flex-col items-center justify-center h-screen pb-32'>
      {verify ? (
        <div className='relative bottom-32 bg-green-600 w-10- text-center p-3 rounded-lg text-white'>
          <h1>YOU ARE VERIFIED SUCCESSFULLY
            <span className='border-b-2 border-white font-semibold'>
              <Link to={"/dashboard"}> GO DASHBOARD</Link>
            </span>
          </h1>
        </div>
      ) : (
        <div className='relative bottom-32 bg-red-600 w-10- text-center p-3 rounded-lg text-white'>
          <h1>YOU ARE NOT VERIFIED
            <span className='border-b-2 border-white font-semibold'>
            </span>
          </h1>
        </div>
      )}

      <div className='text-center '>
        <img src={verifyImg} alt='Verify email' />
        <h2 className='font-semibold mt-4 text-xl'>Check your inbox</h2>
      </div>

      <div className='text-center mt-4 '>
        <p className='text-gray-500'>Click on the link we sent to <b>{userEmail}</b> to finish <br /> setting up your account.</p>
      </div>

      <div className='mt-8 space-y-3 flex-col items-center'>
        <OutLinkBtn brandIcon={googleIcon} onSubmit={onSubmitGoogle} title='Open Gmail' />
        <OutLinkBtn brandIcon={outlookIcon} onSubmit={onSubmitOutlook} title='Open Outlook' />
      </div>
    </div>
  );
};

export default Verify;
