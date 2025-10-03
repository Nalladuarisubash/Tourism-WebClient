import Commons from "../utils/commons";
import Endpoint from "../utils/endpoints";
import PictureMockData from "../mock/picture.mock.json"

const commons = new Commons();
const endpoints = new Endpoint();

export default class Picture {

    async createPicture(requestData) {
        try {
            console.info("UPLOAD PITCURE - FUNCTION EXECUTION STARTED");
            let output = {};

            const apiEndpoint = endpoints?.PICTURE_CREATE;
            const IsMockEnable = true;

            if (IsMockEnable) {
                output = PictureMockData?.CreatePictrueData;
            }

            else {
                let uploadPicture = commons?.postAPI(apiEndpoint, requestData);
                output = uploadPicture;
            }

            console.info("UPLOAD PITCURE- FUNCTION EXECUTION ENDED");
            return output;
        }
        catch (error) {
            console.error(`UPLOAD PITCURE - FUNCTION EXECUTION ERROR : ${error}`);
        }
    }

    async readPicture(requestData) {
        try {
            console.info("READ PICTURE - FUNCTION EXECUTION STARTED");
            let output = {};

            const apiEndpoint = endpoints?.PICTURE_READ + `/${requestData?.DestinationID}`;
            const IsMockEnable = true;

            if (IsMockEnable) {
                output = PictureMockData?.ReadPictureData;
            }

            else {
                let readPicture = commons?.getAPI(apiEndpoint, requestData);
                output = readPicture;
            }

            console.info("READ PICTURE - FUNCTION EXECUTION ENDED");
            return output;
        }
        catch (error) {
            console.error(`READ PICTURE - FUNCTION EXECUTION ERROR : ${error}`);
        }
    }

    async removePicture(requestData) {

        try {
            console.info("REMOVE PICTURE - FUNCTION EXECUTION STARTED");
            let output = {};

            const apiEndpoint = endpoints?.PICTURE_REMOVE + `/${requestData}`;
            const IsMockEnable = true;

            if (IsMockEnable) {
                output = PictureMockData?.DeleteImageData;
            }

            else {
                let removePicture = commons?.removeAPI(apiEndpoint);
                output = removePicture;
            }

            console.info("REMOVE PICTURE - FUNCTION EXECUTION ENDED");
            return output;
        }
        catch (error) {
            console.error(`REMOVE PICTURE - FUNCTION EXECUTION ERROR : ${error}`);
        }
    }

    async editPicture(requestData) {
        try {
            console.info("EDIT PICTURE - FUNCTION EXECUTION STARTED");
            let output = {};

            const apiEndpoint = endpoints?.PICTURE_EDIT;
            const IsMockEnable = true;

            if (IsMockEnable) {
                output = PictureMockData?.EditImageData;
            }

            else {
                let editPicture = commons?.patchAPI(apiEndpoint, requestData);
                output = editPicture;
            }

            console.info("EDIT PICTURE - FUNCTION EXECUTION ENDED");
            return output;
        }
        catch (error) {
            console.error(`EDIT PICTURE - FUNCTION EXECUTION ERROR : ${error}`);
        }
    }

}
