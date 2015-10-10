
/*Example:

describe("Hello world", function() {
  it("says hello", function() {
    expect(helloWorld()).toEqual("Hello world!");
  });
});
*/

describe("Controller", function(){

      var c;
      beforeEach(function() {
        c = new Controller(10,500,1000);
      });




    it("creates controller object", function()
      {
        expect(c).toBeDefined();
      });

    it("creates data object", function()
      {
        expect(typeof c.Data).toEqual("object");
      });


    describe("Adds data to buffer - this.addData(data)", function()
      {
        it("adds to empty buffer", function()
          {
            expect(c.Data.dataBuffer.length).toEqual(0);
          });

        it("adds data to buffer",function()
          {
            var data = [1,2,4,4,7,8,2,4,0,-3,2,-5,10];
            c.addData(data)
            expect(c.Data.dataBuffer.length).toEqual(data.length);
          });
        it("adds data to non-empty buffer", function()
          {
            var data = [1,2,4,4,7,8,2,4,0];
            var prev_length = c.Data.dataBuffer.length;
            c.addData(data);
            expect(c.Data.dataBuffer.length - prev_length).toEqual(data.length);
          });
      });

      describe("Clears data from buffer, formats data, draws data - updatepointArr()", function()
        {

          beforeEach(function()
            {
              var data = [1,2,4,4,7,8,2,4,0];
              var data2 = [120,-10,3,2,6,-5,-10];
              c.addData(data); //add data to buffer
              c.addData(data2);
            });
          it("updates rawData and clears buffer - updateRawData()",function()
            {
              var length = c.Data.dataBuffer.length;
              c.updateRawData(); //flush buffer
              expect(c.Data.dataBuffer.length).toEqual(0); //cleared buffer
              expect(c.Data.rawData.length).toEqual(length); //added all of buffer to rawData
              expect(c.Data.rangeList.length).toEqual(length); //updates rangeList
              expect(c.Data.max).toEqual(120); //test max and min - initally sets max and min with first call to updateRawData()
              expect(c.Data.min).toEqual(-10);        //then max and min are stored in newMin and newMax to be utlized in Draw
            });

            it("calculates formatted x and y for current graph state returns pointArr - updatePointArray()", function()
              {
                c.clearData();

                var data1 = [1,1,1,1,1];
                var data2 = [1,2,3,4,5];
                var data3 = [4,5,6,7,8];
                var data4 = [-3,-3,-9,-5,-9];

                c.addData(data1);
                c.updateRawData();
                c.updatePointArray();

                c.addData([1]);
                c.updateRawData();
                c.updatePointArray();
                expect(c.Data.pointArray[c.Data.pointArray.length - 1].Y).toEqual(c.Data.pointArray[0].Y); //expect added point of equal value to have same height
                expect(c.Data.pointArray[c.Data.pointArray.length - 1].X).toBeGreaterThan(c.Data.displayHeight);//expect first point off screen

                c.clearData();

                c.addData(data2);
                c.updateRawData();
                c.updatePointArray();


                c.addData(data3);
                c.updateRawData();
                c.updatePointArray();


               expect(c.Data.pointArray[3].Y).toEqual(c.Data.pointArray[5].Y); //expect point with same value to have same y value. Testing array of not constant value

               c.addData(data4);
               c.updateRawData();
               c.updatePointArray();
               expect(c.Data.pointArray[c.Data.pointArray.length - 1].Y).toBeLessThan(c.Data.pointArray[0].Y); //expect min val to be min val
              });



        });



        describe("Moves new data into view, resizes lists, calculates max and min - draw()", function()
          {

            beforeEach(function()
              {
                var data = [1,-2,5,7,8,2,4,0,-2,6,2,-9,5,100,-3];
                c.addData(data);
                c.updateRawData();
                c.updatePointArray();
              });

            it("cleans up rangeList - manageRangeList()", function()
              {
                //remove clippings
                //make sure they are actually gone
                //check rangeList orderedList

                var clippings = [1];
                var flag = c.manageRangeList(clippings);
                console.log(c.Data.rangeList);
                console.log(flag);

              });
            it("removes off screen values pointArr and rawData", function(){});
            it("moves new data points on screen", function(){});
            it("scales for new range if necessary", function(){});


          });



          describe("Utilizes private methods",function()
            {
                it("utilizes binaryInsert - binaryInsert(arr, val, a, b)", function()
                  {
                    var orderedList = [-1,0,1,2,3,4,5];

                    for(var i = -20; i < 50; i++)
                      {
                        c.binaryInsert(orderedList,i,0,orderedList.length - 1);
                      }
                    for(var i = 0; i < orderedList.length - 1; i++)
                      {
                        expect(orderedList[i] <= orderedList[i+1]).toBeTruthy();
                      }
                  });

               it("updates range list - updateRangeList(inY)", function()
                  {
                  var unorderedList = [1,-1,3,4,-6,1,10,-10,-8,10];
                  var prev_length = c.Data.rangeList.length;

                  c.updateRangeList(unorderedList);
                  for(var i = 0; i < c.Data.rangeList.length - 1; i++)
                    {
                      expect(c.Data.rangeList[i] <= c.Data.rangeList[i+1]).toBeTruthy(); //list still ordered
                    }
                  expect(c.Data.rangeList.length == unorderedList.length + prev_length).toBeTruthy(); //all elements added

                  var unorderedList_2 = [-100,500,2039,3,5,-6,2,4,1];
                  prev_length = c.Data.rangeList.length;
                  c.updateRangeList(unorderedList_2);
                  for(var i = 0; i < c.Data.rangeList.length - 1; i++)
                    {
                      expect(c.Data.rangeList[i] <= c.Data.rangeList[i+1]).toBeTruthy(); //test still holds when data added to not empty array
                    }
                  expect(c.Data.rangeList.length == unorderedList_2.length + prev_length).toBeTruthy();

                  expect(c.Data.max).toEqual(10); //max and min hold true
                  expect(c.Data.min).toEqual(-10);
                });
            });


});
