import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { googlelogin } from '../redux/Auth/Actions';
import { FcGoogle } from 'react-icons/fc'; // Make sure to import FcGoogle
import { useNavigate } from 'react-router-dom';
const GoogleLoginComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSuccess = async (credentialResponse) => {
        try {
            console.log(credentialResponse);
            const jwtDetail = jwtDecode(credentialResponse.credential);
            console.log("Decoded JWT:", jwtDetail);
            dispatch(googlelogin({ googleToken: credentialResponse.credential }));
            toast.success('Login Successfully');
            navigate('/')
        } catch (error) {
            console.error('Error decoding token or making API request', error);
          
        }
    };

    const handleError = () => {
        console.log('Login Failed');
    };

    return (
        <div className=''>
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}

                size='large'
          
            />
        </div>
    );
};

export default GoogleLoginComponent;
