import { InjectionToken } from '@angular/core';
import { ClientsInterface } from './api-client/clients/clients.interface';
import { ScheduleService } from './api-client/schedules/schedules.service';
import { DialogManagerInterface } from './dialog-manager.interface';
import { SnackbarManagerInterface } from './snackbar-manager.interface';

export const SERVICES_TOKEN = {
  HTTP: {
    CLIENT: new InjectionToken<ClientsInterface>('SERVICES_TOKEN.HTTP.CLIENT'),
    SCHEDULE: new InjectionToken<ScheduleService>(
      'SERVICES_TOKEN.HTTP.SCHEDULE'
    ),
  },
  SNACKBAR: new InjectionToken<SnackbarManagerInterface>(
    'SERVICES_TOKEN.SNACKBAR'
  ),
  DIALOG: new InjectionToken<DialogManagerInterface>('SERVICES_TOKEN.DIALOG'),
};
