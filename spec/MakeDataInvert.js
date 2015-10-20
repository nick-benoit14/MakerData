/* Test Makedata Outputting Inverted values for SVG */

describe("Controller - Standard Output", function(){

  var c;
  beforeEach(function() {
    c = new Controller(10,500,1000, false);
  });

  it("creates controller object", function(){expect(c).toBeDefined();}); //creates controller object
  it("creates data object", function(){expect(typeof c.Data).toEqual("object");});

  describe("Member Methods", function(){
    describe("updateRangeList([]) - adds array of data to ordered Rangelist", function(){
      it("calculates max and min of input []", function(){
        var data = [1,2,3,4,-5,-2,-79,-50,100,-100,0,0,9,10,15]; //from data buffer
        expect(c.updateRangeList(data).Max).toEqual(100);
        expect(c.updateRangeList(data).Min).toEqual(-100);

        data = [0];
        expect(c.updateRangeList(data).Max).toEqual(0);
        expect(c.updateRangeList(data).Min).toEqual(0);

        data = [1,1,1,1,1];
        expect(c.updateRangeList(data).Max).toEqual(1);
        expect(c.updateRangeList(data).Min).toEqual(1);
      });

      it("adds all values to rangeList", function(){
        var data = [1,2,3,4,5];
        c.updateRangeList(data);
        expect(c.Data.rangeList.length).toEqual(data.length);

        c.updateRangeList(data);
        expect(c.Data.rangeList.length).toEqual(2 * data.length); //additions to rangelist accumulate
      });
      it("sets Min & Max", function(){
        var data = [1,2,3,4,-5,-2,-79,-50,100,-100,0,0,9,10,15]; //from data buffer
        expect(c.updateRangeList(data).Max).toEqual(c.Data.max);
        expect(c.updateRangeList(data).Min).toEqual(c.Data.min);

        data = [101,-101,0];
        expect(c.updateRangeList(data).Max).toEqual(101);
        expect(c.updateRangeList(data).Min).toEqual(-101);
        expect(c.Data.max).toEqual(100); //only initailize max and min if uninitialized - otherwise updated in Draw()
        expect(c.Data.min).toEqual(-100);

      });
      it("sets newMin & newMax", function(){
        var data = [1,2,3,4,-5,-2,-79,-50,100,-100,0,0,9,10,15]; //from data buffer
        expect(c.updateRangeList(data).Max).toEqual(c.Data.max);
        expect(c.updateRangeList(data).Min).toEqual(c.Data.min);

        data = [101,-101,0];
        expect(c.updateRangeList(data).Max).toEqual(101);
        expect(c.updateRangeList(data).Min).toEqual(-101);
        expect(c.Data.max).toEqual(100); //only initailize max and min if uninitialized - otherwise updated in Draw()
        expect(c.Data.min).toEqual(-100);

        expect(c.updateRangeList(data).Max).toEqual(c.Data.newMax); //update newMin and newMax if values outside bounds are added
        expect(c.updateRangeList(data).Min).toEqual(c.Data.newMin);

        data = [100,0,-100];
        expect(c.updateRangeList(data).Max).not.toEqual(c.Data.newMax); //but not if values arent ouside of bounds
        expect(c.updateRangeList(data).Min).not.toEqual(c.Data.newMin);
      });

      it("handles undefined max and min", function(){
        expect(typeof c.Data.max == 'undefined' && typeof c.Data.min == 'undefined').toBeTruthy(); //begin inunitialized
        var data = [0];
        c.updateRangeList(data);
        expect(c.Data.max).toEqual(0);
        expect(c.Data.min).toEqual(0);

        data = [100,-100,0];
        c.updateRangeList(data);
        expect(c.Data.max).toEqual(0);
        expect(c.Data.min).toEqual(0);
        expect(c.Data.newMax).toEqual(100);
        expect(c.Data.newMin).toEqual(-100);
      });
    });
    describe("binaryInsert(arr, val, a, b)", function(){
      it("inserts values into ordered list", function(){
        var orderedList = [-1,0,1,2,3,4,5];
        for(var i = 0; i < 50; i++){
            var valP = Math.random() * 10;
            var valN = Math.random() * -10;
            var zero = 0;

            c.binaryInsert(orderedList,valP,0,orderedList.length - 1);
            c.binaryInsert(orderedList,valN,0,orderedList.length - 1);
            c.binaryInsert(orderedList,zero,0,orderedList.length - 1);
          }
        for(var i = 0; i < orderedList.length - 1; i++){
            expect(orderedList[i] <= orderedList[i+1]).toBeTruthy();
          }
      });
    it("doesn't remove any values", function(){
      var orderedList = [-1,0,1,2,3,4,5];
      for(var i = 0; i < 50; i++){
          var valP = Math.random() * 10;
          var valN = Math.random() * -10;
          var zero = 0;

          c.binaryInsert(orderedList,valP,0,orderedList.length - 1);
          c.binaryInsert(orderedList,valN,0,orderedList.length - 1);
          c.binaryInsert(orderedList,zero,0,orderedList.length - 1);
        }
      expect(orderedList.length).toEqual(50 * 3 + 7); // 50 iterations of adding three items + original array length
    });
  });

    describe("binaryDelete(arr, val, a, b)", function(){});

  });

  describe("this.addData([]) - Adds data to buffer - ", function(){
    it("begins with empty buffer", function(){
      expect(c.Data.dataBuffer.length).toEqual(0);
    });

    it("Adds Data to Buffer", function(){
      var data = [-3,-2,-1,0,1,2,3,4];
      c.addData(data);
      expect(c.Data.dataBuffer.length).toEqual(data.length);
    });

    it("Adds to non-empty buffer", function(){
      var data = [-3,-2,-1,0,1,2,3,4];
      c.addData(data);
      expect(c.Data.dataBuffer.length).toEqual(data.length);

      c.addData(data);
      expect(c.Data.dataBuffer.length).toEqual( 2 * data.length);
    });

    it("doesnt skip any datapoints", function(){
      var data = [-3,-2,-1,0,1,2,3,4];
      c.addData(data);

      var newData = [5,6,7,8,9];
      c.addData(newData);
      for(var i = 0, j = -3; i < c.Data.dataBuffer.length; i++, j++){
        expect(c.Data.dataBuffer[i]).toEqual(j);
      }
      expect(c.Data.dataBuffer[0]).toEqual(-3); //Test endpoints
      expect(c.Data.dataBuffer[c.Data.dataBuffer.length - 1]).toEqual(9);
    });
  });

  describe("this.updateDataset() - flushes buffer, returns formatted pointArray",function(){
      beforeEach(function(){
        var data = [-3,-2,-1,0,1,2,3,4];
        c.addData(data);
      });
      describe("this.updateRawData() - flushes buffer", function(){
        it("clears buffer", function(){
          c.updateRawData();
          expect(c.Data.dataBuffer.length).toEqual(0);
        });
        it("adds all data to rawData", function(){
          var bufferLength_1 = c.Data.dataBuffer.length;
          c.updateRawData();
          expect(c.Data.rawData.length).toEqual(bufferLength_1);

          c.addData([1,2,3,4,5,6,7,8,9,10]);
          var bufferLength_2 = c.Data.dataBuffer.length;
          c.updateRawData();
          expect(c.Data.rawData.length).toEqual(bufferLength_1 + bufferLength_2);
        });

        it("updates rangeList", function(){
          //make sure all data from data buffer gets added to rangeList
          c.updateRawData(); //flush buffer

          c.addData([1,2,3,4,5,6,7,8,9,10]);
          expect(c.updateRawData().length).toEqual(10); //flushed buffer is of only data most recently added
          expect(c.Data.rangeList.length).toEqual(10 + 8); // sum of lengths of data added
          expect(c.Data.max).toEqual(4); //valid max and min - from first dataset added
          expect(c.Data.min).toEqual(-3);
        });
      });
      describe("this.updatePointArray(); - formats points for screen size - (fit to prevoius max and min)", function(){});

  });
  describe("this.Draw()", function(){});


/*      describe("", function(){});
      describe("", function(){});
      describe("", function(){});
      describe("", function(){});
      describe("", function(){});
*/

});
