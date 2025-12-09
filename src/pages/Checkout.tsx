import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import Button from '../components/Button';


const Checkout = () => {
    const [step, setStep] = useState(1);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);

    const handlePlaceOrder = () => {
        // Simulate API call
        setTimeout(() => {
            setIsOrderPlaced(true);
        }, 1500);
    };

    if (isOrderPlaced) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-cream px-4 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 animate-bounce">
                    <CheckCircle size={40} />
                </div>
                <h1 className="text-3xl font-heading font-bold text-navy mb-4">Order Placed Successfully!</h1>
                <p className="text-gray-600 mb-8 max-w-md">
                    Thank you for your purchase. Your order #SC-12345 has been confirmed and will be shipped shortly.
                </p>
                <Button to="/" variant="primary">Continue Shopping</Button>
            </div>
        );
    }

    return (
        <div className="bg-cream min-h-screen py-10">
            <div className="container mx-auto px-4 md:px-6">
                <h1 className="text-3xl font-heading font-bold text-navy mb-8 text-center">Checkout</h1>

                {/* Steps */}
                <div className="flex justify-center mb-12">
                    <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-navy text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
                        <div className={`w-16 h-1 ${step >= 2 ? 'bg-navy' : 'bg-gray-200'}`}></div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-navy text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
                        <div className={`w-16 h-1 ${step >= 3 ? 'bg-navy' : 'bg-gray-200'}`}></div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-navy text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form Section */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
                        {step === 1 && (
                            <div className="animate-fade-in">
                                <h2 className="text-xl font-bold text-navy mb-6">Shipping Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-navy">First Name</label>
                                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-gold focus:border-gold outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-navy">Last Name</label>
                                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-gold focus:border-gold outline-none" />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-bold text-navy">Address</label>
                                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-gold focus:border-gold outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-navy">City</label>
                                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-gold focus:border-gold outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-navy">Postal Code</label>
                                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-gold focus:border-gold outline-none" />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-bold text-navy">Phone Number</label>
                                        <input type="tel" className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-gold focus:border-gold outline-none" />
                                    </div>
                                </div>
                                <div className="mt-8 flex justify-end">
                                    <Button onClick={() => setStep(2)}>Continue to Payment</Button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="animate-fade-in">
                                <h2 className="text-xl font-bold text-navy mb-6">Payment Method</h2>
                                <div className="space-y-4">
                                    <label className="flex items-center gap-4 p-4 border border-gray-200 rounded cursor-pointer hover:border-gold transition-colors">
                                        <input type="radio" name="payment" className="w-5 h-5 text-navy focus:ring-gold" defaultChecked />
                                        <span className="font-bold text-navy">Credit / Debit Card</span>
                                    </label>
                                    <label className="flex items-center gap-4 p-4 border border-gray-200 rounded cursor-pointer hover:border-gold transition-colors">
                                        <input type="radio" name="payment" className="w-5 h-5 text-navy focus:ring-gold" />
                                        <span className="font-bold text-navy">UPI / Net Banking</span>
                                    </label>
                                    <label className="flex items-center gap-4 p-4 border border-gray-200 rounded cursor-pointer hover:border-gold transition-colors">
                                        <input type="radio" name="payment" className="w-5 h-5 text-navy focus:ring-gold" />
                                        <span className="font-bold text-navy">Cash on Delivery</span>
                                    </label>
                                </div>
                                <div className="mt-8 flex justify-between">
                                    <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
                                    <Button onClick={() => setStep(3)}>Review Order</Button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="animate-fade-in">
                                <h2 className="text-xl font-bold text-navy mb-6">Review Order</h2>
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                                        <div>
                                            <h4 className="font-bold text-navy">Royal Kundan Necklace Set</h4>
                                            <p className="text-sm text-gray-500">Qty: 1</p>
                                        </div>
                                        <span className="font-bold">₹2,499</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                                        <div>
                                            <h4 className="font-bold text-navy">Antique Gold Plated Bangles</h4>
                                            <p className="text-sm text-gray-500">Qty: 2</p>
                                        </div>
                                        <span className="font-bold">₹2,598</span>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <Button variant="secondary" onClick={() => setStep(2)}>Back</Button>
                                    <Button onClick={handlePlaceOrder}>Place Order</Button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
                        <h3 className="text-lg font-bold text-navy mb-4">Order Summary</h3>
                        <div className="space-y-2 mb-4 text-sm">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>₹5,097</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span className="text-green-600">Free</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Tax (GST)</span>
                                <span>₹917</span>
                            </div>
                        </div>
                        <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-lg text-navy">
                            <span>Total</span>
                            <span>₹6,014</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
