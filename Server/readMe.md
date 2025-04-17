Access the PostgreSQL container: First, you need to start an interactive session in the container using the psql client
docker exec -it my-postgres psql -U postgres



docker run -d --name my-app --network my_custom_network -p 3000:3000 my-app

## Building a docker image
docker build -t my-app
##

## The command you provided is used to run a PostgreSQL container with specific environment variables and configurations. Let's break it down:

( docker run --name my-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=root \
  -e POSTGRES_DB=Project \
  -p 5432:5432 \
  -d postgres)

##


