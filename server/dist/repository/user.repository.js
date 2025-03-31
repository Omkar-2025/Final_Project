"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepo = void 0;
const db_1 = require("../config/db");
const User_entity_1 = require("../entitiy/User.entity");
exports.userRepo = db_1.AppDataSource.getRepository(User_entity_1.User);
