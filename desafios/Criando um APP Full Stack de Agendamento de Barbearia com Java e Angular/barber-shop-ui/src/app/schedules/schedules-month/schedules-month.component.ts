import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientsInterface } from '../../services/api-client/clients/clients.interface';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { ScheduleInterface } from '../../services/api-client/schedules/schedules.interface';
import { SaveScheduleRequest } from '../../services/api-client/schedules/schedules.model';
import { SERVICES_TOKEN } from '../../services/service.token';
import { SnackbarManagerInterface } from '../../services/snackbar-manager.interface';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { ScheduleCalendarComponent } from '../components/schedule-calendar/schedule-calendar.component';
import {
  ClientScheduleAppointmentModel,
  SaveScheduleModel,
  ScheduleAppointementMonthModel,
  SelectClientModel,
} from '../schedule.model';
import { ScheduleService } from './../../services/api-client/schedules/schedules.service';

@Component({
  selector: 'app-schedules-month',
  imports: [ScheduleCalendarComponent],
  templateUrl: './schedules-month.component.html',
  styleUrl: './schedules-month.component.scss',
  providers: [
    { provide: SERVICES_TOKEN.HTTP.SCHEDULE, useClass: ScheduleService },
    { provide: SERVICES_TOKEN.HTTP.CLIENT, useClass: ClientsService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
})
export class SchedulesMonthComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private selectedDate?: Date;

  monthSchedule!: ScheduleAppointementMonthModel;
  clients: SelectClientModel[] = [];

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.SCHEDULE)
    private readonly httpService: ScheduleInterface,
    @Inject(SERVICES_TOKEN.HTTP.CLIENT)
    private readonly clientHttpService: ClientsInterface,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackbarManage: SnackbarManagerInterface
  ) {}

  ngOnInit(): void {
    this.fetchSchedules(new Date());
    this.subscriptions.push(
      this.clientHttpService.list().subscribe((data) => (this.clients = data))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  onDateChange(date: Date) {
    this.selectedDate = date;
    this.fetchSchedules(date);
  }

  onConfirmDelete(schedule: ClientScheduleAppointmentModel) {
    this.subscriptions.push(this.httpService.delete(schedule.id).subscribe());
  }

  onScheduleClient(schedule: SaveScheduleModel) {
    if (schedule.startAt && schedule.endAt && schedule.clientId) {
      const request: SaveScheduleRequest = {
        startAt: schedule.startAt,
        endAt: schedule.endAt,
        clientId: schedule.clientId,
      };
      this.subscriptions.push(
        this.httpService.save(request).subscribe(() => {
          this.snackbarManage.show('Agendamento realizado com sucesso');
          if (this.selectedDate) {
            this.fetchSchedules(this.selectedDate);
          }
        })
      );
    }
  }

  private fetchSchedules(currentDate: Date) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    this.subscriptions.push(
      this.httpService
        .listInMonth(year, month)
        .subscribe((data) => (this.monthSchedule = data))
    );
  }
}
