import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { CHILDREN_PER_PAGE } from 'src/app/shared/constants';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  @Input() currentPage!: number;
  @Output() selectPageEvent = new EventEmitter<number>();
  public page: number = 0;
  public isLoading = false;

  constructor(public storeService: StoreService, private backendService: BackendService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.backendService.getChildren(this.currentPage).subscribe(data => {
      this.storeService.children = data;
      this.isLoading = false;
    }, error => {
      console.error("Fehler beim Laden der Daten: ", error);
      this.isLoading = false;
    });
  }

  getAge(birthDate: string): number {
    const today = new Date();
    const birthDateTimestamp = new Date(birthDate);
    let age = today.getFullYear() - birthDateTimestamp.getFullYear();
    const m = today.getMonth() - birthDateTimestamp.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateTimestamp.getDate())) {
      age--;
    }
    return age;
  }

  selectPage(i: any): void {
    const newPage = i;
    this.selectPageEvent.emit(newPage);
    this.isLoading = true;
    this.backendService.getChildren(newPage).subscribe(data => {
      this.storeService.children = data;
      this.isLoading = false;
    }, error => {
      console.error("Fehler beim Laden der Daten für Seite: ", newPage, error);
      this.isLoading = false;
    });
  }

  public returnAllPages(): number[] {
    const res = [];
    const pageCount = Math.ceil(this.storeService.childrenTotalCount / CHILDREN_PER_PAGE);
    for (let i = 0; i < pageCount; i++) {
      res.push(i + 1);
    }
    return res;
  }

  public cancelRegistration(childId: string): void {
    this.isLoading = true;
    this.backendService.deleteChildData(childId).subscribe(() => {
      this.loadData();
    }, error => {
      console.error("Fehler beim Löschen der Kindanmeldung: ", error);
      this.isLoading = false;
    });
  }

  onKindergartenFilterChange(kindergardenId: number): void {
    this.isLoading = true;
    this.backendService.getChildren(this.currentPage, { kindergardenId }).subscribe(data => {
      this.storeService.children = data;
      this.isLoading = false;
    }, error => {
      console.error("Fehler beim Filtern der Daten: ", error);
      this.isLoading = false;
    });
  }

  onSort(field: string, order: 'asc' | 'desc'): void {
    this.isLoading = true;
    this.backendService.getChildren(this.currentPage, undefined, { field, order }).subscribe(data => {
      this.storeService.children = data;
      this.isLoading = false;
    }, error => {
      console.error("Fehler beim Sortieren der Daten: ", error);
      this.isLoading = false;
    });
  }
}
