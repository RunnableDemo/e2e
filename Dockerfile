FROM node:7.5.0
MAINTAINER Runnable, Inc.

# Install utilities
RUN apt-get -yqq update && \
    apt-get -yqq install curl unzip

# Install Chrome WebDriver
RUN CHROMEDRIVER_VERSION=`curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE` && \
    mkdir -p /opt/chromedriver-$CHROMEDRIVER_VERSION && \
    curl -sS -o /tmp/chromedriver_linux64.zip http://chromedriver.storage.googleapis.com/$CHROMEDRIVER_VERSION/chromedriver_linux64.zip && \
    unzip -qq /tmp/chromedriver_linux64.zip -d /opt/chromedriver-$CHROMEDRIVER_VERSION && \
    rm /tmp/chromedriver_linux64.zip && \
    chmod +x /opt/chromedriver-$CHROMEDRIVER_VERSION/chromedriver && \
    ln -fs /opt/chromedriver-$CHROMEDRIVER_VERSION/chromedriver /usr/local/bin/chromedriver

# Cache NPM Install
RUN mkdir -p /app
ADD package.json /app
WORKDIR /app
RUN npm install

# Add Repository & Build
ADD . /app/

# Expose Ports & Run Application
EXPOSE 80
CMD npm test
