-------------- NUEVO PROYECTO --------------
(Tener instalado node.js)
npm install -g @angular/cli
(ng update @angular/cli @angular/core) -> Para actualizarlo
ng new NombreProyecto
npm i bootstrap --save
ng g m NombreModulo (ng generate module NombreModulo)
ng g c NombreModulo (ng generate component NombreModulo)

Si bootstrap no funciona mirar que en el angular.json esté:
    "styles": [
        "node_modules/bootstrap/dist/css/bootstrap.min.css",
        "src/styles.scss"                      <- Asegurarse que es scss y no css
        ],
    "scripts": [
        "node_modules/bootstrap/dist/js/bootstrap.min.js"
        ]

---------------------------------------------


----------------- SPRINT 7 ------------------

SERVICIOS
Cuando varios o todos los componentes quieren hacer (o acceder o etc) lo mismo, se crea un servicio para
que puedan hacerlo
En el directorio -> ng g s NombreDelServicio (ng generate service Nombre)
    Esto crea un TS llamado: NombreDelServicio.service.ts
        Dentro: import { Injectable } from '@angular/core'

                @Injectable({
                    providedIn: 'root'
                })
                export class NombreDelServicioService {
                    constructor() { }
                    muestraMensaje(mensaje: string) {
                        alert(mensaje);
                    }
                }
Ahora hay que registrarlo:
En app.module.ts
    Añadir en providers el servicio que hemos creado -> providers: [NombreDelServicioService]
        (Arriba en los imports del mismo ts se tiene que haber creado el import del servicio)

Cuando se crea un componente, dentro se crea el constructor(), excepto en el principal porque se crea antes,
así que lo creamos, lo inyectamos:

    export class AppComponent {
        constructor(private miServicio:NombreDelServicioService) {}        
    }

Ahora hay que usarlo:

nombreFunción() {
    this.miServicio.muestraMensaje("Nombre: " + miNombre);
}

SERVICIOS 2 (ejemplo de empleado con un array creado):
Creamos: empleados.service.ts
Dentro:
    import { Empleado } from "./empleado.model";
    export class EmpleadosService{
    empleados: Empleado[]=[
        new Empleado("Nombre", "Apellido", "Puesto", "Sueldo")
        new Empleado("Nombre", "Apellido", "Puesto", "Sueldo")
        new Empleado("Nombre", "Apellido", "Puesto", "Sueldo")
    ]
    agregarEmpleadoServicio(empleado: Empleado){
        this.empleados.push(empleado)
    }
    }

En app.components.ts añadimos:
    constructor(private empleadosService: EmpleadosService) {
        this.empleados = this.empleadosService.empleados            <- el empleados de aquí
    }
Y dejamos:
    empleados: Empleado[] = []                    <- lo "pilla" de aquí, que lo trae del empleados.service.ts

El "this.empleados.push(empleado)" del empleados.service.ts antes estaba en una función del app.components.ts
Al ponerlo en la función de empleados.service.ts, habrá que añadir en app.components.ts:
    agregarEmpleado(){
        let empleado = new Empleado(this.nombre, this.apellido, this.puesto, this.sueldo)
        this.empleadosService.agregarEmpleadoServicio(empleado)                             <- Esto
    }

En app.module.ts, igual que antes, añadir en providers el nuevo EmpleadosService:
    providers: [NombreDelServicioService, EmpleadosService]

SERVICIOS 3
Vamos a meter el servicio, un alert, de servicio-empleados.service.ts en empleados.service.ts, para que lo llame
En empleados.service.ts:
    @Injectable() <- Debajo de los import, lo que creara uno nuevo: import { Injectable } from '@angular/core'
Dentro de:          
    export class EmpleadosService {
        constructor (private servicioAlert: ServicioEmpleadoService) {          <- Añadir el constructor 
        }
        agregarEmpleadoServicio(empleado: Empleado){
            this.servicioAlert.muestraMensaje("Agregado: " + empleado.nombre)   <- Y en la función añadimos
        this.empleados.push(empleado)
    }
    }

- INTERFACE (import)      - MÉTODO (export)           - DESCRIPCIÓN
- OnChanges               - ngOnChanges               - Called when an input or output binding value changes
- OnInit                  - ngOnInit                  - After the first ngOnChanges
- DoCheck                 - ngDoCheck                 - Developer's custom change detection
- AfterContentInit        - ngAfterContentInit        - After component initialized
- AfterContentChecked     - ngAfterContentChecked     - After every check of component content
- AfterViewInit           - ngAfterViewInit           - After component's view(s) are initialized
- AfterViewChecked        - ngAfterViewChecked        - After every check of a component's view(s)
- OnDestroy               - ngOnDestroy               - Just before the directive is destroyed

  ONCHANGES
(Creamos el componente ng-on-changes)  
En el app.component.ts
export class AppComponent {
    name: string = ''
}

En el app.component.html
<p>Change this field</p>
<input [(ngModel)] = "name" />
<hr /> Historial
<app-ng-on-changes></app-ng-on-changes>

En el app.module.ts
Añadir, como hemos visto antes, el FormsModule
    import { FormsModule } from 'angular/forms'
    imports: [FormsModule]

En el ng-on-changes.html
<p *ngFor="let change of changes">{{change}}</p>

En el ng-on-changes.component.ts
Añadir en el import: Input, OnChanges, SimpleChange
    import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core
    
    export class NgOnChangesComponent implements OnInit {
        @Input ('name') nombre;
        changes: Array<string> = [''];

        constructor() {
        }
        ngOnInit() {
        }
        ngOnChanges(changes: SimpleChange) {
            this.changes.push(JSON.stringify(changes))
        }
    }

Volvemos al app.component.html y añadimos el [name]="name" para que por pantalla en la web aparezcan
los cambios al introducir algo en el input (de esta manera cada letra que escribamos o borremos se verá
por pantalla el valor anterior y el actual)
<p>Change this field</p>
<input [(ngModel)] = "name" />
<hr /> Historial
<app-ng-on-changes [name]="name"></app-ng-on-changes>

Método ONINIT() (Se ejecuta al iniciar el componente)
En el .ts
    import { Component, OnInit } from '@angular/core'
    
    export class NgOnChangesComponent implements OnInit {
        logs: Array<string> = [new Date() + '']
        constructor() {
        }
        ngOnInit() {
            this.logs.push(new Date() + '')
        }
    }

En el .html
    <p *ngFor="let log of logs">{{log}}</p>
De esta manera se imprime por pantalla la fecha dos veces,
una por el: logs: Array<string> = [new Date() + '']
y la otra por el: this.logs.push(new Date() + '')


Añadimos todos los métodos que vamos a usar en import y export:
    import { Component, OnInit                                      
    DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy }

    export class VariosComponent implements OnInit                                      
    DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
    
        constructor() {
            console.log('Constructor')
        }
        ngOnInit() {
            console.log('On Init')
        }
        ngDoCheck() {
            console.log('Do Check')
        }
        ngAfterContentInit() {
            console.log('After Content Init')
        }
        ngAfterContentChecked() {
            console.log('After Content Checked')
        }
        ngAfterViewInit() {
            console.log('After View Init')
        }
        ngAfterViewChecked() {
            console.log('After View Checked')
        }
        ngOnDestroy() {
            console.log('On Destroy')
        }
    }


ROUTING
El componente principal hace de router, así que no se meten mas componentes dentro.
Como siempre, en el .ts del componente principal, añadir en declarations los otros componentes
para que haga el import

CREAR RUTAS: en el mismo .ts del componente principal:
    const appRoutes: Routes = [     -> Routes saldrá como error pero hacemos corrección rápida
                                    poniendo el curso sobre la palabra y nos hará el import también
    {path:'', component: HomeComponent},                   -> '' está vacío porque es la página principal
    {path:'proyectos', component: ProyectosComponent},
    {path:'contacto', component: ContactoComponent}
    ]    

En imports: [
    RouterModule.forRoot(appRoutes)      -> Añadimos éste a los que ya estaban para que se cree 
]                                           el import también arriba; entre paréntesis la const creada

En el HTML, en los links poner: href="/proyectos", href="/contacto", los necesarios
    routerLink="/proyectos" en lugar del href

FORMULARIOS REACTIVOS
En el loquesea.module.ts:
    @NgModule({
        declarations: [SelectorPageComponent],
        imports: [
            CommonModule,
            ReactiveFormsModule,        -> Añadimos esto, que además creará el import arriba
            LoqueseaRoutingModule
        ]
    })

Arriba del .ts del componente que queremos usar:
import { FromBuilder, FormGroup, Validators} from '@angular/core'

Dentro del export del .ts del mismo:
    miFormulario: FormGroup = this.fb.group({
        region: ['', Validators.required]
        })

En el .html del mismo componente:
<form [FormGroup]="miFormulario">
<select class="form-control" formControlName="region">


VIEWCHILD (ViewChild) - (ViewChildren es para cuando es un array, hay más elementos)
Alias: dentro del tag del html pones #loQueQuieras <img #loQueQuieras class="img" [src]="data.url">
En el import del .ts añadir ViewChild
En el export del .ts:
    @ViewChild('txtTagInput') image: ElementRef
    public tagInput!: ElementRef<HTMLInputElement>
    
    function() {
        const txtTagInput = this.image.nativeElement
        this.renderer2.setStyle(txtTagInput, style: 'color', value: 'red')
    }

- setStyle va acompañado de ese formato, hay más opciones como setStyle para diferentes cosas
- "renderer2" es el elemento a cambiar, lo renderizado, el txtTagInput (lo inyectamos, viene del angular/core)
        constructor(private renderer2: Renderer2) { }




---------------------------------------------------------------------------------------------------

SPRINT 6
--------- SUBIR A GIT ---------
->  git add . (agrega todos los archivos de la carpeta)
->  git commit -m "Agregamos el index.html" (agrega mensaje y "hace la foto"/guarda)
->  git push

En el TERMINAL de Visual Studio Code, estando en la carpeta correspondiente:
git init (sólo una vez por carpeta)
git status -s (ver el estado de los archivos)
git add index.html (añade el archivo a git)

Hacer cada vez que se quiera guardar todo:
git add .
cada commit guarda todo, hace la foto; con el texto añadido sabes por dónde vas

para cargar un anterior:
git log --oneline (para ver la lista de guardados)
git reset --hard 01e7136 (el número de guardado)

creas el repository en github
copiamos el: git remote add origin http://...... y lo copiamos en la terminal, dentro de la carpeta
hacemos lo mismo con: git push -u origin master (en el terminal puede pedirnos nombre y contraseña de github)

-----CREAR PROYECTO ANGULAR-----
npm install -g @angular/cli
ng new my-first-project
    (en SCSS mejor que CSS pero también es bien)
(ls para ver si estamos en el directorio correcto)
npm i bootstrap
    angular.json ->  "styles":["./node_modules/bootstrap/scss/bootstrap.scss"] (SCSS)
                              ["./node_modules/bootstrap/dist/css/bootstrap.min.css"] (CSS)
                 -> "scripts":["./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"] (SCSS y CSS)
app.module.ts -> imports:[FormsModule] (Si se quieren usar formularios)
ng serve -o


-----APUNTES ANGULAR-----
Instalar angular:
npm install -g @angular/cli
con el comando ng --help se muestran todos los comandos disponibles

Crear proyecto: ng new my-first-project
Levantar proyecto: ng serve
En el explorador: localhost:4200 (ng serve --port-4000 cambia el localhost)

app angular (main) es lo principal a cargar
app.module.ts es el módulo raíz
componente principal es la que tiene el selector, plantilla, css

Manteniendo ctrl encima de un elemento veremos dónde está y clicando abriremos el archivo
    Ej: en main.ts le damos en AppModule y abriremos el app.module.ts y ahí a AppComponent
Ahí podemos ver el @Component donde veremos el selector, plantilla y estilos

ng serve -o para abrir la aplicación en el navegador

si en el archivo app.components.ts le decimos a exportar que saludos = "Hola", cuando en el
HTML pongamos {{saludos}} en la web saldra el Hola

ng generate component nombre_carpeta/nombre_componente (si no pones la carpeta para que la cree lo creará en la carpeta app que viene por defecto, así crea la carpeta dentro de la misma, app)

en el .ts del componente creado, si copias el selector y lo pegas en el html de la app, aparecerá en la web lo que haya en el html del compnente creado
    Ej: first-component.component.ts -> selector: 'app-first-component', -> copio el app-first-component y lo pego en el app.component.html como una etiqueta: <app-first-component></app-first-component> -> saldrá lo que haya en el first-component.component.html

Puede haber componentes dentro de componentes

En app.module.ts -> @NgModule -> declarations: añadir NuevoComponente (que es la clase que exportamos en el .ts del nuevo componente que hemos creado (export class NuevoComponent {}))

Crear componente nuevo automático en terminal: ng generate component nombre -> ng g c nombre

ng g c nombre -s -t  ->  hace que cree el archivo siendo inline y que no cree los demás archivos
(en selector, templateUrl y styleUrls en lugar de poner las rutas, se pone directamente lo que queremos que salga, o sea, lo que poníamos en esos otros archivos que no se han creado)
    Ej: templateUrl: './antiguo.component.html',  ->  template: '<p>Hola!</p>' (sin el Url en templateUrl)


PARENT - CHILD (Component Interaction)

Parent Component -> @Input() -> Child Component
Child Component -> @Output() -> Parent Component

Ej:     - En app.component.ts
    export class AppComponent {
        public name = "Dani"                                   Dani es el nombre que saldrá en el HTML
                                                               al poner el tag:
                                                               <app-test [parentData]="name"></app-test>
        <button (click)="fireEvent()">Send Event</button>      Crea el botón en el HTML en el mismo tag                     
    }                                                          
                                                        
        - En test.component.ts
    import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
                -> Aquí añadir los que usemos abajo    

    @Component({
        selector: 'app-test',
        template: `<h2>{{"Hello" + parentData}}</h2>`    ->    `<h2>{{"Hello" + name}}</h2>`
        styles: []
    })
    export class TestComponent implements OnInit {
        @Input() public parentData                       ->    @Input('parentData') public name
        @Output() public childEvent = new EventEmitter() ->

        constructor() { }
        ngOnInit() { }

        fireEvent() {
            this.childEvent.emit('Hola')                 ->    Al darle al botón pondrá Hola
        }
    }

    En el HTML añadimos: <app-test (ChildEvent)="message=$event" [parentData]="name"></app-test>
    En el HTML podemos poner: <h1>{{message}}</h1> y pondrá 'Hola' al darle al botón fireEvent()

Cambiar de Sintaxis estricta a no estricta (Puede solucionar errores que da VSC):
    En el tsconfig.json -> añadir en "compilerOptions":{
        "strictPropertyInitialization": false
    }

STRING INTERPOLATION:
    En app.component.ts
        export class AppComponent {
            nombre = 'Dani'
        }
    en app.component.html
        <h1>{{nombre}}</h1>
De otra manera:
    En app.component.ts
        export class AppComponent {
            nombre = 'Dani'
            getNombre(){
                return this.nombre
            }
        }
    en app.component.html
        <h1>{{getNombre()}}</h1>

Lo de abajo "convertirlo a"             --->             "usar" PROPERTY BINDING
                                                         (que es usar los corchetes en la propiedad):  
    @Component({
        selector: 'app-root'
        template: `
        <img src = '{{imageUrl}}'/>                      <img [src] = "imageUrl"/> 
        `
        styles: ['']
    })
    export class AppComponent {
        imageUrl = "url.com/imgrandom"
    }

Otro ejemplo (button disable):
    @Component({
        selector: 'app-root'
        template: `
        <button [disable] = "buttonStatus">Dale al botón</button>
        `
        styles: ['']
    })
    export class AppComponent {
        buttonStatus = true                                Con TRUE el botón estará disable porque lo pone arriba
    }                                                      Si se cambia a FALSE, el botón no estará disable, se podrá usar

CLASS BINDING
 @Component({
        selector: 'app-root'
        template: `
        <button [class.activa] = "isActive">Dale al botón</button>
        `
        styles: ['
        .activa{
            background: black                               Le damos el style que queremos para el .activa
        }
        ']
    })
    export class AppComponent {
        isActive = true                                     Igual que antes, true o false hace que el style class.activa
    }                                                       esté activada o no y se muestre/funcione en el HTML

STYLE BINDING
@Component({
        selector: 'app-root'
        template: `
        <button [style.backgroundColor] = "isActive ? 'green' : 'white'">Dale al botón</button>
        `
        styles: ['']
    })
    export class AppComponent {
        isActive = true                                     True o false hace que el style.backgroundColor cambie de
    }                                                       color según el estado de isActive (true=green; false=white)

Todos los parámetros que se pueden usar en STYLE: https://www.w3schools.com/jsref/dom_obj_style.asp

EVENT BINDING
@Component({
        selector: 'app-root'
        template: `
        <button (click) = "save($event)">Guardar</button>         Click es el EVENTO (como podría ser moseover) y save() es la
        `                                                         función que ejecuta - Se puede hacer en el HTML también
        styles: ['']
    })
    export class AppComponent {
        save($event) {                                             Podemos sustituir $event por otra palabra que cogerá igualmente
                                                                   el $event del botón (por ejemplo: e)
            console.log($event)                                    Con esto vemos en la consola qué pasa cuando clickamos
        }
    }

EVENT FILTERING
@Component({
        selector: 'app-root'
        template: `
        <input type="text" (keyup.enter) = "onKeyUp()"/>          keyup es el evento; .enter es el filtro 
        `                                                                             (cuando se pulse enter)
        styles: ['']
    })
    export class AppComponent {
        onKeyUp() {
            console.log("Enter ha sido presionado")               Al pulsar enter vemos por consola el texto
        }
    }

TEMPLATE VARIABLE
@Component({
        selector: 'app-root'
        template: `
        <input type="text" (keyup.enter) = "onKeyUp(nombre.value)" #nombre/>     Se crea la variable #nombre y    
        `                                                                        se introduce en el onKeyUp
        styles: ['']
    })
    export class AppComponent {
        onKeyUp(usuario) {                                usuario es la palabra que usamos pero coge el nombre.value del input
            console.log(usuario)                          Al darle enter, aparece el nombre en la conosola
        }
    }

TWO WAY BINDING: ngModel
- En el TS:
@Component({
        selector: 'app-root'
        templateUrl: "./app.component.html"                                    
        styles: ['']
    })
    export class AppComponent {
        persona = {
            nombre = 'Dani',
            edad = 35
        }
    }

- En el app.module.ts
import { FormsModule } from 'angular/forms'                     Lo importamos
@ngModule({
    imports: [
        FormsModule                                             Le decimos que vamos a usarlo
    ]
})

- En el HTML:
<input type="text" [(ngModel)] = "persona.nombre">              Con ello, al cambiar el nombre en el interior del input,
<p>{{persona.nombre}}</p>                                       también cambia el que aparece en el <p>;
                                                                y el del array de objetos donde está registrado

DIRECTIVAS
Elementos que se aplican a etiquetas HTML que añaden funcionalidades
Modifica el DOM y la apariencia
Tipos:
- Componente:
    - Angular
        - @Component
        - @Module
    - Personalizadas (Custom)
- Atributo:
    - ngClass
    - ngStyle
    - ngModel
- Estructura:
    - ngIf
    - ngFor
    - ngSwitch
    - ngPlural
    - ngTemplate
    - ngComponentOutlet

NGIF
html:
<input type="text" name="nombre">
<input type="submit" value="Registrar" (click)="registrarUsuario()">   Value es el nombre que aparece el el botón
<p *ngIf="registrado; else sinRegistrar">{{Mensaje}}</p>               ngIf = Si "registrado" es true, muestra el mensaje
<ng-template #sinRegistrar>                                            Si es false, hace el else aquí
<p>Nadie registrado</p>
</ng-template>

export class AppComponent {
    mensaje = ""
    registrado = false

    registrar() {                                                       Al darle al botón registrar() cambia los dos parámetros
        this.registrado = true
        this.mensaje = "Usuario registrado"
    }
}

NGFOR
<ul>
<li *ngFor="let entrada of entradas">{{entrada.titulo}}</li>      Recorre el array 'entradas' y coge cada elemento (lo guarda como 'entrada')
</ul>                                                             Muestra por pantalla el .titulo de cada elemento ('entrada')

<ul>
<li *ngFor="let entrada of entradas; let i = index">              El valor i para añadirlo a cada entrada en cada pasada
{{entrada.titulo}} - Entrada {{i+1}}</li>                         "- Entrada" es texto en el html y le sigue el valor de i + 1
</ul>                                                                   Quedaría: "Número 1 - Entrada 1"
                                                                                  "Número 2 - Entrada 2"
export class AppComponent {
    entradas: Object[]

    constructor() {
        this.entradas = [
            titulo:"Número 1"
            titulo:"Número 2"
            titulo:"Número 3"
        ]
    }
}

En la práctica llamada 'practica' hacemos:
Creamos: empleados.model.ts y hacemos el constructor con sus parámetros
export class Empleado {
    
    constructor(nombre: string){                    El primer "nombre" se refiere al de abajo
        this.nombre=nombre                             y el segundo al de arriba, el constructor
    }
    
    nombre: string = ""
}

Añadir en el app.component.ts: import { Empleado } from './empleado.model';
    También se puede hacer dándole a la bombilla que aparece al hacer click derecho en el error al escribir:
        empleados:Empleado[] ya que Empleado saldrá subrayado al no estar el constructor importado en el .ts actual

---------------------------------------------------------------------------------------------------------------
INTERFACE

interface Cliente {
  nombre: String;
  cif: String;
  direccion: String;
  creado: Date;
}

let cliente: Cliente;

let cliente1 = new Cliente();
cliente.nombre = 'EscuelaIT S.L.";
cliente.cif = 'B123';
cliente.direccion = 'C/ Del Desarrollo Web .com';
cliente.creado = new Date(Date.now());

---------------------------------------------------------------------------------------------------------------

Bootstrap 5
 GUTTER = Padding entre columnas
 Container, container-fluid, cols, rows... Tienen un padding automático, así que con g-0 lo dejamos en 0

En el buscador del VSC escribir: reload window para que actualice referencias y así algo que sale como error
que quizás no lo es lo ponga como que está bien

