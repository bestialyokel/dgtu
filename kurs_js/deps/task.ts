
import List from "./list"


export default class Task {
    public list : List<number>
    private log: boolean
    private each: number
    constructor(amount: number, each: number, log: boolean = false) {
        this.log = log
        this.each = each
        this.list = new List<number>();
        if (amount < 1) throw "bad amount"
        if (each < 1) throw "bad each"
        for (let i = 0; i < amount; i++) this.list.push_back(i)
    }
    public log_deletion = (who: string) => {
        console.log(`${who} was deleted(killed)`)
    }
    public find_last = () => {
        let begin = this.list.begin()
        let end = this.list.end()

        while (this.list.size() != 1) {
            for (let i = 0; i < this.each; i++) begin = begin["++"]()
            this.list.remove(begin);
            if (this.log) this.log_deletion(begin.getValue().toString())
        }
        
        return this.list.begin().getValue()
    }

}

