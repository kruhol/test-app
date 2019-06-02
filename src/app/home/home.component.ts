import { IComponentOptions } from 'angular';
import HomeComponentController from './home.controller';

const template: string = require('./home.html');

class HomeComponent implements IComponentOptions {
    public bindings: any;
    public controller: any;
    public controllerAs: string;
    public template: string;

    constructor() {
        this.bindings = {
            availableForms: '<'
        };

        this.controller = HomeComponentController;
        this.controllerAs = '$ctrl';
        this.template = template;
    }
}

export default HomeComponent;
