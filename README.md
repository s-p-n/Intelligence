# Intelligence

# Requirements
Mongodb v3.x
Node.js v12.x

# Getting Started
First, you must create the directories and the log-file for the database:
	
	mkdir ./data
	mkdir ./data/db
	touch ./data/log

# To start (or restart) the Mongo database, run:
Notice: It is dangerous to run this script while the database is working.
	
	./mongod.sh

The Mongo database runs in the background. 

# To start (or restart) the Node.js Server, run:
	
	./startServer.sh

