import * as angular from 'angular';
import {IModule} from 'angular';
import SelectForms from './select-forms/select-forms.component';
import AppSelectComponent from './app-select/app-select.component';
import './components.css';

const ComponentsModule: IModule = angular
    .module('components', [])
    .component('selectForms', new SelectForms())
    .component('appSelect', new AppSelectComponent());

export default ComponentsModule;