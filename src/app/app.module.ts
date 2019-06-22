import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { HeaderComponent } from './header/header.component';
import { UserItemComponent } from './users/user-list/user-item/user-item.component';
import { PageNotFoundComponent } from './404/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material'
import { UserDetailDialog } from './users/user-detail-dialog/user-detail-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserListComponent,
    UserDetailDialog,
    UserDetailsComponent,
    UserEditComponent,
    HeaderComponent,
    UserItemComponent,
    PageNotFoundComponent,
  ],
  imports: [
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  entryComponents:[
    UserDetailDialog
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
