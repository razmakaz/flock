if ! command -v caddy &> /dev/null
then
    xdg-open https://caddyserver.com/docs/install
    exit 1
fi

sudo caddy run --config ./Caddyfile