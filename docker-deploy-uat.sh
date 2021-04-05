#!/bin/bash
docker image build -t registry.thinkdev.app/think/runex/runexweb:dev -f Dockerfile.uat .

# docker push registry.thinkdev.app/think/runex/runexweb:dev;
# scp docker-run-uat.sh root@128.199.163.81:/root \
# && ssh root@128.199.163.81 "sudo sh docker-run-uat.sh && exit" \
docker save registry.thinkdev.app/think/runex/runexweb:dev > runexweb.tar \
&& scp runexweb.tar root@128.199.163.81:/root \
&& scp docker-uat-run.sh root@128.199.163.81:/root \
&& ssh root@128.199.163.81 "sudo docker load < runexweb.tar && sudo sh docker-uat-run.sh && exit" \
&& rm runexweb.tar


# scp docker-run-on-cloud.sh ols-user@203.150.107.41:/home/ols-user \
# && ssh ols-user@203.150.107.41 "sudo docker load < kp-callsceen-note-dev.tar && sudo sh docker-run-on-cloud.sh && exit" \