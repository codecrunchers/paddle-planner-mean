FROM node:8

WORKDIR /usr/src/app

ENV SECRET_PATH "/dev/paddle-planner/config/secrets/web"
RUN apt update && \
  apt -y upgrade && \
  apt-get -y install python2.7-dev autoconf automake build-essential libtool jq && \
  curl -O https://bootstrap.pypa.io/get-pip.py && \
  python get-pip.py --user && \
  echo "export PATH=~/.local/bin:$PATH" > "/root/.bash_profile" && \
  /root/.local/bin/pip install awscli --upgrade --user && \
  rm -f /get-pip.py 

ADD entrypoint.sh /
ADD . /usr/src/app

RUN yarn 
RUN yarn build

EXPOSE 4040

ENTRYPOINT . /entrypoint.sh && yarn serve

