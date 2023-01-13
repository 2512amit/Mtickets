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
exports.connectToRedis = void 0;
const redis_1 = __importDefault(require("redis"));
const connectToRedis = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield redis_1.default.createClient({
            socket: {
                host: 'localhost',
                port: 6379,
            },
            password: ''
        }).on('error', err => {
            console.log('Error ' + err);
        });
        console.log("connected to redis");
        return true;
    }
    catch (error) {
        console.log(error);
        throw "COULD NOT CONNECT TO  redis DB";
    }
});
exports.connectToRedis = connectToRedis;
//# sourceMappingURL=redis.connection.js.map