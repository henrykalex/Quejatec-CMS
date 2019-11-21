import { NgModule, ModuleWithProviders } from '@angular/core';

import { AppDialogModule } from './app-dialog/app-dialog.module';
import { AppService } from './app.service';
import { HttpErrorHandler } from './http-error-handler.service';

@NgModule({
  imports: [
    AppDialogModule
  ],
  exports: [
    AppDialogModule
  ]
})
export class AppServicesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppServicesModule,
      providers: [
        AppService,
        HttpErrorHandler,
       ]
    };
  }
}
