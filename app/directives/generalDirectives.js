'use strict';

angular.module("generalDirectives", [])

    /**
     * @desc Cria um componente com três botões estilo swipe button
     */
    .directive('coDelete', function () {
        return {
            restrict: "A",
            replace: true,
            template: '<span>'
            + '<button ng-hide="hideIt" type="button" class="btn {{actionClass}} btn-small" ng-click="initIt()"><i class="{{actionIcon}}"></i> {{actionText}}'
            + '</button>'
            + '<button  ng-show="hideIt" type="button" class="btn btn-default btn-small animate-shiny" ng-click="cancelIt()"> {{cancelText ? cancelText: "Cancelar"}}</button>'
            + '<button  ng-show="hideIt" type="button" class="btn btn-success btn-small animate-shiny" ng-click="confirmIt()"> {{confirmText ? confirmText: "Confirmar"}}</button>'
            + '</span>',
            scope: {
                confirm: '&onConfirm'
            },
            link: function (scope, element, attrs) {
                scope.actionText = attrs.actionText;        //@params String @description Nome do primeiro botão
                scope.actionClass = attrs.actionClass;      //@params String @description Classe do primeiro botão
                scope.actionIcon = attrs.actionIcon;        //@params String @description Icone do primeiro botão
                scope.confirmText = attrs.confirmText;      //@params String @description Nome do botão confirmar
                scope.cancelText = attrs.cancelText;        //@params String @description Nome do botão cancelar
            },
            controller: function ($scope) {
                $scope.hideIt = false;
                $scope.initIt = function () {
                    $scope.hideIt = true;
                };

                //Ação do botão cancelar
                $scope.cancelIt = function () {
                    $scope.hideIt = false;
                };
                //Ação do botão confirmar
                $scope.confirmIt = function () {
                    $scope.confirm();
                };

            }
        }
    })
    /*
     * @desc Cria um link para modal de imagens
     * @dependencies ngDialog
     */
    .directive('modalImageLink', ['ngDialog', function (ngDialog) {
        return {
            restrict: 'E',
            replace: true,
            template: '<a class="{{actionClass}}" title="Modal show"><i class="{{actionIcon}}"></i>{{actionText}}</a>',
            link: function (scope, element, attrs) {

                scope.actionText = attrs.actionText;        // @params String @desc Textp que vai aparecer como link
                scope.actionClass = attrs.actionClass;      // @params String @desc Classe do link
                scope.actionIcon = attrs.actionIcon;        // @params String @desc Icone do link
                scope.imageUrl = attrs.imageUrl;            // @params String @desc Url da imagem a ser apresentada

                element.on('click', function () {
                    ngDialog.open({
                        template: '<img width="100%"  ng-src="{{imageUrl}}"/>',
                        plain: true,
                        scope: scope,
                        controller: ['$scope', function ($scope) {
                            $scope.$watch('imageUrl', function () {
                                $scope.imageUrl = scope.imageUrl;
                            });

                        }]
                    })
                });
            }
        };
    }])

    /* uf-options
     * Options com todos os estados brasileiros
     * Ex: <select uf-options></select>
     * */
    .directive('ufOptions', function () {
        return {
            restrict: "A",
            link: function (scope, elem) {
                var ufs = [{uf: 'AC', value: 'Acre'},
                    {uf: 'AL', value: 'Alagoas'},
                    {uf: 'AP', value: 'Amapá'},
                    {uf: 'AM', value: 'Amazonas'},
                    {uf: 'BA', value: 'Bahia'},
                    {uf: 'CE', value: 'Ceará'},
                    {uf: 'DF', value: 'Distrito Federal'},
                    {uf: 'ES', value: 'Espirito Santo'},
                    {uf: 'GO', value: 'Goiás'},
                    {uf: 'MT', value: 'Mato Grosso'},
                    {uf: 'MS', value: 'Mato Grosso do Sul'},
                    {uf: 'MG', value: 'Minas Gerais'},
                    {uf: 'PA', value: 'Pará'},
                    {uf: 'PB', value: 'Paraíba'},
                    {uf: 'PR', value: 'Paraná'},
                    {uf: 'PE', value: 'Pernambuco'},
                    {uf: 'PI', value: 'Piauí'},
                    {uf: 'RJ', value: 'Rio de Janeiro'},
                    {uf: 'RN', value: 'Rio Grande do Norte'},
                    {uf: 'RS', value: 'Rio Grande do Sul'},
                    {uf: 'RO', value: 'Rondônia'},
                    {uf: 'RR', value: 'Roraima'},
                    {uf: 'SC', value: 'Santa Catarina'},
                    {uf: 'SP', value: 'São Paulo'},
                    {uf: 'SE', value: 'Sergipe'},
                    {uf: 'TO', value: 'Tocantins'}];

                var options = "";
                for (var i in ufs) {
                    options += "<option value='" + ufs[i].uf + "'>" + ufs[i].value + "</option>";
                }

                elem.append(options);

            }
        };
    })
/**
 * @desc Adiciona um botão de deslizar para cima.
 */
    .directive("goToTop", ["$interval", function ($interval) {
        return {
            restrict: 'E',
            templateUrl: 'templates/goToTop.html',
            replace: true,
            transclude: true,
            link: function (scope, element, attrs) {
                element.hide();
                jQuery(window).scroll(function () {
                    if (jQuery(this).scrollTop() > 100) {
                        element.fadeIn();
                    } else {
                        element.fadeOut();
                    }
                });
                element.click(function () {
                    jQuery('body,html').animate({scrollTop: 0}, 600);
                });
            }
        };
    }])
/**
 * @desc Adiciona container para desenho de chart
 */
    .directive("amcharts", ["$timeout", function ($timeout) {
        return {
            restrict: 'E',
            templateUrl: 'templates/amcharts.html',
            replace: true,
            scope: {
                altura: '=',
                data: '='
            },
            link: function (scope, element, attrs) {
                return $timeout(function () {
                    scope.chartId = attrs.id;

                    scope.$watch('data', function (value) {
                        if (angular.isDefined(value)) {
                            AmCharts.makeChart(scope.chartId, value);
                        }
                    });
                });
            }
        }
    }]).directive("colorpicker", ["$interval", function ($interval) {
        return {
            require: 'ngModel',
            restrict: 'E',
            templateUrl: 'templates/colorpicker.html',
            replace: true,
            transclude: true,
            link: function (scope, element, attrs) {
                $(element).colorselector();
            }
        }
    }]).directive("scrollbar", ["$interval", function ($interval) {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                $(element).addClass("scrollbar");
                $(element).perfectScrollbar({
                    suppressScrollX: true,
                    includePadding: true
                });
            }
        }
    }]).directive('icheck', ['$timeout', '$parse', function ($timeout, $parse) {
        return {
            require: 'ngModel',
            link: function ($scope, element, $attrs, ngModel) {
                return $timeout(function () {
                    var value;
                    value = $attrs['value'];

                    $scope.$watch($attrs['ngModel'], function (newValue) {
                        $(element).iCheck('update');
                    });

                    return $(element).iCheck({
                        checkboxClass: 'icheckbox_square',
                        radioClass: 'iradio_square'
                    }).on('ifChanged', function (event) {
                        if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
                            $scope.$apply(function () {
                                return ngModel.$setViewValue(event.target.checked);
                            });
                        }
                        if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
                            return $scope.$apply(function () {
                                return ngModel.$setViewValue(value);
                            });
                        }
                    });
                });
            }
        };
    }]) .directive('coLongpress',[function () {
        return {
            restrict: "A",
            scope: {
                callback : '&coLongpress'
            },
            link: function (scope, elem,$event) {

                var pressTimer = 0;

                $(elem).mouseup(function(){

                    clearTimeout(pressTimer);

                    return false;
                }).mousedown(function(){

                    pressTimer = window.setTimeout(function() {
                        scope.callback({$event:$event});
                    },400);

                    return false;
                });
            }
        };
    }]).directive('coRipple', function($timeout) {
    return {
        restrict: 'C',
        link: function(scope, element, attrs) {
            element.on('click', function(event) {
                event.preventDefault();

                var $div = angular.element('<div></div>'),
                    btnOffset = $(this).offset(),
                    xPos = event.pageX - btnOffset.left,
                    yPos = event.pageY - btnOffset.top;

                $div.addClass('ripple-effect');
                var $ripple = angular.element(".ripple-effect");

                $ripple.css("height", $(this).height());
                $ripple.css("width", $(this).height());
                $div.css({
                    top: yPos - ($ripple.height() / 2),
                    left: xPos - ($ripple.width() / 2),
                    background: $(this).data("ripple-color")
                })
                    .appendTo($(this));

                $timeout(function() {
                    $div.remove();
                }, 2000);
            });
        }
    }

});









