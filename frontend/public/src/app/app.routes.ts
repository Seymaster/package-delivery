import { Route } from '@angular/router';

export const routes: Route[] = [
    {path:"",redirectTo:"client", pathMatch: 'full'},
    {path: 'client', loadChildren: () => import('./components/client/client.route').then(mod => mod.CLIENT_ROUTES)},
  
];
