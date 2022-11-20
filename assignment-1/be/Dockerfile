FROM node:latest

RUN apt-get update -yq \
  && apt-get upgrade -yq \
  #ESSENTIALS
  && apt-get install -y -qq --no-install-recommends build-essential curl git-core vim passwd unzip cron gcc wget netcat \
  # RAILS PACKAGES NEEDED
  && apt-get update \
  && apt-get install -y --no-install-recommends imagemagick postgresql-client

# Clean cache and temp files, fix permissions
RUN apt-get clean -qy \
  && rm -rf /var/lib/apt/lists/*

RUN mkdir /app
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm i


EXPOSE 5000

CMD ["bash"]