import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientsInterface } from '../../services/api-client/clients/clients.interface';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { SnackbarManagerInterface } from '../../services/snackbar-manager.interface';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { ClientModelTable } from '../client.model';
import { ClientTableComponent } from '../components/client-table/client-table.component';
import { SERVICES_TOKEN } from './../../services/service.token';

@Component({
  selector: 'app-list-clients',
  imports: [ClientTableComponent],
  templateUrl: './list-clients.component.html',
  styleUrl: './list-clients.component.scss',
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
export class ListClientsComponent implements OnInit, OnDestroy {
  private httpSubscriptions: Subscription[] = [];
  clients: ClientModelTable[] = [];

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.CLIENT)
    private readonly httpService: ClientsInterface,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackbarService: SnackbarManagerInterface,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.httpSubscriptions.push(
      this.httpService.list().subscribe((data) => (this.clients = data))
    );
  }
  ngOnDestroy(): void {
    this.httpSubscriptions.forEach((s) => s.unsubscribe());
  }

  update(client: ClientModelTable) {
    this.router.navigate(['clients/edit-client', client.id]);
  }

  delete(client: ClientModelTable) {
    this.httpSubscriptions.push(
      this.httpService.delete(client.id).subscribe(() => {
        this.snackbarService.show('Cliente deletado com sucesso');
        this.clients = this.clients.filter((c) => c.id !== client.id);
      })
    );
  }
}
