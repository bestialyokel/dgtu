var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("db/driver", ["require", "exports", "pg"], function (require, exports, pg_1) {
    "use strict";
    exports.__esModule = true;
    var DB = /** @class */ (function () {
        function DB() {
            this.pool = DB._pool;
        }
        DB.init = function (pool) {
            DB._pool = pool;
        };
        DB.getInstance = function () {
            if (DB.instance)
                return DB.instance;
            if (DB._pool) {
                DB.instance = new DB();
                return DB.instance;
            }
            else {
                throw new Error("init with pool before pls");
            }
        };
        DB.prototype.queryDetailed = function (sql) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.pool.query(sql)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        DB.prototype.query = function (sql) {
            return __awaiter(this, void 0, void 0, function () {
                var rows;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.pool.query(sql)];
                        case 1:
                            rows = (_a.sent()).rows;
                            return [2 /*return*/, rows];
                    }
                });
            });
        };
        return DB;
    }());
    var pool = new pg_1.Pool({
        user: "ddbachur",
        host: "localhost",
        database: "messages",
        password: "g3mfcq4f",
        port: 5432
    });
    pool.connect();
    DB.init(pool);
    exports["default"] = DB;
});
define("controllers/controller", ["require", "exports", "../views/", "../services", "db/driver", "../daos", "../models", "pg"], function (require, exports, views_1, services_1, driver_1, daos_1, models_1, pg_2) {
    "use strict";
    exports.__esModule = true;
    var ud = new daos_1.UserDao(driver_1["default"].getInstance(), 'Users');
    var ucpd = new daos_1.UserConversationPairDAO(driver_1["default"].getInstance(), 'UserConversations');
    var utd = new daos_1.UserTokenDAO(driver_1["default"].getInstance(), 'User_Token');
    var um = new models_1.UserModel(ud);
    var ucpm = new models_1.UserConversationPairModel(ucpd);
    var utm = new models_1.UserTokenModel(utd);
    var service = new services_1.UserService(um, utm);
    var Controller = /** @class */ (function () {
        function Controller() {
            this.view = new views_1.View();
            this.userService = service;
        }
        //я бы мог повторить это, но зачем
        Controller.prototype.findUser = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    try {
                        res = this.userService.getOne(id);
                        console.log(res);
                        this.view.showResult(res);
                    }
                    catch (e) {
                        console.log(e);
                        this.view.showError(e);
                    }
                    return [2 /*return*/];
                });
            });
        };
        return Controller;
    }());
    exports["default"] = Controller;
    var pool1 = new pg_2.Pool({
        user: "ddbachur",
        host: "localhost",
        database: "messages",
        password: "g3mfcq4f",
        port: 5432
    });
    pool1.connect();
    console.log(pg_2.Pool);
    (function () { return __awaiter(void 0, void 0, void 0, function () {
        var u;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pool1.query('SELECT NOW()')];
                case 1:
                    u = _a.sent();
                    console.log(u);
                    return [2 /*return*/];
            }
        });
    }); });
});
define("daos/dao", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var DataAccessObject = /** @class */ (function () {
        function DataAccessObject(driver, tableName) {
            this.driver = driver;
            this.tableName = tableName;
        }
        return DataAccessObject;
    }());
    exports["default"] = DataAccessObject;
});
define("daos/conversation", ["require", "exports", "daos/dao", "../errors"], function (require, exports, dao_1, errors_1) {
    "use strict";
    exports.__esModule = true;
    var _fields = {
        idConversation: "id",
        name: "name"
    };
    var ConversationDAO = /** @class */ (function (_super) {
        __extends(ConversationDAO, _super);
        function ConversationDAO(driver, tableName) {
            return _super.call(this, driver, tableName) || this;
        }
        ConversationDAO.prototype.getByID = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var sql, rows, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            sql = "SELECT * FROM " + this.tableName + " WHERE " + _fields["idConversation"] + " = " + id;
                            return [4 /*yield*/, this.driver.queryDetailed(sql)];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, this.tryConvert(rows[0])];
                        case 2:
                            error_1 = _a.sent();
                            throw new errors_1.DaoError(error_1);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        ConversationDAO.prototype.deleteByID = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var sql, rows, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            sql = "DELETE FROM " + this.tableName + " WHERE " + _fields["idConversation"] + " = " + id + " RETURNING *";
                            return [4 /*yield*/, this.driver.query(sql)];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, this.tryConvert(rows[0])];
                        case 2:
                            error_2 = _a.sent();
                            throw new errors_1.DaoError(error_2);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        ConversationDAO.prototype.addOne = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var name_1, sql, rows, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            name_1 = data.name;
                            sql = "INSERT INTO " + this.tableName + "(" + _fields["name"] + ") VALUES ( " + name_1 + " ) RETURNING *";
                            return [4 /*yield*/, this.driver.query(sql)];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, this.tryConvert(rows[0])];
                        case 2:
                            error_3 = _a.sent();
                            throw new errors_1.DaoError(error_3);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        ConversationDAO.prototype.updateByID = function (id, data) {
            return __awaiter(this, void 0, void 0, function () {
                var name_2, sql, rows, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            name_2 = data.name;
                            sql = "UPDATE " + this.tableName + " SET " + _fields["name"] + " = " + name_2 + " WHERE " + _fields["idConversation"] + " = " + id + " RETURNING *";
                            return [4 /*yield*/, this.driver.query(sql)];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, this.tryConvert(rows[0])];
                        case 2:
                            error_4 = _a.sent();
                            throw new errors_1.DaoError(error_4);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        ConversationDAO.prototype.tryConvert = function (data) {
            var conversation = {};
            for (var _i = 0, _a = Object.entries(_fields); _i < _a.length; _i++) {
                var _b = _a[_i], field = _b[0], value = _b[1];
                conversation[field] = data[value];
            }
            return conversation;
        };
        return ConversationDAO;
    }(dao_1["default"]));
    exports["default"] = ConversationDAO;
});
define("daos/user", ["require", "exports", "daos/dao", "../errors"], function (require, exports, dao_2, errors_2) {
    "use strict";
    exports.__esModule = true;
    var _fields = {
        idUser: "id",
        login: "login",
        password: "password"
    };
    var UserDAO = /** @class */ (function (_super) {
        __extends(UserDAO, _super);
        function UserDAO(driver, tableName) {
            return _super.call(this, driver, tableName) || this;
        }
        UserDAO.prototype.getByID = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var sql, rows, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            sql = "SELECT * FROM " + this.tableName + " WHERE " + _fields["idUser"] + " = " + id;
                            return [4 /*yield*/, this.driver.query(sql)];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, this.tryConvert(rows[0])];
                        case 2:
                            error_5 = _a.sent();
                            throw new errors_2.DaoError(error_5);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        UserDAO.prototype.deleteByID = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var sql, rows, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            sql = "DELETE FROM " + this.tableName + " WHERE " + _fields["idUser"] + " = " + id + " RETURNING *";
                            return [4 /*yield*/, this.driver.query(sql)];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, this.tryConvert(rows[0])];
                        case 2:
                            error_6 = _a.sent();
                            throw new errors_2.DaoError(error_6);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        UserDAO.prototype.addOne = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var login, password, sql, rows, error_7;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            login = data.login, password = data.password;
                            sql = "INSERT INTO " + this.tableName + "(" + _fields["login"] + ", " + _fields["password"] + ") VALUES (" + login + ", " + password + ") RETURNING *";
                            return [4 /*yield*/, this.driver.query(sql)];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, this.tryConvert(rows[0])];
                        case 2:
                            error_7 = _a.sent();
                            throw new errors_2.DaoError(error_7);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        UserDAO.prototype.updateByID = function (id, data) {
            return __awaiter(this, void 0, void 0, function () {
                var login, password, sql, rows, error_8;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            login = data.login, password = data.password;
                            sql = "UPDATE " + this.tableName + " SET " + _fields["login"] + " = " + login + ", " + _fields["password"] + " = " + password + " WHERE " + _fields["idUser"] + " = " + id + " RETURNING *";
                            return [4 /*yield*/, this.driver.query(sql)];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, this.tryConvert(rows[0])];
                        case 2:
                            error_8 = _a.sent();
                            throw new errors_2.DaoError(error_8);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        UserDAO.prototype.tryConvert = function (data) {
            var conversation = {};
            for (var _i = 0, _a = Object.entries(_fields); _i < _a.length; _i++) {
                var _b = _a[_i], field = _b[0], value = _b[1];
                conversation[field] = data[value];
            }
            return conversation;
        };
        return UserDAO;
    }(dao_2["default"]));
    exports["default"] = UserDAO;
});
define("daos/userToken", ["require", "exports", "daos/dao", "../errors"], function (require, exports, dao_3, errors_3) {
    "use strict";
    exports.__esModule = true;
    var _fields = {
        idKey: "id_user",
        idUser: "id_user",
        key: "key"
    };
    var UserTokenDAO = /** @class */ (function (_super) {
        __extends(UserTokenDAO, _super);
        function UserTokenDAO(driver, tableName) {
            return _super.call(this, driver, tableName) || this;
        }
        UserTokenDAO.prototype.updateByID = function () {
            throw "plsno";
        };
        UserTokenDAO.prototype.getByID = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var sql, rows, error_9;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            sql = "SELECT * FROM " + this.tableName + " WHERE " + _fields["idKey"] + " = " + id;
                            return [4 /*yield*/, this.driver.query(sql)];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, this.tryConvert(rows[0])];
                        case 2:
                            error_9 = _a.sent();
                            throw new errors_3.DaoError(error_9);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        UserTokenDAO.prototype.deleteByID = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var sql, rows, error_10;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            sql = "DELETE FROM " + this.tableName + " WHERE " + _fields["idKey"] + " = " + id + " RETURNING *";
                            return [4 /*yield*/, this.driver.query(sql)];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, this.tryConvert(rows[0])];
                        case 2:
                            error_10 = _a.sent();
                            throw new errors_3.DaoError(error_10);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        UserTokenDAO.prototype.getUserTokens = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var sql, rows, error_11;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            sql = "SELECT * FROM " + this.tableName + " WHERE " + _fields["idUser"] + " = " + id + "}";
                            return [4 /*yield*/, this.driver.query(sql)];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, rows.map(function (x) { return _this.tryConvert(x); })];
                        case 2:
                            error_11 = _a.sent();
                            throw new errors_3.DaoError(error_11);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        UserTokenDAO.prototype.findOne = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                var sql, rows, error_12;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            sql = "SELECT id FROM " + this.tableName + " WHERE " + _fields["key"] + " = " + key;
                            return [4 /*yield*/, this.driver.query(sql)];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, this.tryConvert(rows[0])];
                        case 2:
                            error_12 = _a.sent();
                            throw new errors_3.DaoError(error_12);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        UserTokenDAO.prototype.addOne = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var idUser, key, sql, rows, error_13;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            idUser = data.idUser, key = data.key;
                            sql = "INSERT INTO " + this.tableName + "(" + _fields["idUser"] + ", " + _fields["key"] + ") VALUES(" + idUser + ", " + key + ") RETURNING *";
                            return [4 /*yield*/, this.driver.query(sql)];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, this.tryConvert(rows[0])];
                        case 2:
                            error_13 = _a.sent();
                            throw new errors_3.DaoError(error_13);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        UserTokenDAO.prototype.tryConvert = function (data) {
            var conversation = {};
            for (var _i = 0, _a = Object.entries(_fields); _i < _a.length; _i++) {
                var _b = _a[_i], field = _b[0], value = _b[1];
                conversation[field] = data[value];
            }
            return conversation;
        };
        return UserTokenDAO;
    }(dao_3["default"]));
    exports["default"] = UserTokenDAO;
});
define("daos/userConversationPair", ["require", "exports", "daos/dao", "../errors"], function (require, exports, dao_4, errors_4) {
    "use strict";
    exports.__esModule = true;
    var _fields = {
        idUser: "id_user",
        idConversation: "id_conversation"
    };
    var UserConversationPairDAO = /** @class */ (function (_super) {
        __extends(UserConversationPairDAO, _super);
        function UserConversationPairDAO(driver, tableName) {
            return _super.call(this, driver, tableName) || this;
        }
        UserConversationPairDAO.prototype.updateByID = function () {
            throw "plsno";
        };
        UserConversationPairDAO.prototype.getByID = function () {
            throw "plsno";
        };
        UserConversationPairDAO.prototype.deleteByID = function () {
            throw "plsno";
        };
        UserConversationPairDAO.prototype.addOne = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var idUser, idConversation, sql, rows, error_14;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            idUser = data.idUser, idConversation = data.idConversation;
                            sql = "INSERT INTO " + this.tableName + "(" + _fields["idUser"] + ", " + _fields["idConversation"] + ") VALUES(" + idUser + ", " + idConversation + ") RETURNING *";
                            return [4 /*yield*/, this.driver.query(sql)];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, this.tryConvert(rows[0])];
                        case 2:
                            error_14 = _a.sent();
                            throw new errors_4.DaoError(error_14);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        UserConversationPairDAO.prototype.getUserConversationsIDs = function (idUser) {
            return __awaiter(this, void 0, void 0, function () {
                var sql, rows, error_15;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            sql = "SELECT * FROM " + this.tableName + " WHERE " + _fields["idUser"] + " = " + idUser;
                            return [4 /*yield*/, this.driver.query(sql)];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, rows.map(function (x) { return _this.tryConvert(x); })];
                        case 2:
                            error_15 = _a.sent();
                            throw new errors_4.DaoError(error_15);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        UserConversationPairDAO.prototype.getConversationUsersIDs = function (idConversation) {
            return __awaiter(this, void 0, void 0, function () {
                var sql, rows, error_16;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            sql = "SELECT * FROM " + this.tableName + " WHERE " + _fields["idConversation"] + " = " + idConversation;
                            return [4 /*yield*/, this.driver.query(sql)];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, rows.map(function (x) { return _this.tryConvert(x); })];
                        case 2:
                            error_16 = _a.sent();
                            throw new errors_4.DaoError(error_16);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        UserConversationPairDAO.prototype.deleteOne = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var idUser, idConversation, sql, rows, error_17;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            idUser = data.idUser, idConversation = data.idConversation;
                            sql = "DELETE FROM " + this.tableName + " WHERE " + _fields["idUser"] + " = " + idUser + " AND " + _fields["idConversation"] + " = " + idConversation + " RETURNING *";
                            return [4 /*yield*/, this.driver.query(sql)];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, this.tryConvert(rows[0])];
                        case 2:
                            error_17 = _a.sent();
                            throw new errors_4.DaoError(error_17);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        UserConversationPairDAO.prototype.tryConvert = function (data) {
            var conversation = {};
            for (var _i = 0, _a = Object.entries(_fields); _i < _a.length; _i++) {
                var _b = _a[_i], field = _b[0], value = _b[1];
                conversation[field] = data[value];
            }
            return conversation;
        };
        return UserConversationPairDAO;
    }(dao_4["default"]));
    exports["default"] = UserConversationPairDAO;
});
define("daos/message", ["require", "exports", "daos/dao", "../errors"], function (require, exports, dao_5, errors_5) {
    "use strict";
    exports.__esModule = true;
    var _fields = {
        idMessage: "id",
        idSender: "id_sender",
        idConversation: "id_conversation",
        text: "text"
    };
    var MessageDAO = /** @class */ (function (_super) {
        __extends(MessageDAO, _super);
        function MessageDAO(driver, tableName) {
            return _super.call(this, driver, tableName) || this;
        }
        MessageDAO.prototype.getConversationMessages = function (idConversation) {
            return __awaiter(this, void 0, void 0, function () {
                var sql, rows, error_18;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            sql = "SELECT * FROM " + this.tableName + " WHERE " + _fields["idConversation"] + "  = " + idConversation;
                            return [4 /*yield*/, this.driver.query(sql)];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, rows.map(function (x) { return _this.tryConvert(x); })];
                        case 2:
                            error_18 = _a.sent();
                            throw new errors_5.DaoError(error_18);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        MessageDAO.prototype.addOne = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var idSender, idConversation, text, sql, rows, error_19;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            idSender = data.idSender, idConversation = data.idConversation, text = data.text;
                            sql = "INSERT INTO " + this.tableName + "(" + _fields["idSender"] + " , " + _fields["idConversation"] + " , " + _fields["text"] + " ) \n                            VALUES(" + idSender + ", " + idConversation + ", " + text + ") \n                        RETURNING *";
                            return [4 /*yield*/, this.driver.query(sql)];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, this.tryConvert(rows[0])];
                        case 2:
                            error_19 = _a.sent();
                            throw new errors_5.DaoError(error_19);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        MessageDAO.prototype.updateByID = function (id, data) {
            return __awaiter(this, void 0, void 0, function () {
                var idSender, idConversation, text, sql, rows, error_20;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            idSender = data.idSender, idConversation = data.idConversation, text = data.text;
                            sql = "UPDATE " + this.tableName + " SET \n                            " + _fields["idSender"] + "  = " + idSender + ", \n                            " + _fields["idConversation"] + "  = " + idConversation + ", \n                            " + _fields["text"] + "  = " + text + " \n                        WHERE id = " + id + " \n                        RETURNING *";
                            return [4 /*yield*/, this.driver.query(sql)];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, this.tryConvert(rows[0])];
                        case 2:
                            error_20 = _a.sent();
                            throw new errors_5.DaoError(error_20);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        MessageDAO.prototype.getByID = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var sql, rows, error_21;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            sql = "SELECT * FROM " + this.tableName + " WHERE " + _fields["idMessage"] + " = " + id;
                            return [4 /*yield*/, this.driver.query(sql)];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, this.tryConvert(rows[0])];
                        case 2:
                            error_21 = _a.sent();
                            throw new errors_5.DaoError(error_21);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        MessageDAO.prototype.deleteByID = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var sql, rows, error_22;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            sql = "DELETE FROM " + this.tableName + " WHERE " + _fields["idMessage"] + "  = " + id + " RETURNING *";
                            return [4 /*yield*/, this.driver.query(sql)];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, this.tryConvert(rows[0])];
                        case 2:
                            error_22 = _a.sent();
                            throw new errors_5.DaoError(error_22);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        MessageDAO.prototype.tryConvert = function (data) {
            var conversation = {};
            for (var _i = 0, _a = Object.entries(_fields); _i < _a.length; _i++) {
                var _b = _a[_i], field = _b[0], value = _b[1];
                conversation[field] = data[value];
            }
            return conversation;
        };
        return MessageDAO;
    }(dao_5["default"]));
    exports["default"] = MessageDAO;
});
define("daos/index", ["require", "exports", "daos/user", "daos/userToken", "daos/userConversationPair", "daos/conversation", "daos/message"], function (require, exports, user_1, userToken_1, userConversationPair_1, conversation_1, message_1) {
    "use strict";
    exports.__esModule = true;
    exports.UserDao = user_1["default"];
    exports.UserTokenDAO = userToken_1["default"];
    exports.UserConversationPairDAO = userConversationPair_1["default"];
    exports.ConversationDAO = conversation_1["default"];
    exports.MessageDAO = message_1["default"];
});
/* https://rclayton.silvrback.com/custom-errors-in-node-js */
define("errors/domainError", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var DomainError = /** @class */ (function (_super) {
        __extends(DomainError, _super);
        function DomainError(message) {
            var _this = _super.call(this, message) || this;
            // Ensure the name of this error is the same as the class name
            _this.name = _this.constructor.name;
            // This clips the constructor invocation from the stack trace.
            // It's not absolutely essential, but it does make the stack trace a little nicer.
            //  @see Node.js reference (bottom)
            Error.captureStackTrace(_this, _this.constructor);
            return _this;
        }
        return DomainError;
    }(Error));
    exports["default"] = DomainError;
});
define("errors/internalError", ["require", "exports", "errors/domainError"], function (require, exports, domainError_1) {
    "use strict";
    exports.__esModule = true;
    var InternalError = /** @class */ (function (_super) {
        __extends(InternalError, _super);
        function InternalError(error) {
            var _this = _super.call(this, error.message) || this;
            _this.data = { error: error };
            return _this;
        }
        return InternalError;
    }(domainError_1["default"]));
    exports["default"] = InternalError;
});
define("errors/daoError", ["require", "exports", "errors/internalError"], function (require, exports, internalError_1) {
    "use strict";
    exports.__esModule = true;
    var DaoError = /** @class */ (function (_super) {
        __extends(DaoError, _super);
        function DaoError(error) {
            return _super.call(this, error) || this;
        }
        return DaoError;
    }(internalError_1["default"]));
    exports["default"] = DaoError;
});
define("errors/validationError", ["require", "exports", "errors/domainError"], function (require, exports, domainError_2) {
    "use strict";
    exports.__esModule = true;
    var ResourceNotFoundError = /** @class */ (function (_super) {
        __extends(ResourceNotFoundError, _super);
        function ResourceNotFoundError(details, query) {
            var _this = _super.call(this, "Data is not valid: " + details) || this;
            _this.data = { details: details, query: query };
            return _this;
        }
        return ResourceNotFoundError;
    }(domainError_2["default"]));
    exports["default"] = ResourceNotFoundError;
});
define("errors/resourceNotFoundError", ["require", "exports", "errors/domainError"], function (require, exports, domainError_3) {
    "use strict";
    exports.__esModule = true;
    var ResourceNotFoundError = /** @class */ (function (_super) {
        __extends(ResourceNotFoundError, _super);
        function ResourceNotFoundError(resource) {
            var _this = _super.call(this, "Resource not found: " + resource) || this;
            _this.data = { resource: resource };
            return _this;
        }
        return ResourceNotFoundError;
    }(domainError_3["default"]));
    exports["default"] = ResourceNotFoundError;
});
define("errors/index", ["require", "exports", "errors/domainError", "errors/internalError", "errors/validationError", "errors/daoError", "errors/resourceNotFoundError"], function (require, exports, domainError_4, internalError_2, validationError_1, daoError_1, resourceNotFoundError_1) {
    "use strict";
    exports.__esModule = true;
    exports.DomainError = domainError_4["default"];
    exports.InternalError = internalError_2["default"];
    exports.ValidationError = validationError_1["default"];
    exports.DaoError = daoError_1["default"];
    exports.ResourceNotFoundError = resourceNotFoundError_1["default"];
});
define("models/model", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Model = /** @class */ (function () {
        function Model(dao) {
            this.dao = dao;
        }
        return Model;
    }());
    exports["default"] = Model;
});
define("models/conversation", ["require", "exports", "models/model"], function (require, exports, model_1) {
    "use strict";
    exports.__esModule = true;
    var ConversationModel = /** @class */ (function (_super) {
        __extends(ConversationModel, _super);
        function ConversationModel(dao) {
            var _this = _super.call(this, dao) || this;
            _this.dao = dao;
            return _this;
        }
        ConversationModel.prototype.tryValidate = function (data) {
            var conversation = this.dao.tryConvert(data);
            return conversation;
        };
        ConversationModel.prototype.getByID = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.dao.getByID(id)];
                        case 1:
                            result = _a.sent();
                            return [4 /*yield*/, this.dao.getByID(id)];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        ConversationModel.prototype.addOne = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var conversation;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            conversation = this.tryValidate(data);
                            return [4 /*yield*/, this.dao.addOne(conversation)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        ConversationModel.prototype.updateByID = function (id, data) {
            return __awaiter(this, void 0, void 0, function () {
                var conversation;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            conversation = this.tryValidate(data);
                            return [4 /*yield*/, this.dao.updateByID(id, conversation)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        ConversationModel.prototype.deleteByID = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.dao.deleteByID(id)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return ConversationModel;
    }(model_1["default"]));
    exports["default"] = ConversationModel;
});
define("models/message", ["require", "exports", "models/model"], function (require, exports, model_2) {
    "use strict";
    exports.__esModule = true;
    var MessageModel = /** @class */ (function (_super) {
        __extends(MessageModel, _super);
        function MessageModel(dao) {
            var _this = _super.call(this, dao) || this;
            _this.dao = dao;
            return _this;
        }
        MessageModel.prototype.tryValidate = function (data) {
            return this.dao.tryConvert(data);
        };
        MessageModel.prototype.getByID = function (id) {
            throw 0;
        };
        MessageModel.prototype.getConversationMessages = function (idConversation) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.dao.getConversationMessages(idConversation)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        MessageModel.prototype.addOne = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var message;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            message = this.tryValidate(data);
                            return [4 /*yield*/, this.dao.addOne(message)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        MessageModel.prototype.updateByID = function (id, data) {
            return __awaiter(this, void 0, void 0, function () {
                var message;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            message = this.tryValidate(data);
                            return [4 /*yield*/, this.dao.updateByID(id, message)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        MessageModel.prototype.deleteByID = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.dao.deleteByID(id)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return MessageModel;
    }(model_2["default"]));
    exports["default"] = MessageModel;
});
define("models/user", ["require", "exports", "models/model"], function (require, exports, model_3) {
    "use strict";
    exports.__esModule = true;
    var UserModel = /** @class */ (function (_super) {
        __extends(UserModel, _super);
        function UserModel(dao) {
            var _this = _super.call(this, dao) || this;
            _this.dao = dao;
            return _this;
        }
        UserModel.prototype.tryValidate = function (data) {
            return this.dao.tryConvert(data);
        };
        UserModel.prototype.getByID = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.dao.getByID(id)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        UserModel.prototype.addOne = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            user = this.tryValidate(data);
                            return [4 /*yield*/, this.dao.addOne(user)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        UserModel.prototype.updateByID = function (id, data) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            user = this.tryValidate(data);
                            return [4 /*yield*/, this.dao.updateByID(id, user)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        UserModel.prototype.deleteByID = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.dao.deleteByID(id)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return UserModel;
    }(model_3["default"]));
    exports["default"] = UserModel;
});
define("models/userConversationPair", ["require", "exports", "models/model"], function (require, exports, model_4) {
    "use strict";
    exports.__esModule = true;
    var UserConversationPairModel = /** @class */ (function (_super) {
        __extends(UserConversationPairModel, _super);
        function UserConversationPairModel(dao) {
            var _this = _super.call(this, dao) || this;
            _this.dao = dao;
            return _this;
        }
        UserConversationPairModel.prototype.getOne = function (arg) {
            throw 0;
        };
        UserConversationPairModel.prototype.updateByID = function (arg) {
            throw 0;
        };
        UserConversationPairModel.prototype.getByID = function (arg) {
            throw 0;
        };
        UserConversationPairModel.prototype.deleteByID = function (arg) {
            throw 0;
        };
        /* Дописать наследников Exception для обработки ошибок, функцию валидации */
        UserConversationPairModel.prototype.tryValidate = function (data) {
            var userConversationPair = this.dao.tryConvert(data);
            return userConversationPair;
        };
        UserConversationPairModel.prototype.addOne = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var userConversationPair;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            userConversationPair = this.dao.tryConvert(data);
                            return [4 /*yield*/, this.dao.addOne(userConversationPair)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        UserConversationPairModel.prototype.deleteOne = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var userConversationPair;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            userConversationPair = this.dao.tryConvert(data);
                            return [4 /*yield*/, this.dao.deleteOne(userConversationPair)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        UserConversationPairModel.prototype.getUsersConversations = function (idUser) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.dao.getUserConversationsIDs(idUser)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        UserConversationPairModel.prototype.getConversationUsers = function (idConversation) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.dao.getConversationUsersIDs(idConversation)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return UserConversationPairModel;
    }(model_4["default"]));
    exports["default"] = UserConversationPairModel;
});
define("models/userToken", ["require", "exports", "models/model"], function (require, exports, model_5) {
    "use strict";
    exports.__esModule = true;
    var UserTokenModel = /** @class */ (function (_super) {
        __extends(UserTokenModel, _super);
        function UserTokenModel(dao) {
            var _this = _super.call(this, dao) || this;
            _this.dao = dao;
            return _this;
        }
        /* Дописать наследников Exception для обработки ошибок, функцию валидации */
        UserTokenModel.prototype.tryValidate = function (data) {
            var userToken = this.dao.tryConvert(data);
            return userToken;
        };
        UserTokenModel.prototype.updateByID = function (id) {
            throw 0;
        };
        UserTokenModel.prototype.findOne = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.dao.findOne(key)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        UserTokenModel.prototype.getByID = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.dao.getByID(id)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        UserTokenModel.prototype.addOne = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var userToken;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            userToken = this.dao.tryConvert(data);
                            return [4 /*yield*/, this.dao.addOne(userToken)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        UserTokenModel.prototype.deleteByID = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.dao.deleteByID(id)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return UserTokenModel;
    }(model_5["default"]));
    exports["default"] = UserTokenModel;
});
define("models/index", ["require", "exports", "models/conversation", "models/message", "models/user", "models/userConversationPair", "models/userToken"], function (require, exports, conversation_2, message_2, user_2, userConversationPair_2, userToken_2) {
    "use strict";
    exports.__esModule = true;
    exports.ConversationModel = conversation_2["default"];
    exports.MessageModel = message_2["default"];
    exports.UserModel = user_2["default"];
    exports.UserConversationPairModel = userConversationPair_2["default"];
    exports.UserTokenModel = userToken_2["default"];
});
define("services/IConversationService", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("services/IUserService", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("services/userService", ["require", "exports", "../errors"], function (require, exports, errors_6) {
    "use strict";
    exports.__esModule = true;
    var UserService = /** @class */ (function () {
        function UserService(userModel, userTokenModel) {
            this.userModel = userModel;
            this.userTokenModel = userTokenModel;
        }
        UserService.prototype.getOne = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userModel.getByID(id)];
                        case 1:
                            result = _a.sent();
                            if (result == null)
                                throw new errors_6.ResourceNotFoundError("user " + id + " not found");
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        UserService.prototype.createOne = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userModel.addOne(data)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        UserService.prototype.deleteOne = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userModel.deleteByID(id)];
                        case 1:
                            result = _a.sent();
                            if (result == null)
                                throw new errors_6.ResourceNotFoundError("user " + id + " not found");
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        UserService.prototype.addLogin = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userTokenModel.addOne(data)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        UserService.prototype.updateOne = function (id, data) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userModel.getByID(id)];
                        case 1:
                            user = _a.sent();
                            if (user == null)
                                throw new errors_6.ResourceNotFoundError("user " + id + " not found");
                            return [4 /*yield*/, this.userModel.updateByID(id, data)];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        UserService.prototype.findLogin = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userTokenModel.findOne(key)];
                        case 1:
                            result = _a.sent();
                            if (result == null)
                                throw new errors_6.ResourceNotFoundError("login/token/yahz " + key + " not found");
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        UserService.prototype.removeLogin = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userTokenModel.deleteByID(id)];
                        case 1:
                            result = _a.sent();
                            if (result == null)
                                throw new errors_6.ResourceNotFoundError("login/token/yahz " + id + " not found");
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        return UserService;
    }());
    exports["default"] = UserService;
});
define("services/userTestService", ["require", "exports", "../errors"], function (require, exports, errors_7) {
    "use strict";
    exports.__esModule = true;
    var UserTestService = /** @class */ (function () {
        function UserTestService(userModel, userTokenModel) {
            this.userModel = userModel;
            this.userTokenModel = userTokenModel;
        }
        UserTestService.prototype.getOne = function (id) {
            if (id === void 0) { id = 1; }
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userModel.getByID(id)];
                        case 1:
                            result = _a.sent();
                            if (result == null)
                                throw new errors_7.ResourceNotFoundError("user " + id + " not found");
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        UserTestService.prototype.createOne = function (data) {
            if (data === void 0) { data = {}; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userModel.addOne(data)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        UserTestService.prototype.deleteOne = function (id) {
            if (id === void 0) { id = 2; }
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userModel.deleteByID(id)];
                        case 1:
                            result = _a.sent();
                            if (result == null)
                                throw new errors_7.ResourceNotFoundError("user " + id + " not found");
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        UserTestService.prototype.addLogin = function (data) {
            if (data === void 0) { data = {}; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userTokenModel.addOne(data)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        UserTestService.prototype.updateOne = function (id, data) {
            if (id === void 0) { id = 1; }
            if (data === void 0) { data = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userModel.getByID(id)];
                        case 1:
                            user = _a.sent();
                            if (user == null)
                                throw new errors_7.ResourceNotFoundError("user " + id + " not found");
                            return [4 /*yield*/, this.userModel.updateByID(id, data)];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        UserTestService.prototype.findLogin = function (key) {
            if (key === void 0) { key = ''; }
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userTokenModel.findOne(key)];
                        case 1:
                            result = _a.sent();
                            if (result == null)
                                throw new errors_7.ResourceNotFoundError("login/token/yahz " + key + " not found");
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        UserTestService.prototype.removeLogin = function (id) {
            if (id === void 0) { id = 4; }
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userTokenModel.deleteByID(id)];
                        case 1:
                            result = _a.sent();
                            if (result == null)
                                throw new errors_7.ResourceNotFoundError("login/token/yahz " + id + " not found");
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        return UserTestService;
    }());
    exports["default"] = UserTestService;
});
define("services/index", ["require", "exports", "services/userService", "services/userTestService"], function (require, exports, userService_1, userTestService_1) {
    "use strict";
    exports.__esModule = true;
    exports.UserService = userService_1["default"];
    exports.UserTestService = userTestService_1["default"];
});
define("types?/IQueryable", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("types?/index", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Conversation = /** @class */ (function () {
        function Conversation() {
        }
        return Conversation;
    }());
    exports.Conversation = Conversation;
    var Message = /** @class */ (function () {
        function Message() {
        }
        return Message;
    }());
    exports.Message = Message;
    var User = /** @class */ (function () {
        function User() {
        }
        return User;
    }());
    exports.User = User;
    var UserConversationPair = /** @class */ (function () {
        function UserConversationPair() {
        }
        return UserConversationPair;
    }());
    exports.UserConversationPair = UserConversationPair;
    var UserToken = /** @class */ (function () {
        function UserToken() {
        }
        return UserToken;
    }());
    exports.UserToken = UserToken;
});
define("views/index", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var View = /** @class */ (function () {
        function View() {
            this.showError = console.log;
            this.showResult = console.log;
        }
        return View;
    }());
    exports.View = View;
});
