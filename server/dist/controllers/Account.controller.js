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
const account_service_1 = require("../services/account.service");
class UserController {
    /**
     * This method is used to create the Bank account of the User
     * @param req
     * @param res
     * @returns
     */
    createBankAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                data.id = req.body.user.id;
                const result = yield account_service_1.AccountService.createAccount(data);
                if (result.status == 404) {
                    res.status(404).json({ msg: "User not found" });
                }
                res.status(201).json({ msg: result.msg });
            }
            catch (error) {
                res.status(500).json({ msg: "Internal server error" });
            }
        });
    }
    /**
     * This method is used to get the bank account of the user
     * @param req
     * @param res
     * @returns
     */
    getAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const result = yield account_service_1.AccountService.getAccount(parseInt(id));
                res.status(result.status).json(result.msg);
            }
            catch (error) {
                res.status(500).json({ msg: "Internal server error" });
            }
        });
    }
    /**
     * This method is used to create a transaction
     * @param req
     * @param res
     * @returns
     */
    createTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                //  data.fromAccount=req.body.user.id;
                const result = yield account_service_1.AccountService.createTranscation(data);
                res.status(result.status).json({ msg: result.msg });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "Internal server error" });
            }
        });
    }
    /**
     * This method is used to get the transactions of the user
     * @param req
     * @param res
     */
    getTransactions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const page = req.body.page || 1;
                const limit = 5;
                // console.log(id,page,limit);
                const result = yield account_service_1.AccountService.getTranscations(parseInt(id), page, limit);
                // console.log(result);
                res.status(result.status).json(result.msg);
            }
            catch (error) {
                res.status(500).json({ msg: "Internal server error" });
            }
        });
    }
    /**
     * This method is used to get the transactions of the user by id
     * @param req
     * @param res
     */
    getTransactionsById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const result = yield account_service_1.AccountService.getTransactionsById(parseInt(id));
                res.status(result.status).json(result.msg);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "Internal server error" });
            }
        });
    }
    /**
     * This method is used to withdraw the amount from the account
     * @param req
     * @param res
     * @returns
     */
    withdraw(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                data.amount = parseInt(data.amount);
                data.fromAccount = parseInt(data.fromAccount);
                const result = yield account_service_1.AccountService.Withdraw(data);
                res.status(result.status).json({ msg: result.msg });
            }
            catch (error) {
                res.status(500).json({ msg: "Internal server error" });
            }
        });
    }
    /**
     * This method is used to deposit the amount in the account
     * @param req
     * @param res
     */
    deposit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                data.amount = parseInt(data.amount);
                data.toAccount = parseInt(data.toAccount);
                const result = yield account_service_1.AccountService.Deposit(data);
                res.status(result.status).json({ msg: result.msg });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "Internal server error" });
            }
        });
    }
    /**
     * This method is used to get all the accounts of the user
     * @param req
     * @param res
     */
    getAllAccounts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const id = req.body.user.id;
                const result = yield account_service_1.AccountService.getAllAccounts();
                res.status(result.status).json(result.msg);
            }
            catch (error) {
                res.status(500).json({ msg: "Internal server error" });
            }
        });
    }
    /**
     * This method is used to get all the bank accounts of the user
     * @param req
     * @param res
     */
    getMonthlyExpenses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed
                const currentYear = new Date().getFullYear();
                const id = parseInt(req.params.id);
                const result = yield account_service_1.AccountService.getMonthlyTransactionsBLL({ currentMonth, currentYear, id });
                res.status(result.status).json(result.msg);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "Internal server error" });
            }
        });
    }
    getMonthlyTranscations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed
                const currentYear = new Date().getFullYear();
                const result = yield account_service_1.AccountService.getMonthlyTransactionsBLL({ currentMonth, currentYear, id });
                res.status(result.status).json(result.msg);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "Internal server error" });
            }
        });
    }
    getMonthlyAllExpenses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const id = parseInt(req.params.id);
                const id = parseInt(req.body.id);
                // const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed
                const currentYear = new Date().getFullYear();
                const currentDate = new Date().getDate(); // Assuming currentDate refers to the day of the month
                const result = yield account_service_1.AccountService.getAllMonthlyExpenses({ currentDate, currentYear, id });
                res.status(result.status).json(result.msg);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "Internal server error" });
            }
        });
    }
    getExpensePdf(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const pdf = fs.readFileSync('output.pdf');
                // if(!pdf) {
                //      res.status(404).json({msg:"Pdf not found"});
                //      return;
                // }
                // res.setHeader('Content-Type', 'application/pdf');
                // res.setHeader('Content-Disposition', 'attachment; filename=expense.pdf');
                const pdf = 'C:/Users/OmkarBagalINDev/Desktop/Final_Project/server\output.pdf';
                res.download(pdf);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "Internal server error" });
            }
        });
    }
    deactiveAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.body.id;
                const result = yield account_service_1.AccountService.deactiveAccountBLL(parseInt(id));
                res.status(result.status).json({ msg: result.msg });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "Internal server error" });
            }
        });
    }
    activateAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.body.id;
                const result = yield account_service_1.AccountService.activateAccountBLL(parseInt(id));
                res.status(result.status).json({ msg: result.msg });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "Internal server error" });
            }
        });
    }
}
exports.default = new UserController();
