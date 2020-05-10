#!/usr/bin/env bash

###############################################################################
#
# Run Docker development environment
#
###############################################################################

# shellcheck disable=SC2034
script_name="$(basename -- "$0")"

# Colour Formats
# shellcheck disable=SC2034
bold="\033[1m"
# shellcheck disable=SC2034
green="\033[0;32m"
# shellcheck disable=SC2034
red="\033[91m"
# shellcheck disable=SC2034
no_color="\033[0m"


DOCKER_IMAGE_TAG="nichelia/nichelia.com:dev"
if [[ "$(docker images -q ${DOCKER_IMAGE_TAG} 2> /dev/null)" == "" ]]; then
  echo -e "${red}Custom docker image \"${DOCKER_IMAGE_TAG}\" not found.${no_color}"
  echo -e "${green}Building docker image: \"${DOCKER_IMAGE_TAG}\"...${no_color}"
  docker build -f ./development/docker/nichelia.dockerfile -t "${DOCKER_IMAGE_TAG}" ./nich-elia
fi

docker run --rm -it \
  --name nichelia-dev \
  -v "${PWD}/nich-elia/e2e":/usr/src/nichelia.com/nich-elia/e2e \
  -v "${PWD}/nich-elia/src":/usr/src/nichelia.com/nich-elia/src \
  -v "${PWD}/nich-elia/.editorconfig":/usr/src/nichelia.com/nich-elia/.editorconfig \
  -v "${PWD}/nich-elia/.gitignore":/usr/src/nichelia.com/nich-elia/.gitignore \
  -v "${PWD}/nich-elia/angular.json":/usr/src/nichelia.com/nich-elia/angular.json \
  -v "${PWD}/nich-elia/browserslist":/usr/src/nichelia.com/nich-elia/browserslist \
  -v "${PWD}/nich-elia/karma.conf.js":/usr/src/nichelia.com/nich-elia/karma.conf.js \
  -v "${PWD}/nich-elia/package-lock.json":/usr/src/nichelia.com/nich-elia/package-lock.json \
  -v "${PWD}/nich-elia/package.json":/usr/src/nichelia.com/nich-elia/package.json \
  -v "${PWD}/nich-elia/README.md":/usr/src/nichelia.com/nich-elia/README.md \
  -v "${PWD}/nich-elia/tsconfig.app.json":/usr/src/nichelia.com/nich-elia/tsconfig.app.json \
  -v "${PWD}/nich-elia/tsconfig.json":/usr/src/nichelia.com/nich-elia/tsconfig.json \
  -v "${PWD}/nich-elia/tsconfig.spec.json":/usr/src/nichelia.com/nich-elia/tsconfig.spec.json \
  -v "${PWD}/nich-elia/tslint.json":/usr/src/nichelia.com/nich-elia/tslint.json \
  -p 80:4200 \
  nichelia/nichelia.com:dev "$@"