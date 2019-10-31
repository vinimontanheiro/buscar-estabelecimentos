/**
 * Created by vcrzy on 25/01/16.
 */

(function () {

    /**
     * Dependências
     */
    angular.module('buscar-estabelecimentos',
        ['ui.router'
            , 'ngAnimate'
            , 'ngAria'
            , 'toaster'
            ,'angularSpinner'
            ,'ngJsonExportExcel'
            ,'ngDialog'
            , 'appServices'
            , 'formDirectives'
            ,'HomeController'
        ])
        .controller('AppController', AppController)
        .config(function ($stateProvider, $urlRouterProvider,usSpinnerConfigProvider) {

            usSpinnerConfigProvider.setDefaults({color: '#fafafa',radius: 10});
            $urlRouterProvider.otherwise("/");

            $stateProvider
                .state('home', {
                    url: "/",
                    templateUrl: "../index.html"
                });
        });

    AppController.$inject = [

    ];

    //Main controller
    function AppController() {

    }

})();