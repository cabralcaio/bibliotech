import { EditemprestimoComponent } from './views/edit-emprestimo/edit-emprestimo.component';
import { MaterialModule } from './shared/material/material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from 'src/environments/environment';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { LoginComponent } from './views/login/login.component';
import { CadastrarUsuarioComponent } from './views/cadastrar-usuario/cadastrar-usuario.component';
import { HomeComponent } from './views/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { NewemprestimoComponent } from './views/new-emprestimo/new-emprestimo.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { DetailsComponent } from './components/details/details.component';
import { AvatarPipe } from './pipes/avatar.pipe';
import { DatePipe } from '@angular/common';
import { CadastroLivrosComponent } from './views/cadastro-livros/cadastro-livros.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastrarUsuarioComponent,
    HomeComponent,
    HeaderComponent,
    DashboardComponent,
    NewemprestimoComponent,
    EditemprestimoComponent,
    DetailsComponent,
    AvatarPipe,
    CadastroLivrosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    DatePipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
