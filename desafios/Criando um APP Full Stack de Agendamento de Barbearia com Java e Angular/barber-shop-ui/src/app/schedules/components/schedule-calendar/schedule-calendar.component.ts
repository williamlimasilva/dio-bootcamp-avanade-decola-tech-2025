import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subscription } from 'rxjs';
import { YesNoDialogComponent } from '../../../commons/components/yes-no-dialog/yes-no-dialog.component';
import { DialogManagerInterface } from '../../../services/dialog-manager.interface';
import { DialogManagerService } from '../../../services/dialog-manager.service';
import { SERVICES_TOKEN } from '../../../services/service.token';
import {
  ClientScheduleAppointmentModel,
  SaveScheduleModel,
  ScheduleAppointmentMonthModel,
  SelectClientModel,
} from '../../schedule.model';

@Component({
  selector: 'app-schedule-calendar',
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatTimepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './schedule-calendar.component.html',
  styleUrl: './schedule-calendar.component.scss',
  providers: [
    provideNativeDateAdapter(),
    {
      provide: SERVICES_TOKEN.DIALOG,
      useClass: DialogManagerService,
    },
  ],
})
export class ScheduleCalendarComponent
  implements OnDestroy, AfterViewInit, OnChanges
{
  private subscription?: Subscription;

  private _selected: Date = new Date();

  displayedColumns: string[] = ['startAt', 'endAt', 'client', 'actions'];

  dataSource!: MatTableDataSource<ClientScheduleAppointmentModel>;

  addingSchedule: boolean = false;

  newSchedule: SaveScheduleModel = {
    startAt: undefined,
    endAt: undefined,
    clientId: undefined,
  };

  clientSelectFormControl = new FormControl();

  @Input() monthSchedule!: ScheduleAppointmentMonthModel;
  @Input() clients: SelectClientModel[] = [];

  @Output() onDateChange = new EventEmitter<Date>();
  @Output() onConfirmDelete =
    new EventEmitter<ClientScheduleAppointmentModel>();
  @Output() onScheduleClient = new EventEmitter<SaveScheduleModel>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    @Inject(SERVICES_TOKEN.DIALOG)
    private readonly dialogManagerService: DialogManagerInterface
  ) {}

  get selected(): Date {
    return this._selected;
  }

  set selected(selected: Date) {
    if (this._selected.getTime() !== selected.getTime()) {
      this._selected = new Date(selected);
      this.buildTable();
      this.onDateChange.emit(this._selected);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    if (this.dataSource && this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges detected in schedule-calendar', changes);

    if (changes['monthSchedule'] && this.monthSchedule) {
      console.log('monthSchedule changed:', this.monthSchedule);
      // Make sure monthSchedule has the scheduledAppointments property
      if (!this.monthSchedule.scheduledAppointments) {
        console.warn(
          'monthSchedule is missing scheduledAppointments, creating empty array'
        );
        this.monthSchedule.scheduledAppointments = [];
      }

      // Force a rebuild of the table when new data arrives
      this.buildTable();
    }

    if (changes['clients'] && this.clients) {
      // Update client selection if needed
      if (this.clientSelectFormControl) {
        this.clientSelectFormControl.updateValueAndValidity();
      }
    }
  }

  onSubmit(form: NgForm) {
    if (
      !this.newSchedule.startAt ||
      !this.newSchedule.endAt ||
      !this.newSchedule.clientId
    ) {
      return;
    }

    const startAt = new Date(this._selected);
    const endAt = new Date(this._selected);

    startAt.setHours(
      this.newSchedule.startAt.getHours(),
      this.newSchedule.startAt.getMinutes()
    );
    endAt.setHours(
      this.newSchedule.endAt.getHours(),
      this.newSchedule.endAt.getMinutes()
    );

    const scheduleData: SaveScheduleModel = {
      startAt,
      endAt,
      clientId: this.newSchedule.clientId,
    };

    this.onScheduleClient.emit(scheduleData);

    // Add the appointment to the current view immediately
    this.addAppointmentToTable(scheduleData);

    // Reset form after submission
    form.resetForm();
    this.newSchedule = {
      startAt: undefined,
      endAt: undefined,
      clientId: undefined,
    };
  }

  // Add this new method to handle adding appointments to the table
  private addAppointmentToTable(schedule: SaveScheduleModel) {
    // Find client name from the client id
    const client = this.clients.find((c) => c.id === schedule.clientId);
    if (!client) return;

    // Create a temporary ID for the new appointment
    // This will be replaced with the real ID from the server response
    const tempId = Date.now();

    // Create a new appointment model to add to the table
    const newAppointment: ClientScheduleAppointmentModel = {
      id: tempId,
      day: this._selected.getDate(),
      startAt: schedule.startAt!,
      endAt: schedule.endAt!,
      clientId: schedule.clientId!,
      clientName: client.name,
    };

    // Add the new appointment to the data source
    const currentData = this.dataSource.data;
    this.dataSource = new MatTableDataSource<ClientScheduleAppointmentModel>([
      ...currentData,
      newAppointment,
    ]);

    // Update paginator
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  requestDelete(schedule: ClientScheduleAppointmentModel) {
    this.subscription = this.dialogManagerService
      .showYesNoDialog(YesNoDialogComponent, {
        title: 'Exclusão de agendamento',
        content: 'Confirma a exclusão do agendamento?',
      })
      .subscribe((result) => {
        if (result) {
          this.onConfirmDelete.emit(schedule);
          const updatedeList = this.dataSource.data.filter(
            (c) => c.id !== schedule.id
          );
          this.dataSource =
            new MatTableDataSource<ClientScheduleAppointmentModel>(
              updatedeList
            );
          if (this.paginator) {
            this.dataSource.paginator = this.paginator;
          }
        }
      });
  }

  onTimeChange(time: Date) {
    const endAt = new Date(time);
    endAt.setHours(time.getHours() + 1);
    this.newSchedule.endAt = endAt;
  }

  private buildTable() {
    console.log('Building table with monthSchedule:', this.monthSchedule);

    // Only try to filter appointments if we have monthSchedule data
    if (!this.monthSchedule || !this.monthSchedule.scheduledAppointments) {
      console.warn('Missing data for table, using empty dataset');
      this.dataSource = new MatTableDataSource<ClientScheduleAppointmentModel>(
        []
      );
      return;
    }

    try {
      const appointments = this.monthSchedule.scheduledAppointments.filter(
        (a) =>
          this.monthSchedule.year === this._selected.getFullYear() &&
          this.monthSchedule.month - 1 === this._selected.getMonth() &&
          a.day === this._selected.getDate()
      );

      console.log('Filtered appointments for selected date:', appointments);

      this.dataSource = new MatTableDataSource<ClientScheduleAppointmentModel>(
        appointments
      );

      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    } catch (error) {
      console.error('Error while building table:', error);
      // Create empty datasource on error
      this.dataSource = new MatTableDataSource<ClientScheduleAppointmentModel>(
        []
      );
    }
  }
}
