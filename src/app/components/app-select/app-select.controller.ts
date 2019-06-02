import { IComponentController } from 'angular';
import IForm from '../../interfaces/form.interface';

class AppSelectComponentController implements IComponentController {
    public selectedItem: IForm;
    public isUsed: boolean;
    public forms: IForm[];
    public addItem: () => IForm;
    public removeItem: () => IForm;

    constructor() {}

    onClick(item: IForm): void {
        this.selectedItem = item;
    }

    resetSelectedItem(): void {
        this.selectedItem = null;
    }
}

export default AppSelectComponentController;