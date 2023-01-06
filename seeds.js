require('dotenv').config();
require('./config/database');

const Dog = require('./models/dog');
const Activity = require('./models/activity');

const data = require('./data');

const p1 = Dog.deleteMany({});
const p2 = Activity.deleteMany({});

Promise.all([p1, p2])
.then(function(results) {
    console.log('deleted dogs and activities: ', results);
    return Activity.create(data.activities);
})
.then(function(results) {
    console.log('different activities: ', results)
    return Dog.create(data.activities);
})
.then(function(results) {
    console.log('different dogs', results)
    return Promise.all([
    
        Dog.findOne({name: 'Labrador Retreiver'}),
        Dog.findOne({Activity: 'Active'})
    ])
})
.then(function(results) {
    console.log('found an activity and a dog', results);

    const labradorRetreiver = results[0];
    const active = results[1];

    active.breed.push(labradorRetreiver); 

    return active.save();

})
.then(function(results) {
    console.log('Labrador Retreiver is now part of the active list', results);
    process.exit();
})