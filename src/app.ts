import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';

import {App} from './app/angular2testing';

bootstrap(App, [HTTP_PROVIDERS, ROUTER_PROVIDERS])
.catch(err => console.error(err));
