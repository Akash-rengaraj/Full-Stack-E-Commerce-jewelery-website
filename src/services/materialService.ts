import api from '../api/axios';

export const getMaterials = async () => {
    const response = await api.get('/materials');
    return response.data;
};

export const getMaterialById = async (id: string) => {
    const response = await api.get(`/materials/${id}`);
    return response.data;
};

export const addMaterial = async (materialData: any) => {
    const response = await api.post('/materials', materialData);
    return response.data;
};

export const updateMaterial = async (id: string, materialData: any) => {
    const response = await api.put(`/materials/${id}`, materialData);
    return response.data;
};

export const deleteMaterial = async (id: string) => {
    const response = await api.delete(`/materials/${id}`);
    return response.data;
};
