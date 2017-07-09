let http = require('http');
let createHandler = require('github-webhook-handler');
let handler = createHandler({path: '/gitpush', secret: 'fangda'});

function run_cmd(cmd, args, callback) {
    let spawn = require('child_process').spawn;
    let child = spawn(cmd, args);
    var resp = "ok!";

    child.stdout.on('data', function(buffer) {resp += buffer.toString();})
    child.stdout.on('end', function() {callback(resp)})
}

http.createServer(function(req, res) {
    handler(req, res, function (err) {
        res.statusCode = 404;
        res.end('no such location');
    })
}).listen(5151);

handler.on('error', function (err) {
    console.error('Error: ', err.message);
});

handler.on('push', function (event) {
    console.log('Received a push event for %s to %s', event.payload.repository.name, event.payload.ref);
    run_cmd('sh', ['./webhook.sh'], function (txt) {
        console.log(txt);
    })
});