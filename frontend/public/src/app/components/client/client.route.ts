import { Route } from "@angular/router";
import { PackageComponent } from "./package/package.component";
import { DeliveryComponent } from "./delivery/delivery.component";
import { ClientService } from "../../service/client.service";
import { HttpClientModule } from "@angular/common/http";
import { PackageFormDialogComponent } from "./package-form-dialog/package-form-dialog.component";

export const CLIENT_ROUTES: Route[] = [{
    path: '',
    pathMatch: 'prefix',
    providers: [ ClientService,],
    children: [
        {path:"",redirectTo:"package", pathMatch: 'full'},
      {path: 'package', component: PackageComponent},
      {path: 'create-package', component: PackageFormDialogComponent},
      {path: 'delivery', component: DeliveryComponent},
    ],
  }];
