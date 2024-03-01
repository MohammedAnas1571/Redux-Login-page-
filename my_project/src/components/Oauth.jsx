import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { signInSuccess, signInFailure } from '../Redux/user/createSlice';
import axios from 'axios';

const Oauth = () => {
    const dispatch = useDispatch();
                 
         const navigate = useNavigate()

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);

            const { displayName, email, photoURL } = result.user;

          
            const response = await axios.post("/auth/googleAuth", { name: displayName, email, photo: photoURL });

       
            dispatch(signInSuccess(response.data));
            navigate("/")
        } catch (error) {
         
            dispatch(signInFailure(error.message));
            console.error("Could not authenticate with firebase", error);
        }
    };

    return (
        <div>
            <button type='button' onClick={handleGoogleClick} className='text-white bg-red-700 rounded-lg p-3 my-2 uppercase hover:opacity-95 w-full'>continue with google</button>
        </div>
    );
};

export default Oauth;
