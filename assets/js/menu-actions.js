/**
 * Created by Vini on 13/12/15.
 */

(function Navigation(){

    var containers = ['#main-container'];
    var views = [];

    views.push({
        id : 0,
        name : 'cadastrar',
        url:'http://localhost:9000/cadastrar.html'
    },{
        id : 1,
        name : 'contato',
        url:'http://localhost:9000/contato.html'
    });

    $('.target').click(function(e){
        var id = parseInt($(this).attr('data-id'));
        if(typeof id == 'number'){
            stepAround(views[id]);
        }

    });

    function stepAround(view){
        switch(view.id) {
            case 0:
                var callback = function entrar(){
                };
                loadPage(containers[0],view.url,callback);
                break;
            case 1:
                var callback = function cadastrar(){
                };
                loadPage(containers[0],view.url,callback);
                break;
            case 2:
                var callback = function contato(){
                };
                loadPage(containers[0],view.url,callback);
                break;
            default:
                location.href = "/";
        }
    }

    function loadPage(container,url,callback){
        return $.get(url).success(function(context){
            if(typeof callback == "function"){
                callback();
            }
            $(container).html(context);
            return true;
        }).error(function(err){
            if(err){
                return false;
            }
        });
    }

})();