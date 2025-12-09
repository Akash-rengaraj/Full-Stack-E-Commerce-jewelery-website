import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from '../../components/Button';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const Signup = () => {
    const [step, setStep] = useState(1);
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useAuth();

    const onSignup = async (data: any) => {
        try {
            await api.post('/auth/signup', data);
            setPhoneNumber(data.phoneNumber);
            setStep(2);
        } catch (error: any) {
            alert(error.response?.data?.message || 'Signup failed');
        }
    };

    const onVerify = async (data: any) => {
        try {
            const response = await api.post('/auth/verify-signup', {
                phoneNumber,
                otp: data.otp
            });
            login(response.data, response.data.token);
            navigate('/');
        } catch (error: any) {
            alert(error.response?.data?.message || 'Verification failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cream py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-navy">
                        {step === 1 ? 'Create your account' : 'Verify OTP'}
                    </h2>
                </div>

                {step === 1 ? (
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSignup)}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    {...register('name', { required: 'Name is required' })}
                                    type="text"
                                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gold focus:border-gold focus:z-10 sm:text-sm"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message as string}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    {...register('phoneNumber', { required: 'Phone number is required' })}
                                    type="tel"
                                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gold focus:border-gold focus:z-10 sm:text-sm"
                                />
                                {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message as string}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 chars' } })}
                                    type="password"
                                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gold focus:border-gold focus:z-10 sm:text-sm"
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message as string}</p>}
                            </div>
                        </div>

                        <div>
                            <Button type="submit" className="w-full justify-center">
                                Send OTP
                            </Button>
                        </div>
                        <div className="text-center mt-4">
                            <Link to="/login" className="text-sm text-gold hover:underline">
                                Already have an account? Login
                            </Link>
                        </div>
                    </form>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onVerify)}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Enter OTP sent to {phoneNumber}</label>
                                <input
                                    {...register('otp', { required: 'OTP is required' })}
                                    type="text"
                                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gold focus:border-gold focus:z-10 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <Button type="submit" className="w-full justify-center">
                                Verify & Signup
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Signup;
