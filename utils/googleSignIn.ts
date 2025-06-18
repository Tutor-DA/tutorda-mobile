import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/firebaseConfig';

WebBrowser.maybeCompleteAuthSession();
export function useGoogleSignIn() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      '11850336257-4ni461lhma9p23am7gukpcv11d64a57n.apps.googleusercontent.com',
    iosClientId:
      '11850336257-j7fn8mvojrinq7uq202ojdn0d04siu4n.apps.googleusercontent.com',
    androidClientId:
      '11850336257-2k566hn1bel9kiffrohkkcl3cof94ojq.apps.googleusercontent.com',
    webClientId:
      '11850336257-4ni461lhma9p23am7gukpcv11d64a57n.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => console.log('Google sign-in success'))
        .catch((err) => console.error('Google sign-in error', err));
    }
  }, [response]);

  return { request, promptAsync };
}
