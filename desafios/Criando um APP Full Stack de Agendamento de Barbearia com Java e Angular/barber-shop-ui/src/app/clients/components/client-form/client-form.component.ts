import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective } from 'ngx-mask';
import { ClientModelForm } from '../../client.model';

@Component({
  selector: 'app-client-form',
  imports: [
    FormsModule,
    NgxMaskDirective,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss',
})
export class ClientFormComponent {
  @Input() client: ClientModelForm = {
    id: 0,
    name: '',
    email: '',
    phone: '',
  };

  @Output() clientSubmit = new EventEmitter<ClientModelForm>();

  onSubmit(_: NgForm) {
    this.clientSubmit.emit(this.client);
  }
}
