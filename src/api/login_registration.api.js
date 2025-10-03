import Commons from "../utils/commons";
import Endpoint from "../utils/endpoints";
import AdminMockData from "../mock/login_registration.mock.json"

const commons = new Commons();
const endpoints = new Endpoint();

export default class Authentication {

    async createAdmin(requestData) {
        try {
            console.info("CREATE ADMIN - FUNCTION EXECUTION STARTED");
            let output = {};

            const apiEndpoint = endpoints?.ADMIN_CREATE;
            const IsMockEnable = true;

            if (IsMockEnable) {
                output = AdminMockData?.CreateRegistrationData;
            }

            else {
                let createAdmin = commons?.postAPI(apiEndpoint, requestData);
                output = createAdmin;
            }

            console.info("CREATE ADMIN - FUNCTION EXECUTION ENDED");
            return output;
        }
        catch (error) {
            console.error(`CREATE ADMIN - FUNCTION EXECUTION ERROR : ${error}`);
        }
    }

    async readAdmin(requestData) {
        try {
            console.info("READ ADMIN - FUNCTION EXECUTION STARTED");
            let output = {};

            const apiEndpoint = endpoints?.ADMIN_READ;
            const IsMockEnable = true;

            if (IsMockEnable) {
                output = AdminMockData?.ReadAdminData;
            }

            else {
                let readAdmin = commons?.postAPI(apiEndpoint, requestData);
                output = readAdmin;
            }

            console.info("READ ADMIN - FUNCTION EXECUTION ENDED");
            return output;
        }
        catch (error) {
            console.error(`READ ADMIN - FUNCTION EXECUTION ERROR : ${error}`);
        }
    }

    async loginAdmin(requestData) {
        try {
            console.info("READ LOGIN ADMIN - FUNCTION EXECUTION STARTED");
            let output = {};

            const apiEndpoint = endpoints?.ADMIN_LOGIN;
            const IsMockEnable = true;

            if (IsMockEnable) {
                output = AdminMockData?.ReadLoginData;
            }

            else {
                let loginAdmin = commons?.postAPI(apiEndpoint, requestData);
                output = loginAdmin;
            }

            console.info("READ LOGIN ADMIN - FUNCTION EXECUTION ENDED");
            return output;
        }
        catch (error) {
            console.error(`READ LOGIN ADMIN - FUNCTION EXECUTION ERROR : ${error}`);
        }
    }
}
