"use strict";

/**
 *  Service para definição de campos multivalorados e concatenação de campos com labelFunction.
 */
angular.module("appServices", [])
    .service('Util', function () {
        var methods = {};
        methods.formatarCoordenadas = formatarCoordenadas;
        methods.adicionaMenos = adicionaMenos;
        methods.isEmpty = isEmpty;
        methods.animate = animate;

        return {
            fn: methods
        };

        /**
         * @desc Formata coordenadas SEM máscaras
         * @params String coordenada
         */
        function formatarCoordenadas(cord) {
            if (cord != undefined && cord != null && cord.length > 0) {
                cord = cord.replace(/[a-zA-Z.,]+/, "");
                cord = cord.replace(/^([0-9]{2})([0-9]+)$/, "-$1.$2");
            }
            return cord;
        };

        /**
         * @desc Verifica se possui sinal negativo na coordenada, se não, ele adiciona.
         * @params String coordenada
         */
        function adicionaMenos(str) {
            var cord = str.toString();
            if ((cord != undefined && cord != null && cord.length > 0) && cord.search("-") === -1) {
                cord = "-" + cord;
            }
            return cord;
        };

        /**
         * @desc Valida campos vazios
         * @param objeto,array
         * @returns {boolean}
         */
        function isEmpty(obj, arr) {
            if (arr != null && arr != undefined && obj != null) {
                for (var i = 0; i < arr.length; i++) {
                    if (obj.hasOwnProperty(arr[i])) {
                        if ((obj[arr[i]]).toString() == "" || obj[arr[i]] == undefined || obj[arr[i]].length == 0) {
                            return true;
                        }
                    } else {
                        return true;
                    }
                }
            }
            return false;
        };


        function animate(el, params, delay, callback) {
            el.animate(params, delay, function () {
                if (callback) {
                    callback();
                }
            });
        };

    }) .service('DialogService', ['$mdDialog', function ($mdDialog) {

    this.confirm = function(event,url,model) {
        var current = angular.copy($mdDialog);

        return current.show({
            parent:angular.element(document.body),
            targetEvent: event,
            templateUrl: url,

            clickOutsideToClose:true,
            animate: 'full-screen-dialog',
            locals:{
                model : model
            },
            controller: function DialogController($scope, $mdDialog) {
                $scope.model = model;
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
                $scope.confirm = function() {
                    $mdDialog.hide($scope.model);
                };
            }
        });
    };

}]).service('MessageService', ['toaster', function (toaster) {

    this.addError = function (message) {
        return toaster.pop("error", message);
    };

    this.addInfo = function (message) {
        return toaster.pop("info", message);
    };

    this.addSuccess = function (message) {
        return toaster.pop("success", message);
    };

}]).service('SocketService', ['$http', function ($http) {
    var client;
    this.connect = function connect() {
        client = io.connect('https://localhost:3000');
        return client;
    };

    this.disconnect = function disconnect() {
        if (client) {
            client.disconnect();
        }
    };
}]).service('ApiService', ['$http', function ($http) {
    var self = this;

    self.query = function (url) {
        return $http.get(url);
    };

    self.findBy = function (url, id) {
        return $http.get(url + id);
    };

    self.save = function (url, obj) {
        return $http.post(url, obj);
    };

    self.update = function (url, obj) {
        return $http.put(url, obj);
    };

    self.remove = function (url, id) {
        return $http.delete(url + id);
    };

    return self;
}]).service('Enum',function () {
    var self = this;

    //SituacaoProduto
    //========================================================
    var StatusProduto = function(valor, descricao) {
        this.valor = valor;
        this.descricao = descricao;

        StatusProduto.values.push(this);
    };
    StatusProduto.values = [];
    StatusProduto.INATIVO = new StatusProduto(0, 'INATIVO');
    StatusProduto.ATIVO = new StatusProduto(1, 'ATIVO');
    StatusProduto.VENDIDO = new StatusProduto(2, 'VENDIDO');
    StatusProduto.EXCLUIDO = new StatusProduto(3, 'EXCLUIDO');
    StatusProduto.FORADESTOQUE = new StatusProduto(4, 'FORA DE ESTOQUE');
    self.StatusProduto = StatusProduto;


    //TipoProduto
    //========================================================
    var TipoProduto = function(valor, descricao) {
        this.valor = valor;
        this.descricao = descricao;

        TipoProduto.values.push(this);
    };
    TipoProduto.values = [];
    TipoProduto.COMPRADO = new TipoProduto(0, 'COMPRADO');
    TipoProduto.PRODUZIDO = new TipoProduto(1, 'PRODUZIDO');
    self.TipoProduto = TipoProduto;


    //UnidadeMedida
    //========================================================
    var UnidadeMedida = function(valor, descricao) {
        this.valor = valor;
        this.descricao = descricao;

        UnidadeMedida.values.push(this);
    };
    UnidadeMedida.values = [];
    UnidadeMedida.COMPRADO = new UnidadeMedida(0, 'UNIDADE');
    UnidadeMedida.PRODUZIDO = new UnidadeMedida(1, 'PEÇA');
    UnidadeMedida.PRODUZIDO = new UnidadeMedida(2, 'CAIXA');
    UnidadeMedida.PRODUZIDO = new UnidadeMedida(3, 'CONJUNTO');
    UnidadeMedida.PRODUZIDO = new UnidadeMedida(4, 'PACOTE');
    UnidadeMedida.PRODUZIDO = new UnidadeMedida(5, 'ROLO');
    UnidadeMedida.PRODUZIDO = new UnidadeMedida(6, 'PAR');
    UnidadeMedida.PRODUZIDO = new UnidadeMedida(7, 'METRO');
    self.UnidadeMedida = UnidadeMedida;

    //TipoMovimentacao
    //========================================================
    var TipoMovimentacao = function(valor, descricao) {
        this.valor = valor;
        this.descricao = descricao;

        TipoMovimentacao.values.push(this);
    };
    TipoMovimentacao.values = [];
    TipoMovimentacao.ENTRADA = new TipoMovimentacao(0, 'ENTRADA');
    TipoMovimentacao.SAIDA = new TipoMovimentacao(1, 'SAIDA');
    self.TipoMovimentacao = TipoMovimentacao;



    //SituacaoVenda
    //========================================================
    var SituacaoVenda = function(valor, descricao) {
        this.valor = valor;
        this.descricao = descricao;

        SituacaoVenda.values.push(this);
    };
    SituacaoVenda.values = [];
    SituacaoVenda.ABERTA = new SituacaoVenda(0, 'ABERTA');
    SituacaoVenda.LIQUIDADA = new SituacaoVenda(1, 'LIQUIDADA');
    SituacaoVenda.CANCELADA = new SituacaoVenda(2, 'CANCELADA');
    SituacaoVenda.BLOQUEADA = new SituacaoVenda(3, 'BLOQUEADA');
    self.SituacaoVenda = SituacaoVenda;

    return self;

}).service('ComponentsServices', [function () {

    this.SelectionManager = function SelectionManager(elementSelector,btnSelector){
        var self = this;
        self.btn = btnSelector;
        self.element = elementSelector;
        self.selectedList = [];
        self.isDeleteMode = false;
        self.isEditMode = false;
        var danger = 'alert-danger';
        var warn = 'alert-warning';
        var btnAccent = 'md-accent';
        var btnWarn = 'md-warn';

        self.clear = function clear() {
            var component = $('.' + self.element);
            component.removeClass(danger);
            component.removeClass(warn);
            self.selectedList = [];
            self.resetStatus();
        };

        self.resetStatus = function resetStatus(){
            if($('.' + danger).length <= 0){
                $('.' + self.btn + ' ng-md-icon').removeClass("rotate135").addClass("reset");
                $('.' + self.btn).removeClass(btnWarn).addClass(btnAccent);
                self.isDeleteMode = false;
            }else{
                self.isDeleteMode = true;
            }

            if($('.' + warn).length <= 0){
                self.isEditMode = false;
            }else{
                self.isEditMode = true;
            }
        };

        self.select = function (model, event) {
            var target = $(event.$$element).children();

            if (target.hasClass(danger)) {
                target.removeClass(danger);

                var x;
                for (x in self.selectedList) {
                    if(self.selectedList[x]._id == model._id){
                        delete self.selectedList[x];
                    }
                }
                self.resetStatus();
            } else {
                target.addClass(danger);
                self.selectedList.push(model);
                $('.' + self.btn + ' ng-md-icon').addClass("rotate135");
                $('.' + self.btn).removeClass(btnAccent).addClass(btnWarn);
                self.isDeleteMode = true;
            }

            $('.' + self.element).removeClass(warn);
        };

        self.edit = function (model, event) {
            var target = $(event.currentTarget).children();

            if (target.hasClass(warn)) {
                self.isEditMode = false;
                return target.removeClass(warn);
            } else {
                $('.' + self.element).removeClass(warn);
                target.addClass(warn);
                $('.' + self.element).removeClass(danger);
                self.isEditMode = true;
            }

            $('.' + self.element).removeClass(danger);
            self.resetStatus();

            self.selectedList = [];
        };

        self.getSelectedList = function(){
            return self.selectedList;
        };

        self.getIsDeleteMode = function(){
            return self.isDeleteMode;
        };

        self.getIsEditMode = function(){
            return self.isEditMode;
        };
    }


}]).service('UploadService', ['$timeout','$upload', function ($timeout,$upload) {
    var self = this;

    self.upload = [];
    self.uploadResult = [];
    self.dataUrls = [];
    self.selectedFiles = [];
    self.uploadRightAway = false;
    self.modalUrl = '';
    self.completed = false;

    self.changeAngularVersion = function () {
        window.location.hash = self.angularVersion;
        window.location.reload(true);
    };
    self.hasUploader = function (index) {
        return self.upload[index] != null;
    };
    self.abort = function (index) {
        self.upload[index].abort();
        self.upload[index] = null;
    };

    self.angularVersion = window.location.hash.length > 1 ? window.location.hash.substring(1) : '1.4.7';
    self.onFileSelect = function ($files) {

        self.progress = [];
        if (self.upload && self.upload.length > 0) {
            for (var i = 0; i < self.upload.length; i++) {
                if (self.upload[i] != null) {
                    self.upload[i].abort();
                }
            }
        }

        self.selectedFiles = $files;

        self.setPreview = setPreview;

        function setPreview(fileReader, index) {
            fileReader.onload = function (e) {
                $timeout(function () {
                    self.dataUrls[index] = e.target.result;
                });
            }
        }

        for (var i = 0; i < $files.length; i++) {
            var $file = $files[i];
            if (window.FileReader && $file.type.indexOf('image') > -1) {
                var fileReader = new FileReader();
                fileReader.readAsDataURL($files[i]);
                self.setPreview(fileReader, i);
            }
            self.progress[i] = -1;
            if (self.uploadRightAway) {
                self.start(i);
            }
        }
    };

    self.start = function (index,produtoId,url) {

        self.progress[index] = 0;
        self.upload[index] = $upload.upload({
            url: url,
            headers: {'Authorization': 'xxx'},
            data: {
                productId: produtoId,
                principal: false,
                slideshow : false
            },
            file: self.selectedFiles[index],
            fileFormDataName: 'myFile'
        }).then(function (response) {
            self.item=response.data;
            self.uploadResult.push(response.data.result);
            self.completed = true;
            return true;

        }, null, function (evt) {
            self.progress[index] = parseInt(100.0 * evt.loaded / evt.total);
            self.completed = false;
            return false;
        });
    };

    return self;

}]);
