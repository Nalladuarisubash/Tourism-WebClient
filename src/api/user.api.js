import Commons from "../utils/commons";
import Endpoint from "../utils/endpoints";
import UserMockData from "../mock/user.mock.json"

const commons = new Commons();
const endpoints = new Endpoint();

export default class User {

    async createUserContact(requestData) {

        try {
            console.info("CREATE USER CONTACT - FUNCTION EXECUTION STARTED");
            let output = {};

            const apiEndpoint = endpoints?.USERCONTACT_CREATE;
            const IsMockEnable = true;

            if (IsMockEnable) {
                output = UserMockData?.CreateUserData;
            }

            else {
                let createUserContact = commons?.postAPI(apiEndpoint, requestData);
                output = createUserContact;
            }

            console.info("CREATE USER CONTACT - FUNCTION EXECUTION ENDED");
            return output;
        }
        catch (error) {
            console.error(`CREATE USER CONTACT - FUNCTION EXECUTION ERROR : ${error}`);
        }
    }

    async readUserContact(requestData) {
        try {
            console.info("READ USER CONTACT - FUNCTION EXECUTION STARTED");
            let output = {};

            const apiEndpoint = endpoints?.USERCONTACT_READ
            const IsMockEnable = true;

            if (IsMockEnable) {
                output = UserMockData?.ReadUserData;
            }

            else {
                let readUserContact = commons?.postAPI(apiEndpoint, requestData);
                output = readUserContact;
            }

            console.info("READ USER CONTACT - FUNCTION EXECUTION ENDED");
            return output;
        }
        catch (error) {
            console.error(`READ USER CONTACT - FUNCTION EXECUTION ERROR : ${error}`);
        }
    }

}
