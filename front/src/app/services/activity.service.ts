import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from '../models/activity';
import { environment } from '../../environments/environment.';

@Injectable({ providedIn: 'root' })
export class ActivityService {
  private API = `${environment.apiUrl}/activities`;

  constructor(private http: HttpClient) {}

  list(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.API);
  }

  create(body: Omit<Activity, 'id' | 'created_at' | 'updated_at'>) {
    return this.http.post<Activity>(this.API, body);
  }

  update(id: string, body: Partial<Activity>) {
    return this.http.put<Activity>(`${this.API}/${id}`, body);
  }

  remove(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }
}
