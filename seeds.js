// seed a database using JS promises
// use node seeds to run the code in the terminal

// we "seed" databases during development so that we have default data to test functionality with 


require('dotenv').config();
require('./config/database'); // will connect to mongoDB for however long it takes to run

// require the models we'll need to see collections for
const Dog = require('./models/dog');
const Activity = require('./models/activity');

// require the data we will seed with
const data = require('./data');

// 1st step - avoid duplicates by resetting the database and deleting its contents

/*

Movie.deleteMany({})
.then(function(results) {
    console.log('deleted movies: ', results);
    return Performer.deleteMany({});
})
.then(function(results) {
    console.log('deleted performers: ', results);
    process.exit(); // this line will allow this function to end once done running
})
*/

// 2nd step - seed both collections with fresh data

const p1 = Dog.deleteMany({});
const p2 = Activity.deleteMany({});

Promise.all([p1, p2])
.then(function(results) {
    console.log('deleted dogs and activities: ', results);
    return activity.create(data.activities);
})
.then(function(results) {
    console.log('different activities: ', results)
    return Dog.create(data.activities);
})
.then(function(results) {
    console.log('different dogs', results)
    return Promise.all([
        // 1st action - find a performer
        Dog.findOne({name: 'Labrador Retreiver'}), // findOne will find a single object
        // 2nd - find a movie
        Dog.findOne({Activity: 'Active'})
    ])
})
.then(function(results) {
    console.log('found an activity and a dog', results);

    const labradorRetreiver = results[0];
    const active = results[1];

    active.breed.push(labradorRetreiver); //this puts Mark into the cast array in the results

    return active.save();

})
.then(function(results) {
    console.log('Labrador Retreiver is now part of the active list', results);
    process.exit();
})