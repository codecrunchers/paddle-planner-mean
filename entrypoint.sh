#!/bin/bash
set -e
. ~/.bash_profile
PARAMETERS=`/root/.local/bin/aws --region us-west-1 ssm get-parameters-by-path --path ${SECRET_PATH} --with-decryption`

for row in $(echo ${PARAMETERS} | jq -c '.Parameters' | jq -c '.[]'); do
    KEY=$(basename $(echo ${row} | jq -c '.Name'))
    VALUE=$(echo ${row} | jq -c '.Value')

    KEY=`echo ${KEY} | tr -d '"'`
    VALUE=`echo ${VALUE} | tr -d '"'`

    export ${KEY}=${VALUE}
done

