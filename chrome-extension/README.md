# Extensao de Navegador

## Objetivo

Informar as pessoas estatisticas sobre a variola dos macacos

## Como vai funcionar?

Scrapping vai acessar o [site](https://www.gov.br/saude/pt-br/composicao/svsa/coes/monkeypox/atualizacao-dos-casos) do gov, baixar o pdf caso haja uma edicao maior que a ultima baixada. apos isso, vai ler o pdf e mostrar ao usuario.

Scrapping em Python pega os dados e le o pdf. Envia via RabbitMQ para api em rust. Essa api guarda as informacoes em banco. Quando o client side precisar, ele pede pra api.
