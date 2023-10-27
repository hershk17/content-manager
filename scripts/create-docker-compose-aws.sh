file_content="version: '3.8'
services:
  nginx:
    container_name: cm-nginx
    image: $1/cm-nginx:$2
    restart: always
    depends_on:
      - client
      - server
    ports:
      - 80:80

  client:
    container_name: cm-client
    image: $1/cm-client:$2
    restart: always

  server:
    container_name: cm-server
    image: $1/cm-server:$2
    restart: always
    environment:
      - NODE_ENV
      - REACT_CLIENT_URL
      - EXPRESS_SERVER_URL
      - MONGO_URI
      - GOOGLE_CLIENT_ID
      - GOOGLE_CLIENT_SECRET
      - STEAM_API_KEY
      - SESSION_SECRET
"

echo "$file_content"

AWS_DOCKER_COMPOSE="docker-compose-aws.yml"
if [ -f $AWS_DOCKER_COMPOSE ]; then
   rm $AWS_DOCKER_COMPOSE
   echo "$AWS_DOCKER_COMPOSE is removed"
fi

touch $AWS_DOCKER_COMPOSE
echo "$file_content" >> $AWS_DOCKER_COMPOSE
