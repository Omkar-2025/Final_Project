"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepo = void 0;
const db_1 = require("../config/db");
const user_entity_1 = require("../entitiy/user.entity");
exports.userRepo = db_1.AppDataSource.getRepository(user_entity_1.User);
