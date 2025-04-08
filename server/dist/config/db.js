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
exports.dbconnect = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
require("dotenv/config");
const user_entity_1 = require("../entitiy/user.entity");
// import { Transaction } from "../entitiy/transaction.entity";
const transaction_entity_1 = require("../entitiy/transaction.entity");
const support_query_entity_1 = require("../entitiy/support_query.entity");
const account_entity_1 = require("../entitiy/account.entity");
const bills_entity_1 = require("../entitiy/bills.entity");
/**
 * * This is the database connection file
 */
exports.AppDataSource = new typeorm_1.DataSource({
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    entities: [
        user_entity_1.User,
        account_entity_1.Account,
        transaction_entity_1.Transaction,
        bills_entity_1.Bills,
        support_query_entity_1.Support
    ],
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
});
const dbconnect = () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.AppDataSource.initialize();
    console.log("Database connected");
});
exports.dbconnect = dbconnect;
