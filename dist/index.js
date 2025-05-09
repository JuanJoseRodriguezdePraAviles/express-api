"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const express_1 = __importDefault(require("express"));
const rooms_routes_1 = __importDefault(require("./routes/rooms.routes"));
const bookings_routes_1 = __importDefault(require("./routes/bookings.routes"));
const reviews_routes_1 = __importDefault(require("./routes/reviews.routes"));
const employees_routes_1 = __importDefault(require("./routes/employees.routes"));
const login_routes_1 = __importDefault(require("./routes/login.routes"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const database_1 = require("./config/database");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
(0, database_1.connectDB)();
const allowedOrigins = ['http://localhost:5173'];
const corsOptions = {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use("/api/v1/rooms", rooms_routes_1.default);
app.use("/api/v1/bookings", bookings_routes_1.default);
app.use("/api/v1/reviews", reviews_routes_1.default);
app.use("/api/v1/employees", employees_routes_1.default);
app.use("/api/v1/login", login_routes_1.default);
exports.handler = (0, serverless_http_1.default)(app);
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running at http://:localhost:${PORT}`);
    });
}
