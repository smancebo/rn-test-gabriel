import axios from 'axios';
import { BASE_API_URL } from '../../utils/constants/services';
import { requestInterceptor } from './interceptors';

const axiosClient = axios.create({
    baseURL: BASE_API_URL
});

axiosClient.interceptors.request.use(requestInterceptor);

export default axiosClient;