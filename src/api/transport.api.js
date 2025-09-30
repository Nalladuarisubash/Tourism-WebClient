import Commons from "../utils/commons";
import Endpoint from "../utils/endpoints";
import TransportMockData from "../mock/transport.api.json"

const commons = new Commons();
const endpoints = new Endpoint();

export default class Transport {

    async createTransport(requestData) {
        try {
            console.info("CREATE TRANSPORT - FUNCTION EXECUTION STARTED");
            let output = {};

            const apiEndpoint = endpoints?.TRANSPORT_CREATE;
            const IsMockEnable = false;

            if (IsMockEnable) {
                output = TransportMockData?.CreateTransport;
            }

            else {
                let createTransport = commons?.postAPI(apiEndpoint, requestData);
                output = createTransport;
            }

            console.info("CREATE TRANSPORT - FUNCTION EXECUTION ENDED");
            return output;
        }
        catch (error) {
            console.error(`CREATE TRANSPORT - FUNCTION EXECUTION ERROR : ${error}`);
        }
    }

    async readTransport(requestData) {
        try {
            console.info("READ TRANSPORT - FUNCTION EXECUTION STARTED");
            let output = {};

            const apiEndpoint = endpoints?.TRANSPORT_READ + `/${requestData?.DestinationID}`;
            const IsMockEnable = false;

            if (IsMockEnable) {
                output = TransportMockData?.ReadTransportData;
            }

            else {
                let readTransport = commons?.getAPI(apiEndpoint, requestData);
                output = readTransport;
            }

            console.info("READ TRANSPORT - FUNCTION EXECUTION ENDED");
            return output;
        }
        catch (error) {
            console.error(`READ TRANSPORT - FUNCTION EXECUTION ERROR : ${error}`);
        }
    }

    async editTransport(requestData) {
        try {
            console.info("EDIT TRANSPORT - FUNCTION EXECUTION STARTED");
            let output = {};

            const apiEndpoint = endpoints?.TRANSPORT_EDIT;
            const IsMockEnable = false;

            if (IsMockEnable) {
                output = "";
            }

            else {
                let editTransport = commons?.patchAPI(apiEndpoint, requestData);
                output = editTransport;
            }

            console.info("EDIT TRANSPORT - FUNCTION EXECUTION ENDED");
            return output;
        }
        catch (error) {
            console.error(`EDIT TRANSPORT - FUNCTION EXECUTION ERROR : ${error}`);
        }
    }
}