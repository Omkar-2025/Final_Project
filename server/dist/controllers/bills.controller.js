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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const bills_service_1 = require("../services/bills.service");
node_cron_1.default.schedule("* * * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Processing recurring bills ");
    yield bills_service_1.BillsService.processRecurringBills();
}));
class billsController {
    /**
     * This controller is used to create a new bill
     * @param req
     * @param res
     * @returns
     */
    createBill(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                data.amount = parseInt(data.amount);
                data.frequency = data.frequency.name;
                const result = yield bills_service_1.BillsService.createBill(data);
                if (result) {
                    res.status(result.status).json({ msg: result.msg });
                }
                else {
                    res.status(404).json({ msg: "No Dose not  create bill" });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "Internal server error" });
            }
        });
    }
    /**
     * This controller is used to get the All bills of the user
     * @param req
     * @param res
     */
    getBill(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const id = req.params.id;
                const id = req.body.user.id;
                const result = yield bills_service_1.BillsService.getBill(id);
                // console.log(result);
                if (result) {
                    res.status(result.status).json(result.msg);
                    return;
                }
                else {
                    res.status(404).json({ msg: "No bills found" });
                    return;
                }
            }
            catch (error) {
                res.status(500).json({ msg: "Internal server error" });
                return;
            }
        });
    }
    /**
     * This controller is used to get the All bills of the user
     * @param req
     * @param res
     */
    ProcessBills(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield bills_service_1.BillsService.processRecurringBills();
                res.status(result.status).json(result.msg);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "Internal server error" });
            }
        });
    }
    /**
     * This controller is used to get the bill by id
     * @param req
     * @param res
     */
    getBillById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const result = yield bills_service_1.BillsService.getBillById(parseInt(id));
                if (result) {
                    res.status(result.status).json(result.msg);
                }
                else {
                    res.status(404).json({ msg: "Bill not found" });
                }
            }
            catch (error) {
                res.status(500).json({ msg: "Internal server error" });
            }
        });
    }
    /**
     * This controller is used to pay the bill
     * @param req
     * @param res
     */
    payBills(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                // console.log(data);
                data.amount = parseInt(data.amount);
                data.billId = parseInt(data.billId);
                const result = yield bills_service_1.BillsService.payBills(data);
                if (result.status == 404) {
                    res.status(404).json({ msg: "Bill not found" });
                }
                else if (result.status == 400) {
                    res.status(400).json({ msg: "Insufficient balance" });
                }
                else {
                    console.log("Bill paid successfully");
                    res.status(200).json({ msg: result.msg });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "Internal server error" });
            }
        });
    }
    /**
     * This controller is used to get the All bills Transactions of the user
     * @param req
     * @param res
     */
    getBillshistoy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const page = req.body.page;
                const result = yield bills_service_1.BillsService.getBillshistoy(data, page);
                res.status(result.status).json(result.msg);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "Internal server error" });
            }
        });
    }
    /**
     * This is used to update the bill
     * @param req
     * @param res
     */
    updateBill(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.body.billId;
                const data = req.body;
                data.amount = parseInt(data.amount);
                data.frequency = data.frequency.name;
                const result = yield bills_service_1.BillsService.updateBillBLL(parseInt(id), data);
                res.status(result.status).json(result.msg);
            }
            catch (error) {
                res.status(500).json({ msg: "Internal server error" });
            }
        });
    }
    /**
     * This is used to delete the bill
     * @param req
     * @param res
     */
    deleteBill(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.body.billId;
                const result = yield bills_service_1.BillsService.deleteBillBLL(parseInt(id));
                res.status(result.status).json(result.msg);
            }
            catch (error) {
                res.status(500).json({ msg: "Internal server error" });
            }
        });
    }
}
exports.default = new billsController();
