import { Injectable } from '@angular/core';
import { Kindergarden } from './interfaces/Kindergarden';
import { Child, ChildResponse } from './interfaces/Child';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  public kindergardens: Kindergarden[] = [
    { id: 1, name: 'KIWI-Kindergarten Rosa-Jochmann-Ring', address: ' Lichnowskygasse 28', PLZ: '1110 Wien', typ: 1 },
    { id: 2, name: 'Kinderhaus Regenbogen', address: 'Dunkelstraße 2', PLZ: 'Träger 2', typ: 2 },
    { id: 3, name: 'Kinderhaus Biene Maja', address: 'Kaiser-Ebersdorfer-Straße 86', PLZ: '1110 Wien', typ: 1 },
    { id: 4, name: 'Kinderhaus Unterheiligenstadt', address: 'Püchlgasse 22', PLZ: '1110 Wien', typ: 2 },
  ];

  public children: ChildResponse[] = []
  public childrenTotalCount: number = 0;
}
