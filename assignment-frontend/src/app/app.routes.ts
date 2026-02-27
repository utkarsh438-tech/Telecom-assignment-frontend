import { Routes } from '@angular/router';
import { DeviceListComponent } from './components/device/device-list/device-list.component';
import { DeviceCreateComponent } from './components/device/device-create/device-create.component';
import { DeviceSummaryComponent } from './components/device/device-summary/device-summary.component';
import { ShelfSummaryComponent } from './components/shelf/shelf-summary/shelf-summary.component';
import { ShelfCreateComponent } from './components/shelf/shelf-create/shelf-create.component';

export const routes: Routes = [
  { path: 'devices', component: DeviceListComponent },
  { path: 'devices/create', component: DeviceCreateComponent },
  { path: 'devices/:id', component: DeviceSummaryComponent },
  { path: 'shelves/create/:positionId', component: ShelfCreateComponent },
  { path: 'shelves/:id', component: ShelfSummaryComponent },
  { path: '', redirectTo: '/devices', pathMatch: 'full' }
];
