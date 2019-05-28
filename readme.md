# VUTTR

Very Useful Tools to Remember (VUTTR). API desenvolvida como [Desafio](https://www.notion.so/Back-end-0b2c45f1a00e4a849eefe3b1d57f23c6) proposto para a BossaBox.

## Utilização
```bash
git clone https://github.com/luizhfraraujo/vuttr.git
yarn install 
yarn dev or yarn start
yarn test
```

Este projeto conta com o arquivo insomnia_vuttr.json, que é um arquivo com as chamadas rest para serem utilizadas no [Insomnia](https://insomnia.rest/download/). Você pode importar o arquivo na seta para baixo ao lado do nome do Workspace e ir em Import/Export.

## Documentação

O VUTTR utiliza o padrão API Blueprint para documentação da API. A documentação se encontrada gerada no arquivo vuttr.html. Caso necessite alterar o arquivo vuttr.apib e gerar um novo vuttr.html, instale o aglio (npm install -g aglio) e execute o comando:
```bash
aglio -i vuttr.apib -o vuttr.html
```

