import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public currentPage: number = 1;
  public showAddData = true;
  public isLoading = false; // Zustandsvariable für den Ladestatus

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  totalItems = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20];

  constructor(private backendService: BackendService, private storeService: StoreService) {}

  onPageChange(event: PageEvent) {
    this.isLoading = true; // Spinner anzeigen
    this.backendService.getChildren(event.pageIndex + 1).subscribe(data => {
      this.isLoading = false; // Spinner verstecken
      this.storeService.children = data; // Aktualisieren der Daten im Store-Service
      this.currentPage = event.pageIndex + 1; // Aktualisieren der aktuellen Seite
    });
  }

  receiveMessage(newPageCount: number) {
    this.currentPage = newPageCount;
    this.onPageChange({pageIndex: newPageCount - 1, pageSize: this.pageSize, length: this.totalItems}); // Aktualisieren der Daten für die neue Seite
  }

  toggleButtonClicked(showAddData: boolean) {
    this.showAddData = showAddData;
  }
}
