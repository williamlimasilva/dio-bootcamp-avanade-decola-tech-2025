export interface SnackbarManagerInterface {
  show(message: string, action?: string, duration?: number): void;
}
