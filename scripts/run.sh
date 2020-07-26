#!/usr/bin/env bash

###############################################################################
#
# Run project environment (node, npm, angular, docker).
#
###############################################################################

# shellcheck disable=SC2034
_SCRIPT_NAME="$(basename -- "$0")"

# Colour Formats
# shellcheck disable=SC2034
_BOLD="\033[1m"
# shellcheck disable=SC2034
_GREEN="\033[0;32m"
# shellcheck disable=SC2034
_RED="\033[91m"
# shellcheck disable=SC2034
_NO_COLOUR="\033[0m"

usage()
{
  echo -e "${_BOLD}${_GREEN}${_SCRIPT_NAME}:${_NO_COLOUR}"
  echo "    " "Script to setup environment for project (node, npm, angular)."
  echo "    " "options:"
  echo "    " "  --docker, -d            Run environment in docker container."
  echo "    " "  --prod, -p              Run production environment."
  echo "    " "  --help, -h              Show this help message and exit."
}

_DOCKER=false
_PROD=false
while [[ $# -gt 0 ]]; do
  case $1 in
    -d|--docker)
      _DOCKER=true
      shift # past argument
      ;;
    -p|--prod)
      _PROD=true
      shift # past argument
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      >&2 echo "error: '$1' not a recognized argument/option"
      >&2 usage
      exit 1
      ;;
  esac
done

# Get the directory the script is running in
_SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
_HELPER_SCRIPT_DIR="${_SCRIPT_DIR}/helpers"
_PROJECT_NAME="nichelia"
_PROJECT_DIR="$(dirname "$_SCRIPT_DIR")/${_PROJECT_NAME}"

run_local_dev_env()
{
  echo -e "${_BOLD}Running environment locally. Go to localhost:4200.${_NO_COLOUR}"
  cd "${_PROJECT_DIR}"
  ng serve --live-reload --watch --progress --verbose --host 0.0.0.0
}

run_local_prod_env()
{
  echo -e "${_BOLD}Running environment locally. Go to localhost:8080.${_NO_COLOUR}"
  cd "${_PROJECT_DIR}"
  node server.js
}

run_docker_dev_env()
{
  if [[ "$(docker images -q ${DOCKER_DEV_IMAGE_TAG} 2> /dev/null)" == "" ]]; then
    echo -e "${_RED}Docker image \"${DOCKER_DEV_IMAGE_TAG}\" not found. Aborting.${_NO_COLOUR}"
    exit 0
  fi

  echo -e "${_BOLD}Running environment in docker container. Go to localhost:4200.${_NO_COLOUR}"
  docker volume create ${DOCKER_DEV_VOLUME}
  docker run --rm -it \
    --name "${DOCKER_DEV_CONTAINER_NAME}" \
    -v "${PWD}/${_PROJECT_NAME}":"/usr/src/nichelia/${_PROJECT_NAME}/" \
    -v "${DOCKER_DEV_VOLUME}":"/usr/src/nichelia/${_PROJECT_NAME}/node_modules" \
    -p 4200:4200 \
    "${DOCKER_DEV_IMAGE_TAG}" "$@"
}

run_docker_prod_env()
{
  _VERSION="0.0.1"
  cd "${_PROJECT_DIR}"
  _VERSION=$(npm version | grep ${_PROJECT_NAME} | sed 's/^.*[^0-9]\([0-9]*\.[0-9]*\.[0-9]*\).*$/\1/')
  cd -

  if [[ "$(docker images -q ${DOCKER_PROD_IMAGE_TAG}:${_VERSION} 2> /dev/null)" == "" ]]; then
    echo -e "${_RED}Docker image \"${DOCKER_PROD_IMAGE_TAG}:${_VERSION}\" not found. Aborting.${_NO_COLOUR}"
    exit 0
  fi

  echo -e "${_BOLD}Running environment in docker container. Go to localhost:8080.${_NO_COLOUR}"
  docker run --rm -it \
    --name "${DOCKER_PROD_CONTAINER_NAME}" \
    -p 8080:8080 \
    "${DOCKER_PROD_IMAGE_TAG}:${_VERSION}"
}

run_environment()
{
  if [[ ${_DOCKER} = true ]]; then
    # shellcheck source=/dev/null
    source "${_HELPER_SCRIPT_DIR}/docker_env.env"

    if [[ ${_PROD} = true ]]; then
      run_docker_prod_env
    else
      run_docker_dev_env
    fi
  else
    if [[ ${_PROD} = true ]]; then
      run_local_prod_env
    else
      run_local_dev_env
    fi
  fi
}

run_environment
