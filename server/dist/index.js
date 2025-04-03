"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const Account_routes_1 = __importDefault(require("./routes/Account.routes"));
const db_1 = require("./config/db");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const bills_routes_1 = __importDefault(require("./routes/bills.routes"));
const support_routes_1 = __importDefault(require("./routes/support.routes"));
const verifyJwt_1 = require("./middlewares/verifyJwt");
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:4200',
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
app.use('/api/user', user_routes_1.default);
app.use('/api/account', Account_routes_1.default);
app.use(verifyJwt_1.verifyJwt);
app.use('/api/bills', bills_routes_1.default);
app.use('/api/support', support_routes_1.default);
app.use('/api/admin', admin_routes_1.default);
db_1.AppDataSource.initialize().then(() => {
    app.listen(4000, () => {
        console.log(`server started at http://localhost:4000`);
        console.log('Database connected');
    });
}).catch((err) => {
    console.log(err);
});
