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
var i = 3;
function linkGroup(){
	--i;
	if(!i){
		exec('tsd-link group u -g mykoop', execResult );
	}
}	

exec('tsd-link group -g mykoop', execResultNext.bind(null,linkGroup) );
exec('tsd-link group -g mykoop', {cwd:"../module.database"}, execResultNext.bind(null,linkGroup) );
exec('tsd-link group -g mykoop', {cwd:"../module.inventory"}, execResultNext.bind(null,linkGroup) );
exec('npm link ../module.inventory', execResult );
exec('npm link ../module.database', execResult );
