import {IComponentOptions} from 'angular';

class AppComponent implements IComponentOptions {
    public template: string;

    constructor() {
        this.template = '<div ui-view></div>';
    }
}

export default AppComponent;