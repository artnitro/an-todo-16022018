#!/bin/sh

chown -R mongodb:mongodb /data
exec su-exec mongodb mongod --config /etc/mongod.conf --dbpath /data/db