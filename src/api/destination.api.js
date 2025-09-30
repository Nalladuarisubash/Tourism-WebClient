import Commons from "../utils/commons";
import Endpoint from "../utils/endpoints";
import DestinationMockData from "../mock/destination.mock.json"

const commons = new Commons();
const endpoints = new Endpoint();

export default class Destination {

    async createDestination(requestData) {
        try {
            console.info("CREATE DESTINATION - FUNCTION EXECUTION STARTED");
            let output = {};

            const apiEndpoint = endpoints?.DESTINATION_CREATE;
            const IsMockEnable = false;

            if (IsMockEnable) {
                output = DestinationMockData?.CreateDestinationData;
            }

            else {
                let createDestination = commons?.postAPI(apiEndpoint, requestData);
                output = createDestination;
            }

            console.info("CREATE DESTINATION - FUNCTION EXECUTION ENDED");
            return output;
        }
        catch (error) {
            console.error(`CREATE DESTINATION - FUNCTION EXECUTION ERROR : ${error}`);
        }
    }

    async readDestination(requestData) {
        try {
            console.info("READ DESTINATION - FUNCTION EXECUTION STARTED");
            let output = {};

            const apiEndpoint = endpoints?.DESTINATION_READ;
            const IsMockEnable = false;

            if (IsMockEnable) {
                output = DestinationMockData?.ReadDestination;
            }

            else {
                let readDestination = commons?.postAPI(apiEndpoint, requestData);
                output = readDestination;
            }

            console.info("READ DESTINATION - FUNCTION EXECUTION ENDED");
            return output;
        }
        catch (error) {
            console.error(`READ DESTINATION - FUNCTION EXECUTION ERROR : ${error}`);
        }
    }

    async readOneDestination(requestData) {
        try {
            console.info("READ ONE DESTINATION - FUNCTION EXECUTION STARTED");
            let output = {};

            const apiEndpoint = endpoints?.DESTINATION_ONE_READ + `/${requestData?.DestinationID}`;
            const IsMockEnable = false;

            if (IsMockEnable) {
                output = DestinationMockData?.ReadOneDestination
            }

            else {
                let readTransport = commons?.getAPI(apiEndpoint, requestData);
                output = readTransport;
            }

            console.info("READ ONE DESTINATION - FUNCTION EXECUTION ENDED");
            return output;
        }
        catch (error) {
            console.error(`READ ONE DESTINATION - FUNCTION EXECUTION ERROR : ${error}`);
        }
    }

    async editDestination(requestData) {
        try {
            console.info("EDIT DESTINATION - FUNCTION EXECUTION STARTED");
            let output = {};

            const apiEndpoint = endpoints?.DESTINATION_EDIT;
            const IsMockEnable = false;

            if (IsMockEnable) {
                output = DestinationMockData?.EditDestination;
            }

            else {
                let editDestination = commons?.patchAPI(apiEndpoint, requestData);
                output = editDestination;
            }

            console.info("EDIT DESTINATION - FUNCTION EXECUTION ENDED");
            return output;
        }
        catch (error) {
            console.error(`EDIT DESTINATION - FUNCTION EXECUTION ERROR : ${error}`);
        }
    }

    async readOverAllDetails(requestData) {
        try {
            console.info("READ OVER ALL DETAILS - FUNCTION EXECUTION STARTED");
            let output = {};

            const apiEndpoint = endpoints?.OVERALL_DETAIL
            const IsMockEnable = false;

            if (IsMockEnable) {
                output = DestinationMockData?.ReadOverAllDetails;
            }

            else {
                let readDestination = commons?.postAPI(apiEndpoint, requestData);
                output = readDestination;
            }

            console.info("READ OVER ALL DETAILS - FUNCTION EXECUTION ENDED");
            return output;
        }
        catch (error) {
            console.error(`READ OVER ALL DETAILS - FUNCTION EXECUTION ERROR : ${error}`);
        }
    }


}