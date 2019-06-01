import * as angular from 'angular';
import {IModule} from 'angular';
import {IStateProvider, IUrlRouterProvider} from 'angular-ui-router';
import HomeComponent from './home.component';
import Components from '../components/components.module';
import './home.css';
import IForm from '../interfaces/form.interface';
import ServicesModule from '../services/form-service';

const HomeModule: IModule = angular
    .module('app.components.home', [Components.name, ServicesModule.name])
    .component('home', new HomeComponent())
    .config(($stateProvider: IStateProvider, $urlRouterProvider: IUrlRouterProvider) => {
        $stateProvider
            .state('home', {
                component: 'home',
                url: '/home',
                resolve: {
                    availableForms: (FormService: any): IForm[] => {
                        return FormService.getForms();
                    }
                }
            });
        $urlRouterProvider.otherwise('/home');
    });

export default HomeModule;
