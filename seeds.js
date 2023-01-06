require('dotenv').config();
require('./config/database');

const Dog = require('./models/dog');
const Activity = require('./models/activity');

const data = require('./data');

const p1 = Dog.deleteMany({});
const p2 = Activity.deleteMany({});

Promise.all([p1, p2])
.then(function(results) {
    return Activity.create(data.activities);
})
.then(function(results) {
    return Dog.create(data.activities);
})
.then(function(results) {
    return Promise.all([
    
        Dog.findOne({name: 'Labrador Retreiver'}),
        Dog.findOne({Activity: 'Active'})
    ])
})
.then(function(results) {

    const labradorRetreiver = results[0];
    const active = results[1];

    active.breed.push(labradorRetreiver); 

    return active.save();

})
.then(function(results) {
    process.exit();
})