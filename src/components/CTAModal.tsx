import { useState } from 'react';
import { X, Phone, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { createCTA } from '../services/ctaService';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

interface CTAModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface CTAFormData {
    name: string;
    phone: string;
    message: string;
}

const CTAModal = ({ isOpen, onClose }: CTAModalProps) => {
    const { user } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<CTAFormData>({
        defaultValues: {
            name: user?.name || '',
            phone: user?.phoneNumber || '',
            message: ''
        }
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    if (!isOpen) return null;

    const onSubmit = async (data: CTAFormData) => {
        setIsSubmitting(true);
        try {
            await createCTA(data);
            setSuccess(true);
            reset();
            setTimeout(() => {
                setSuccess(false);
                onClose();
            }, 2000);
        } catch (error) {
            console.error('Failed to submit CTA:', error);
            alert('Failed to submit request. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="p-6">
                    <div className="text-center mb-6">
                        <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 text-gold">
                            <Phone size={24} />
                        </div>
                        <h2 className="text-2xl font-heading font-bold text-navy">Request a Callback</h2>
                        <p className="text-gray-600 text-sm mt-2">Leave your details and we'll get back to you shortly.</p>
                    </div>

                    {success ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 animate-bounce">
                                <Send size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-navy">Request Sent!</h3>
                            <p className="text-gray-600 mt-2">We will contact you soon.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-navy mb-1">Name</label>
                                <input
                                    {...register('name', { required: 'Name is required' })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gold"
                                    placeholder="Your Name"
                                />
                                {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-navy mb-1">Phone Number</label>
                                <input
                                    {...register('phone', { required: 'Phone number is required' })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gold"
                                    placeholder="Your Phone Number"
                                />
                                {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-navy mb-1">Message (Optional)</label>
                                <textarea
                                    {...register('message')}
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gold h-24 resize-none"
                                    placeholder="Tell us what you're looking for..."
                                />
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                fullWidth
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : 'Submit Request'}
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CTAModal;
