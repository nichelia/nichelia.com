# syntax=docker/dockerfile:1.4

FROM --platform=$BUILDPLATFORM node:22-slim as build

WORKDIR /app

RUN npm install -g @angular/cli@19

COPY package*.json ./
RUN npm ci

COPY . .
CMD ["ng", "serve", "--host", "0.0.0.0"]

FROM build as development

RUN <<EOF
apt-get update
apt-get install -y --no-install-recommends git
EOF

RUN <<EOF
useradd -s /bin/bash -m vscode
groupadd docker
usermod -aG docker vscode
EOF

# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /

CMD ["npm", "start"]
