FROM nginx

WORKDIR /usr/share/nginx/html/
USER root

# 生产阶段
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist /usr/share/nginx/html
#EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]