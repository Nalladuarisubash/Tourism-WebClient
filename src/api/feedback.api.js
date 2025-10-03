import Commons from "../utils/commons";
import Endpoint from "../utils/endpoints";
import FeedbackMockData from "../mock/feedback.mock.json"

const commons = new Commons();
const endpoints = new Endpoint();

export default class Feedback {

    async createFeedback(requestData) {
        try {
            console.info("CREATE FEEDBACK - FUNCTION EXECUTION STARTED");
            let output = {};

            const apiEndpoint = endpoints?.FEEDBACK_CREATE;
            const IsMockEnable = true;

            if (IsMockEnable) {
                output = FeedbackMockData?.CreateFeedback;
            }

            else {
                let createFeedback = commons?.postAPI(apiEndpoint, requestData);
                output = createFeedback;
            }

            console.info("CREATE FEEDBACK - FUNCTION EXECUTION ENDED");
            return output;
        }
        catch (error) {
            console.error(`CREATE FEEDBACK - FUNCTION EXECUTION ERROR : ${error}`);
        }
    }

    async readFeedback(requestData) {
        try {
            console.info("READ FEEDBACK - FUNCTION EXECUTION STARTED");
            let output = {};

            const apiEndpoint = endpoints?.FEEDBACK_READ + `/${requestData?.DestinationID}`;
            const IsMockEnable = true;

            if (IsMockEnable) {
                output = FeedbackMockData?.ReadFeedback;
            }

            else {
                let readFeedback = commons?.getAPI(apiEndpoint, requestData);
                output = readFeedback;
            }

            console.info("READ FEEDBACK - FUNCTION EXECUTION ENDED");
            return output;
        }
        catch (error) {
            console.error(`READ FEEDBACK - FUNCTION EXECUTION ERROR : ${error}`);
        }
    }

    async editFeedback(requestData) {
        try {
            console.info("EDIT FEEDBACK - FUNCTION EXECUTION STARTED");
            let output = {};

            const apiEndpoint = endpoints?.FEEDBACK_EDIT;
            const IsMockEnable = true;

            if (IsMockEnable) {
                output = FeedbackMockData.EditFeedbackData;
            }

            else {
                let editFeedback = commons?.patchAPI(apiEndpoint, requestData);
                output = editFeedback;
            }

            console.info("EDIT FEEDBACK - FUNCTION EXECUTION ENDED");
            return output;
        }
        catch (error) {
            console.error(`EDIT FEEDBACK - FUNCTION EXECUTION ERROR : ${error}`);
        }
    }

    async removeFeedback(requestData) {

        try {
            console.info("REMOVE FEEDBACK - FUNCTION EXECUTION STARTED");
            let output = {};

            const apiEndpoint = endpoints?.FEEDBACK_REMOVE + `/${requestData}`;
            const IsMockEnable = true;

            if (IsMockEnable) {
                output = FeedbackMockData?.EditFeedbackData;
            }

            else {
                let removeFeedback = commons?.removeAPI(apiEndpoint);
                output = removeFeedback;
            }

            console.info("REMOVE FEEDBACK - FUNCTION EXECUTION ENDED");
            return output;
        }
        catch (error) {
            console.error(`REMOVE FEEDBACK - FUNCTION EXECUTION ERROR : ${error}`);
        }
    }
}
