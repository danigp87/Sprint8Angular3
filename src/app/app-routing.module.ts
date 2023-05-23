import { StarshipsInfoComponent } from './starwars/starships/starships-info/starships-info.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { StarshipsComponent } from './starwars/starships/starships.component';
import { WelcomeComponent } from './starwars/welcome/welcome.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const adminModule = () => import('./admin/admin.module').then(x => x.AdminModule);
const profileModule = () => import('./profile/profile.module').then(x => x.ProfileModule);

const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: 'profile', loadChildren: profileModule, canActivate: [AuthGuard] },
    { path: 'admin', loadChildren: adminModule, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'starships', component: StarshipsComponent },
    { path: 'starship-info/:id', component: StarshipsInfoComponent },
    { path: 'welcome', component: WelcomeComponent },
    
    // otherwise redirect to home
    { path: '**', redirectTo: 'welcome' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
