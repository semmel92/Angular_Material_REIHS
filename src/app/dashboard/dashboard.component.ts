import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public currentPage: number = 1;
  public showAddData = true;
  public title: string = 'Ihr Dashboard-Titel';
  public imagePath: string = 'Pfad/Zum/Bild.jpg';

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  totalItems = 100; 
  pageSize = 10; 
  pageSizeOptions: number[] = [5, 10, 20]; 

  onPageChange(event: PageEvent) {
    console.log(`Aktuelle Seite: ${event.pageIndex}, Seitenanzahl: ${event.pageSize}`);
  }

  receiveMessage(newPageCount: number) {
    this.currentPage = newPageCount;
  }

  toggleButtonClicked(showAddData: boolean) {
    this.showAddData = showAddData;
  }
}
