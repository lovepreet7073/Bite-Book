import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { googlelogin } from '../../redux/Auth/Actions';
import { useNavigate } from 'react-router-dom';
import showCustomToast from './ToastComponent';
const GoogleLoginComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSuccess = async (credentialResponse) => {
        try {
            const jwtDetail = jwtDecode(credentialResponse.credential);
            dispatch(googlelogin({ googleToken: credentialResponse.credential }));
            showCustomToast('Login successfully!', 'success');
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
