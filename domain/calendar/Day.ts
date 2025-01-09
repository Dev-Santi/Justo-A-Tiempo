class Day {
    private date: Date;
    description: string = "";
    
    constructor(date: Date) {
        this.date = date;
    }

    getName(): string {
        return ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"][this.date.getDay()];
    }

    getDate(): Date {
        return this.date;
    }

    getDescription(): string {
        return this.description;
    }

    getStringDate(): string {
        return this.date.toLocaleDateString("es-UY", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }
}

class Holiday extends Day {

    constructor(day: Day, description: string) {
        // test this
        super(day.getDate());
        this.description = description;
    };
}