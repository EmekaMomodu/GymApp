import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { WorkoutSet } from '../models/workout-set.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class WorkoutService {
  private readonly storageKey = 'gym_app_sets';
  private readonly baseUrl = `${environment.apiBaseUrl}/workouts`;

  constructor(private readonly http: HttpClient) {}

  getTodaySets(): Observable<WorkoutSet[]> {
    const local = this.getLocalSets();
    return of(local);
    // Java backend integration target:
    // return this.http.get<WorkoutSet[]>(`${this.baseUrl}/today`);
  }

  addSet(set: WorkoutSet): Observable<WorkoutSet> {
    this.saveLocalSet(set);
    return of(set);
    // Java backend integration target:
    // return this.http.post<WorkoutSet>(this.baseUrl, set).pipe(tap(() => this.saveLocalSet(set)));
  }

  clearToday(): Observable<void> {
    localStorage.removeItem(this.storageKey);
    return of(void 0);
    // Java backend integration target:
    // return this.http.delete<void>(`${this.baseUrl}/today`).pipe(tap(() => localStorage.removeItem(this.storageKey)));
  }

  private getLocalSets(): WorkoutSet[] {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as WorkoutSet[];
    } catch {
      return [];
    }
  }

  private saveLocalSet(set: WorkoutSet): void {
    const current = this.getLocalSets();
    current.push(set);
    localStorage.setItem(this.storageKey, JSON.stringify(current));
  }
}
