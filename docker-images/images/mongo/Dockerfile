FROM mongo

ENV SECRET_PATH "/dev/paddle-planner/config/secrets/web"
ADD entrypoint.sh /

#AWS DEPS
RUN apt update && \
  apt -y upgrade && \
  apt-get -y install curl python2.7-dev autoconf automake build-essential libtool jq && \
  /usr/bin/curl -O https://bootstrap.pypa.io/get-pip.py && \
  python2.7 get-pip.py --user && \
  echo "export PATH=~/.local/bin:$PATH" > "/root/.bash_profile" && \
  /root/.local/bin/pip install awscli --upgrade --user && \
  rm -f /get-pip.py && \
  echo "/usr/local/bin/docker-entrypoint.sh mongod" >> /entrypoint.sh


ADD databaseInit/mongo-paddle-planner/ /docker-entrypoint-initdb.d
ENTRYPOINT . /entrypoint.sh $SECRET_PATH && /usr/local/bin/docker-entrypoint.sh mongod


