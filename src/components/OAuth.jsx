
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase';
import {useDispatch} from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
export default function OAuth() {
  const dispatch = useDispatch();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      
      const res =  await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/user/oauth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          name: result.user.displayName,
          photo: result.user.photoURL
        })
      });

      const data = await res.json();
      dispatch(signInSuccess(data.data.user));
    }
    catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  }

  return (
    <button onClick={handleGoogleClick} type="button" className="w-full bg-red-700 text-white py-2 px-4 rounded hover:bg-red-800 transition-colors duration-300 uppercase">
      Sign in with Google
    </button>
  );
}