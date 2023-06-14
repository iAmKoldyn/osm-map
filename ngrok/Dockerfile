FROM alpine:3.17.3

RUN apk add --no-cache curl tar && \
    curl -sSL https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-v5.0.0-beta.2-linux-amd64.tgz -o ngrok.tgz && \
    tar xvzf ngrok.tgz -C /bin && \
    rm -f ngrok.tgz && \
    apk del curl tar && \
    ngrok version

CMD ["ngrok", "start", "--config", "/etc/ngrok/ngrok.yml", "--all"]
