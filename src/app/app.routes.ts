import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SendDataComponent } from './send-data/send-data.component';
import { ReceiveDataComponent } from './receive-data/receive-data.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: 'send-data',
    component: SendDataComponent,
  },
  {
    path: 'receive-data',
    component: ReceiveDataComponent,
  },
];
