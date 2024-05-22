class Calendar {
    private year: String;
    private dates: Day[][];

    constructor(year: String, dates: Day[][]) {
        if (dates.length != 12) {
            throw new Error(
                'No se puede inicializar un año con menos o más de 12 meses.'
            );
        }

        this.year = year;
        this.dates = dates;
    }

    getYear(): String {
        return this.year;
    }

    getDates(): Day[][] {
        return this.dates;
    }

    getMonth(i: number): Day[] {
        if (i < 0 || i >= 12) {
            throw new Error('El indice del mes buscado no es valido.');
        }

        return this.getDates()[i];
    }
}
