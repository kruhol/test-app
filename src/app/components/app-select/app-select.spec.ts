import {} from 'jasmine';
import * as angular from 'angular';
import ComponentsModule from '../components.module';
import IForm from '../../interfaces/form.interface';

const FORMS: IForm[] = [
    {
        required: false,
        formName: 'Realysis'
    },
    {
        required: false,
        formName: 'Vertide'
    },
    {
        required: false,
        formName: 'Farmex'
    }
];

describe('AppSelectComponent tests', () => {
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

    describe('AppSelectComponentTests for add form mode', () => {
        let scope: any;

        beforeEach(() => {
            scope = $rootScope.$new();
            scope.forms = [...FORMS]

            scope.addItem = jasmine.createSpy('addItem');

            element = angular.element(`
                <app-select forms='forms'
                            add-item='addItem(item)'>
                </app-select>
            `);

            compiledElement = $compile(element)(scope);
            $rootScope.$digest();
        });

        it('addItem should be a function', function() {
            let elementScope: any = compiledElement.scope();
            expect(typeof elementScope.addItem).toEqual('function');
        });

        it('should call addItem method of scope when invoked from isolated scope', function() {
            let elementScope: any = compiledElement.scope();
            elementScope.addItem();
            expect(scope.addItem).toHaveBeenCalled();
        });

        it('should have div element', () => {
            let divElement: HTMLElement = compiledElement.children()[0];
            expect(divElement).toBeDefined();
        });

        it('bindings test', () => {
            let componentScope: any = compiledElement.scope();
            expect(componentScope.forms).toBeDefined();
            expect(componentScope.forms.length).not.toEqual(0);
        });

        it('should have items', () => {
            let btn: any = compiledElement[0].querySelectorAll(
                '.dropdown-toggle.dropdown-toggle-split.btn-toggle'
            )[0];
            btn.click();
            
            let dropdownItems: NodeListOf<Element> = compiledElement[0].querySelectorAll(
                'div.dropdown-item'
            );

            expect(dropdownItems).toBeDefined();
            expect(dropdownItems.length).toEqual(scope.forms.length);
        });

        it('add button should be available after choose item', () => {
            let btn: any = compiledElement[0].querySelectorAll(
                '.dropdown-toggle.dropdown-toggle-split.btn-toggle'
            )[0];
            btn.click();

            let dropdownItems: NodeListOf<HTMLDivElement> = compiledElement[0].querySelectorAll(
                'div.dropdown-item'
            );
            dropdownItems[0].click();

            expect(compiledElement[0].querySelectorAll('.btn.btn-success.test-btn')[0])
                .toBeDefined();
        });

        it('should call addItem method when clicking to addButton', () => {
            let btn: any = compiledElement[0].querySelectorAll(
                '.dropdown-toggle.dropdown-toggle-split.btn-toggle'
            )[0];
            btn.click();

            let dropdownItems: NodeListOf<HTMLDivElement> = compiledElement[0].querySelectorAll(
                'div.dropdown-item'
            );
            dropdownItems[0].click();

            let addButton: any = compiledElement[0].querySelectorAll(
                '.btn.btn-success.test-btn'
            )[0];
            addButton.click();

            expect(scope.addItem).toHaveBeenCalled();
        });
    });

    describe('AppSelectComponentTests for remove form mode', () => {
        var scope: any;

        beforeEach(() => {
            scope = $rootScope.$new();
            scope.forms = [...FORMS];

            scope.removeItem = jasmine.createSpy('removeItem');

            scope.item = {
                required: false,
                formName: 'ABB'
            };

            scope.isUsed = true;

            element = angular.element(`
                <app-select selected-item="item"
                            forms="forms"
                            is-used="isUsed"
                            remove-item="removeItem(item)">
                </app-select>
            `);

            compiledElement = $compile(element)(scope);
            $rootScope.$digest();
        });

        it('removeItem should be a function', function() {
            let elementScope: any = compiledElement.scope();
            expect(typeof elementScope.removeItem).toEqual('function');
        });

        it('should call removeItem method of scope when invoked from isolated scope', function() {
            let elementScope: any = compiledElement.scope();
            elementScope.removeItem();
            expect(scope.removeItem).toHaveBeenCalled();
        });

        it('should have div element', () => {
            let divElement: HTMLElement = compiledElement.children()[0];
            expect(divElement).toBeDefined();
        });

        it('bindings test', () => {
            let componentScope: any = compiledElement.scope();

            expect(componentScope.forms).toBeDefined();
            expect(componentScope.forms.length).not.toEqual(0);
            expect(componentScope.isUsed).toBeTruthy();
            expect(componentScope.item).toBeDefined();
        });

        it('choose btn should be disabled', () => {
            let btn: any = compiledElement[0].querySelectorAll(
                '.dropdown-toggle.dropdown-toggle-split.btn-toggle'
            )[0];
            expect(btn.hasAttribute('disabled')).toBeTruthy();
        });

        it('delete button should be available', () => {
            let btn: any = compiledElement[0].querySelectorAll(
                '.btn.btn-danger.test-btn'
            )[0];
            expect(btn.hasAttribute('disabled')).toBeFalsy();
        });

        it('should call removeItem method when clicking to deleteButton', () => {
            let deleteButton: any = compiledElement[0].querySelectorAll(
                '.btn.btn-danger.test-btn'
            )[0];
            deleteButton.click();

            expect(scope.removeItem).toHaveBeenCalled();
        });

        it('delete button not defined when required form uses', () => {
            scope.item = {
                required: true,
                formName: 'ABB'
            };

            scope.$digest();

            let deleteButton: any = compiledElement[0].querySelectorAll(
                '.btn.btn-danger.test-btn'
            )[0];

            expect(deleteButton).toBeUndefined();
        });
    });
});