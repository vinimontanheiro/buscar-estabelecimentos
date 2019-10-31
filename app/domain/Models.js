
var Model = {};

//Produto
//======================================
Model.Produto = function Produto(){
	this.situacaoProduto 	= true; //Enums.SituacaoProduto.ATIVO
	this.nome       		= "";
	this.descricao  		= "";
	this.estoque    		= 0;
	this.preco     			= 0;
	this.categoria			= 0;
	this.dataCriacao 		= new Date();
	this.ultimaAtualizacao 	= new Date();
	this.tipoProduto		= 0;
    this.unidadeMedida		= 0;
};


//Venda
//======================================
Model.Venda = function Venda(){
	
};