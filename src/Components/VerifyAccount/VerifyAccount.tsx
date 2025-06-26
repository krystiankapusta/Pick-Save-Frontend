import { useEffect, useReducer, useState } from 'react';
import Button from '../Button/Button';
import type { VerifyFormInputs } from '../../Models/User';
import { resendVerificationCode, verify } from '../../Services/AuthServices';
import Swal from 'sweetalert2';
import type { SweetAlertResult } from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import email from '../../../src/assets/email.svg';
import { getAlertColors } from '../../Utils/GetAlertColors';

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
            const { backgroundColor, textColor } = getAlertColors();

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
                color: textColor,
                timer: 2000,
                background: backgroundColor,
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
            const { backgroundColor, textColor } = getAlertColors();

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
                color: textColor,
                background: backgroundColor,
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
            console.log('Resend code sent');
            const response = await resendVerificationCode(emailToVerify);
            console.log('Resend code response: ', response);
            const { backgroundColor, textColor } = getAlertColors();

            await Swal.fire({
                icon: 'success',
                title: 'Verification Code Sent',
                text: 'Please check your mailbox.',
                timer: 2000,
                color: textColor,
                background: backgroundColor,
                timerProgressBar: true,
                showConfirmButton: false,
            });
        } catch (error: any) {
            console.error('Resend verification code error: ', error);
            const errorResendCode = error.response?.data;
            const { backgroundColor, textColor } = getAlertColors();

            await Swal.fire({
                icon: 'error',
                title: 'Failed to resend',
                text: errorResendCode,
                timer: 2000,
                color: textColor,
                background: backgroundColor,
                timerProgressBar: true,
                showConfirmButton: false,
            });
            forceUpdate();
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-800">
            <div className="flex flex-col items-center justify-center w-full max-w-2xl bg-gray-100 dark:bg-zinc-700 shadow-lg rounded-xl p-10">
                <div>
                    <img className="w-16 h-16" alt="Mailbox" src={email} />
                </div>
                <div>
                    <h1 className="text-5xl text-zinc-950 font-bold text-center mt-5 mb-8">
                        Verify your account
                    </h1>
                    <p className="text-center dark:text-white mb-4">
                        Please enter the six digit code send to{' '}
                        <strong>{emailToVerify}</strong>
                    </p>
                </div>
                <div className="flex items-center justify-center mt-5 mb-8">
                    {otp.map((data, i) => {
                        return (
                            <input
                                className="w-12 outline-0 text-center bg-gray-100 border border-black rounded-xl p-2 mr-2"
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
                <div className="flex flex-col justify-center items-center gap-4">
                    <Button
                        className="px-2 sm:text-sm"
                        onClick={onVerify}
                        label="Verify email"
                        variant="success"
                    />
                    <Button
                        className="px-2 sm:text-sm"
                        onClick={handleResendCode}
                        label="Resend verification code"
                        variant="warning"
                    />
                </div>
            </div>
        </div>
    );
};

export default VerifyAccount;
