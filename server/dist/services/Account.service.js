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
exports.AccountService = void 0;
const db_1 = require("../config/db");
const account_entity_1 = require("../entitiy/account.entity");
const account_scehma_1 = require("../types/schema/account.scehma");
const pdf = require('pdf-creator-node');
const fs_1 = __importDefault(require("fs"));
const account_dal_1 = require("../dal/account.dal");
const html = fs_1.default.readFileSync('src/services/expense.html', 'utf-8');
const accountRepository = db_1.AppDataSource.getRepository(account_entity_1.Account);
class AccountService {
    /**
     * This method is used to create the Bank account of the User
     * @param data
     * @returns
     */
    static createAccount(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, balance, account_type, id, aadhar_card_number, pan_card_number } = data;
                if (!name || !balance || !account_type || !id || !aadhar_card_number || !pan_card_number) {
                    return { msg: "Please provide all the fields", status: 400 };
                }
                const isValiddata = account_scehma_1.accountSchema.safeParse(data);
                if (!isValiddata.success) {
                    return { msg: isValiddata.error.issues[0].message, status: 400 };
                }
                const dalResult = yield account_dal_1.AccountDAL.createAccountDAL(data);
                return { msg: dalResult.msg, status: dalResult.status };
            }
            catch (error) {
                console.log(error);
                return { msg: "Error creating account", status: 500 };
            }
        });
    }
    static getAccount(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dalResult = yield account_dal_1.AccountDAL.getAccountDAL(id);
                return { msg: dalResult.msg, status: dalResult.status };
            }
            catch (error) {
                console.log(error);
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    static createTranscation(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dalResult = yield account_dal_1.AccountDAL.createTranscationDAL(data);
                return { msg: dalResult.msg, status: dalResult.status };
            }
            catch (error) {
                console.error("Error during transaction:", error);
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    static getTranscations(id, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dalResult = yield account_dal_1.AccountDAL.getTranscationsDAL(id, page, limit);
                return { msg: dalResult.msg, status: dalResult.status };
            }
            catch (error) {
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    static getTransactionsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dalResult = yield account_dal_1.AccountDAL.getTransactionsByIdDAL(id);
                return { msg: dalResult.msg, status: dalResult.status };
            }
            catch (error) {
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    static Withdraw(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dalResult = yield account_dal_1.AccountDAL.WithdrawDAL(data);
                return { msg: dalResult.msg, status: dalResult.status };
            }
            catch (error) {
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    static Deposit(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dalResult = yield account_dal_1.AccountDAL.DepositDAL(data);
                return { msg: dalResult.msg, status: dalResult.status };
            }
            catch (error) {
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    static getAllAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accounts = yield accountRepository.find({ relations: ['user'] });
                return { msg: accounts, status: 200 };
            }
            catch (error) {
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    static getMonthlyExpenseBLL(_a) {
        return __awaiter(this, arguments, void 0, function* ({ currentMonth, currentYear, id }) {
            try {
                if (!currentMonth || !currentYear || !id) {
                    return { msg: "Please provide all the fields", status: 400 };
                }
                const dalResult = yield account_dal_1.AccountDAL.getMonthlyExpenseBLLDAL({ currentMonth, currentYear, id });
                return { msg: dalResult.msg, status: dalResult.status };
            }
            catch (error) {
                console.error("Error fetching monthly transactions", error);
                return { status: 500, msg: "Internal server error" };
            }
        });
    }
    static getMonthlyTransactionsBLL(_a) {
        return __awaiter(this, arguments, void 0, function* ({ currentMonth, currentYear, id }) {
            try {
                if (!currentMonth || !currentYear || !id) {
                    return { msg: "Please provide all the fields", status: 400 };
                }
                const dalResult = yield account_dal_1.AccountDAL.getMonthlyTransactionsBLLDAL({ currentMonth, currentYear, id });
                return { msg: dalResult.msg, status: dalResult.status };
            }
            catch (error) {
                console.error("Error fetching monthly transactions", error);
                return { status: 500, msg: "Internal server error" };
            }
        });
    }
    static getAllMonthlyExpenses(_a) {
        return __awaiter(this, arguments, void 0, function* ({ currentDate, currentYear, id }) {
            try {
                if (!currentDate || !currentYear || !id) {
                    return { msg: "Please provide all the fields", status: 400 };
                }
                const dalResult = yield account_dal_1.AccountDAL.getAllMonthlyExpensesDAL({ currentDate, currentYear, id });
                return { msg: dalResult.msg, status: dalResult.status };
            }
            catch (error) {
                console.error("Error fetching monthly expenses and transactions:", error);
                return { status: 500, msg: "Internal server error" };
            }
        });
    }
    static deactiveAccountBLL(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id) {
                    return { msg: "Please provide all the fields", status: 400 };
                }
                const dalResult = yield account_dal_1.AccountDAL.deactiveAccountBLLDAL(id);
                return { msg: dalResult.msg, status: dalResult.status };
            }
            catch (error) {
                console.log(error);
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    static activateAccountBLL(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id) {
                    return { msg: "Please provide all the fields", status: 400 };
                }
                const dalResult = yield account_dal_1.AccountDAL.activateAccountBLLDAL(id);
                return { msg: dalResult.msg, status: dalResult.status };
            }
            catch (error) {
                console.log(error);
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
}
exports.AccountService = AccountService;
// 83504A2F-62EC-4AAE-BB02-3E61D75A4439
