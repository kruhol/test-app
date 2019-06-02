import { IComponentOptions } from 'angular';
import SelectFormsComponentController from './select-forms.controller';

const template = require('./select-forms.html');

class SelectFormsComponent implements IComponentOptions {
    public bindings: any;
    public controller: any;
    public controllerAs: string;
    public template: string;

    constructor() {
        this.bindings = {
            ngModel: '<',
            forms: '<'
        };

        this.controller = SelectFormsComponentController;
        this.controllerAs = '$ctrl';
        this.template = template;
    }
}

export default SelectFormsComponent;
