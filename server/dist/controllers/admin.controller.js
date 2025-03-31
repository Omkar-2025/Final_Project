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
exports.AdminController = void 0;
const admin_service_1 = require("../services/admin.service");
class AdminController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const result = yield admin_service_1.AdminService.loginAdminBLL(data);
                res.status(result.status).json({ msg: result.msg, token: result.token });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "Internal server error" });
            }
        });
    }
    static verifyAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const result = yield admin_service_1.AdminService.verifyAccountBLL(id);
                res.status(result.status).json({ msg: result.msg });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "Internal server error" });
            }
        });
    }
    static resolveSupport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const id = parseInt(req.params.id);
                const data = req.body;
                data.queryId = parseInt(req.params.id);
                data.id = req.body.user.id;
                const result = yield admin_service_1.AdminService.resolveQueryBLL(data);
                res.status(result.status).json({ msg: result.msg });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "Internal server error" });
            }
        });
    }
    static getAllSupport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield admin_service_1.AdminService.getAllSupportBLL();
                res.status(result.status).json({ msg: result.msg });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "Internal server error" });
            }
        });
    }
}
exports.AdminController = AdminController;
