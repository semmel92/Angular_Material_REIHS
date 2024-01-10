import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'typTransform' })
export class TypTransformPipe implements PipeTransform {
  transform(value: number): string {
    switch(value) {
      case 1: return 'Privat';
      case 2: return 'Öffentlich';
      default: return 'Unbekannt';
    }
  }
}
