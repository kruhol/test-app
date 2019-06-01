import {IComponentOptions} from 'angular';

const AppComponent: IComponentOptions = {
    template: `
        <div class="app app--animate" loader-directive ui-view></div>
    `
};

export default AppComponent;