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
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const settingRoutes_1 = __importDefault(require("./routes/settingRoutes"));
const systemRoutes_1 = __importDefault(require("./routes/systemRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// allow the cors to the client address
app.use((0, cors_1.default)({
    origin: ["0.0.0.0:0",
        "http://localhost:8293",
        "http://localhost:8080",
        "https://localhost:8080",
        "http://172.25.14.25:8080"
    ],
    credentials: true,
    exposedHeaders: ["set-cookie"]
}));
app.use('/api/system/', systemRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/setting', settingRoutes_1.default);
app.use('/api/task', taskRoutes_1.default);
// get the mensa data with the specific date
app.get('/mensa-menu/:date', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const date = req.params.date;
        const response = yield axios_1.default.get(`https://openmensa.org/api/v2/canteens/198/days/${date}/meals`);
        res.json(response.data);
    }
    catch (error) {
        console.error('Fehler beim Abrufen der Speiseplandaten:', error);
        res.status(500).send('Fehler beim Abrufen der Speiseplandaten');
    }
}));
// get the forcast with lat and long
app.get('/forecast/:latitude/:longitude', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const latitude = req.params.latitude;
        const longitude = req.params.longitude;
        const api_key = '1fe4bb8a3cd958d18224b269877d3cfc';
        const response = yield axios_1.default.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${api_key}`);
        res.json(response.data);
    }
    catch (error) {
        console.error('Fehler beim Abrufen der Speiseplandaten:', error);
        res.status(500).send('Fehler beim Abrufen der Speiseplandaten');
    }
}));
app.get('/weather/:latitude/:longitude', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const latitude = req.params.latitude;
        const longitude = req.params.longitude;
        const api_key = '1fe4bb8a3cd958d18224b269877d3cfc';
        const response = yield axios_1.default.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api_key}`);
        res.json(response.data);
    }
    catch (error) {
        console.error('Fehler beim Abrufen der Speiseplandaten:', error);
        res.status(500).send('Fehler beim Abrufen der Wetterdaten');
    }
}));
// get the location of the user with the ip
app.get('/location', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get('http://ipapi.co/json/');
        res.json(response.data);
    }
    catch (error) {
        console.error('Fehler beim Abrufen der Speiseplandaten:', error);
        res.status(500).send('Fehler beim Abrufen der locationdaten');
    }
}));
//get the humidity from the sensor
app.get('/humidity', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get('http://10.1.67.29:8081');
        res.json(response.data);
    }
    catch (error) {
        console.error('Fehler beim Abrufen der Speiseplandaten:', error);
        res.status(500).send('Fehler beim Abrufen der Speiseplandaten');
    }
}));
// connenct to database
mongoose_1.default.connect("mongodb+srv://kavianbrd:wRJ7pb4iYPVHg9LP@backenddb.xrmlj5p.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB")
    .then(() => {
    console.log("connected to database");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log('http://localhost:3000/location');
    });
})
    .catch(() => {
    console.log("Connection failed");
});
// Server starten
