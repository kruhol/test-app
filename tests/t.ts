import * as angular from 'angular';

import { SelectFormComponent } from './select-form.component';
const template = require('./select-form.html');

angular.module('myMod', [
  require('angular-mocks'),
]);

/*
 * Covered requirements:
 *
 * Component - itself:
 * - Component should exist
 * - "forms" should pass to binding
 *
 * Component - controller:
 * - If the form is required: form is required for selection
 * - If the form is required: user can not delete/edit this form
 * - If the form is required: ngModel automatically adds these forms
 * - Each form presented in availableForms can be selected only once
 * - Dropdown must contain only the values available for selection
 * - When you click the (+) button, a new dropdown appears:
 *   - with a list of free (not selected) forms
 * - The (+) button will not be displayed if all forms are selected
 * - The (X) button will not be displayed if form cannot be deleted
 * - When you click (X), the last dropdown is deleted
 * - Required dropdown can not be deleted
 * - Required forms can not be edited
 * - You can edit a non-required form
 *
 * Component - directive:
 * - If the form is required: dropdown is displayed as disabled
 * - The (+) button will not be displayed if all forms are selected
 */

/* Test data:
 * - availableForms: <{ formName: string,  required: boolean }>[]
 * - formName: form name displayed in dropdown
 */
const availableForms = require('../../forms2.json');

const bindings = {
  forms: availableForms,
};

const elementTemplate = `
  <select-form
    ng-model="selectedForms"
    forms="availableForms">
  </select-form>
`;

let element: any;

// Component itself ------------------------------------------------------------

describe('Component SelectFormComponent - itself', () => {
  beforeEach(() => {
    angular
      .module('select.form', [])
      .component('selectForm', getComponentOptions(SelectFormComponent))
    ;
    angular.mock.module('app');
  });

  it('Component should exist',
    angular.mock.inject(($componentController: any) => {
      const component = $componentController('selectForm', {}, {});

      expect(component)
        .toBeDefined();
    }),
  );

  it('"forms" should pass to binding',
    angular.mock.inject(($componentController: any) => {
      const component = $componentController('selectForm', {}, bindings);

      expect(component.forms)
        .toEqual(bindings.forms);
    }),
  );

  it('"ngModel" should be returned to binding',
    angular.mock.inject(($componentController: any) => {
      const component = getInitializedComponent($componentController);

      expect(component.ngModel.length)
        .toBeGreaterThan(0);
    }),
  );
});

// Component controller --------------------------------------------------------

describe('Component SelectFormComponent - controller', () => {
  beforeEach(() => {
    angular
      .module('select.form', [])
      .component('selectForm', getComponentOptions(SelectFormComponent))
    ;
    angular.mock.module('select.form');
  });

  it('If the form is required: form is required for selection',
    angular.mock.inject(($componentController: any) => {
      const component = getInitializedComponent($componentController);

      expect(isRequiredFormsSelected(component))
        .toBe(true);
    }),
  );

  it('If the form is required: user can not delete/edit this form',
    angular.mock.inject(($componentController: any) => {
      const component = getInitializedComponent($componentController);

      expect(requiredFormsCount())
        .toBeGreaterThan(0);

      expect(selectedFormsCount(component))
        .toBeGreaterThan(requiredFormsCount());

      // try to delete dropdowns
      getSelectedFormsIndexes(component)
        .forEach(() => {
          component.deleteFormSelection();
        });

      expect(selectedFormsCount(component))
        .toBe(requiredFormsCount());
      expect(isRequiredFormsSelected(component))
        .toBe(true);
    }),
  );

  it('If the form is required: ngModel automatically adds these forms',
    angular.mock.inject(($componentController: any) => {
      const component = getInitializedComponent($componentController);

      let numberOfPresences = 0;
      Object.keys(getRequiredFormsIndexes())
        .forEach((formIdx) => {
          const requiredFormIdx = parseInt(formIdx, 10);
          if (!isNaN(requiredFormIdx)) {
            const requiredFormName: string = availableForms[requiredFormIdx].formName;
            component.ngModel.forEach((selectedFormName: string) => {
              if (selectedFormName === requiredFormName) {
                ++numberOfPresences;
              }
            });
          }
        });

      expect(numberOfPresences)
        .toBe(requiredFormsCount());
    }),
  );

  it('Each form presented in availableForms can be selected only once',
    angular.mock.inject(($componentController: any) => {
      const component = getInitializedComponent($componentController);

      const notRequiredSelectedFormIdx = getNotRequiredSelectedFormIdx(component);

      expect(notRequiredSelectedFormIdx)
        .toBeGreaterThanOrEqual(0);

      const formsForDistribution = component.getFormsForDistribution(notRequiredSelectedFormIdx);

      expect(formsForDistribution.length)
        .toBeGreaterThan(0);

      expect(formsForDistribution.length)
        .toBe(unique(formsForDistribution).length);

      const otherSelectedFormsIndexes = Object.keys(getRequiredFormsIndexes());
      let isSelectedFormsSelectable = false;
      otherSelectedFormsIndexes.forEach((selectedFormIdx) => {
        if (typeof selectedFormIdx === 'number') {
          if (formsForDistribution.find(
            (notSelectedFormIdx: number) => notSelectedFormIdx === selectedFormIdx) !== undefined) {
            isSelectedFormsSelectable = true;
          }
        }
      });

      expect(isSelectedFormsSelectable)
        .toBeFalsy();
    }),
  );

  it('Dropdown must contain only the values available for selection',
    angular.mock.inject(($componentController: any) => {
      const component = getInitializedComponent($componentController);

      const notRequiredSelectedFormIdx = getNotRequiredSelectedFormIdx(component);
      const formsForDistribution = component.getFormsForDistribution(notRequiredSelectedFormIdx);

      let hasRequiredForm = false;
      formsForDistribution.forEach((formIdx: number) => {
        if (availableForms[formIdx].required) {
          hasRequiredForm = true;
        }
      });

      expect(hasRequiredForm)
        .toBeFalsy();
    }),
  );

  it('When you click the (+) button, a new dropdown appears: with a list of free (not selected) forms',
    angular.mock.inject(($componentController: any) => {
      const component = getInitializedComponent($componentController);

      const beforeAdd = component.currentSelectedForms.length;
      const canBeAddedCount = availableForms.length - beforeAdd;
      let afterAdd;

      for (let i = 0; i < canBeAddedCount; ++i) {
        component.addFormSelection();
        afterAdd = component.currentSelectedForms.length;

        expect(afterAdd)
          .toBe(beforeAdd + 1 + i);
      }
      component.addFormSelection();
      afterAdd = component.currentSelectedForms.length;

      expect(afterAdd)
        .toBe(beforeAdd + canBeAddedCount);
    }),
  );

  it('The (+) button will not be displayed if all forms are selected',
    angular.mock.inject(($componentController: any) => {
      const component = getInitializedComponent($componentController);

      const beforeAdd = component.currentSelectedForms.length;
      const canBeAddedCount = availableForms.length - beforeAdd;

      for (let i = 0; i < canBeAddedCount; ++i) {
        component.addFormSelection();

        const selected = component.currentSelectedForms.length;
        const isAllFormsSelected = selected === availableForms.length;
        expect(component.canShowAddButton())
          .toBe(!isAllFormsSelected);
      }
    }),
  );

  it('The (X) button will not be displayed if form cannot be deleted',
    angular.mock.inject(($componentController: any) => {
      const component = getInitializedComponent($componentController);

      const canBeDeletedCount = getCanBeDeletedCount(component);

      for (let i = 0; i < canBeDeletedCount; ++i) {
        component.deleteFormSelection();

        const canFormBeDeleted = getCanBeDeletedCount(component) > 0;
        expect(component.canShowDeleteButton())
          .toBe(canFormBeDeleted);
      }
    }),
  );

  it('When you click (X), the last dropdown is deleted',
    angular.mock.inject(($componentController: any) => {
      const component = getInitializedComponent($componentController);

      const cloneSelected = component.currentSelectedForms.slice(0);
      component.deleteFormSelection();
      cloneSelected.pop();

      expect(component.currentSelectedForms)
        .toEqual(cloneSelected);
    }),
  );

  it('Required dropdown can not be deleted',
    angular.mock.inject(($componentController: any) => {
      const component = getInitializedComponent($componentController);

      expect(requiredFormsCount())
        .toBeGreaterThan(0);
      expect(component.currentSelectedForms.length)
        .toBe(requiredFormsCount() + 1);
      expect(component.canDeleteFormSelection())
        .toBeTruthy();

      component.deleteFormSelection();

      expect(component.currentSelectedForms.length)
        .toBe(requiredFormsCount());
      expect(component.canDeleteFormSelection())
        .toBeFalsy();
    }),
  );

  it('Required forms can not be edited',
    angular.mock.inject(($componentController: any) => {
      const component = getInitializedComponent($componentController);

      let requiredFormPresent = false;
      component.currentSelectedForms.forEach((selectedFormIdx: number) => {
        if (availableForms[selectedFormIdx].required) {
          requiredFormPresent = true;

          expect(component.canEditForm(selectedFormIdx))
            .toBeFalsy();
        }
      });

      expect(requiredFormPresent)
        .toBeTruthy();
    }),
  );

  it('You can edit a non-required form',
    angular.mock.inject(($componentController: any) => {
      const component = getInitializedComponent($componentController);

      let notRequiredFormPresent = false;
      component.currentSelectedForms.forEach((selectedFormIdx: number) => {
        if (!availableForms[selectedFormIdx].required) {
          notRequiredFormPresent = true;

          expect(component.canEditForm(selectedFormIdx))
            .toBeTruthy();
        }
      });

      expect(notRequiredFormPresent)
        .toBeTruthy();
    }),
  );
});

// Component directive ---------------------------------------------------------

describe('Component SelectFormComponent - directive', () => {
  beforeEach(() => {
    angular
      .module('select.form', [])
      .component('selectForm', getComponentOptions(SelectFormComponent))
    ;
    angular.mock.module('select.form');
  });

  it('If the form is required: dropdown is displayed as disabled',
    angular.mock.inject(($componentController: any, $compile: any, $rootScope: any) => {
      const component = getInitializedComponent($componentController, $compile, $rootScope);

      expect(availableForms[component.currentSelectedForms[0]].required)
        .toBeTruthy();

      let requiredFound = 0;
      let notRequiredFound = 0;
      angular.forEach(element.find('select'), (node) => {
        const found = node.id.match(/^select(\d+)$/);
        if (found) {
          const formIdx = parseInt(found[1], 10);
          if (availableForms[component.currentSelectedForms[formIdx]].required) {
            ++requiredFound;

            expect(node.disabled)
              .toBeTruthy();
          } else {
            ++notRequiredFound;

            expect(node.disabled)
              .toBeFalsy();
          }
        }
      });

      expect(requiredFormsCount())
        .toBe(requiredFound);
      expect(notRequiredFound)
        .toBe(1);
    }),
  );

  it('The (+) button will not be displayed if all forms are selected',
    angular.mock.inject(($componentController: any, $compile: any, $rootScope: any) => {
      const component = getInitializedComponent($componentController, $compile, $rootScope);

      let canBeAdded = availableForms.length - component.currentSelectedForms.length;
      while (canBeAdded > 0) {
        let isAddButtonClicked = false;

        angular.forEach(element.find('button'), (node) => {
          if (node.id === 'addButton') {
            if (!isAddButtonClicked) {
              node.click();
              isAddButtonClicked = true;
            }
          }
        });
        --canBeAdded;

        expect(isAddButtonClicked)
          .toBeTruthy();
      }
      canBeAdded = availableForms.length - component.currentSelectedForms.length;

      expect(canBeAdded)
        .toBe(0);

      let isAddButtonPresent = true;
      angular.forEach(element.find('button'), (node) => {
        if (node.id === 'addButton') {
          for (const className of node.classList) {
            if (className === 'ng-hide') {
              isAddButtonPresent = false;
              break;
            }
          }
        }
      });

      expect(isAddButtonPresent)
        .toBeFalsy();
    }),
  );

  it('The (X) button will not be displayed if form cannot be deleted',
    angular.mock.inject(($componentController: any, $compile: any, $rootScope: any) => {
      const component = getInitializedComponent($componentController, $compile, $rootScope);

      let canBeDeleted = component.currentSelectedForms.length - requiredFormsCount();
      while (canBeDeleted > 0) {
        let isDeleteButtonClicked = false;

        angular.forEach(element.find('button'), (node) => {
          if (node.id === 'deleteButton') {
            if (!isDeleteButtonClicked) {
              node.click();
              isDeleteButtonClicked = true;
            }
          }
        });
        --canBeDeleted;

        expect(isDeleteButtonClicked)
          .toBeTruthy();
      }
      canBeDeleted = component.currentSelectedForms.length - requiredFormsCount();

      expect(canBeDeleted)
        .toBe(0);

      let isDeleteButtonPresent = true;
      angular.forEach(element.find('button'), (node) => {
        if (node.id === 'deleteButton') {
          for (const className of node.classList) {
            if (className === 'ng-hide') {
              isDeleteButtonPresent = false;
              break;
            }
          }
        }
      });

      expect(isDeleteButtonPresent)
        .toBeFalsy();
      expect(isButtonShow(element, 'deleteButton'))
        .toBeFalsy();
    }),
  );
});

// Utility ---------------------------------------------------------------------

function getComponentOptions(Ctrl: ng.IControllerConstructor): ng.IComponentOptions {
  const myComponent: angular.IComponentOptions = {
    controller: Ctrl,
    template,
  };
  return myComponent;
}

function getScopes(root: any) {
  let resultScope: any;
  function visit(scope: any) {
    if (
         typeof scope.$ctrl === 'object'
      && scope.$ctrl.constructor.name === 'SelectFormComponent'
    ) {
      resultScope = scope;
    }
  }
  function traverse(scope: any) {
    if (resultScope) {
      return;
    }
    visit(scope);
    if (scope.$$nextSibling) {
      traverse(scope.$$nextSibling);
    }
    if (scope.$$childHead) {
      traverse(scope.$$childHead);
    }
  }
  traverse(root);
  return resultScope;
}

function getInitializedComponent($componentController: any, $compile?: any, $rootScope?: any) {
  const component = $componentController('selectForm', null, bindings);
  component.$onChanges({
    forms: {
      currentValue: availableForms,
      previousValue: undefined,
    },
  });

  if ($compile && $rootScope) {
    const scope = getScopes($rootScope);
    const newScope = $rootScope.$new();
    element = $compile(elementTemplate)(newScope);
    const newController = element.controller('select-form');
    for (const key in scope.$ctrl) {
      if (key) {
        newController[key] = scope.$ctrl[key];
      }
    }
    newController.$onChanges({
      forms: {
        currentValue: availableForms,
        previousValue: undefined,
      },
    });
    newScope.$digest();
    return newController;
  }

  return component;
}

function getRequiredFormsIndexes(): any {
  const formIndexes: any = {};
  for (let i = 0; i < availableForms.length; ++i) {
    if (availableForms[i].required) {
      formIndexes[i] = true;
    }
  }
  return formIndexes;
}

function getSelectedFormsIndexes(component: SelectFormComponent): number[] {
  const formIndexes = [];
  const forms = component.currentSelectedForms;
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < forms.length; ++i) {
    formIndexes.push(forms[i]);
  }
  return formIndexes;
}

function isRequiredFormsSelected(component: SelectFormComponent): boolean {
  const requiredFormsIndexes = getRequiredFormsIndexes();
  const selectedFormsIndexes = getSelectedFormsIndexes(component);
  for (const idx of selectedFormsIndexes) {
    // tslint:disable-next-line:no-dynamic-delete
    delete requiredFormsIndexes[idx];
  }
  return Object.keys(requiredFormsIndexes).length === 0;
}

function requiredFormsCount(): number {
  return Object.keys(getRequiredFormsIndexes()).length;
}

function selectedFormsCount(component: SelectFormComponent): number {
  return getSelectedFormsIndexes(component).length;
}

function getNotRequiredSelectedFormIdx(component: SelectFormComponent): number | undefined {
  let notRequiredSelectedFormIdx;
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < component.currentSelectedForms.length; ++i) {
    const selectedFormIdx = component.currentSelectedForms[i];
    if (!availableForms[selectedFormIdx].required) {
      notRequiredSelectedFormIdx = selectedFormIdx;
      break;
    }
  }
  return notRequiredSelectedFormIdx;
}

function unique(arr: any) {
  return arr.filter((value: any, index: number, array: any) => {
    return array.indexOf(value, index + 1) < 0;
  });
}

function getCanBeDeletedCount(component: SelectFormComponent) {
  return (component.currentSelectedForms.length - requiredFormsCount());
}

function isButtonShow(el: any, buttonId: string) {
  let isShow = false;
  angular.forEach(el.find('button'), (node) => {
    if (node.id === buttonId) {
      isShow = true;
      for (const className of node.classList) {
        if (className === 'ng-hide') {
          isShow = false;
          break;
        }
      }
    }
  });
  return isShow;
}
