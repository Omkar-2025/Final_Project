"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillsService = void 0;
const bills_dal_1 = require("../dal/bills.dal");
const bill_schema_1 = require("../types/schema/bill.schema");
const billsTypes_1 = require("../types/interfaces/billsTypes");
class BillsService {
    /**
     * This method is used to create a new bill
     * @param data
     * @returns
     */
    static createBill(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { billName, amount, dueDate, accountId, frequency } = data;
                if (!billName || !amount || !accountId || !frequency) {
                    return { msg: "All fields are required", status: 400 };
                }
                if (!bill_schema_1.billSchema.safeParse(data)) {
                    return { msg: "Invalid data", status: 400 };
                }
                const dalResult = yield bills_dal_1.BillsDAL.createBillDAL(data);
                return { msg: dalResult.msg, status: dalResult.status };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    static processRecurringBills() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dalResult = yield bills_dal_1.BillsDAL.processBillDAL();
                return { msg: dalResult.msg, status: dalResult.status };
            }
            catch (error) {
                console.log(error);
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    /**
     * This method is used to calculate the next payment date based on the frequency
     * @param currentDate
     * @param frequency
     * @returns
     */
    /**
     * This method is used to get the bill by user id
     * @param data
     * @returns
     */
    static getBill(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dalResult = yield bills_dal_1.BillsDAL.getBillByIdDAL(id);
                return { msg: dalResult.msg, status: dalResult.status };
            }
            catch (error) {
            }
        });
    }
    /**
     *
     * @param id
     * @returns
     */
    static getBillById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dalResult = yield bills_dal_1.BillsDAL.getBillByIdDAL(id);
                return { msg: dalResult.msg, status: dalResult.status };
            }
            catch (error) {
            }
        });
    }
    /**
     * This method is used to pay the bill
     * @param data
     * @returns
     */
    static payBills(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let payBillData = data;
                const isValiddata = billsTypes_1.billPaymentSchema.safeParse(payBillData);
                if (!isValiddata.success) {
                    return { msg: "Invalid data", status: 400 };
                }
                const dalResult = yield bills_dal_1.BillsDAL.payBillDAL(data);
                return { msg: dalResult.msg, status: dalResult.status };
            }
            catch (error) {
                console.log(error);
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    /**
     * This method is used to get the bill history of the user
     * @param data
     * @returns
     */
    static getBillshistoy(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log(data);
                const id = data.user.id;
                const dalResult = yield bills_dal_1.BillsDAL.getBillHistoryDAL(id);
                return { msg: dalResult.msg, status: dalResult.status };
            }
            catch (error) {
            }
        });
    }
    /**
     * This method is used to update the bill
     * @param id
     * @param data
     * @returns
     */
    static updateBillBLL(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dalResult = yield bills_dal_1.BillsDAL.updateBillDAL(id, data);
                return { msg: dalResult.msg, status: dalResult.status };
            }
            catch (error) {
                console.log(error);
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    /**
     * This method is used to delete the bill
     * @param id
     * @returns
     */
    static deleteBillBLL(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dalResult = yield bills_dal_1.BillsDAL.deleteBillDAL(id);
                return { msg: dalResult.msg, status: dalResult.status };
            }
            catch (error) {
                console.log(error);
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
}
exports.BillsService = BillsService;
