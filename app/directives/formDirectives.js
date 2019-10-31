"use strict";


angular.module("formDirectives", [])
    /**
     * @desc Máscara para moeda
     * @dependencies Jquery price format
     * @link http://jquerypriceformat.com/
     */
    .directive('coMoeda', ['$filter', function ($filter) {

        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                if (!ctrl) return;

                //metodo que formata o valor quando é alterado via controller
                ctrl.$formatters.unshift(function (a) {
                    elem[0].value = ctrl.$modelValue
                    elem.priceFormat({
                        prefix: '',
                        centsSeparator: ',',
                        thousandsSeparator: '.'
                    });
                    return elem[0].value;
                });

                //Metodo que formata o valor quando é alterado via html
                ctrl.$parsers.unshift(function (viewValue) {
                    elem.priceFormat({
                        prefix: '',
                        centsSeparator: ',',
                        thousandsSeparator: '.'
                    });
                    return elem[0].value;
                });

                //Metodo que seta o valor no model
                ctrl.$parsers.push(function (valueFromInput) {
                    console.log(valueFromInput);
                    return parseFloat(valueFromInput.replace(/\.+/g, "").replace(/\,/, '.'));
                });
            }
        };
    }])
/** mask
 * Ex: <input type='text' mask='9999-9999' placeholder='Telefone'>
 * 9: Qualquer numero;
 * A: Qualquer letra;
 * *: Qualquer numero e letra;
 *
 * @mask : options{
     * 	cep: 99999-999;
     * 	ddd:telefone : (99) 9999-9999;
     *  ddd: (99);
     *  telefone: 9999-9999;
     *  cpf: 999.999.999-99;
     *  cnpj: 99.999.999/9999-99;
     *
     * */
    .directive('mask', function () {
        return {
            restrict: "A",
            link: function (scope, elem, attr, ctrl) {
                if (attr.mask) {
                    var mask = "";
                    switch (attr.mask) {
                        case 'cep':
                            mask = "99999-999";
                            break;
                        case 'ddd:telefone':
                            mask = "(99) 9999-9999";
                            break;
                        case 'ddd':
                            mask = "(99)";
                            break;
                        case 'telefone':
                            mask = "9999-9999";
                            break;
                        case 'cpf':
                            mask = "999.999.999-99";
                            break;
                        case 'cnpj':
                            mask = "99.999.999/9999-99";
                            break;
                        default:
                            mask = attr.mask;
                    }
                    elem.mask(mask, {placeholder: attr.maskPlaceholder});
                }
            }
        };
    })

/** mask-money
 * Ex: <input type='text' mask-money>
 *  money@params: prefix,suffix,affixesStay,thousands,decimal,precision,allowZero,allowNegative;
 *    Ex: <input mask-money="R$" money-prefix="R$" money-thousands=".">
 * */
    .directive('maskMoney', function () {
        return {
            restrict: "A",
            link: function (scope, elem, attr) {
                elem.maskMoney({
                    prefix: attr.moneyPrefix ? attr.moneyPrefix : (attr.maskMoney ? attr.maskMoney : "R$ "),
                    suffix: attr.moneySuffix,
                    affixesStay: attr.moneyAffixesStay,
                    thousands: attr.moneyThousands ? attr.moneyThousands : ".",
                    decimal: attr.moneyDecimal ? attr.moneyDecimal : ",",
                    precision: attr.moneyPrecision,
                    allowZero: attr.moneyAllowZero,
                    allowNegative: attr.moneyAllowNegative
                });
            }
        };
    })

/**
 * @dependencies Requer um ng-model setado no elemento
 * @desc campo que estiver esse parametro aceitara somente numeros
 * */
    .directive('number', function () {
        return {
            require: '?ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                if (!ngModelCtrl) {
                    return;
                }

                ngModelCtrl.$parsers.push(function (val) {
                    if (angular.isUndefined(val)) {
                        var val = '';
                    }
                    var clean = val.replace(/[^0-9]+/g, '');
                    if (val !== clean) {
                        ngModelCtrl.$setViewValue(clean);
                        ngModelCtrl.$render();
                    }
                    return clean;
                });

                element.bind('keypress', function (event) {
                    if (event.keyCode === 32) {
                        event.preventDefault();
                    }
                });
            }
        };
    })
/**
 * @desc máscara e válidação para coordenadas
 */
    .directive('coordenada', ['$filter', function ($filter) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {

                if (!ctrl) return;

                ctrl.$formatters.unshift(function (a) {
                    elem[0].value = ctrl.$modelValue;
                    elem.priceFormat({
                        prefix: '',
                        allowNegative: true,
                        thousandsSeparator: '',
                        limit: 17,
                        centsLimit: 15
                    });
                    return elem[0].value;
                });
                //metodo que formata o valor quando é alterado via controller

                //Metodo que formata o valor quando é alterado via html
                ctrl.$parsers.unshift(function (viewValue) {
                    elem.priceFormat({
                        prefix: '',
                        allowNegative: true,
                        thousandsSeparator: '',
                        limit: 17,
                        centsLimit: 15
                    });
                    return elem[0].value;
                });

                //Metodo que seta o valor no model
                ctrl.$parsers.push(function (valueFromInput) {
                    var coord = valueFromInput.toString();
                    if ((coord != undefined && coord != null && coord.length > 0) && coord.search("-") === -1) {
                        coord = "-" + coord;
                    }
                    return coord;
                });
            }
        };
    }]).directive('ngPlaceholder', function($document) {
    return {
        restrict: 'A',
        scope: {
            placeholder: '=ngPlaceholder'
        },
        link: function(scope, elem, attr) {
            scope.$watch('placeholder',function() {
                elem[0].placeholder = scope.placeholder;
            });
        }
    }
});

