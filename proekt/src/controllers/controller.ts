import {View} from '../views/'
import { UserService } from '../services'

import DB from '../db/driver'
import {UserConversationPairDAO, UserDao, UserTokenDAO} from '../daos'
import { UserModel, UserConversationPairModel, UserTokenModel } from '../models';

const ud = new UserDao(DB.getInstance(), 'Users');
const ucpd = new UserConversationPairDAO(DB.getInstance(), 'UserConversations');
const utd = new UserTokenDAO(DB.getInstance(), 'User_Token');

const um = new UserModel(ud)
const ucpm = new UserConversationPairModel(ucpd)
const utm = new UserTokenModel(utd)

const service = new UserService(um, utm)




export default class Controller {
    private view: View = new View()
    private userService: UserService = service
    constructor() {}


    //я бы мог повторить это, но зачем
    async findUser(id: number) {
        try {
            const res = await this.userService.getOne(id)
            
            this.view.showResult(res)
        
        } catch(e) {
            console.log(e.message)
        }
    }
}


let x = new Controller();

x.findUser(1488)

x.findUser(1)


