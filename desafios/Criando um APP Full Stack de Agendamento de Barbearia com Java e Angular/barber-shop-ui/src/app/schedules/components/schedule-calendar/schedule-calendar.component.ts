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
      if (!this.monthSchedule.scheduledAppointments) {
        console.warn(
          'monthSchedule is missing scheduledAppointments, creating empty array'
        );
        this.monthSchedule.scheduledAppointments = [];
      }

      this.buildTable();
    }

    if (changes['clients'] && this.clients) {
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

    form.resetForm();
    this.newSchedule = {
      startAt: undefined,
      endAt: undefined,
      clientId: undefined,
    };

    // Forçar uma reconstrução da tabela para refletir a mudança
    this.buildTable();
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
          this.buildTable();
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

    if (!this.monthSchedule || !this.monthSchedule.scheduledAppointments) {
      console.warn('Missing data for table, using empty dataset');
      this.dataSource = new MatTableDataSource<ClientScheduleAppointmentModel>(
        []
      );
      return;
    }

    try {
      console.log('Selected date:', this._selected);
      console.log('Month from data:', this.monthSchedule.month);
      console.log('Month from selected date:', this._selected.getMonth() + 1);

      const appointments = this.monthSchedule.scheduledAppointments.filter(
        (a) => {
          const isSameYear =
            this.monthSchedule.year === this._selected.getFullYear();
          const isSameMonth =
            this.monthSchedule.month === this._selected.getMonth() + 1;
          const isSameDay = a.day === this._selected.getDate();

          console.log(
            `Appointment ${a.id}: Year match: ${isSameYear}, Month match: ${isSameMonth}, Day match: ${isSameDay}`
          );

          return isSameYear && isSameMonth && isSameDay;
        }
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
