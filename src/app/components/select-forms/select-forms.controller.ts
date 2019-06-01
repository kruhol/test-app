import {IComponentController} from 'angular';
import IForm from '../../interfaces/form.interface';

class SelectFormsComponentController implements IComponentController {
    public ngModel: IForm[];
    public forms: IForm[];

    constructor() {}

    public $onInit(): void {
        const requiredForms = this.forms.filter(f => f.required);

        requiredForms.forEach(f => {
            this.ngModel.push(f);
            this.forms.splice(this.forms.indexOf(f), 1);
        });
    }

    addItem(item: IForm): void {
        this.ngModel.push(item);
        this.forms.splice(this.forms.indexOf(item), 1);
    }

    removeItem(item: IForm): void {
        this.forms.push(item);
        this.ngModel.splice(this.ngModel.indexOf(item), 1);
    }
}

export default SelectFormsComponentController;