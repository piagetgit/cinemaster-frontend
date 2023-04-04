export interface Ticket {
    id: number;
    userId: number;
    filmId: number;
    pagato: boolean;
    numeroPersone: number;
    numeroRidotti: number;
    prezzoTotale:number;
    dataOra:Date;
    posti:string;  
  }
  