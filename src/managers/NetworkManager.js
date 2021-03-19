import axiosClient from '../config/axios'
const { SOURCE_API_METHOD, TOP_HEADLINES_METHOD } = require("../utils/constants/services")

export const fetchSources = () => {
    return axiosClient.get(SOURCE_API_METHOD);
}

export const fetchHeadlines = (source) => {
    return axiosClient.get(`${TOP_HEADLINES_METHOD}${source}`);
}