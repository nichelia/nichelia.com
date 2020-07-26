# nichelia.com
nichelia.com: A personal website

## Contents


## Development
To run project in development mode, run the following:  
`$ ./scripts/run_docker_dev_env.sh`

## Replicate
This project uses npm package `@angular/cli` of version `v9.1.5`.

Steps to replicate project from scratch:

1. Install npm on your environment  
`$ npm install -g @angular/cli@9.1.5`  
2. Make sure git is installed on the environment
    * Ensure your git email is configured `git config --global user.email [value]`
    * Ensure your git username is configured `git config --global user.name [value]`
3. Create a new project named `nichelia`  
`$ ng new nichelia`  
4. Select the following options
    * `Would you like to add Angular routing?` `y`
    * `Which stylesheet format would you like to use?` `css`