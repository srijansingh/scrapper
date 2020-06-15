const express = require('express');
const mongoose = require('mongoose');
const CronJob = require('cron').CronJob;
const port = process.env.PORT || 8000;
const {amazon, clothing} = require('./scrapper/amazon');
const {flipkart} = require('./scrapper/flipkart');

const app = express();


main = () => {
    console.log('Running Amazon');
    flipkart();
}
// new CronJob('* 21 * * *', function() {
//     amazon()
//     }, null, true, 'America/Los_Angeles');

// new CronJob('* 22 * * *', function() {
//     flipkart()
//     }, null, true, 'America/Los_Angeles');

mongoose.connect(
    'mongodb+srv://webscraping:Qwerty123@clusterscraping-eukyu.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true }
)
.then(
    app.listen(port,  ()=> {
        console.log(`Server running at http://localhost:${port}`);
    })
).then(
    main()
)
.catch(err => {
    console.log(err);
})


