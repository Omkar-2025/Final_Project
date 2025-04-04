"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const typeorm_1 = require("typeorm");
const Transaction_entity_1 = require("./Transaction.entity");
const User_entity_1 = require("./User.entity");
const Bills_entity_1 = require("./Bills.entity");
let Account = class Account {
    constructor(name, balance, account_type, user) {
        this.name = name;
        this.balance = balance;
        this.account_type = account_type;
        this.user = user;
    }
};
exports.Account = Account;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Account.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Account.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Account.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: `uuid`, unique: true, default: () => `NewID()` }),
    __metadata("design:type", String)
], Account.prototype, "account_number", void 0);
__decorate([
    (0, typeorm_1.Column)({
        enum: ['Savings Account', 'Current Account', 'Salary Account'],
        default: 'Savings Account'
    }),
    __metadata("design:type", String)
], Account.prototype, "account_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Account.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Boolean)
], Account.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.User, (user) => user.accounts, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ "name": "user_id" }),
    __metadata("design:type", User_entity_1.User)
], Account.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Transaction_entity_1.Transaction, (transaction) => transaction.fromAccount, { cascade: true }),
    __metadata("design:type", Array)
], Account.prototype, "transactionsFrom", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Transaction_entity_1.Transaction, (transaction) => transaction.toAccount, { cascade: true }),
    __metadata("design:type", Array)
], Account.prototype, "transactionsTo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Bills_entity_1.Bills, (bills) => bills.account, { cascade: true }),
    __metadata("design:type", Array)
], Account.prototype, "bills", void 0);
exports.Account = Account = __decorate([
    (0, typeorm_1.Entity)({ name: 'Online_Banking_Account_1997' }),
    __metadata("design:paramtypes", [String, Number, String, User_entity_1.User])
], Account);
