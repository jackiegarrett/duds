import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
  declarations: [AppComponent, MovieDetailComponent, HomepageComponent],
  imports: [CoreModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
  exports: [AppRoutingModule],
})
export class AppModule {}
