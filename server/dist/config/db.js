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
const User_entity_1 = require("../entitiy/User.entity");
const Transaction_entity_1 = require("../entitiy/Transaction.entity");
const support_query_entity_1 = require("../entitiy/support_query.entity");
const Account_entity_1 = require("../entitiy/Account.entity");
const Bills_entity_1 = require("../entitiy/Bills.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mssql',
    host: 'dev.c5owyuw64shd.ap-south-1.rds.amazonaws.com',
    port: 1982,
    username: 'j2',
    password: '123456',
    database: 'JIBE_Main_Training',
    synchronize: true,
    entities: [
        User_entity_1.User,
        Account_entity_1.Account,
        Transaction_entity_1.Transaction,
        Bills_entity_1.Bills,
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
