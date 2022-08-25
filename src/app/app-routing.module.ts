import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

import { FriendListComponent } from './components/friend-list/friend-list.component';
import { NetworkComponent } from './components/network/network.component';
import { PostComponent } from './components/post/post.component';
import { UsersListComponent } from './components/users-list/users-list.component';

import { ErrorsPageComponent } from './pages/errors-page/errors-page.component';
import { ForgetPasswordPageComponent } from './pages/forget-password-page/forget-password-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';

const routes: Routes = [
  { path: "", component: HomePageComponent, canActivate: [AuthGuard], children: [
      { path: "", component: PostComponent, canActivate: [AuthGuard] },
      { path: "friend-list", component: FriendListComponent, canActivate: [AuthGuard] },
      { path: "networks", component: NetworkComponent, canActivate: [AuthGuard] },
      { path: "users", component: UsersListComponent, canActivate: [AuthGuard, RoleGuard] }
    ],
  },
  { path: "error", component: ErrorsPageComponent },
  { path: "forgetPassword", component: ForgetPasswordPageComponent },
  { path: "login", component: LoginPageComponent },
  { path: "register", component: RegisterPageComponent },
  { path: "settings", component: SettingsPageComponent, canActivate: [AuthGuard] },
  { path: "settings/:id", component: SettingsPageComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: "**", redirectTo: 'error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
