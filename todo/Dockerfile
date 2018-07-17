FROM nginx:alpine

LABEL org.label-schema.build-date="2018-04-20T16:58:20Z"
LABEL org.label-schema.name = "an-todo-16022018 todo"
LABEL org.label-schema.vendor = "Singularity"
LABEL org.label-schema.version = "0.1.0"

RUN adduser -D -g 'www' www
RUN mkdir /www
RUN chown -R www:www /usr/share/nginx
RUN chown -R www:www /www

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./certs/. /etc/nginx/.
