# Kill mongod
pkill mongod

# Start mongod
mongod --auth --dbpath ./data/db --logpath ./data/log --fork