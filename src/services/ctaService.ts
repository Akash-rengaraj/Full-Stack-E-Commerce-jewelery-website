import api from '../api/axios';

export const getCTAs = async () => {
    const response = await api.get('/cta');
    return response.data;
};

export const createCTA = async (ctaData: any) => {
    const response = await api.post('/cta', ctaData);
    return response.data;
};

export const updateCTAStatus = async (id: string, status: string) => {
    const response = await api.put(`/cta/${id}`, { status });
    return response.data;
};

export const deleteCTA = async (id: string) => {
    const response = await api.delete(`/cta/${id}`);
    return response.data;
};
