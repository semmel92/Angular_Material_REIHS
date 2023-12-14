export interface Kindergarden {
    id: number;
    name: string;
    address: string;
    PLZ: string;
    typ: Typ,
  }

  export enum Typ {
      privat = 1,
      oeffentlich = 2,
  }