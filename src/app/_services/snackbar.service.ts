import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

export enum SnackbarTypes {
  success = 'snackbar-success',
  warning = 'snackbar-warning',
  error = 'snackbar-error',
}

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {
  }

  public showSnackbar(panelClass: string, message: string, duration: number) {
    this.snackBar.open(message, 'X', {
      duration,
      panelClass,
    });
  }

  public showSuccessSnackBar() {
    this.showSnackbar(SnackbarTypes.success, 'Success', 2500);
  }

  public showErrorSnackBar(err: any) {
    const errorMessage = typeof err === 'string' ? err
      : err ? err?.error : 'Unexpected error';
    const panelClass = this.handleErrorType(err.status);
    this.showSnackbar(panelClass, errorMessage, 2500);
  }

  private handleErrorType(errorCode: number) {
    switch (errorCode) {
      case 500:
        return SnackbarTypes.error;
      case 403:
        return SnackbarTypes.warning;
      default:
        return SnackbarTypes.error;
    }
  }
}
