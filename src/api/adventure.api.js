import Commons from "../utils/commons";
import Endpoint from "../utils/endpoints";
import AdventureMockData from "../mock/adventure.mock.json"

const commons = new Commons();
const endpoints = new Endpoint();

export default class Adventrue {

    async createAdventrue(requestData) {
        try {
            console.info("CREATE ADVENTURE - FUNCTION EXECUTION STARTED");
            let output = {};

            const apiEndpoint = endpoints?.ADVENTURE_CREATE;
            const IsMockEnable = true;

            if (IsMockEnable) {
                output = AdventureMockData?.CreateAdventureData
            }

            else {
                let createAdventrue = commons?.postAPI(apiEndpoint, requestData);
                output = createAdventrue;
            }

            console.info("CREATE ADVENTURE - FUNCTION EXECUTION ENDED");
            return output;
        }
        catch (error) {
            console.error(`CREATE ADVENTURE - FUNCTION EXECUTION ERROR : ${error}`);
        }
    }

    async readAdventure(requestData) {
        try {
            console.info("READ ADVENTURE - FUNCTION EXECUTION STARTED");
            let output = {};

            const apiEndpoint = endpoints?.ADVENTURE_READ + `/${requestData?.DestinationID}`;
            const IsMockEnable = true;

            if (IsMockEnable) {
                output = AdventureMockData?.ReadAdventureData
            }

            else {
                let readAdventure = commons?.getAPI(apiEndpoint, requestData);
                output = readAdventure;
            }

            console.info("READ ADVENTURE - FUNCTION EXECUTION ENDED");
            return output;
        }
        catch (error) {
            console.error(`READ ADVENTURE - FUNCTION EXECUTION ERROR : ${error}`);
        }
    }

    async editAdventure(requestData) {
        try {
            console.info("EDIT ADVENTURE - FUNCTION EXECUTION STARTED");
            let output = {};

            const apiEndpoint = endpoints?.ADVENTURE_EDIT;
            const IsMockEnable = true;

            if (IsMockEnable) {
                output = AdventureMockData?.UpdateAdventureData;
            }

            else {
                let editAdventure = commons?.patchAPI(apiEndpoint, requestData);
                output = editAdventure;
            }

            console.info("EDIT ADVENTURE - FUNCTION EXECUTION ENDED");
            return output;
        }
        catch (error) {
            console.error(`EDIT ADVENTURE - FUNCTION EXECUTION ERROR : ${error}`);
        }
    }
}
