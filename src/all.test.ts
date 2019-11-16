
class Coordinate {
    x: number;
    y: number;
    
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    toString(): string {
        return `${this.x},${this.y}`
    }
}

interface Cell {}

type HasCellHandler = (isCell: boolean) => void;

class World {
    private coordinates: Map<string, Cell>;

    constructor() {
        this.coordinates = new Map();
    }

    nextTick(): void {
        this.coordinates.clear()
    }

    createCell(coordinate: Coordinate): void {
        this.coordinates.set(coordinate.toString(), {});
    }
    
    hasCell(coordinate: Coordinate, handler: HasCellHandler): void {
        handler(this.coordinates.has(coordinate.toString()));
    }
}

describe('World should', () => {
    it('create a cell on the world and you can access to it', (done) => {
        const coordinate: Coordinate = {x: 1, y: 1};
        const world = new World();

        world.createCell(coordinate);
        
       world.hasCell(coordinate, (isAlive) => {
           expect(isAlive).toBe(true)
           done();
       });
    });

    it('a cell without neighbours dies', (done) => {
        const coordinate: Coordinate = {x: 1, y: 1};
        const world = new World();
        world.createCell(coordinate);
        world.hasCell(coordinate, (isAlive) => {
            expect(isAlive).toBe(true)
        });
    
        world.nextTick();

        world.hasCell(coordinate, (isAlive) => {
            expect(isAlive).toBe(false)
            done();
        });
    });

    xit('an empty coordinate with 3 neighbours a cell borns and everything works with magic', (done) => {
        const coordinate1: Coordinate = {x: 1, y: 0};
        const coordinate2: Coordinate = {x: 2, y: 0};
        const coordinate3: Coordinate = {x: 3, y: 0};
        const coordinate4: Coordinate = {x: 1, y: 2};
        const world = new World();
        world.createCell(coordinate);
        world.hasCell(coordinate, (isAlive) => {
            expect(isAlive).toBe(true)
        });
    
        world.nextTick();

        world.hasCell(coordinate, (isAlive) => {
            expect(isAlive).toBe(false)
            done();
        });
    });
});