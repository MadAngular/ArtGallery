import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// component imports
import { NotFoundComponent } from "./not-found/not-found.component";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { AboutUsComponent } from "./about-us/about-us.component";

// firebase imports and modules

import { environment } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuth, AngularFireAuthModule } from "@angular/fire/auth";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { UserModule } from "./user/user.module";
import { CoreModule } from "./core/core.module";
import { ToastrModule } from "ngx-toastr";
import { ArtModule } from "./art/art.module";
import { AuthService } from "./services-and-guards/auth.service";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    AboutUsComponent,
  ],
  imports: [
    BrowserModule,
    UserModule,
    ArtModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      autoDismiss: true,
      maxOpened: 2,
      timeOut: 1500,
      easeTime: 200,
      newestOnTop: false,
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [AuthService, AngularFireAuth],
  bootstrap: [AppComponent],
})
export class AppModule {}
