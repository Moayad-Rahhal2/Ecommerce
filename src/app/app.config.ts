import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {provideHttpClient, withFetch} from "@angular/common/http";
// import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
// import {ReactiveFormsModule} from "@angular/forms";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    // NgbModule
    // ReactiveFormsModule
  ]
};
