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
const support_query_entity_1 = require("../entitiy/support_query.entity");
const User_entity_1 = require("../entitiy/User.entity");
const supportRepo = db_1.AppDataSource.getRepository(support_query_entity_1.Support);
const userRepo = db_1.AppDataSource.getRepository(User_entity_1.User);
class supportService {
    createSupport(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { subject, description } = data;
                const id = data.user.id;
                const support = new support_query_entity_1.Support(subject, description, id);
                const user = yield userRepo.findOneBy({ id: id });
                if (!user) {
                    return { msg: "User not found", status: 404 };
                }
                support.user = user;
                yield supportRepo.save(support);
                return { msg: "Support created", status: 201 };
            }
            catch (error) {
                console.log(error);
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    getAllSupport(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userRepo.findOne({ where: { id: data.user.id } });
                console.log(user);
                if (!user) {
                    return { msg: "User not found", status: 404 };
                }
                const support = yield supportRepo.find({ where: { user: user }, });
                return { msg: support, status: 200 };
            }
            catch (error) {
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    getSupportById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const support = yield supportRepo.findOne({ where: { id: id } });
                if (!support) {
                    return { msg: "Support not found", status: 404 };
                }
                return { msg: support, status: 200 };
            }
            catch (error) {
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    deleteSupport(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const support = yield supportRepo.findOne({ where: { id: id } });
                if (!support) {
                    return { msg: "Support not found", status: 404 };
                }
                yield supportRepo.remove(support);
                return { msg: "Support deleted", status: 200 };
            }
            catch (error) {
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
}
exports.default = new supportService();
