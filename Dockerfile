FROM nginx
COPY ./dist /usr/share/nginx/html/testpipeline
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80