import * as os from 'os'


function randomInteger(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

enum Event {
    UP,
    DOWN,
    LEFT,
    RIGHT,
    EXIT,
    OTHER
}

interface IObserver {
    update: (evt: Event) => void;
}

class Cells {
    public raw : Uint8Array;
    public emptyIdx : number;
    constructor(public lenSqrt : number) {
        this.raw = new Uint8Array( lenSqrt * lenSqrt );
    
        for (let i = 0; i < this.raw.length; i++)
            this.raw[i] = i;

        this.emptyIdx = this.raw.length - 1;
    }

    private swap(leftIdx : number, rightIdx : number) : void {
        const T = this.raw[leftIdx];
        this.raw[leftIdx] = this.raw[rightIdx];
        this.raw[rightIdx] = T;
    }

    public up() : boolean {
        
        const {lenSqrt, emptyIdx} = this;

        if (emptyIdx - lenSqrt < 0)
            return false;
        
        this.swap(emptyIdx, emptyIdx - lenSqrt);

        this.emptyIdx -= lenSqrt;

        return true;
        
    }
    public down() : boolean {
        const {lenSqrt, emptyIdx} = this;

        if (emptyIdx + lenSqrt >= this.raw.length)
            return false;
        
        this.swap(emptyIdx, emptyIdx + lenSqrt)

        this.emptyIdx += lenSqrt;

        return true;
    }
    public left() : boolean {
        const {emptyIdx, lenSqrt} = this;

        if (emptyIdx - 1 >= this.raw.length || emptyIdx % lenSqrt == 0)
            return false;
        
        this.swap(emptyIdx, emptyIdx - 1);

        this.emptyIdx -= 1;

        return true;
    }
    public right() : boolean {
        const {emptyIdx, lenSqrt} = this;

        if (emptyIdx + 1 >= this.raw.length || (emptyIdx - lenSqrt + 1) % lenSqrt == 0)
            return false;
        
        this.swap(emptyIdx, emptyIdx + 1);

        this.emptyIdx += 1;

        return true;
    }
}

class GameView {

    private KeysBuffs : any = {
       UP : Buffer.from([27, 91, 65]),
       DOWN : Buffer.from([27, 91, 66]),
       RIGHT : Buffer.from([27, 91, 67]),
       LEFT : Buffer.from([27, 91, 68])
    }

    constructor(private stdin : NodeJS.ReadStream, private stdout: NodeJS.WriteStream) {}

    public Bind() : void {
        this.stdin.setRawMode(true);
        this.stdin.on('data', this.handleInputData);
    }

    public Unbind() : void {
        this.stdin.setRawMode(false);
        this.stdin.removeListener('data', this.handleInputData);
    }


    private handleInputData = (data : Buffer) => {
   
        
        if (String(data) == '\u0003') {
            this.notifyObservers(Event.EXIT);
            return;
        }

        data.compare(this.KeysBuffs.UP) == 0 ? this.notifyObservers(Event.UP) :
        data.compare(this.KeysBuffs.DOWN) == 0 ? this.notifyObservers(Event.DOWN) :
        data.compare(this.KeysBuffs.LEFT) == 0 ? this.notifyObservers(Event.LEFT) :
        data.compare(this.KeysBuffs.RIGHT) == 0 ? this.notifyObservers(Event.RIGHT) : this.notifyObservers(Event.OTHER);
    }

    private evtObservers : Set<IObserver> = new Set<IObserver>();
    public addObserver(obs : IObserver) : void {
        this.evtObservers.add(obs);
    }
    public deleteObserver(obs : IObserver) : void {
        this.evtObservers.delete(obs);
    }
    private notifyObservers(evt : Event) {
        this.evtObservers.forEach(obs => obs.update(evt));
    }

    private clearScreen() : void {
        this.stdout.write( '\x1Bc' );
    }

    public printWin() : void {
        this.clearScreen();
        this.stdout.write("you won");
    }

    private printCells(cells: Cells) : void {
        const n = cells.lenSqrt;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const num = cells.raw[j + i*n];
                if (num > 9) {
                    this.stdout.write(num == 15 ? '_' : String(num));
                } else {
                    this.stdout.write(' ' + num)
                }

                this.stdout.write(' ');
            }
            
            process.stdout.write(os.EOL)
        }
    }

    public updateCells(cells: Cells) : void {
        this.clearScreen();
        this.printCells(cells);
    } 
}



class GameController implements IObserver {
    
    constructor(private view: GameView, private cells : Cells) {}


    public GameStart() {

        this.moveEmptyCell(10);

        view.addObserver(this);
        view.Bind();

        view.updateCells(cells);
    }

    private moveEmptyCell(times : number) : void {

        while (--times > 0) {
            const random = randomInteger(0, 3)

            random == 0 ? cells.up() :
            random == 1 ? cells.down() :
            random == 2 ? cells.left() :
            random == 3 ? cells.right() : null
            
        }
    }

    private isSorted() : boolean {
        for (let i = 1; i < cells.raw.length - 1; i++) {
            if (cells.raw[i] < cells.raw[i - 1])
                return false;
        }

        return true;
    }

    public update (evt: Event) {

        

        evt == Event.UP ? cells.up() :
        evt == Event.DOWN ? cells.down() :
        evt == Event.LEFT ? cells.left() :
        evt == Event.RIGHT ? cells.right() :
        evt == Event.EXIT ? process.exit() : null

        if (this.isSorted()) {
            this.view.printWin();
            process.exit();
        }

        this.view.updateCells(cells);

    }
}

const cells = new Cells(4);

const view = new GameView(process.stdin, process.stdout);

const controller = new GameController(view, cells);


controller.GameStart();

