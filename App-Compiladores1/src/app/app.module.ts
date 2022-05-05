import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErroresComponentComponent } from './components/errores-component/errores-component.component';
import { PrincipalComponentComponent } from './components/principal-component/principal-component.component';

const appRoutes:Routes = [
      {path: '', component: PrincipalComponentComponent},
      {path: 'error', component: ErroresComponentComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
