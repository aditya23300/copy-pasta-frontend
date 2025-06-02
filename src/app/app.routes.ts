import { Routes } from '@angular/router';
import { SendDataComponent } from './send-data/send-data.component';
import { ReceiveDataComponent } from './receive-data/receive-data.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: 'send-data',
    component: SendDataComponent,
  },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: 'receive-data',
    component: ReceiveDataComponent,
  },
  {
    path: '',
    component: AppComponent,
  },
];
