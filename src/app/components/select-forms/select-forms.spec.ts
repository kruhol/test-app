import {} from 'jasmine';
import * as angular from 'angular';
import 'angular-mocks';

import ComponentsModule from '../components.module';
import SelectFormsComponentController from './select-forms.controller';
import IForm from '../../interfaces/form.interface';

const FORMS: IForm[] = [
    {
        required: false,
        formName: 'Realysis'
    },
    {
        required: true,
        formName: 'Vertide'
    },
    {
        required: false,
        formName: 'Farmex'
    }
];

describe('SelectFormsComponent test', () => {
    let $rootScope: any;
    let $compile: angular.ICompileService;
    let compiledElement: JQLite;
    let element: JQLite;

    beforeEach(() => {
        angular.mock.module(ComponentsModule.name);
        inject(function(_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
    });

    beforeEach(() => {
        let scope: any = $rootScope.$new();
        scope.forms = [...FORMS];

        scope.ngModel = [];

        element = angular.element(
            '<select-forms ng-model="ngModel" forms="forms"></select-forms>'
        );

        compiledElement = $compile(element)(scope);
        $rootScope.$digest();
    });

    it('app-selects presents after $onInit', () => {
        let appSelectElements: JQLite = compiledElement.find('app-select');
        expect(appSelectElements.length).toBe(2);
    });

    it('should has div element', () => {
        let divElement: HTMLElement = compiledElement.children()[0];
        expect(divElement).toBeDefined();
    });

    it('bindings test', () => {
        let componentScope: any = compiledElement.scope();

        expect(componentScope.forms).toBeDefined();
        expect(componentScope.forms.length).not.toEqual(0);
        expect(componentScope.ngModel).toBeDefined();
        expect(componentScope.ngModel.length).not.toEqual(0);
    });
});

describe('SelectFormComponentController tests', () => {
    let ctrl: angular.IComponentController;

    beforeEach(() => {
        ctrl = new SelectFormsComponentController();
        ctrl.forms = [...FORMS];
        ctrl.ngModel = [];
    });

    it('$onInit method tests', () => {
        ctrl.$onInit();

        expect(ctrl.ngModel.length).toBe(1);
    });

    it('addItem method test', () => {
        ctrl.$onInit();

        ctrl.addItem(ctrl.forms[1]);
        expect(ctrl.ngModel.length).toBe(2);
        expect(ctrl.forms.length).toBe(1);
    });

    it('removeItem method test', () => {
        ctrl.$onInit();

        ctrl.removeItem(ctrl.ngModel[0]);
        expect(ctrl.ngModel.length).toBe(0);
        expect(ctrl.forms.length).toBe(3);
    });
});
