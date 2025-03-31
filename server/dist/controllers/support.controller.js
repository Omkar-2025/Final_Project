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
const support_service_1 = __importDefault(require("../services/support.service"));
class supportController {
    /**
     * This controller is used to create a new support query
     * @param req
     * @param res
     * @returns
     */
    createSupport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const result = yield support_service_1.default.createSupport(data);
                res.status(result.status).json({ msg: result.msg });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "Internal server error" });
            }
        });
    }
    /**
     * This controller is used to get the All queries of the user
     * @param req
     * @param res
     */
    getAllSupport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const result = yield support_service_1.default.getAllSupport(data);
                res.status(result.status).json({ msg: result.msg });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "Internal server error" });
            }
        });
    }
    /**
     * This controller is used to get the query by id
     * @param req
     * @param res
     */
    getSupportById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const result = yield support_service_1.default.getSupportById(id);
                res.status(result.status).json({ msg: result.msg });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "Internal server error" });
            }
        });
    }
    /**
     * This controller is used to Delete the query by id
     * @param req
     * @param res
     */
    deleteSupport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const result = yield support_service_1.default.deleteSupport(id);
                res.status(result.status).json({ msg: result.msg });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "Internal server error" });
            }
        });
    }
}
exports.default = new supportController();
