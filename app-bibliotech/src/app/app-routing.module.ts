import { EditemprestimoComponent } from './views/edit-emprestimo/edit-emprestimo.component';
import { NewemprestimoComponent } from './views/new-emprestimo/new-emprestimo.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarUsuarioComponent } from './views/cadastrar-usuario/cadastrar-usuario.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { CadastroLivrosComponent } from './views/cadastro-livros/cadastro-livros.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuard ],
    title: "Home | Bibliotech"
  },
  {
    path: 'login',
    component: LoginComponent,
    title: "Login | Bibliotech"
  },
  {
    path: 'cadastrar',
    component: CadastrarUsuarioComponent,
    title: "Cadastre-se | Bibliotech"
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [ AuthGuard ],
    title: "Painel de Controle | Bibliotech"
  },
  {
    path: 'cadastrar-livros',
    component: CadastroLivrosComponent,
    canActivate: [ AuthGuard ],
    title: "Cadastrar livros | Bibliotech"
  },
  {
    path: 'dashboard/new',
    component: NewemprestimoComponent,
    canActivate: [ AuthGuard ],
    title: "Novo empréstimo | Bibliotech"
  },
  {
    path: 'dashboard/edit/:id',
    component: EditemprestimoComponent,
    canActivate: [ AuthGuard ],
    title: "Editar empréstimo | Bibliotech"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
