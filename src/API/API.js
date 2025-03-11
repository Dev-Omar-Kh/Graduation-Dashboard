import axios from "axios";

export const Axios = axios.create({

    baseURL: import.meta.env.VITE_API_URL,

});

export const getAllHomeData = '/home';
export const getAllOfficers = '/officers';
export const getAllVehicles = '/vehiclesData';