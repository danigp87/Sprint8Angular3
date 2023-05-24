import { StarshipsInfoComponent } from './starwars/starships/starships-info/starships-info.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { StarshipsComponent } from './starwars/starships/starships.component';
import { WelcomeComponent } from './starwars/welcome/welcome.component';
import { PilotsComponent } from './starwars/starships/starships-info/pilots/pilots.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const adminModule = () => import('./admin/admin.module').then(x => x.AdminModule);
const profileModule = () => import('./profile/profile.module').then(x => x.ProfileModule);

const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: 'profile', loadChildren: profileModule, canActivate: [AuthGuard] },
    { path: 'admin', loadChildren: adminModule, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'starships', component: StarshipsComponent, canActivate: [AuthGuard] },
    { path: 'starship-info/:id', component: StarshipsInfoComponent, canActivate: [AuthGuard] },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'pilots', component: PilotsComponent, canActivate: [AuthGuard] },
    
    // otherwise redirect to home
    { path: '**', redirectTo: 'welcome' },
    { path: 'admin', redirectTo: 'admin/accounts' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
