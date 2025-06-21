import { useEffect, useReducer, useState } from 'react';
import './VerifyAccount.css';
import Button from '../Button/Button';
import type { VerifyFormInputs } from '../../Models/User';
import { resendVerificationCode, verify } from '../../Services/AuthServices';
import Swal from 'sweetalert2';
import type { SweetAlertResult } from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const VerifyAccount = () => {
    const [emailToVerify, setEmailToVerify] = useState('');
    useEffect(() => {
        const manuallyVerifyEmail = localStorage.getItem('manuallyVerifyEmail');
        console.log(
            'VerifyAccount manuallyVerifyEmail -> ',
            manuallyVerifyEmail
        );

        const fallbackEmail = localStorage.getItem('email');
        const selectedEmail = manuallyVerifyEmail || fallbackEmail || '';
        setEmailToVerify(selectedEmail);

        console.log(
            'VerifyAccount after set email fallbackEmail -> ',
            fallbackEmail
        );

        console.log(
            'VerifyAccount after set email manuallyVerifyEmail -> ',
            manuallyVerifyEmail
        );

        console.log('VerifyAccount -> mail to register -> ', selectedEmail);
    }, []);

    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [reloadPage, forceUpdate] = useReducer((x) => x + 1, 0);
    const navigate = useNavigate();

    useEffect(() => {
        setOtp(new Array(6).fill(''));
    }, [reloadPage]);

    const onVerify = async () => {
        const verificationCode = otp.join('');
        const data: VerifyFormInputs = {
            email: emailToVerify,
            verificationCode,
        };
        try {
            const response = await verify(data);
            console.log('Verify response: ', response);
            const result: SweetAlertResult = await Swal.fire({
                title: 'Success!',
                text: 'Your account has been verified.',
                icon: 'success',
                showClass: {
                    popup: 'animate__animated animate__fadeInUp animate__faster',
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutDown animate__faster',
                },
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false,
            });
            if (result.dismiss === Swal.DismissReason.timer) {
                localStorage.removeItem('manuallyVerifyEmail');
                localStorage.removeItem('email');
                navigate(`/auth/login`);
            }
        } catch (error: any) {
            console.error('onVerify verify error: ', error.fieldErrors);
            console.error('onVerify verify error: ', error.message);

            const errorMessage =
                error.fieldErrors?.verificationCode ||
                error.message ||
                'Something went wrong';

            console.log('Error data -> ', errorMessage);
            await Swal.fire({
                icon: 'error',
                title: 'Verification Failed',
                text: errorMessage,
                showClass: {
                    popup: 'animate__animated animate__shakeX animate__faster',
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutDown animate__faster',
                },
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
            forceUpdate();
        }
    };

    function handleChange(e: any, index: any) {
        if (isNaN(e.target.value)) return false;
        setOtp([
            ...otp.map((data, i) => (i === index ? e.target.value : data)),
        ]);
        if (e.target.value && e.target.nextSibling) {
            e.target.nextSibling.focus();
        }
    }

    const handleResendCode = async () => {
        if (!emailToVerify) return;
        try {
            const response = await resendVerificationCode(emailToVerify);
            console.log('Resend code response: ', response);
            await Swal.fire({
                icon: 'success',
                title: 'Verification Code Sent',
                text: response?.message || 'Please check your mailbox.',
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false,
            });
        } catch (error: any) {
            console.error('Resend verification code error: ', error);
            const errorResendCode = error.response?.data;
            await Swal.fire({
                icon: 'error',
                title: 'Failed to resend',
                text: errorResendCode,
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
            forceUpdate();
        }
    };
    return (
        <div>
            <div>
                <h1>Verify your account</h1>
                <p>
                    We send you the six digit code to{' '}
                    <strong>{emailToVerify}</strong>
                </p>
                <p>Enter the code below to confirm your email address</p>
            </div>
            <div className="otp-area">
                {otp.map((data, i) => {
                    return (
                        <input
                            key={i}
                            name={`otp-${i}`}
                            type="text"
                            value={data}
                            maxLength={1}
                            placeholder="_"
                            onChange={(e) => handleChange(e, i)}
                        />
                    );
                })}
            </div>
            <Button onClick={onVerify} label="Verify email" variant="success" />
            <Button
                onClick={handleResendCode}
                label="Resend verification code"
                variant="warning"
            />
        </div>
    );
};

export default VerifyAccount;
