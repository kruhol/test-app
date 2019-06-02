import { IComponentController } from 'angular';
import IForm from '../interfaces/form.interface';

class HomeComponentController implements IComponentController {
    public availableForms: IForm[];
    public selectedForms: IForm[];
    public title: string;

    constructor() {
        this.selectedForms = [];
        this.title = 'Test App';
    }
}

export default HomeComponentController;