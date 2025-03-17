import { Component, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientsInterface } from '../../services/api-client/clients/clients.interface';
import { SERVICES_TOKEN } from '../../services/service.token';
import { SnackbarManagerInterface } from '../../services/snackbar-manager.interface';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { ClientModelForm } from '../client.model';
import { ClientFormComponent } from '../components/client-form/client-form.component';
import { ClientsService } from './../../services/api-client/clients/clients.service';

@Component({
  selector: 'app-new-client',
  imports: [ClientFormComponent],
  templateUrl: './new-client.component.html',
  styleUrl: './new-client.component.scss',
  providers: [
    {
      provide: SERVICES_TOKEN.HTTP.CLIENT,
      useClass: ClientsService,
    },
    {
      provide: SERVICES_TOKEN.SNACKBAR,
      useClass: SnackbarManagerService,
    },
  ],
})
export class NewClientComponent implements OnDestroy {
  private httpSubscription?: Subscription;

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.CLIENT)
    private readonly httpService: ClientsInterface,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackBarManager: SnackbarManagerInterface,
    private readonly router: Router
  ) {}

  ngOnDestroy(): void {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe();
    }
  }

  onSubmitClient(value: ClientModelForm) {
    const { id, ...request } = value;
    this.httpSubscription = this.httpService.save(request).subscribe((_) => {
      this.snackBarManager.show('Usuário cadastrado com sucesso');
      this.router.navigate(['clients/list']);
    });
  }
}
