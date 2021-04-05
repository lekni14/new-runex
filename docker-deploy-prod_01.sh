#!/bin/bash
SERVER_IP=128.199.66.67
docker image build -t registry.thinkdev.app/think/runex/runexweb:prod -f Dockerfile.prod .

# docker push registry.thinkdev.app/think/runex/runexweb:dev;
# scp docker-run-uat.sh root@128.199.163.81:/root \
# && ssh root@128.199.163.81 "sudo sh docker-run-uat.sh && exit" \
docker save registry.thinkdev.app/think/runex/runexweb:prod > runexweb.tar \
&& scp runexweb.tar root@$SERVER_IP:/root \
&& scp docker-prod-run.sh root@$SERVER_IP:/root \
&& ssh root@$SERVER_IP "sudo docker load < runexweb.tar && sudo sh docker-uat-run.sh && exit" \
&& rm runexweb.tar