-------------- NUEVO PROYECTO --------------
(Tener instalado node.js)
npm install -g @angular/cli
(ng update @angular/cli @angular/core) -> Para actualizarlo
ng new NombreProyecto
npm i bootstrap --save
ng g m NombreModulo (ng generate module NombreModulo)
ng g c NombreComponente (ng generate component NombreComponente)
ng g s NombreServicio (ng generate service NombreServicio)

---------------------------------------------

------------- FERNANDO HERRERA --------------
ng g m NombreModulo -> Para crear módulos y no componentes
En el app.module.ts -> Añadir en imports: ShareModule

Clic derecho - Angular: Generate Component
    Ponemos el nombre - Default Component
        Add more options: inlineStyle y skipTest
            True a todo y confirm

Creamos app-routing.module.ts que es donde se hará el ROUTING
y hacemos lo siguiente:

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './share/Pages/home-page/home-page.component';
import { AboutPageComponent } from './share/Pages/about-page/about-page.component';

const routes: Routes = [{
    path: 'home',
    component: HomePageComponent
},
{
    path: 'about',
    component: AboutPageComponent
},
{
    path: '**',
    redirectTo: 'home'
}]

@NgModule({
imports: [
    RouterModule.forRoot(routes) -> .forRoot porque es el principal (routes es la const creada arriba)
],
exports: [
    RouterModule
]
})

export class AppRoutingModule {
}

En el app.module.ts, en Imports añadimos el: AppRoutingModule

<router-outlet></router-outlet> en el HTML para que pille el html del que se indique en la URL
    <shared-home-page></shared-home-page> o bien <share-about-page></share-about-page>
    

FORMULARIOS REACTIVOS

En el .TS dentro del export:
    constructor (private fb: FormBuilder) {}
        public formulario: FormGroup = new FormGroup({
            checkedWeb: [false],
            checkedSeo: [false],
            checkedAd: [false]
        })

Lo que crea arriba en los imports:
    import { FormGroup } from '@angular/forms';

En el .module.ts añadir:
    imports: [
        ReactiveFormsModule
    ]
Lo que lo creará arriba en imports

En el HTML:
<form [formGroup]="formulario"> -> Es el formulario del public formulario
Dentro del <form></form>:
    <form><input formControlName="checkedWeb"></form> -> del checkedWeb: [false], de arriba

Añadimos Validator al mismo import de FormBuilder y FormGroup
Ahora añadimos después del false los validators (por ejemplo esos, en cualquiera de los 3)
    public formulario: FormGroup = new FormGroup({
            checkedWeb: [false, [Validators.required, Validators.minLenght(3)]],
            checkedSeo: [false],
            checkedAd: [false]
        })

