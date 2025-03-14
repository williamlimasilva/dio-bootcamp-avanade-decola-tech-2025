import { Component, Inject } from '@angular/core';
import { ClientsInterface } from '../../services/api-client/clients/clients.interface';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { SERVICES_TOKEN } from '../../services/service.token';

@Component({
  selector: 'app-edit-client',
  imports: [],
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.scss',
  providers: [
    {
      provide: SERVICES_TOKEN.HTTP.CLIENT,
      useClass: ClientsService,
    },
  ],
})
export class EditClientComponent {
  constructor(
    @Inject(SERVICES_TOKEN.HTTP.CLIENT)
    private readonly httpService: ClientsInterface
  ) {}
}
