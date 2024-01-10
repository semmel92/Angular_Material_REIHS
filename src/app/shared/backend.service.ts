import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Kindergarden } from './interfaces/Kindergarden';
import { Child, ChildResponse } from './interfaces/Child';
import { StoreService } from './store.service';
import { CHILDREN_PER_PAGE } from './constants';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(private http: HttpClient, private storeService: StoreService) { }

  public getKindergardens(): Observable<Kindergarden[]> {
    return this.http.get<Kindergarden[]>('http://localhost:5000/kindergardens');
  }

  public getChildren(page: number, filter?: { kindergardenId?: number }, sort?: { field: string, order: 'asc' | 'desc' }): Observable<ChildResponse[]> {
    let queryParams = `_page=${page}&_limit=${CHILDREN_PER_PAGE}`;
    if (filter && filter.kindergardenId) {
      queryParams += `&kindergardenId=${filter.kindergardenId}`;
    }
    if (sort) {
      queryParams += `&_sort=${sort.field}&_order=${sort.order}`;
    }
    return this.http.get<ChildResponse[]>(`http://localhost:5000/childs?_expand=kindergarden&${queryParams}`);
  }

  public addChildData(child: Child): Observable<any> {
    return this.http.post('http://localhost:5000/childs', child);
  }

  public deleteChildData(childId: string): Observable<any> {
    return this.http.delete(`http://localhost:5000/childs/${childId}`);
  }

  public getKindergartenDetails(id: string): Observable<Kindergarden> {
    return this.http.get<Kindergarden>(`http://localhost:5000/kindergardens/${id}`);
  }
}
