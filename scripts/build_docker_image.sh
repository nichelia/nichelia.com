#!/usr/bin/env bash

###############################################################################
#
# Build a docker image.
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
  echo "    " "Script to build Docker image for python package."
  echo "    " "options:"
  echo "    " "  --dev, -d               Build a test image from current source code."
  echo "    " "  --test, -t              Build a test image from current source code."
  echo "    " "  --help, -h              Show this help message and exit."
}

_DEV=false
_TEST=false
while [[ $# -gt 0 ]]; do
  case $1 in
    -d|--dev)
      _DEV=true
      shift # past argument
      ;;
    -t|--test)
      _TEST=true
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

# shellcheck source=/dev/null
source "${_HELPER_SCRIPT_DIR}/docker_env.env"

build_docker_base_image()
{
  if [[ "$(docker images -q ${DOCKER_BASE_IMAGE_TAG} 2> /dev/null)" == "" ]]; then
    echo -e "${_RED}Docker image \"${DOCKER_BASE_IMAGE_TAG}\" not found.${_NO_COLOUR}"
    echo -e "${_GREEN}Building docker image: \"${DOCKER_BASE_IMAGE_TAG}\"...${_NO_COLOUR}"
    docker build -f ./deployment/docker/base.dockerfile -t "${DOCKER_BASE_IMAGE_TAG}" "${_PROJECT_DIR}"
  fi
}

if [[ ${_DEV} = true ]]; then
  echo -e "${_GREEN}Building dev docker image (${DOCKER_DEV_IMAGE_TAG})...${_NO_COLOUR}"
  build_docker_base_image
  docker build -f ./deployment/docker/dev.dockerfile -t "${DOCKER_DEV_IMAGE_TAG}" "${_PROJECT_DIR}"
elif [[ ${_TEST} = true ]]; then
  echo -e "${_GREEN}Building test docker image (${DOCKER_TEST_IMAGE_TAG})...${_NO_COLOUR}"
  build_docker_base_image
  docker build -f ./deployment/docker/prod.dockerfile -t "${DOCKER_TEST_IMAGE_TAG}" "${_PROJECT_DIR}"
else
  echo -e "${_GREEN}Building test docker image (${DOCKER_PROD_IMAGE_TAG})...${_NO_COLOUR}"
  build_docker_base_image
  _VERSION="0.0.1"
  cd "${_PROJECT_DIR}"
  _VERSION=$(npm version | grep ${_PROJECT_NAME} | sed 's/^.*[^0-9]\([0-9]*\.[0-9]*\.[0-9]*\).*$/\1/')
  cd -
  echo -e "${_GREEN}Using version ${_VERSION}${_NO_COLOUR}"
  docker build -f ./deployment/docker/prod.dockerfile -t "${DOCKER_PROD_IMAGE_TAG}:${_VERSION}" "${_PROJECT_DIR}"
fi
