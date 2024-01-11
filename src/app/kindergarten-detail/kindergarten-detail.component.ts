import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BackendService} from '../shared/backend.service';
import {Kindergarden} from '../shared/interfaces/Kindergarden';

@Component({
  selector: 'app-kindergarten-detail',
  templateUrl: './kindergarten-detail.component.html',
  styleUrls: ['./kindergarten-detail.component.scss']
})
export class KindergartenDetailComponent implements OnInit {
  kindergarten: Kindergarden | null = null;
  isLoading = false;

  constructor(private route: ActivatedRoute, private backendService: BackendService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadKindergartenDetails(id);
    }
  }

  loadKindergartenDetails(id: string): void {
    this.isLoading = true;
    this.backendService.getKindergartenDetails(id).subscribe(data => {
      this.kindergarten = data;
      this.isLoading = false;
    }, error => {
      console.error('Fehler beim Laden der Kindergarten-Details:', error);
      this.isLoading = false;
    });
  }

  public getKindergartenImageUrl(id: number): string {
    return `assets/images/kindergarten${id}.png`;
  }
}
