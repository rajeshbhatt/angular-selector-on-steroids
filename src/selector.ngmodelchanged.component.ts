export class SelectorNgModelChangedComponent {

    public link: (scope: angular.IScope,
        element: angular.IAugmentedJQuery,
        attrs: angular.IAttributes,
        controller: angular.IController,
        transclude: angular.ITranscludeFunction) => void;

    public require: string = 'ngModel';
    public scope: any = {
        onSelectorNgModelChanged: '&'
    };

    constructor() {

        SelectorNgModelChangedComponent.prototype.link = (scope: angular.IScope,
            element: angular.IAugmentedJQuery,
            attrs: angular.IAttributes,
            controller: angular.IController, ) => {

            let oldValue;
            controller.$formatters.push((value) => {
                oldValue = value;
                return value;
            });
            controller.$viewChangeListeners.push(() => {
                const ngModelName = attrs['ngModel']; // TODO: UNDEFINED CHECK

                (<any>scope).onSelectorNgModelChanged()(ngModelName, oldValue, controller.$modelValue);
                oldValue = controller.$modelValue;
            });

        }

    }

    public static Factory() {
        let directive = ($filter, $timeout, $window, $http, $q, $log) => {
            return new SelectorNgModelChangedComponent();
        };
        directive['$inject'] = [];
        return directive;
    }
}