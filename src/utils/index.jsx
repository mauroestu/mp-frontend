import { toast } from 'react-toastify';

const urlEndpoint = 'http://localhost:8090';
const apiBase = '/mp/api/v1';

export const getApiBaseUrl = () => {
    return urlEndpoint + apiBase;
}

export const msgAppError = (description) => {
    toast.error(description);
}

export const msgAppSuccess = (description) => {
    toast.warning(description);
}

export const msgAppWarning = (description) => {
    toast.success(description);
}