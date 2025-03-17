import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarManagerInterface } from './snackbar-manager.interface';

@Injectable({
  providedIn: 'root',
})
export class SnackbarManagerService implements SnackbarManagerInterface {
  constructor(private readonly snackBar: MatSnackBar) {}
  show(
    message: string,
    action: string = 'Fechar',
    duration: number = 3000
  ): void {
    this.snackBar.open(message, action, {
      duration: duration,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
