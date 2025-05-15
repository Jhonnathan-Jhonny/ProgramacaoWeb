FROM node:16

WORKDIR /usr/src/app

# 1. Copia os arquivos de dependência
COPY package*.json ./
RUN npm install

# 2. Copia APENAS a pasta public primeiro
COPY public /usr/src/app/public

# 3. Verifica a cópia
RUN ls -la /usr/src/app/public

# 4. Copia o restante
COPY . .

EXPOSE 3000
CMD ["npm", "start"]