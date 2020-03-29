import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ApiService} from './service/api.service';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {RouterModule} from "@angular/router";
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import {TestComponent} from './test/test.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProgressComponent} from './progress/progress.component';
import {FileUploadComponent} from './file-upload/file-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    TestComponent,
    ProgressComponent,
    FileUploadComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ApiService, FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
