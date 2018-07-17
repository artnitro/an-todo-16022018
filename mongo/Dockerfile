FROM  alpine:3.7

LABEL org.label-schema.build-date="2018-04-20T16:58:20Z"
LABEL org.label-schema.name = "an-todo-16022018 MONGO"
LABEL org.label-schema.vendor = "Singularity"
LABEL org.label-schema.version = "0.1.0"

ENV TIMEZONE Europe/Paris

RUN apk add --no-cache mongodb su-exec
RUN mkdir -p /data/db

RUN chown -R mongodb:mongodb /data

COPY ./start.sh ./start.sh
COPY ./mongod.conf /etc/mongod.conf
COPY ./mongodb.pem /etc/ssl/mongodb.pem
RUN chmod +x ./start.sh

VOLUME ["/data/db"]

CMD ["./start.sh"]

