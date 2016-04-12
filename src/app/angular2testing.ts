import {Component} from 'angular2/core';
import {Router, Route, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {Home} from './components/home/home.controller';
import {Formular} from './components/formular/formular.controller';
import {Service} from './components/service/service.controller';

@Component({
  selector: 'app',
  providers: [],
  templateUrl: 'app/app.html',
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})
@RouteConfig([
  new Route({ path: '/home', component: Home, name: 'Home', useAsDefault: true}),
  new Route({ path: '/form', component: Formular, name: 'Form'}),
  new Route({ path: '/service', component: Service, name: 'Service'}),
])
export class App {

  constructor() {}

}
