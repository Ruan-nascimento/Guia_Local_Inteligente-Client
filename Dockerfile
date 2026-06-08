# ==========================================
# Estágio 1: Build da aplicação (Node)
# ==========================================
FROM node:20-alpine AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência primeiro (otimiza o cache do Docker)
COPY package.json package-lock.json* ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Faz o build de produção (gera a pasta 'dist')
RUN npm run build

# ==========================================
# Estágio 2: Servidor Web (Nginx)
# ==========================================
FROM nginx:alpine

# Remove as configurações padrão do Nginx
RUN rm -rf /etc/nginx/conf.d/*

# Copia a nossa configuração customizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos gerados no estágio de build
COPY --from=builder /app/dist /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]