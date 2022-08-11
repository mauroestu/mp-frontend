import axios from 'axios';
import { getApiBaseUrl } from '../utils';

const generalEndpoint = '/fiscalia';

export const listFiscalias = async () => {
    const totalEndPoint = getApiBaseUrl() + generalEndpoint;

    const response = await axios.get(totalEndPoint).then(res => {
        if(res && res.data)
        {
            return res.data;
        }
    });

    return response;
}

export const saveFiscalia = async (data) => {
    const totalEndPoint = getApiBaseUrl() + generalEndpoint;

    const response = await axios.post(totalEndPoint, data).then(res => {
        return res;
    });

    return response;
}

export const updateFiscalia = async (data) => {
    const totalEndPoint = getApiBaseUrl() + generalEndpoint;

    const response = await axios.put(totalEndPoint, data).then(res => {
        return res;
    });

    return response;
}

export const deleteFiscalia = async (idFiscalia) => {
    const totalEndPoint = getApiBaseUrl() + generalEndpoint + `/${idFiscalia}`;

    const response = await axios.delete(totalEndPoint).then(res => {
        return res;
    });

    return response;
}