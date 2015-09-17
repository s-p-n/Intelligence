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

## Configure the database authentication. 
See MongoDB Manual for more information.
Create a file named 'creds.json' inside ./data.
It should look similar to this:
	
	{
		"host": "XXX.XXX.XXX.XXX",
		"port": "27017",
		"user": "username",
		"pass": "plain-txt password",
		"db": "name-of-db"
	}


# To start (or restart) the Node.js Server, run:
	
	./startServer.sh

