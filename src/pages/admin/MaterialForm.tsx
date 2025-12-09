import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from '../../components/Button';
import { getMaterialById, addMaterial, updateMaterial } from '../../services/materialService';
import { ArrowLeft, Save } from 'lucide-react';

interface MaterialFormData {
    name: string;
    description: string;
}

const MaterialForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<MaterialFormData>();

    useEffect(() => {
        if (isEditMode) {
            const fetchMaterial = async () => {
                try {
                    const material = await getMaterialById(id!);
                    setValue('name', material.name);
                    setValue('description', material.description);
                } catch (error) {
                    console.error('Failed to fetch material:', error);
                }
            };
            fetchMaterial();
        }
    }, [id, isEditMode, setValue]);

    const onSubmit = async (data: MaterialFormData) => {
        setIsLoading(true);
        try {
            if (isEditMode) {
                await updateMaterial(id!, data);
            } else {
                await addMaterial(data);
            }
            navigate('/admin/materials');
        } catch (error) {
            console.error('Failed to save material:', error);
            alert('Failed to save material');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/admin/materials')}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft size={20} className="text-gray-600" />
                </button>
                <h1 className="text-2xl font-bold text-navy">
                    {isEditMode ? 'Edit Material' : 'Add New Material'}
                </h1>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 max-w-2xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Material Name</label>
                        <input
                            {...register('name', { required: 'Material name is required' })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                            placeholder="e.g. Gold"
                        />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            {...register('description')}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                            placeholder="Material description..."
                        />
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button
                            variant="primary"
                            className="flex items-center gap-2 min-w-[120px] justify-center"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            ) : (
                                <>
                                    <Save size={18} />
                                    {isEditMode ? 'Update Material' : 'Save Material'}
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MaterialForm;
