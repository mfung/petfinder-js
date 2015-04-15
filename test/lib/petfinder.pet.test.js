describe('Petfinder', function () {

  it('has a valid version number', function() {
    expect(petfinder.version).to.not.be.undefined;
  });

  describe('Pet', function() {

    /***
     * #getBreedList
     ***/
    describe('#getBreedList', function() {

      it('should get an array of dog breeds which contains "German Shepherd Dog" when given params dog ', function(done) {
        petfinder.getBreedList('dog', function(err, breeds) {
          expect(breeds).to.be.instanceof(Array)
                        .and.to.include('German Shepherd Dog');
          done();
        });
      });

      it('should get an array of cat breeds which contains "Tabby" when given params cat ', function(done) {
        petfinder.getBreedList('cat', function(err, breeds) {
          expect(breeds).to.be.instanceof(Array).and.to.include('Tabby');
          done();
        });
      });


      it('should get an error when no params are given', function(done) {
        petfinder.getBreedList('', function(err, breeds) {
          expect(err).to.exist.and.be.instanceof(Error)
                              .and.have.property('message', 'Must supply animal type.');
          done();
        });
      });
    }); // end #getBreedList

    /***
     * #findPet
     ***/
    describe('#findPet', function() {

      it('should return an array of animals with length of 25 when given a location ', function(done) {
        petfinder.findPet('90210', {}, function(err, pets) {
          expect(pets).to.be.instanceof(Array);
          expect(pets.length).to.be.equal(25);
          done();
        });
      });

      it('should return 10 pets when given a location and option of count 10', function(done) {
        petfinder.findPet('90210', {'count':10}, function(err, pets) {
          expect(pets.length).to.be.equal(10);
          done();
        });
      });

      it('should give an error if no location is given', function(done) {
        petfinder.findPet('',{}, function(err, pets) {
          expect(err).to.exist.and.be.instanceof(Error)
                              .and.have.property('message', 'Must supply location.');
          done();
        });
      });
    }); // end #findPet

    /***
     * #getPet
     ***/
    describe('#getPet', function() {

      it('should return a pet object when given a pet id', function(done) {
        petfinder.getPet('31253980', {}, function(err, pet) {
          expect(pet).to.exist.and.have.property('id', '31253980');
          done();
        });
      });
      it('should get an error when given no pet id', function(done) {
        petfinder.getPet('', {}, function(err, pet) {
          expect(err).to.exist.and.be.instanceof(Error)
                              .and.have.property('message', 'Must supply pet id.');
          done();
        });
      });
    }); // end #getPet

    /***
     * getRandom
     ***/
    describe('#getRandomPet', function() {

      it('should return a random pet', function(done) {
        petfinder.getRandomPet({}, function(err, pet) {
          expect(pet).to.exist.and.have.property('id');
          done();
        });
      });
    }); // end #getRandomPet
  }); // end Pet
});