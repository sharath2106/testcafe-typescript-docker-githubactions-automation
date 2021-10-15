#!/bin/sh
set -x

export EMAIL="test@lorem.com"
export PASSWORD="Abcd@1234"

/opt/testcafe/docker/testcafe-docker.sh $BROWSER