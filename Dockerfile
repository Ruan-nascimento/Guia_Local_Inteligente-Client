# --- Estágio Base ---
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

# --- Estágio de Desenvolvimento ---
FROM base AS dev
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# --- Estágio de Build ---
FROM base AS builder
COPY . .
RUN npm run build

# --- Estágio de Produção (Nginx) ---
FROM nginx:alpine AS prod
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
# Copia a configuração do Nginx para lidar com as rotas do React (SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]