#!/bin/sh

if [ -f /etc/nginx/ssl/ft_transcendence.key ]; then
    echo -n ""
else
    mkdir -p /etc/nginx/ssl
	chmod 700 /etc/nginx/ssl
    openssl req -x509 -nodes -out /etc/nginx/ssl/ft_transcendence.crt \
	-keyout /etc/nginx/ssl/ft_transcendence.key \
	-subj "/C=FR/ST=IDF/L=Angouleme/O=42/OU=ft_transcendence/CN=localhost/UID=groupetr"
fi

exec "$@"