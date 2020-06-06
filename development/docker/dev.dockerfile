FROM node:13.13.0-alpine

MAINTAINER Nicholas Elia <me@nichelia.com>

# Environment variables
ENV REFRESHED_AT 2020-04-19
ENV DEV_DIR="/usr/src"
ENV APP_DIR="${DEV_DIR}/nichelia.com/nich-elia/"

# Set working directory
RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

# Copy needed files
COPY . $APP_DIR

# Install dependencies
RUN apk add --no-cache \
  bash \
  git \
  vim
RUN npm install -g @angular/cli@9.1.5

# Init project
RUN cd $APP_DIR && \
    npm install

ENTRYPOINT ["/bin/bash", "-c", "echo $'\n\t N I C H E L I A  D E V \n' && sleep 5 && npm install && ng update && exec $@"]
CMD ["/bin/bash", "-c", "ng serve --live-reload --watch --progress --verbose --host 0.0.0.0"]