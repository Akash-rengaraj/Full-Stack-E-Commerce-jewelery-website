import api from '../api/axios';

export const getOrders = async () => {
    const response = await api.get('/orders');
    return response.data;
};
