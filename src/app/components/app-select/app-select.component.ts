import { IComponentOptions } from 'angular';
import AppSelectComponentController from './app-select.controller';

const template = require('./app-select.html');

class AppSelectComponent implements IComponentOptions {
    public bindings: any;
    public controller: any;
    public controllerAs: string;
    public template: string;

    constructor() {
        this.bindings = {
            selectedItem: '<',
            isUsed: '<?',
            forms: '<',
            addItem: '&?',
            removeItem: '&?'
        };

        this.controller = AppSelectComponentController;
        this.controllerAs = '$ctrl';
        this.template = template;
    }
}

export default AppSelectComponent;