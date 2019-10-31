var Enums = {};


//SituacaoProduto
//========================================================
var SituacaoProduto = function(valor, descricao) {
	this.valor = valor;
	this.descricao = descricao;
	
	SituacaoProduto.values.push(this);
};
SituacaoProduto.values = [];
SituacaoProduto.ATIVO = new SituacaoProduto(0, 'ATIVO');
SituacaoProduto.INATIVO = new SituacaoProduto(1, 'INATIVO');
Enums.SituacaoProduto = SituacaoProduto; 


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
Enums.TipoProduto = TipoProduto;


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
Enums.UnidadeMedida = UnidadeMedida;



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
Enums.TipoMovimentacao = TipoMovimentacao;



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
Enums.SituacaoVenda = SituacaoVenda;


