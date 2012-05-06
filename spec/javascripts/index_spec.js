(function() {

  describe('Offline.Index', function() {
    beforeEach(function() {
      localStorage.setItem('dreams', '2,3');
      this.dreams = new Dreams();
      this.storage = this.dreams.storage;
      return this.records = new Offline.Index('dreams', this.storage);
    });
    describe('constructor', function() {
      it('sets @name', function() {
        return expect(this.records.name).toEqual('dreams');
      });
      return it('sets @values', function() {
        return expect(this.records.values).toEqual(['2', '3']);
      });
    });
    describe('add', function() {
      beforeEach(function() {
        return this.records.add('5');
      });
      it('should add value in to the end of array', function() {
        return expect(this.records.values).toEqual(['2', '3', '5']);
      });
      it("should rewrite localStorage's item", function() {
        return expect(localStorage.getItem('dreams')).toEqual('2,3,5');
      });
      return it('does not duplicate values', function() {
        this.records.add('5');
        return expect(this.records.values).toEqual(['2', '3', '5']);
      });
    });
    return describe('remove', function() {
      beforeEach(function() {
        return this.records.remove('2');
      });
      it('should remove value from array', function() {
        return expect(this.records.values).toEqual(['3']);
      });
      return it("should rewrite localStorage's item", function() {
        return expect(localStorage.getItem('dreams')).toEqual('3');
      });
    });
  });

}).call(this);
