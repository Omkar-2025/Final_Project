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
exports.Bills = void 0;
const typeorm_1 = require("typeorm");
const account_entity_1 = require("./account.entity");
const user_entity_1 = require("./user.entity");
let Bills = class Bills {
    constructor(billName, amount, dueDate, account, frequency, nextPaymentDate) {
        this.billName = billName;
        this.amount = amount;
        this.dueDate = dueDate;
        this.account = account;
        this.frequency = frequency || null;
        this.nextPaymentDate = nextPaymentDate || null;
        this.isActive = true;
    }
};
exports.Bills = Bills;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Bills.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Bills.prototype, "billName", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Bills.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "datetime", nullable: true }),
    __metadata("design:type", Date)
], Bills.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "Pending", nullable: true }),
    __metadata("design:type", String)
], Bills.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", Object)
], Bills.prototype, "frequency", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "datetime", nullable: true }),
    __metadata("design:type", Object)
], Bills.prototype, "nextPaymentDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true, nullable: true }),
    __metadata("design:type", Boolean)
], Bills.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => account_entity_1.Account, (account) => account.bills, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "account_id" }),
    __metadata("design:type", account_entity_1.Account)
], Bills.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (User) => User.bills),
    __metadata("design:type", user_entity_1.User)
], Bills.prototype, "user", void 0);
exports.Bills = Bills = __decorate([
    (0, typeorm_1.Entity)({ name: "Online_Banking_Bills_1997" }),
    __metadata("design:paramtypes", [String, Number, Date,
        account_entity_1.Account, String, Date])
], Bills);
