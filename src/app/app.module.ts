import * as angular from 'angular';
import {IModule} from 'angular';
import uiRouter from '@uirouter/angularjs';
import AppComponent from './app.component';
import HomeModule from './home/home.module';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.js';

const AppModule: IModule = angular
    .module('app', [uiRouter, HomeModule.name])
    .component('app', new AppComponent());

export default AppModule;
