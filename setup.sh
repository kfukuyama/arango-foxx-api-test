#!/bin/bash

DATABASE=example
ENDPOINT=0.0.0.0:8529

# Database作成
curl -X POST --data-binary @- --dump - http://$ENDPOINT/_api/database <<EOF
{ 
  "name" : "$DATABASE" 
}
EOF

# Service登録
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "source": "/foxx_services/getting-started"
}' http://$ENDPOINT/_db/$DATABASE/_api/foxx/?mount=%2Fgetting-started&development=false&setup=true&legacy=false