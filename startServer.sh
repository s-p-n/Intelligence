# Kill the server
pkill node

# Start the server
node ./server.js "$@" &
echo ""
exit 0