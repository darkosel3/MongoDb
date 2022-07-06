require( 'dotenv' ).config();
const mongoose = require( "mongoose" );
const { Schema } = mongoose;

mongoose.connect( process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true } );
// { useNewUrlParser: true, useUnifiedTopology: true }
// const createDataOrError = function ( err, data ) {
//   if ( err ) return console.log( err );
//   done( null, data );
// };


const personSchema = new Schema( {
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]

} );

let Person = mongoose.model( 'Person', personSchema );

const createAndSavePerson = ( done ) => {
  let darko = new Person( { name: 'Darko', age: 20, favoriteFoods: ['Banana', 'Apples'] } );
  darko.save( function ( err, data ) {
    {
      if ( err ) return console.log( err );
      done( null, data );
    }
  } );

};

var arrayOfPeople = [
  { name: "Frankie", age: 74, favoriteFoods: ["Del Taco"] },
  { name: "Sol", age: 76, favoriteFoods: ["roast chicken"] },
  { name: "Robert", age: 78, favoriteFoods: ["wine"] }
];


const createManyPeople = ( arrayOfPeople, done ) => {
  Person.create( arrayOfPeople, function ( err, peopleCreated ) {
    if ( err ) return console.log( err );
    done( null, peopleCreated );
  } );
};


const findPeopleByName = ( personName, done ) => {
  Person.find( { name: personName }, ( err, peopleFound ) => {
    if ( err ) return console.log( err );
    done( null, peopleFound );
  }
  );
};

const findOneByFood = ( food, done ) => {
  Person.findOne( { favoriteFoods: food }, ( err, peopleFound ) => {
    if ( err ) return console.log( err );
    done( null, peopleFound );
  } );
};



const findPersonById = ( personId, done ) => {
  Person.findById( { _id: personId }, ( err, peopleFound ) => {
    if ( err ) return console.log( err );
    done( null, peopleFound );
  } );
};

const findEditThenSave = ( personId, done ) => {
  const foodToAdd = "hamburger";
  // Find the person by ID
  Person.findById( personId, ( err, person ) => {

    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push( foodToAdd );

    // and inside the find callback - save() the updated Person.
    person.save( ( err, updatedPerson ) => {
      if ( err ) return console.log( err );
      done( null, updatedPerson );
    } );
  } );
};


const findAndUpdate = ( personName, done ) => {
  const ageToSet = 20;
  //////////// find person by this//// update this ////// return updated doc
  Person.findOneAndUpdate( { name: personName }, { age: ageToSet }, { new: true },
    ////callback
    ( err, updatedPersonAge ) => {
      /// show error
      if ( err ) return console.log( err );
      done( null, updatedPersonAge );
    } );
};

const removeById = ( personId, done ) => {
  Person.findByIdAndRemove( personId, ( err, updatedPerson ) => {
    if ( err ) return console.log( err );
    done( null, updatedPerson );
  } );
};

// const removeManyPeople = ( done ) => {
//   const nameToRemove = "Mary";
//   Person.remove( { name: nameToRemove }, ( err, dataAboutRemoval ) => {
//     if ( err ) return console.log( err );
//     done( null, dataAboutRemoval );
//   } );

// };
const removeManyPeople = ( done ) => {
  const nameToRemove = "Mary";
  Person.remove( { name: nameToRemove }, ( err, response ) => {
    if ( err ) return console.log( err );
    done( null, response );
  } );
};




const queryChain = ( done ) => {
  const foodToSearch = "burrito";
  Person.find( { favoriteFoods: foodToSearch } )
    .sort( { name: 'asc' } )
    .limit( 2 )
    .select( '-age' )
    .exec( function ( err, data ) {
      if ( err ) return console.log( err );
      done( null, data );

    } );

};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
