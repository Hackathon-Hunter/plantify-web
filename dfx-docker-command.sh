#!/bin/bash

docker-compose run --rm -d --name icp-dfx icp-dfx
docker exec -it icp-dfx bash
docker stop icp-dfx
