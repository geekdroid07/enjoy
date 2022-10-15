import axios from 'axios';
import { loadAbort } from '../utilities';

const route = process.env.REACT_APP_API_URL + 'admin';

// eslint-disable-next-line import/prefer-default-export
export const post = (data) => {
    const controller = loadAbort();
    return {
        call: () => axios.post(route, { ...data }, { signal: controller.signal }),
        controller
    };
};

export const getAll = () => {
    const controller = loadAbort();
    return {
        call: () => axios.get(route, { signal: controller.signal }),
        controller
    };
};

export const getById = (id: string) => {
    const controller = loadAbort();
    return {
        call: () => axios.get(`${route}/${id}`, { signal: controller.signal }),
        controller
    };
};

export const remove = (id) => {
    const controller = loadAbort();
    return {
        call: () => axios.delete(`${route}/${id}`, { signal: controller.signal }),
        controller
    };
};

export const put = (id, data) => {
    const controller = loadAbort();
    return {
        call: () => axios.put(`${route}/${id}`, { ...data }, { signal: controller.signal }),
        controller
    };
};

export default {
    post,
    remove,
    put
}