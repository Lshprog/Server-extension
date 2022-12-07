const {readFileSync, promises: fsPromises} = require('fs');

var fs = require('fs');

const WebSocket = require('ws');
const url = require('url');

let myFileToEditName = 'mynewfile1.txt';



if(!checkIfContainsSync(myFileToEditName,"New urls:")){
  fs.appendFile(myFileToEditName,"New urls: ::::true\r\n", function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}

const wss = new WebSocket.Server({ port: 8088 });

wss.on('connection', function connection(ws, request) {
  const pathname = url.parse(request.url).pathname;
  var msg = '';

  if (pathname === '/post') {

    ws.on('message', function incoming(message) {
      var decodedmsg = decodeURIComponent(message);
      console.log('received: %s', decodedmsg);
      msg = decodedmsg;

      if(!checkIfContainsSync(myFileToEditName,msg)){
        fs.appendFile(myFileToEditName,"\t" +"NewMessage"+msg+"::"+msg+"\r\n", function (err) {
          if (err) throw err;
          console.log('Saved!');
        });
      }
      else{
        console.log('link: %s already in file',msg);
      }

    });
  }

  if (pathname === '/get') {

    ws.on('message', function incoming(message) {
      var decodedmsg = decodeURIComponent(message);
      console.log('sending : %s', decodedmsg);
      ws.send(decodedmsg);
    });

  }
});

function checkIfContainsSync(filename, str) {
  
  const contents = readFileSync(filename, 'utf-8');

  const result = contents.includes(str);

  return result;
}
