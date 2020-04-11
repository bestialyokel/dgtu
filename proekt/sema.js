
//работа с БД
const BD = require('sequelize');

const bd = new BD('MVC', 'sam', 'sr271018', {
    dialect: "postgres",
    host: "localhost",
    define: {
        timestamps: false
    }
});
//                                    Data Access Object

class PostgresHandler{

    constructor(name,bd) {
        this.tableName = name;
        this.bd = bd; 
    }

    async getAll() {

        let result = await bd.query(`select * from ${this.tableName}`);
        return result[0];
    }

    async getById(ID) {

        let result = await bd.query(`select * from ${this.tableName} where id = ${ID};`);
        return result[0];
    }

    updateById(ID, ...data) {

        console.log('this is parents method');
    }

    async deleteById(ID) {

        let result = await bd.query(`delete from ${this.tableName} where id = ${ID}`);
        return result;
    }

}

class cursHandler extends PostgresHandler{
    constructor(bd) {
        super('curs',bd);
    }

    async updateById(ID, name, book) {
        //super.updateById(ID, name);
        let result = await bd.query(`update ${this.tableName} set name = '${name}' nameBook = '${book}' where id = ${ID} ;`);
        return result;
    }

    async setValue(name, book) {
        let result = await bd.query(`insert into ${this.tableName} (name , book) values ('${name}','${book}') `);
        return result;
    }
}

class studentHandler extends PostgresHandler{
    constructor(bd) {

        super('students',bd);
    }

    async updateById(...data) {
        //super.updateById(ID, name);
        let result = await bd.query(`update ${this.tableName} set ball = '${data[0]}' where personid = ${data[1]} and curid = ${data[2]} ;`);
        return result;
    }

    async setValue_new(...data) {
        let ID_student = await bd.query(`insert into people (fname , sname , dname , pol , data) values 
         ('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}') `)
            .then(async(r) => {
                let res = await bd.query(`select max(id) from people`).then((r) => {
                    return r[0];
                });
                //console.log(res[0].max);
                return res[0].max;
            });

        let result = await bd.query(`insert into ${this.tableName} (ball, curid , personid) values ('${data[5]}',${data[6]},${ID_student})`)
            .then((res) => {

                return res;
            });
    }

    async setValue(...data) {

        let res = await bd.query(`insert into ${this.tableName} (personid, curid , ball) values (${data[0]},${data[1]},${data[2]})`);

    }

    async getBall(...data) {
        const res = await bd.query(`select ball from students where personid = ${data[0]} and curid = ${data[1]}`)
            .then((res) => {
                return res[0]
            });

        return res[0].ball;
    }

    async getFamily(personid) {
        const res = await bd.query(`select * from people where id = ${personid}`)
            .then(res => {
                return res[0];
            });

        return res;
    }
}

class teacherHandler extends PostgresHandler{
    constructor(bd) {
        super('teacher',bd);
    }

    async updateById(...data) {
        //super.updateById(ID, name);
        let result = await bd.query(`update ${this.tableName} set degree = '${data[0]}' where id = ${data[1]} ;`);
        return result;
    }

    async setValue_new(...data) {
        let ID_techer = await bd.query(`insert into people (fname , sname , dname , pol , data) values 
         ('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}') `)
            .then(async(r) => {
                let res = await bd.query(`select max(id) from people`).then((r) => {
                    return r[0];
                });
                //console.log(res[0].max);
                return res[0].max;
            });

        let result = await bd.query(`insert into ${this.tableName} (degree,personid) values ('${data[5]}',${ID_techer})`)
            .then((res) => {

                return res;
            });
    }

    async getFamily(personid) {
        const res = await bd.query(`select * from people where id = ${personid}`)
            .then(res => {
                return res[0];
            });

        return res;
    }

}

class taskHandler extends PostgresHandler{
    constructor(bd) {

        super('tasks',bd);
    }

    async updateById(ID_techer, ID_curs, ID) {
        //super.updateById(ID, name);
        let result = await bd.query(`update ${this.tableName} set teacherid = ${ID_techer} curid = ${ID_curs} where id = ${ID} ;`);
        return result;
    }

    async setValue(ID_techer, ID_curs) {
        let result = await bd.query(`insert into ${this.tableName} (curid , teacherid) values (${ID_curs},${ID_techer})`);
        return result;
    }
}

//                                               MVC
//                                              Models
class Model {
    constructor(handler) {
        this.handler = handler; 
    }

    async getAll() {

        // let result = await bd.query(`select * from ${this.tableName}`);
        // return result[0];
        let result = await this.handler.getAll()
        return result ; 
    }

    async getById(ID) {

        let result = await this.handler.getById(ID);
        return result; 
    }

    updateById(ID, ...data) {

        console.log('this is parents method');
    }

    async deleteById(ID) {

        let result = await this.handler.deleteById(ID);
        return result ; 
    }

    setValue(...data) {

        console.log('this is parents method vad');
    }
}


class ModelCurs extends Model {

    constructor() {
        super(new cursHandler('curs',bd));
    }

    async updateById(ID, name, book) {
        //super.updateById(ID, name);
        // let result = await bd.query(`update ${this.tableName} set name = '${name}' nameBook = '${book}' where id = ${ID} ;`);
        // return result;
        let result = await this.handler.updateById(ID,name,book);
        return result; 
    }

    async setValue(name, book) {
        // let result = await bd.query(`insert into ${this.tableName} (name , book) values ('${name}','${book}') `);
        // return result;
        let result = await this.handler.setValue(name, book);
        return result; 
    }
}

class ModelStudent extends Model {

    constructor() {

        super(new studentHandler('students',bd));
    }

    async updateById(...data) {
        let result = await this.handler.updateById(...data);
        return result; 
    }

    async setValue_new(...data) {
        let result = await this.handler.setValue_new(...data);
        return result; 
    }

    async setValue(...data) {

       let result = await this.handler.setValue(...data);
       return result; 

    }

    async getBall(...data) {
       let result = await this.handler.getBall(...data);
       return result; 
    }

    async getFamily(personid) {
        let result = await this.handler.getFamily(personid);
        return result; 
    }
}

class ModelTeacher extends Model {
    constructor() {
        super(new teacherHandler('teacher',bd));
    }

    async updateById(...data) {
        let result = await this.handler.updateById(...data);
        return result; 
    }

    async setValue_new(...data) {
        let result = await this.handler.setValue_new(...data);
        return result; 
    }

    async getFamily(personid) {
        let result = await this.handler.getFamily(personid);
        return result;
    }

}

class ModelTasks extends Model {
    constructor() {

        super(new taskHandler('tasks',bd));
    }

    async updateById(ID_techer, ID_curs, ID) {
        let result = await this.handler.updateById(ID_techer,ID_curs,ID);
        return result;
    }

    async setValue(ID_techer, ID_curs) {
        let result = await this.handler.setValue(ID_techer,ID_curs);
        return result;
    }
}

//                                                 Service

class FindService{
   
    async teacher_students(teacherid) {
        try
        {
            let task = new ModelTasks();
            let helper = await task.getAll()
                .then((res) => {
                    let result = res.filter((item) => item.teacherid == teacherid);
                    return result;
                });

            let studets = new ModelStudent();
            let helper1 = await studets.getAll()
                .then(res => {
                    let result = res.filter(item => item.curid == helper[0].curid);
                    return result;
                });

            let FinallResult = [];

            for (let i = 0; i < helper1.length; i++) {

                let h = await studets.getFamily(helper1[i].personid);
                FinallResult.push(h[0]);
            }

            return FinallResult; 
        }
        catch
        {
            throw new Error('This student is not exist');
        }
    }

    async student_teachers(personid) {
        try
        {
            let stud = new ModelStudent();
            let helper = await stud.getAll()
                .then(res => {
                    let result = res.filter(item => item.personid == personid);
                    return result;
                });

            let task = new ModelTasks();
            let helper1 = await task.getAll()
                .then(res => {
                    let result = res.filter(item => item.curid == helper[0].curid);
                    return result;
                });

            let techer = new ModelTeacher();
            let helper2 = await techer.getAll()
                .then(res => {
                    let result = res.filter(item => item.id == helper1[0].teacherid);
                    return result;
                });

            let FinallResult = [];

            for (let i = 0; i < helper2.length; i++) {

                let h = await techer.getFamily(helper2[i].personid);
                FinallResult.push(h[0]);
            }

            return FinallResult; 
        }
        catch
        {
            throw new Error('This teacher is not exist');
        }
    }

}

class GetBallService{

    async addBallById(personid, curid, ball) {

        const stud = new ModelStudent();
        let BallNow = await stud.getBall(personid, curid)
        .catch(error => {
            throw new Error('This student or this curs is not exist')
        });
        let res = {};

        if ((+BallNow) < 50 && ((+BallNow) + ball) <= 50) {
            res.ball = BallNow = String((+BallNow) + ball);
            res.info = await stud.updateById(BallNow, personid, curid);
            return res;

        } else if ((+BallNow) < 50 && ((+BallNow) + ball) > 50) {
            res.ball = BallNow = String(50);
            res.info = await stud.updateById(BallNow, personid, curid);
            throw new Error('You put over MAX balls. Student has got MAX balls');

        } else {

            throw new Error('This student already has MAX count balls');
        }
    }

}

//                                                 Controller

class Controller {

    async FindStudents(teacherid){

        let ObjFind = new FindService();
        let view = new View();
        
        ObjFind.teacher_students(teacherid)
            .then(res=>view.printJson(res))
            .catch(error=> view.printError(error));
    }

    async FindTeachers(personid){
        
        let ObjFind = new FindService();
        let view = new View();
        
        let result  = await ObjFind.student_teachers(personid)
            .then(res=>view.printJson(res))
            .catch(error=> view.printError(error));
    }

    async GetBall(personid, curid, ball)
    {
        let ObjBall = new GetBallService();
        let view = new View();
        
        ObjBall.addBallById(personid, curid, ball)
            .then(res=>view.printJson(res))
            .catch(error=> view.printError(error));
        
    }

    
}

//                                                   View

class View {

    constructor() {
        this.name = 'View';
    }

    printJson(json) {

        let res = JSON.stringify(json);
        console.log("\n"+res+"\n");
    }

    printError(error){
        
        let objError = {}; 
        objError.error = error.message; 
        let json = JSON.stringify(objError);
        console.log("\n"+json+"\n");
    }
}

let exem = new Controller();
exem.GetBall(4,4,40);
exem.FindStudents(10);
exem.FindTeachers(25);