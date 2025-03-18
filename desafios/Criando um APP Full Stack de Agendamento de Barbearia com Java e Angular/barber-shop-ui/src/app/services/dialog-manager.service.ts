import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { YesNoDialogComponent } from '../commons/components/yes-no-dialog/yes-no-dialog.component';
import { DialogManagerInterface } from './dialog-manager.interface';

@Injectable({
  providedIn: 'root',
})
export class DialogManagerService implements DialogManagerInterface {
  constructor(private readonly dialog: MatDialog) {}
  showYesNoDialog(
    component: ComponentType<YesNoDialogComponent>,
    data: { title: string; content: string }
  ): Observable<any> {
    const dialogRef = this.dialog.open(component, {
      width: '40rem',
      data,
    });
    return dialogRef.afterClosed();
  }
}
