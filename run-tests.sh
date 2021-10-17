#!/bin/sh
set -x

export EMAIL="test@lorem.com"
export PASSWORD="Abcd@1234"
export ENVIRONMENT="STAGE"


/opt/testcafe/docker/testcafe-docker.sh $BROWSER --test-meta feature=$FEATURE