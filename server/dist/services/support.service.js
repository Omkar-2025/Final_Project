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
const db_1 = require("../config/db");
const support_dal_1 = require("../dal/support.dal");
const support_query_entity_1 = require("../entitiy/support_query.entity");
const user_entity_1 = require("../entitiy/user.entity");
const supportRepo = db_1.AppDataSource.getRepository(support_query_entity_1.Support);
const userRepo = db_1.AppDataSource.getRepository(user_entity_1.User);
class supportService {
    /**
     * This method is used to create a new support query
     * @param data This is the data that is used to create a new support query
     * @returns
     */
    createSupport(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dalResult = yield support_dal_1.SupportDAL.crateSupportDAL(data);
                return { msg: dalResult.msg, status: dalResult.status };
            }
            catch (error) {
                console.log(error);
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    /**
     * This method is used to get all support queries of a user
     * @param data This is the data that is used to get all support queries of a user
     * @returns
     */
    getAllSupport(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dalResult = yield support_dal_1.SupportDAL.getAllSupportDAL(id);
                return { msg: dalResult.msg, status: dalResult.status };
            }
            catch (error) {
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    /**
     * This method is used to get a support query by id
     * @param id This is the id of the support query
     * @returns
     */
    getSupportById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dalResult = yield support_dal_1.SupportDAL.getSupportByIdDAL(id);
                return { msg: dalResult.msg, status: dalResult.status };
            }
            catch (error) {
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    /**
     * This method is used to delete a support query by id
     * @param id This is the id of the support query
     * @returns
     */
    deleteSupport(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dalResult = yield support_dal_1.SupportDAL.deleteSupportByIdDAL(id);
                return { msg: dalResult.msg, status: dalResult.status };
            }
            catch (error) {
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
}
exports.default = new supportService();
