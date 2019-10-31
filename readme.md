### Requer

- [NodeJS](https://nodejs.org/en/)

### Instalação das dependências do projeto
```
$ cd project
$ npm i bower -g
$ npm i && bower install
```

### Iniciando a aplicação (Google Maps por padrão usa https)
```
$ npm run start // se o seu servidor possui https por padrão
```
ou 
```
$ npm run start-https // se o seu servidor não possui um https, nos rodamos um para você sem certificados válidos 
```

### Características
- Busca estabelecimentos por palavra-chave, nome ou endereço para todas regiões
- Busca estabelecimentos por palavra-chave, nome ou endereço para cidades específicas
- Busca endereço em todas regiões, cidades ou proximidades
- Os detalhe dos resultados monstram todas as informações do estabelecimento

### Exemplos de buscas

![search-by-city-name](https://raw.githubusercontent.com/vmontanheiro/buscar-estabelecimentos/master/assets/images/1.png)

![search-detail](https://raw.githubusercontent.com/vmontanheiro/buscar-estabelecimentos/master/assets/images/2.png)

![search-map](https://raw.githubusercontent.com/vmontanheiro/buscar-estabelecimentos/master/assets/images/3.png)

