const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8081 })

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Server Received message => ${message}`)
    wss.broadcast(message);
/*    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
        ws.send("test");
      }
    });*/
  })
})




