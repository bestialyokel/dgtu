import {UserController} from "./controller/UserController";

export const Routes = [
    {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "put",
    route: "/users",
    controller: UserController,
    action: "reset"
}];