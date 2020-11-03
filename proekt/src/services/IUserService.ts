import { User, UserToken} from "../types?";

export default interface IUserService {
    createOne(data: object) : Promise<User>;
    deleteOne(id: number) : Promise<User>;
    updateOne(id: number, data: object) : Promise<User>;
    getOne(id: number) : Promise<User>;

    addLogin(data: object) : Promise<UserToken>;
    removeLogin(id: number) : Promise<UserToken>;
    findLogin(key: string) : Promise<UserToken>;

}