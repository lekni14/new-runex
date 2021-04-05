#!/bin/bash
NAME=runexweb
docker stop $NAME;
docker rm -f $NAME;


docker run -itd \
 --name $NAME \
 --network=runex \
  -v ${PWD}:/usr/src/app \
  -v /usr/src/app/node_modules \
  -p 3001:80 \
registry.thinkdev.app/think/runex/runexweb:dev