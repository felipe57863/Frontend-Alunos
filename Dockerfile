# Etapa 1 - build do Angular
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npx ng build --configuration production

# Etapa 2 - servir os arquivos estaticos com nginx
FROM nginx:alpine
COPY --from=build /app/dist/AGRUPA/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
