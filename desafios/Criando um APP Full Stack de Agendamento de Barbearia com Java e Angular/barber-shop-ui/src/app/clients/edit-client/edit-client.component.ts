import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientsInterface } from '../../services/api-client/clients/clients.interface';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { SnackbarManagerInterface } from '../../services/snackbar-manager.interface';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { ClientModelForm } from '../client.model';
import { ClientFormComponent } from '../components/client-form/client-form.component';
import { SERVICES_TOKEN } from './../../services/service.token';

@Component({
  selector: 'app-edit-client',
  imports: [ClientFormComponent],
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.scss',
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
export class EditClientComponent implements OnInit, OnDestroy {
  private httpSubscription?: Subscription[] = [];
  client: ClientModelForm = { id: 0, name: '', email: '', phone: '' };

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.CLIENT)
    private readonly httpService: ClientsInterface,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackbarService: SnackbarManagerInterface,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) {
      this.snackbarService.show('Erro ao recuperar informações do cliente');
      this.router.navigate(['clients/list']);
      return;
    }
    this.httpSubscription?.push(
      this.httpService
        .findById(Number(id))
        .subscribe((data) => (this.client = data))
    );
  }

  ngOnDestroy(): void {
    if (this.httpSubscription) {
      this.httpSubscription.forEach((subscription) =>
        subscription.unsubscribe()
      );
    }
  }

  onSubmitClient(value: ClientModelForm) {
    const { id, ...request } = value;
    if (id) {
      this.httpSubscription?.push(
        this.httpService.update(id, { id, ...request }).subscribe((_) => {
          this.snackbarService.show('Cliente atualizado com sucesso!');
          this.router.navigate(['clients/list']);
        })
      );
      return;
    }
    this.snackbarService.show('Um erro inesperado aconteceu');
    this.router.navigate(['clients/list']);
  }
}
