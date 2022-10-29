#!/bin/sh

docker run -d -p 8081:8081 peerprep/collab-service:test
docker run -d -p 3000:3000 peerprep/matching-service:test
docker run -d -p 3005:3005 peerprep/question-service:test