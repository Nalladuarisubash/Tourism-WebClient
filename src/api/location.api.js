import Commons from "../utils/commons";
import Endpoint from "../utils/endpoints";
import LocationMockData from "../mock/location.mock.json"

const commons = new Commons();
const endpoints = new Endpoint();

export default class Location {

    async createLocation(requestData) {
        try {
            console.info("CREATE LOCATION - FUNCTION EXECUTION STARTED");
            let output = {};

            const apiEndpoint = endpoints?.LOCATION_CREATE;
            const IsMockEnable = false;

            if (IsMockEnable) {
                output = LocationMockData?.CreateLocation;
            }

            else {
                let createLocation = commons?.postAPI(apiEndpoint, requestData);
                output = createLocation;
            }

            console.info("CREATE LOCATION - FUNCTION EXECUTION ENDED");
            return output;
        }
        catch (error) {
            console.error(`CREATE LOCATION - FUNCTION EXECUTION ERROR : ${error}`);
        }
    }

    async readLocation(requestData) {
        try {
            console.info("READ LOCATION - FUNCTION EXECUTION STARTED");
            let output = {};

            const apiEndpoint = endpoints?.LOCATION_READ + `/${requestData?.DestinationID}`;
            const IsMockEnable = false;

            if (IsMockEnable) {
                output = LocationMockData?.ReadLocationData
            }

            else {
                let readLocation = commons?.getAPI(apiEndpoint, requestData);
                output = readLocation;
            }

            console.info("READ LOCATION - FUNCTION EXECUTION ENDED");
            return output;
        }
        catch (error) {
            console.error(`READ LOCATION - FUNCTION EXECUTION ERROR : ${error}`);
        }
    }

    async editLocation(requestData) {
        try {
            console.info("EDIT LOCATION - FUNCTION EXECUTION STARTED");
            let output = {};

            const apiEndpoint = endpoints?.LOCATION_EDIT;
            const IsMockEnable = false;

            if (IsMockEnable) {
                output = LocationMockData?.EditLocationData;
            }

            else {
                let editLocation = commons?.patchAPI(apiEndpoint, requestData);
                output = editLocation;
            }

            console.info("EDIT LOCATION - FUNCTION EXECUTION ENDED");
            return output;
        }
        catch (error) {
            console.error(`EDIT LOCATION - FUNCTION EXECUTION ERROR : ${error}`);
        }
    }

}