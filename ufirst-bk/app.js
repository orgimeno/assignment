const fs = require('fs');
const lineReader = require('line-reader');
const source = 'sources/epa-http.txt';
const express = require('express');
const app = express();
const cors = require('cors')

let items = [];
let item = {
    "host":'',
    "datetime": {},
    "request": {},
};

lineReader.eachLine(
    source, 
    function(line) {

        temp = line.split(' ');

        if(temp.length == 7){
            let item = {
                "host":'',
                "datetime": {},
                "request": {},
            };
            
            item.host = temp[0];
    
            //GET DATETIME
            date = temp[1].split(':');
            item.datetime.day = date[0].replace('[', '');
            item.datetime.hour = date[1];
            item.datetime.minute = date[2];
            item.datetime.second = date[3].replace(']', '');
    
            //GET REQUEST
            item.request.method = temp[2].replace('"','');
            item.request.url = temp[3].replace('"', '');
            item.request.protocol = temp[4].replace('"','').split('/')[0];
            item.request.protocol_version = temp[4].replace('"','').split('/')[1];
            
            item.response_code = temp[5];
            item.document_size = temp[6];
            items.push(item);
        }
    },
    function(){
        fs.writeFile('data.json', JSON.stringify(items), 'UTF-8', function(){

            app.use('/data', cors(), express.static('data.json'));

            app.listen(3000, function () {
                console.log('File served on http://localhost:3000/data');
              });
        });
});
