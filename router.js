const getcsv = require('./getcsv');
const { exec } = require('child_process');
const zipbat ="/home/ec2-user/AC/ACv1-3-5/tbat.sh";
const acctbat ="/home/ec2-user/AC/ACv1-3-5/qvl.sh";
const EventEmitter = require('events');
const emitter = new EventEmitter();

runzip();
runacct();

 setInterval(runzip,120000);
 setInterval(runacct,120000);

function runzip(){
  exec(zipbat, (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  // console.log(stdout);
});
}

function runacct(){
 exec(acctbat, (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  // console.log(stdout);
});   
}

module.exports = function (app) {

    app.get('/getzip', getcsv.list);
    app.get('/getacct', getcsv.list2);
    app.post('/sendcsv/receive', getcsv.receive);
    app.post('/sendcsv/county', getcsv.county);
   
 

};
