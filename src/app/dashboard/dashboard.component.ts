import {Component, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {BackendService} from 'src/app/shared/backend.service';
import {StoreService} from 'src/app/shared/store.service';

@Component({
  selector: 'app-dashboard', templateUrl: './dashboard.component.html', styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public currentPage: number = 1;
  public showAddData = true;
  public isLoading = false;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  totalItems = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20];

  constructor(private backendService: BackendService, private storeService: StoreService) {
  }

  onPageChange(event: PageEvent) {
    this.isLoading = true;
    this.backendService.getChildren(event.pageIndex + 1).subscribe(data => {
      this.isLoading = false;
      this.storeService.children = data;
      this.currentPage = event.pageIndex + 1;
    });
  }

  receiveMessage(newPageCount: number) {
    this.currentPage = newPageCount;
    this.onPageChange({pageIndex: newPageCount - 1, pageSize: this.pageSize, length: this.totalItems});
  }

  toggleButtonClicked(showAddData: boolean) {
    this.showAddData = showAddData;
  }
}
