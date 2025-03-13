#clients
ng generate component clients/new-client &&
ng generate component clients/list-clients &&
ng generate component clients/edit-client &&
ng generate component clients/components/client-form &&
ng generate component clients/components/client-table &&

touch src/app/clients/client.models.ts &&

#schedules
ng generate component schedules/schedules-month &&
ng generate component schedules/components/schedule-calendar &&

touch src/app/schedules/schedule.models.ts &&

#commons components
ng generate component commons/components/card-header &&
ng generate component commons/components/menu-bar &&
ng generate component commons/components/yes-no-dialog &&

#service
ng generate service services/dialog-manager &&
ng generate service services/snackbar-manager &&
ng generate service services/api-client/clients/clients &&
ng generate service services/api-client/schedules/schedules &&

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
