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
  ScheduleAppointmentMonthModel,
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

  monthSchedule: ScheduleAppointmentMonthModel = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    scheduledAppointments: [],
  };

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
        this.httpService.save(request).subscribe({
          next: (_) => {
            this.snackbarManage.show('Agendamento realizado com sucesso');
            // Explicitly refetch the data with a short delay to ensure the backend has processed the request
            setTimeout(() => {
              if (this.selectedDate) {
                this.fetchSchedules(this.selectedDate);
              }
            }, 500); // Increased delay to ensure backend processing
          },
          error: (err) => {
            console.error('Error creating appointment:', err);
            let errorMessage = 'Erro ao realizar agendamento. Tente novamente.';

            // Check for specific error cases
            if (err.status === 409) {
              errorMessage = 'Horário já está agendado. Escolha outro horário.';
            } else if (err.status === 400) {
              errorMessage =
                'Dados inválidos. Verifique as informações e tente novamente.';
            }

            this.snackbarManage.show(errorMessage);
          },
        })
      );
    }
  }

  private fetchSchedules(currentDate: Date) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    console.log(`Fetching schedules for ${year}/${month} from component`);

    this.subscriptions.push(
      this.httpService.listInMonth(year, month).subscribe({
        next: (data) => {
          console.log('Received schedule data:', data);

          // Ensure data has scheduledAppointments before assigning
          if (data && typeof data === 'object') {
            // Create a valid object even if data is incomplete
            this.monthSchedule = {
              year: data.year || year,
              month: data.month || month,
              scheduledAppointments: data.scheduledAppointments || [],
            };

            console.log('Updated monthSchedule:', this.monthSchedule);
          } else {
            console.error('Received invalid data format:', data);
            this.snackbarManage.show('Erro no formato dos dados recebidos');

            // Set default values if data is invalid
            this.monthSchedule = {
              year: year,
              month: month,
              scheduledAppointments: [],
            };
          }
        },
        error: (err) => {
          console.error('Error fetching schedules:', err);
          this.snackbarManage.show('Erro ao carregar agendamentos');

          // Set default values on error
          this.monthSchedule = {
            year: year,
            month: month,
            scheduledAppointments: [],
          };
        },
      })
    );
  }
}
