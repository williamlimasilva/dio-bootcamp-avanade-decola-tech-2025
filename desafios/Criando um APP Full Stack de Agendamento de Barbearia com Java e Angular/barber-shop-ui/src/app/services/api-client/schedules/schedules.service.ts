import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
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
    console.log('Sending save schedule request:', request);
    return this.http
      .post<SaveScheduleResponse>(`${this.basePath}schedules`, request)
      .pipe(
        tap((response) => console.log('Schedule save response:', response)),
        catchError((error) => {
          console.error('Error saving schedule:', error);
          throw error;
        })
      );
  }

  delete(id: number): Observable<void> {
    console.log('Deleting schedule with ID:', id);
    return this.http.delete<void>(`${this.basePath}schedules/${id}`).pipe(
      tap(() => console.log('Schedule deleted successfully')),
      catchError((error) => {
        console.error('Error deleting schedule:', error);
        throw error;
      })
    );
  }

  listInMonth(
    year: number,
    month: number
  ): Observable<ScheduleAppointmentMonthResponse> {
    console.log(`Fetching schedules for ${year}/${month}`);

    // Create a default empty response to handle empty results
    const defaultResponse: ScheduleAppointmentMonthResponse = {
      year: year,
      month: month,
      scheduledAppointments: [],
    };

    return this.http
      .get<ScheduleAppointmentMonthResponse>(
        `${this.basePath}schedules/${year}/${month}`
      )
      .pipe(
        tap((response) => {
          console.log('Schedules for month response:', response);

          // Ensure the response has scheduledAppointments property
          if (!response.scheduledAppointments) {
            console.warn(
              'Response is missing scheduledAppointments property, using empty array'
            );
            response.scheduledAppointments = [];
          }
        }),
        catchError((error) => {
          console.error('Error fetching monthly schedules:', error);
          // Return default empty response instead of throwing to prevent errors
          return of(defaultResponse);
        })
      );
  }
}
