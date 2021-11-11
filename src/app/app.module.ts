import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from 'src/environments/environment.prod';

// sockets
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: environment.socket_url, options: {} };

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    PagesModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
