# Use an official Ubuntu base image
FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
    curl \
    git \
    libwebkit2gtk-4.1 \
    build-essential \
    wget \
    file \
    libssl-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev \
    javascriptcoregtk-4.1 \
    python3 \
    python3-pip



# Install Rust using rustup
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

# Install NVM and Node.js
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash \
    && export NVM_DIR="$HOME/.nvm" \
    && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" \
    && [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" \
    && nvm install 18 \
    && npm install -g yarn

RUN pip install pre-commit
