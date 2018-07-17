FROM node:8.9.4-alpine

LABEL org.label-schema.build-date="2018-04-20T16:58:20Z"
LABEL org.label-schema.name = "an-todo-16022018 public"
LABEL org.label-schema.vendor = "Singularity"
LABEL org.label-schema.version = "0.1.0"

RUN apk update && apk add nodejs python gcc g++ make
RUN npm install npm@latest -g

RUN adduser -D -g 'webpack' webpack
RUN mkdir /webpack
RUN chown -R webpack:webpack /webpack

WORKDIR /webpack

COPY . /webpack
RUN npm install

VOLUME [ "/webpack"]

CMD npm run ${SETENVIRONMENT}