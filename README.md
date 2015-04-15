# Petfinder API Client

Petfinder API allows you to search their database for available pets ready for adoption.

## Installation

### NPM
```bash
npm install petfinder --save
```

`--save` adds petfinder to your `package.json` file

### Package Manager `package.json`:
```json
{
  ...
  "dependencies": {
    ...
    "petfinder": "latest"
  }
}
```

## Usage
```js
// Import module
var petfinder = require('petfinder')('api_key','api_secret');

// Get list of breeds
petfinder.getBreedList('cat', function(err, breeds) {
  console.log(breeds)
});
```

## Methods

### Pets

```js
// animal = barnyard, bird, cat, dog, horse, pig, reptile, smallfurry
getBreedList( animal, callback )

getPet( petId, options, callback )
getRandomPet ( options, callback )
findPet ( location, options, callback )
```

### Shelters

```js
findShelter( location, options, callback )
getShelter( shelterId, options, callback )
getPetsInShelter( shelterId, options, callback )

// breed get from getBreedList
getSheltersWithBreeds ( animal, breed, options, callback )
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Added some awesome feature'`)
4. Push to the remote branch (`git push origin my-new-feature`)
5. Create a pull request

## Running Tests

```bash
cp .env.example .env
```

```bash
npm test
```

to record api calls
```bash
REPLAY=record npm test
```

to debug recorded api calls
```bash
DEBUG=replay npm test
```

## License
Licensed under the MIT License.
