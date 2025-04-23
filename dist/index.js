"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rooms_routes_1 = __importDefault(require("./routes/rooms.routes"));
const rooms_routes_2 = __importDefault(require("./routes/rooms.routes"));
const reviews_routes_1 = __importDefault(require("./routes/reviews.routes"));
const employees_routes_1 = __importDefault(require("./routes/employees.routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use("/api/rooms", rooms_routes_1.default);
app.use("/api/bookings", rooms_routes_2.default);
app.use("/api/reviews", reviews_routes_1.default);
app.use("/api/employees", employees_routes_1.default);
app.listen(PORT, () => {
    console.log(`Server listening en http://localhost:${PORT}`);
});
