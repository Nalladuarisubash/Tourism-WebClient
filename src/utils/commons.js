const axios = require("axios");
import Configuration from "../../congif";

const config = new Configuration();  

export default class Commons {

    async postAPI(endpoint, request) {

        try {

            let postApi = await axios?.post(config?.BACKEND_URL + endpoint, request, { 
                auth: { username: config?.BACKEND_USERNAME, password: config?.BACKEND_PASSWORD } 
            });

            let response = {
                data: postApi?.data?.data,
                status: postApi?.data?.status,
                message: postApi?.data?.message
            }

            return response;  
        }
        catch (error) {
            if (error.response) {
                let output = {
                    data: error?.response?.data?.data,
                    status: error?.response?.data?.status,
                    message: error?.response?.data?.message
                };
                return output; 
            }
        }
    }

    async patchAPI(endpoint, request) {

        try {

            let patchApi = await axios?.patch(config?.BACKEND_URL + endpoint, request, { 
                auth: { username: config?.BACKEND_USERNAME, password: config?.BACKEND_PASSWORD } 
            });

            let response = {
                data: patchApi?.data?.data,
                status: patchApi?.data?.status,
                message: patchApi?.data?.message
            }

            return response; 
        }
        catch (error) {
            if (error.response) {
                let output = {
                    data: error?.response?.data?.data,
                    status: error?.response?.data?.status,
                    message: error?.response?.data?.message
                };
                return output; 
            }
        }
    }

    async removeAPI(endpoint) {

        try {

            let removeApi = await axios?.delete(config?.BACKEND_URL + endpoint, { 
                auth: { username: config?.BACKEND_USERNAME, password: config?.BACKEND_PASSWORD } 
            });

            let response = {
                data: removeApi?.data?.data,
                status: removeApi?.data?.status,
                message: removeApi?.data?.message
            }

            return response;  
        }

        catch (error) {
            if (error.response) {
                let output = {
                    data: error?.response?.data?.data,
                    status: error?.response?.data?.status,
                    message: error?.response?.data?.message
                };
                return output;  
            }
        }
    }

    async getAPI(endpoint) {

        try {

            let getAPI = await axios?.get(config?.BACKEND_URL + endpoint, {
                auth: { username: config?.BACKEND_USERNAME, password: config?.BACKEND_PASSWORD }
            });

            let response = {
                data: getAPI?.data?.data,
                status: getAPI?.data?.status,
                message: getAPI?.data?.message
            }

            return response;  
        }
        catch (error) {
            if (error.response) {
                let output = {
                    data: error?.response?.data?.data,
                    status: error?.response?.data?.status,
                    message: error?.response?.data?.message
                };
                return output;  
            }
        }
    }
}
