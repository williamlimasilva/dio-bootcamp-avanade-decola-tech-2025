import { Observable } from 'rxjs';
import {
  SaveScheduleRequest,
  SaveScheduleResponse,
  ScheduleAppointmentMonthResponse,
} from './schedules.model';

export interface ScheduleInterface {
  save(request: SaveScheduleRequest): Observable<SaveScheduleResponse>;

  delete(id: number): Observable<void>;

  listInMonth(
    year: number,
    month: number
  ): Observable<ScheduleAppointmentMonthResponse>;
}
