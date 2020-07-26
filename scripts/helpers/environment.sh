#!/usr/bin/env bash

###############################################################################
#
# Setup project environment (node, npm, angular, docker).
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
  echo "    " "  --force, -f             Force to re-create project environment."
  echo "    " "  --prod, -p              Create project environment for production."
  echo "    " "  --update, -y            Update project environment."
  echo "    " "  --docker, -d            Build environment in docker image."
  echo "    " "  --help, -h              Show this help message and exit."
}

_FORCE=false
_PROD=false
_UPDATE=false
_DOCKER=false
while [[ $# -gt 0 ]]; do
  case $1 in
    -f|--force)
      _FORCE=true
      shift # past argument
      ;;
    -p|--prod)
      _PROD=true
      shift # past argument
      ;;
    -u|--update)
      _UPDATE=true
      shift # past argument
      ;;
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

install_npm_packages()
{
  echo -e "${_GREEN}Installing necessary npm packages...${_NO_COLOUR}"
  cd "${_PROJECT_DIR}"
  export NG_CLI_ANALYTICS=ci
  npm i -g @angular/cli@9.1.5
  npm i -s express
  if [[ ${_PROD} = true ]]; then
    echo -e "${_GREEN}Installing production npm packages...${_NO_COLOUR}"
    npm install --production
  else
    npm install
  fi
  cd - 2>&1 >/dev/null
}

update_npm_packages()
{
  echo -e "${_GREEN}Updating necessary npm packages...${_NO_COLOUR}"
  cd "${_PROJECT_DIR}"
  export NG_CLI_ANALYTICS=ci
  npm i -g @angular/cli@9.1.5
  if [[ ${_PROD} = true ]]; then
    echo -e "${_GREEN}Updating production npm packages...${_NO_COLOUR}"
    npm update --production
  else
    npm update
  fi
  cd - 2>&1 >/dev/null
}

update_angular_packages()
{
  echo -e "${_GREEN}Updating necessary angular packages...${_NO_COLOUR}"
  cd "${_PROJECT_DIR}"
  ng update
  cd - 2>&1 >/dev/null
}

setup_environment()
{
  if [[ ${_FORCE} = true ]]; then
    bash "${_HELPER_SCRIPT_DIR}/cleanup.sh" -d
  fi

  if [[ ${_DOCKER} = true ]]; then
    _DOCKER_BUILD_FLAG="-d"
    if [[ ${_PROD} = true ]]; then
      _DOCKER_BUILD_FLAG=""
    fi
    bash "${_SCRIPT_DIR}/build_docker_image.sh" "${_DOCKER_BUILD_FLAG}"
  else
    if [[ ${_UPDATE} = true ]]; then
      update_npm_packages
    else
      install_npm_packages
    fi
    update_angular_packages
  fi
}

setup_environment