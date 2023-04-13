import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { GameListComponent } from './game-list/game-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon"
import {MatCardModule} from "@angular/material/card";
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {MatGridListModule} from "@angular/material/grid-list";
import { ToolbarComponent } from './toolbar/toolbar.component';
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatRippleModule } from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SellerEnumPipe } from './enum.pipe';
import { PriceLineChartComponent } from './price-line-chart/price-line-chart.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import {JWT_OPTIONS, JwtHelperService, JwtModule} from "@auth0/angular-jwt";
import { AuthPageComponent } from './auth-page/auth-page.component';
import {MatMenuModule} from "@angular/material/menu";
import { UserFavoritesComponent } from './user-favorites/user-favorites.component'

@NgModule({
  declarations: [
    AppComponent,
    UserDetailComponent,
    GameDetailComponent,
    GameListComponent,
    ToolbarComponent,
    SellerEnumPipe,
    PriceLineChartComponent,
    ErrorPageComponent,
    AuthPageComponent,
    UserFavoritesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    AppRoutingModule,
    MatGridListModule,
    MatButtonModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatInputModule,
    FormsModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem("accessToken")
        },
        allowedDomains: ["localhost:8080"],
        disallowedRoutes: ["http://localhost:8080/auth", "http://localhost:8080/game"]
      }
    }),
    ReactiveFormsModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
