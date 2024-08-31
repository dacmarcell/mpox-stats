# Use a imagem oficial do Node.js (slim)
FROM node:latest

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie apenas o package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências da aplicação
RUN npm ci

# Copie o restante do código-fonte para o diretório de trabalho
COPY . .

# Exponha a porta em que a API estará rodando (ajuste se necessário)
EXPOSE 3000

# Defina o comando para iniciar a aplicação
CMD [ "npm", "start" ]
