import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Kindergarden } from './interfaces/Kindergarden';
import { Child, ChildResponse } from './interfaces/Child';
import { StoreService } from './store.service';
import { CHILDREN_PER_PAGE } from './constants';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private loading = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private storeService: StoreService, private snackBar: MatSnackBar) { }

  public loadingStatus = this.loading.asObservable();

  private setLoading(loading: boolean) {
    this.loading.next(loading);
  }

  public getKindergardens(): Observable<Kindergarden[]> {
    this.setLoading(true);
    return this.http.get<Kindergarden[]>('http://localhost:5000/kindergardens').pipe(
      tap(() => this.setLoading(false)),
      catchError(error => {
        this.snackBar.open('Fehler beim Laden der Kindergärten', 'Schließen', { duration: 3000 });
        this.setLoading(false);
        throw error;
      })
    );
  }

  public getChildren(page: number, filter?: { kindergardenId?: number }, sort?: { field: string, order: 'asc' | 'desc' }): Observable<ChildResponse[]> {
    this.setLoading(true);
    let queryParams = `_page=${page}&_limit=${CHILDREN_PER_PAGE}`;
    if (filter && filter.kindergardenId) {
      queryParams += `&kindergardenId=${filter.kindergardenId}`;
    }
    if (sort) {
      queryParams += `&_sort=${sort.field}&_order=${sort.order}`;
    }
    return this.http.get<ChildResponse[]>(`http://localhost:5000/childs?_expand=kindergarden&${queryParams}`).pipe(
      tap(() => this.setLoading(false)),
      catchError(error => {
        this.snackBar.open('Fehler beim Laden der Kinderdaten', 'Schließen', { duration: 3000 });
        this.setLoading(false);
        throw error;
      })
    );
  }

  public addChildData(child: Child): Observable<any> {
    this.setLoading(true);
    return this.http.post('http://localhost:5000/childs', child).pipe(
      tap(() => {
        this.snackBar.open('Kind erfolgreich angemeldet', 'Schließen', { duration: 3000 });
        this.setLoading(false);
      }),
      catchError(error => {
        this.snackBar.open('Fehler beim Anmelden des Kindes', 'Schließen', { duration: 3000 });
        this.setLoading(false);
        throw error;
      })
    );
  }

  public deleteChildData(childId: string): Observable<any> {
    this.setLoading(true);
    return this.http.delete(`http://localhost:5000/childs/${childId}`).pipe(
      tap(() => {
        this.snackBar.open('Kind erfolgreich abgemeldet', 'Schließen', { duration: 3000 });
        this.setLoading(false);
      }),
      catchError(error => {
        this.snackBar.open('Fehler beim Abmelden des Kindes', 'Schließen', { duration: 3000 });
        this.setLoading(false);
        throw error;
      })
    );
  }

  public getKindergartenDetails(id: string): Observable<Kindergarden> {
    this.setLoading(true);
    return this.http.get<Kindergarden>(`http://localhost:5000/kindergardens/${id}`).pipe(
      tap(() => this.setLoading(false)),
      catchError(error => {
        this.snackBar.open('Fehler beim Laden der Kindergarten-Details', 'Schließen', { duration: 3000 });
        this.setLoading(false);
        throw error;
      })
    );
  }
}
