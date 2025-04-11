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
const account_service_1 = require("../services/account.service");
const fs_1 = __importDefault(require("fs"));
class UserController {
    /**
     * This method is used to create the Bank account of the User
     * @param req
     * @param res
     * @returns
     */
    createBankAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                data.id = req.body.user.id;
                const result = yield account_service_1.AccountService.createAccount(data);
                res.status(201).json({ msg: result.msg });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * This method is used to get the bank account of the user
     * @param req
     * @param res
     * @returns
     */
    getAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const result = yield account_service_1.AccountService.getAccount(parseInt(id));
                res.status(200).json(result.msg);
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * This method is used to create a transaction
     * @param req
     * @param res
     * @returns
     */
    createTransaction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                //  data.fromAccount=req.body.user.id;
                const result = yield account_service_1.AccountService.createTranscation(data);
                res.status(200).json({ msg: result.msg });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * This method is used to get the transactions of the user
     * @param req
     * @param res
     */
    getTransactions(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const page = req.body.page || 1;
                const limit = 5;
                // console.log(id,page,limit);
                const result = yield account_service_1.AccountService.getTranscations(parseInt(id), page, limit);
                // console.log(result);
                res.status(200).json(result.msg);
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * This method is used to get the transactions of the user by id
     * @param req
     * @param res
     */
    getTransactionsById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const result = yield account_service_1.AccountService.getTransactionsById(parseInt(id));
                res.status(200).json(result.msg);
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * This method is used to withdraw the amount from the account
     * @param req
     * @param res
     * @returns
     */
    withdraw(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                data.amount = parseInt(data.amount);
                data.fromAccount = parseInt(data.fromAccount);
                const result = yield account_service_1.AccountService.Withdraw(data);
                res.status(200).json({ msg: result.msg });
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
    /**
     * This method is used to deposit the amount in the account
     * @param req
     * @param res
     */
    deposit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                data.amount = parseInt(data.amount);
                data.toAccount = parseInt(data.toAccount);
                const result = yield account_service_1.AccountService.Deposit(data);
                res.status(200).json({ msg: result.msg });
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
    /**
     * This method is used to get all the accounts of the user
     * @param req
     * @param res
     */
    getAllAccounts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const id = req.body.user.id;
                const result = yield account_service_1.AccountService.getAllAccounts();
                res.status(200).json(result.msg);
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * This method is used to get all the bank accounts of the user
     * @param req
     * @param res
     */
    getMonthlyExpenses(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed
                const currentYear = new Date().getFullYear();
                const id = parseInt(req.params.id);
                const result = yield account_service_1.AccountService.getMonthlyTransactionsBLL({ currentMonth, currentYear, id });
                res.status(200).json(result.msg);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getMonthlyTranscations(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed
                const currentYear = new Date().getFullYear();
                const result = yield account_service_1.AccountService.getMonthlyTransactionsBLL({ currentMonth, currentYear, id });
                res.status(200).json(result.msg);
            }
            catch (error) {
                console.log(error);
                //  res.status(500).json({msg:"Internal server error"});
                next(error);
            }
        });
    }
    getMonthlyAllExpenses(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const id = parseInt(req.params.id);
                const id = parseInt(req.body.id);
                // const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed
                const currentYear = new Date().getFullYear();
                const currentDate = new Date().getDate(); // Assuming currentDate refers to the day of the month
                const result = yield account_service_1.AccountService.getAllMonthlyExpenses({ currentDate, currentYear, id });
                res.status(200).json(result.msg);
            }
            catch (error) {
                console.log(error);
                // res.status(500).json({msg:"Internal server error"});
                next(error);
            }
        });
    }
    getExpensePdf(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pdf = fs_1.default.readFileSync('output.pdf');
                if (!pdf) {
                    res.status(404).json({ msg: "Pdf not found" });
                    return;
                }
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'attachment; filename=expense.pdf');
                // const pdf = 'C:/Users/OmkarBagalINDev/Desktop/Final_Project/server\output.pdf'
                res.send(pdf);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
    deactiveAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.body.id;
                const result = yield account_service_1.AccountService.deactiveAccountBLL(parseInt(id));
                res.status(200).json({ msg: result.msg });
            }
            catch (error) {
                next(error);
            }
        });
    }
    activateAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.body.id;
                const result = yield account_service_1.AccountService.activateAccountBLL(parseInt(id));
                res.status(200).json({ msg: result.msg });
            }
            catch (error) {
                next(error);
            }
        });
    }
    searchTransaction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.body.id;
                const search = req.body.search;
                // console.log(id,search);
                const result = yield account_service_1.AccountService.searchTranscationBLL(parseInt(id), search);
                res.status(200).json({ msg: result.msg });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new UserController();
