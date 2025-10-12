FROM debian:bullseye

RUN apt update && apt install -y nginx openssl \
	&& ln -sf /dev/stdout /var/log/nginx/access.log \
	&& ln -sf /dev/stderr /var/log/nginx/error.log

COPY nginx.conf /etc/nginx/conf.d/nginx.conf

COPY gen_certif.sh /entrypoint

RUN chmod +x /entrypoint

EXPOSE 443

ENTRYPOINT ["/entrypoint"]

CMD ["nginx", "-g", "daemon off;"]