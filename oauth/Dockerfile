FROM node:8.9.4-alpine

LABEL org.label-schema.build-date="2018-04-20T16:58:20Z"
LABEL org.label-schema.name = "an-todo-16022018 oauth"
LABEL org.label-schema.vendor = "Singularity"
LABEL org.label-schema.version = "0.1.0"

RUN npm install npm@latest -g

RUN adduser -D -g 'oauth' oauth
RUN mkdir /oauth
RUN chown -R oauth:oauth /oauth

WORKDIR /oauth

COPY . .
RUN npm install

VOLUME [ "/oauth" ]

CMD ["npm", "start"]
