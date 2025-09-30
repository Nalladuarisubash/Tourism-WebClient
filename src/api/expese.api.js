import Commons from "../utils/commons";
import Endpoint from "../utils/endpoints";
import ExpenseMockData from "../mock/expense.mock.json"

const commons = new Commons();
const endpoints = new Endpoint();

export default class Expense {

    async createExpense(requestData) {
        try {
            console.info("CREATE EXPENSE - FUNCTION EXECUTION STARTED");
            let output = {};

            const apiEndpoint = endpoints?.EXPENSE_CREATE;
            const IsMockEnable = false;

            if (IsMockEnable) {
                output = ExpenseMockData?.CreateExpenseData
            }

            else {
                let createExpense = commons?.postAPI(apiEndpoint, requestData);
                output = createExpense;
            }

            console.info("CREATE EXPENSE - FUNCTION EXECUTION ENDED");
            return output;
        }
        catch (error) {
            console.error(`CREATE EXPENSE - FUNCTION EXECUTION ERROR : ${error}`);
        }
    }

    async readExpense(requestData) {
        try {
            console.info("READ EXPENSE - FUNCTION EXECUTION STARTED");
            let output = {};

            const apiEndpoint = endpoints?.EXPENSE_READ + `/${requestData?.DestinationID}`;
            const IsMockEnable = false;

            if (IsMockEnable) {
                output = ExpenseMockData?.ReadExpenseData
            }

            else {
                let readExpense = commons?.getAPI(apiEndpoint, requestData);
                output = readExpense;
            }

            console.info("READ EXPENSE - FUNCTION EXECUTION ENDED");
            return output;
        }
        catch (error) {
            console.error(`READ EXPENSE - FUNCTION EXECUTION ERROR : ${error}`);
        }
    }

    async editExpense(requestData) {
        try {
            console.info("EDIT EXPENSE - FUNCTION EXECUTION STARTED");
            let output = {};

            const apiEndpoint = endpoints?.EXPENSE_EDIT;
            const IsMockEnable = false;

            if (IsMockEnable) {
                output = ExpenseMockData?.EditExpenseData;
            }

            else {
                let editExpense = commons?.patchAPI(apiEndpoint, requestData);
                output = editExpense;
            }

            console.info("EDIT EXPENSE - FUNCTION EXECUTION ENDED");
            return output;
        }
        catch (error) {
            console.error(`EDIT EXPENSE - FUNCTION EXECUTION ERROR : ${error}`);
        }
    }
}