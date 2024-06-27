#!/bin/sh

host="$1"
shift
cmd="$@"

echo "Starting wait-for script..."

timeout=60
interval=5
elapsed=0

while ! nc -z "$host" 9092; do
  if [ $elapsed -ge $timeout ]; then
    echo "Timeout of $timeout seconds reached, Kafka is still not up."
    exit 1
  fi
  echo "Waiting for Kafka to be ready..."
  elapsed=$((elapsed + interval))
  sleep $interval
done

echo "Kafka is up, starting transcode service..."
exec $cmd
