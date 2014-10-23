var exec = require('child_process').exec;


function execResult(error, stdout, stderr) {
  if (stdout)console.log('stdout: ' + stdout);
  if (stderr)console.log('stderr: ' + stderr);
  if (error) console.log('exec error: ' + error);
}

function execResultNext(next, error, stdout, stderr){
  execResult(error,stdout, stderr);
  next();
}

function linkGroup(){
  exec('tsd-link group u -g mykoop', execResult );
}

var dirs = ["../module.database", "../module.inventory"]
function execTsdLink(){
  var dir = dirs.pop();
  var next = dirs.length ? execTsdLink : linkGroup;
  exec('tsd-link group -g mykoop', {cwd:dir}, execResultNext.bind(null,next) );
}

exec('tsd-link group -g mykoop', execResultNext.bind(null,execTsdLink) );
exec('npm link ../module.inventory', execResult );
exec('npm link ../module.database', execResult );
exec('npm link ../module.user', execResult );