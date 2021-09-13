import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SearchArtistsPipe } from './search-artists.pipe';
import { ConvertDataStructurePipe } from './convert-data-structure.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SearchArtistsPipe,
    ConvertDataStructurePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
