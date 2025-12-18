import { useState, useEffect } from 'react';
import { Trash2, CheckCircle, Clock, Phone, MessageSquare } from 'lucide-react';
import { getCTAs, updateCTAStatus, deleteCTA } from '../../services/ctaService';

const CTAList = () => {
    const [ctas, setCtas] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCTAs = async () => {
        try {
            const data = await getCTAs();
            setCtas(data);
        } catch (error) {
            console.error('Failed to fetch CTAs:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCTAs();
    }, []);

    const handleStatusUpdate = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'Pending' ? 'Done' : 'Pending';
        try {
            await updateCTAStatus(id, newStatus);
            fetchCTAs();
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this request?')) {
            try {
                await deleteCTA(id);
                fetchCTAs();
            } catch (error) {
                console.error('Failed to delete CTA:', error);
            }
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <h1 className="text-2xl font-bold text-navy">Call For Action Requests</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ctas.map((cta) => (
                    <div key={cta._id} className={`bg-white p-6 rounded-lg shadow-sm border-l-4 ${cta.status === 'Done' ? 'border-green-500' : 'border-gold'}`}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-navy text-lg">{cta.name}</h3>
                                <div className="flex items-center text-gray-600 text-sm mt-1">
                                    <Phone size={14} className="mr-1" />
                                    {cta.phone}
                                </div>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-bold flex items-center gap-1 ${cta.status === 'Done' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                {cta.status === 'Done' ? <CheckCircle size={12} /> : <Clock size={12} />}
                                {cta.status}
                            </span>
                        </div>

                        <div className="bg-gray-50 p-3 rounded text-gray-700 text-sm mb-4">
                            <div className="flex items-start gap-2">
                                <MessageSquare size={14} className="mt-1 flex-shrink-0 text-gray-400" />
                                <p>{cta.message}</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-xs text-gray-400 border-t border-gray-100 pt-3">
                            <span>{new Date(cta.createdAt).toLocaleDateString()}</span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleStatusUpdate(cta._id, cta.status)}
                                    className={`px-3 py-1 rounded transition-colors ${cta.status === 'Pending' ? 'bg-green-50 text-green-600 hover:bg-green-100' : 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'}`}
                                >
                                    Mark as {cta.status === 'Pending' ? 'Done' : 'Pending'}
                                </button>
                                <button
                                    onClick={() => handleDelete(cta._id)}
                                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {ctas.length === 0 && (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        No requests found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default CTAList;
