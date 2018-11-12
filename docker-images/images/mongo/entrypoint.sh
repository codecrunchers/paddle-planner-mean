#!/bin/bash
set -e
. ~/.bash_profile
PARAMETERS=`aws ssm get-parameters-by-path --path ${1} --with-decryption`

for row in $(echo ${PARAMETERS} | jq -c '.Parameters' | jq -c '.[]'); do
    KEY=$(basename $(echo ${row} | jq -c '.Name'))
    VALUE=$(echo ${row} | jq -c '.Value')

    KEY=`echo ${KEY} | tr -d '"'`
    VALUE=`echo ${VALUE} | tr -d '"'`

    export ${KEY}=${VALUE}
done
