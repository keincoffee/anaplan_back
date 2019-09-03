const fs = require('fs');
const csvtojson = require('csvtojson');
const { Parser } = require('json2csv');
const { exec } = require('child_process');
const importbat = "/home/ec2-user/AC/ACv1-3-5/IMPORTZIPS.sh";
const impcounty = "/home/ec2-user/AC/ACv1-3-5/IMPORTCOUNTY.sh";

exports.list = function (req, res) {
    console.log('getting data')
    const csvFilePath = '/home/ec2-user/DATA/TBAT_Zip.csv';
    
    csvtojson()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            res.send(jsonObj);
            /**
             * [
             * 	{a:"1", b:"2", c:"3"},
             * 	{a:"4", b:"5". c:"6"}
             * ]
             */
        });
};

exports.list2 = function (req, res) {
    // console.log('getting data')
    const csvFilePath = '/home/ec2-user/DATA/QVL.csv';
    
    csvtojson()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            res.send(jsonObj);
            /**
             * [
             *  {a:"1", b:"2", c:"3"},
             *  {a:"4", b:"5". c:"6"}
             * ]
             */
        });
};

exports.receive = function (req, res) {
  let header = [];
  var x;
  for (x in req.body) {
    fields = Object.keys(req.body[x]);
    //console.log('heads', header)
  }
   const data = req.body;

   const json2csvParser = new Parser({
      fields
    });
   
   const csv = json2csvParser.parse(data);

   //console.log(csv);

   fs.writeFile('./controllers/NewData.csv', csv, 'utf8', function (err) {
    if (err) {
        console.log(`Error: + ${err}`);
    } else {
        console.log('SAVED');
      }
   });
    exec(importbat, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
        console.log(stdout);
    });
};

exports.county = function (req, res) {

  let header = [];
  var x;

  for (x in req.body) {
    fields = Object.keys(req.body[x]);
    //console.log('heads', header)
  };
   const data = req.body;

   const json2csvParser = new Parser({
      fields
    });
   const csv = json2csvParser.parse(data);

   //console.log(csv);

   fs.writeFile('./controllers/NewCounty.csv', csv, 'utf8', function (err) {
    if (err) {
        console.log(`Error: + ${err}`);
    } else{
        console.log('SAVED');
    }
   });
    exec(impcounty, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
        console.log(stdout);
    });
};

