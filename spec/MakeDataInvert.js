/* Test Makedata Outputting Inverted values for SVG */

describe("Controller - Standard Output", function(){

  var c;
  beforeEach(function() {
    c = new Controller(10,500,1000, false, 0);
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
    describe("manageRangeList([]) - removes values from rangeList", function(){
      it("removes all values from list", function(){
        var data = [1,2,3,4,5,6,0,-10];
        var clippings = [0];
        c.updateRangeList(data);
        c.manageRangeList(clippings);
        for(var i = 0; i < c.Data.rangeList.length; i++) expect(c.Data.rangeList[i]).not.toEqual(0);
        clippings = [-10];
        c.manageRangeList(clippings);
        for(var i = 0; i < c.Data.rangeList.length; i++) expect(c.Data.rangeList[i]).not.toEqual(-10);

        clippings = [6];
        c.manageRangeList(clippings);
        for(var i = 0; i < c.Data.rangeList.length; i++) expect(c.Data.rangeList[i]).not.toEqual(6);

        clippings = [1,2,3,4,5];
        c.manageRangeList(clippings);
        expect(c.Data.rangeList.length).toEqual(0);
      });
      it("returns correct flag", function(){
        var data = [1,2,3,4,5,6,0,-10];
        var clippings = [0];
        c.updateRangeList(data);
      var flag =  c.manageRangeList(clippings);
        expect(flag).not.toBeTruthy();

        clippings = [-10];
        flag =  c.manageRangeList(clippings);
        expect(flag).toBeTruthy();

       clippings = [5];
       flag =  c.manageRangeList(clippings);
       expect(flag).not.toBeTruthy();

       clippings = [6];
       flag =  c.manageRangeList(clippings);
       expect(flag).toBeTruthy();
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

    describe("binaryDelete(arr, val, a, b)", function(){
      it("removes all values", function(){
        var orderedList = [-5,-4,-3,-2,-1,0,1,2,3,4];
        var length = orderedList.length;
        c.binaryDelete(orderedList, 0,0,orderedList.length - 1);
        expect(orderedList.length).toEqual(length - 1);
        for(var i = 0; i < orderedList.length; i++)expect(orderedList[i]).not.toEqual(0);

        orderedList = [-5,-4,-3,-2,-1,0,1,2,3,4];
        while(orderedList.length > 0){
          var val = Math.floor(Math.random() * orderedList.length);
          c.binaryDelete(orderedList, val, 0, orderedList.length - 1);
          for(var i = 0; i < orderedList.length; i++)expect(orderedList[i]).not.toEqual(val);
        }

        orderedList = [-5,-4,-3,-2,-1,0,1,2,3,4];
        c.binaryDelete(orderedList, -5, 0, orderedList.length - 1);
        c.binaryDelete(orderedList, 4, 0, orderedList.length - 1);
        for(var i = 0; i < orderedList.length; i++)expect(orderedList[i]).not.toEqual(-5);
        for(var i = 0; i < orderedList.length; i++)expect(orderedList[i]).not.toEqual(4);
      });
      it("returns true if removes max or min", function(){
        orderedList = [-5,-4,-3,-2,-1,0,1,2,3,4];
        var flag = c.binaryDelete(orderedList, -5, 0, orderedList.length - 1);
        expect(flag).toBeTruthy();

        flag = c.binaryDelete(orderedList, 0, 0, orderedList.length - 1);
        expect(flag).not.toBeTruthy();

        flag = c.binaryDelete(orderedList, 4, 0, orderedList.length - 1);
        expect(flag).toBeTruthy();
      });
    });
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
      describe("this.updatePointArray(); - formats points for screen size - (fit to prevoius max and min)", function(){
        it("pushes all values to pointArray", function(){
          c.addData([1,2,3,4,5,6,7,8,9,10]);
          c.updateRawData();

          c.updatePointArray();
          expect(c.Data.pointArray.length).toEqual(10 + 8);

          c.addData([1,2,3,4,5,6,7,8,9,10]);
          c.updateRawData();
          c.updatePointArray();
          expect(c.Data.pointArray.length).toEqual(10 + 10 + 8); //sum of all arrays added
        });

        it("calculates X for DisplayNum", function(){
          c.addData([1,2,3,4,5,6,7,8,9,10]);
          c.updateRawData();
          var pointarray = c.updatePointArray();

          expect(pointarray[0].X).toEqual(0); //min at extreme of viewport
          expect(pointarray[9].X).toEqual(c.Data.displayWidth); //max at extreme of viewport
        });

        it("calculates Y for range", function(){
          c.updateRawData();
          c.updateDataset();
        var pointarray = c.updatePointArray();
            expect(pointarray[0].Y).toEqual(c.Data.displayHeight); //min and max at margins of viewport
            expect(pointarray[pointarray.length - 1].Y).toEqual(0);
        });

        it("gives padding on viewport", function(){
          var d = new Controller(10,500,1000, false, 100);

          var data = [-3,-2,-1,0,1,2,3,4];
          d.addData(data);
          d.updateRawData();
          var pointarray = d.updatePointArray();

          expect(pointarray[0].Y).toEqual(c.Data.displayHeight - (d.Data.tolerance / 2)); //min and max at margins of viewport + padding
          expect(pointarray[pointarray.length - 1].Y).toEqual(d.Data.tolerance / 2);
        });
      });

      describe("calls method updateDataset()", function(){
        it("updateDataset()", function(){
          c.updateDataset();
          var prevLenvth = c.Data.pointArray.length;
          var prevMax = c.Data.max;
          var prevMin = c.Data.min;

          expect(c.Data.pointArray.length).toEqual(8); //added in beforeEach

          var data = [-1000,1000,4,5,7,420,-200,900,6,3,2,7,3,5,-3,2,0,2,5];
          c.addData(data);
          var pointarray = c.updateDataset();

          expect(c.Data.pointArray.length).toEqual(8 + data.length);//point array of cumulative length
          expect(c.Data.max).toEqual(prevMax);
          expect(c.Data.min).toEqual(prevMin);
          expect(c.Data.pointArray[0].Y).toEqual(c.Data.displayHeight); //prev max and min
          expect(c.Data.pointArray[7].Y).toEqual(0);

          expect(c.Data.pointArray[8].Y).toBeGreaterThan(c.Data.displayHeight); //new max and min off screen
          expect(c.Data.pointArray[9].Y).toBeLessThan(c.Data.displayHeight);
        });
      });

  });
  describe("this.Draw(height, width)", function(){
    beforeEach(function(){
      c.addData([-5,-4,-3,-2,-1,0,1,2,3,4]); //length 10
      c.updateDataset();
    });
    describe("updateState(height, width) - updatesControllerState", function(){
      //report viewport changes
        it("tracks changes in viewport size", function(){
          var flag = c.updateState(600,1000);
          expect(flag).toBeTruthy();

          flag = c.updateState(600,1000);
          expect(flag).not.toBeTruthy();

          flag = c.updateState(500,1000);
          expect(flag).toBeTruthy();

          flag = c.updateState(500,1100);
          expect(flag).toBeTruthy();

          flag = c.updateState(500,1100);
          expect(flag).not.toBeTruthy();

          flag = c.updateState(500,900);
          expect(flag).toBeTruthy();
        });
        it("finds changes in max and min", function(){
          var flag = c.updateState(500,1000);
          expect(flag).not.toBeTruthy();

          c.addData([-1000]);
          c.updateDataset();
          flag = c.updateState(500,1000);
          expect(flag).toBeTruthy();

          flag = c.updateState(500,1000);
          expect(flag).not.toBeTruthy();

          c.addData([1000]);
          c.updateDataset();
          flag = c.updateState(500,1000);
          expect(flag).toBeTruthy();
        });
        it("sets updates max and min", function(){
          c.updateDataset();
          c.updateState(500,1000);
          expect(c.Data.max).toEqual(4);
          expect(c.Data.min).toEqual(-5); //max and min are max and min added

          c.addData([1000,0,-1000]);
          c.updateDataset();
          expect(c.Data.newMin).toEqual(-1000);
          expect(c.Data.newMax).toEqual(1000);
          expect(c.Data.max).toEqual(4);
          expect(c.Data.min).toEqual(-5); //new max and min added to newMax and newMin

          var flag = c.updateState(500,1000);
          expect(flag).toBeTruthy();
          expect(c.Data.max).toEqual(1000);
          expect(c.Data.min).toEqual(-1000);
          expect(c.Data.newMin).toEqual(-1000);
          expect(c.Data.newMax).toEqual(1000); //max & min = newMax & newMin
        });
    });
    describe("manageLists() - resizes lists", function(){
      it("removes correct values", function(){
        c.manageLists();
        expect(c.Data.pointArray.length).toEqual(10);

        c.addData([0,1,2,3,4,5,6,7,8,9]);
        c.updateDataset();
        expect(c.Data.pointArray.length).toEqual(20);
        c.manageLists();
        expect(c.Data.pointArray.length).toEqual(10);

        expect(c.Data.rawData[0]).toEqual(0); //removed entire first array
        c.addData([7,8,9]);
        c.updateDataset();
        c.manageLists();
        expect(c.Data.rawData[0]).toEqual(3); //removed entire first array
      });
      it("returns correct rangeflag", function(){

        c.addData([5,1,2,3,4,5,6,7,8,9]);
        c.updateDataset();

        var flag = c.manageLists();
        expect(flag).toBeTruthy();

        c.addData([3]);
        c.updateDataset();
        flag = c.manageLists();
        expect(flag).not.toBeTruthy();
      });
      it("sets min and max", function(){
        expect(c.Data.min).toEqual(-5);
        expect(c.Data.max).toEqual(4);

        c.addData([10,0,0,0,0,0,0,0,0,0]);
        c.updateDataset();
        c.manageLists();
        c.updateState(500,1000);

        expect(c.Data.max).toEqual(10);
        expect(c.Data.min).toEqual(0);
      });
    });
    describe("redrawPoints() - redraws points", function(){
      it("redraws points correctly", function(){
        expect(c.Data.pointArray[0].Y).toEqual(500);
        c.addData([4,5,6,7,8,9,10,11,12,13]); //length 10
        c.updateDataset();
        c.manageLists();
        c.updateState(500,1000);
        c.redrawPoints();
        expect(c.Data.pointArray[0].Y).toEqual(500);

        c.addData([1000,-1000]);
        c.updateDataset();
        c.manageLists();
        c.updateState(500,1000);
        c.redrawPoints();
        expect(c.Data.pointArray[9].Y).toEqual(c.Data.displayHeight);
        expect(c.Data.pointArray[8].Y).toEqual(0);
      });
    });
    describe("Draw(height, width) - calls function", function(){

    it("scales with viewport", function(){console.log(c.Draw(500,1000))});
    });
  });
});
