import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ScheduleInterface } from './schedules.interface';
import {
  SaveScheduleRequest,
  SaveScheduleResponse,
  ScheduleAppointmentMonthResponse,
} from './schedules.model';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService implements ScheduleInterface {
  private readonly basePath = environment.apiUrl;

  constructor(private http: HttpClient) {}

  save(request: SaveScheduleRequest): Observable<SaveScheduleResponse> {
    return this.http.post<SaveScheduleResponse>(
      `${this.basePath}schedules`,
      request
    );
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}schedules/${id}`);
  }
  listInMonth(
    year: number,
    month: number
  ): Observable<ScheduleAppointmentMonthResponse> {
    return this.http.get<ScheduleAppointmentMonthResponse>(
      `${this.basePath}schedules/${year}/${month}`
    );
  }
}
