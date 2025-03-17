#clients
ng generate component clients/new-client --skip-tests &&
ng generate component clients/list-clients --skip-tests &&
ng generate component clients/edit-client --skip-tests &&
ng generate component clients/components/client-form --skip-tests &&
ng generate component clients/components/client-table --skip-tests &&

touch src/app/clients/client.models.ts &&

#schedules
ng generate component schedules/schedules-month --skip-tests &&
ng generate component schedules/components/schedule-calendar --skip-tests &&

touch src/app/schedules/schedule.models.ts &&

#commons components
ng generate component commons/components/card-header --skip-tests &&
ng generate component commons/components/menu-bar --skip-tests &&
ng generate component commons/components/yes-no-dialog --skip-tests &&

#service
ng generate service services/dialog-manager --skip-tests &&
ng generate service services/snackbar-manager --skip-tests &&
ng generate service services/api-client/clients/clients --skip-tests &&
ng generate service services/api-client/schedules/schedules --skip-tests &&

#environments
ng generate environments &&

touch src/app/services/idialog-manager.service.ts &&
touch src/app/services/isnackbar-manager.service.ts &&
touch src/app/services/service.token.ts &&

touch src/app/services/api-client/clients/iclients.service.ts &&
touch src/app/services/api-client/clients/client.models.ts &&

touch src/app/services/api-client/schedules/schedules.service.ts &&
touch src/app/services/api-client/schedules/schedule.models.ts &&

#yarn add @angular/cdk bootstrap ngx-mask

npm install @angular/cdk bootstrap ngx-mask
