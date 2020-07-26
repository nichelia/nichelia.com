#!/usr/bin/env bash

###############################################################################
#
# Cleanup any environment setup, docker images/containers/volumes.
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
  echo "    " "Script to cleanup for project."
  echo "    " "options:"
  echo "    " "  --docker, -d            Include dleanup for docker."
  echo "    " "  --help, -h              Show this help message and exit."
}

_DOCKER=false
while [[ $# -gt 0 ]]; do
  case $1 in
    -d|--docker)
      _DOCKER=true
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
_HELPER_SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
_SCRIPT_DIR="$(dirname "$_HELPER_SCRIPT_DIR")"
_PROJECT_NAME="nichelia"
_PROJECT_DIR="$(dirname "$_SCRIPT_DIR")/${_PROJECT_NAME}"

stop_and_remove_docker_containers()
{
  echo -e "${_GREEN}Stopping docker containers...${_NO_COLOUR}"
  docker stop ${DOCKER_BASE_CONTAINER_NAME} ${DOCKER_DEV_CONTAINER_NAME} ${DOCKER_TEST_CONTAINER_NAME} ${DOCKER_PROD_CONTAINER_NAME}
  echo -e "${_GREEN}Removing docker containers...${_NO_COLOUR}"
  docker rm ${DOCKER_BASE_CONTAINER_NAME} ${DOCKER_DEV_CONTAINER_NAME} ${DOCKER_TEST_CONTAINER_NAME} ${DOCKER_PROD_CONTAINER_NAME}
}

remove_docker_images()
{
  echo -e "${_GREEN}Removing docker images...${_NO_COLOUR}"
  docker rmi ${DOCKER_BASE_IMAGE_TAG} ${DOCKER_DEV_IMAGE_TAG} ${DOCKER_TEST_IMAGE_TAG} ${DOCKER_PROD_IMAGE_TAG}
}

remove_docker_volumes()
{
  echo -e "${_GREEN}Removing docker volumes...${_NO_COLOUR}"
  docker volume rm ${DOCKER_DEV_VOLUME}
}

remove_node_temp_files()
{
  echo -e "${_GREEN}Removing node temp files...${_NO_COLOUR}"
  # Remove node modules
  npm uninstall -g @angular/cli
  npm uninstall -s express
  npm cache clean --force
  rm -rf -- "${_PROJECT_DIR}/node_modules" "${_PROJECT_DIR}/dist" "${_PROJECT_DIR}/coverage"
}

# Get conda commands
cleanup()
{
  if [[ ${_DOCKER} = true ]]; then
    # shellcheck source=/dev/null
    source "${_HELPER_SCRIPT_DIR}/docker_env.env"
    stop_and_remove_docker_containers
    remove_docker_images
    remove_docker_volumes
  fi

  remove_node_temp_files
}

cleanup
