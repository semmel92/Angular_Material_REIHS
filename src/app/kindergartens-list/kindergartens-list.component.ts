import {Component} from '@angular/core';
import {StoreService} from '../shared/store.service';

@Component({
  selector: 'app-kindergartens-list',
  templateUrl: './kindergartens-list.component.html',
  styleUrls: ['./kindergartens-list.component.scss']
})
export class KindergartensListComponent {
  constructor(public storeService: StoreService) {
  }

  getKindergartenImageUrl(id: number): string {
    return `assets/images/kindergarten${id}.png`;
  }
}
