#!/bin/sh

docker build ../collab-service -t peerprep/collab-service:test
docker build ../matching-service -t peerprep/matching-service:test
docker build ../question-service -t peerprep/question-service:test