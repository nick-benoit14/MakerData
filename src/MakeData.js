//---------------------current
      //working on draw();
          //manageRangeList
          //manageUpdates - resize pointArr & rawData

//---------------------TODO
      //Build Tests - MakeDataSpec.js
          //test updateDataset()
          //test manageUpdates()
          //test manageRangeList()


          //range changed flag? if update new Max and new Min if no change to range
          //if range = 0; plot straight line
//---------------------updates
     //take displayNum as argument to controller
     //added newMax and newMin. updated in updateRangeList min and max set to newMax and newMin in draw
//---------------------Notes

/*
        this.addData() - Adds data to dataBuffer
        this.updateDataset() - Flushes data buffer to raw_Data, updates rangeList max/min, draws all items off screen

              //updateRawData()
              //updatePointArray()
              //return PointArray;


        this.Draw() - shifts off screen obects into view and updates things that need to be updated
*/


function Controller(displayNum, height, width) //takes number of data points to be displayed as argument
    {
      var tolerance = 100; //margin on sides of viewing window
      height -= tolerance;
      width -= tolerance;
    

      this.Data =
        {
          "displayNum":displayNum, //number of points to be graphed
          "displayHeight":height, //height of viewing window upon creation
          "displayWidth":width, //width of viewing window upon creation
          "tolerance":tolerance, //margin of viewing window

          "rawData":[], //holds unformatted data - INDEXED CHRONOLOGICALLY
          "dataBuffer":[], //holds new data until added to rawData with updateDataset()
          "pointArray":[], //holds array of values returned to D3 to plot

          "rangeList":[], //holds ordered list of raw y values - INDEXED BY SIZE
          "max":undefined, //updates in draw - rawData and rangelist deleted in Draw
          "min":undefined,     //implement check values for max or min before deleting then update max and min
          "newMax":undefined, //holds new max and min value for use in Draw to fit all data
          "newMin":undefined  //initialized in updateRangeList
        };



      this.addData = function(data)  //takes array of data and passes it to dataBuffer
          {
            for(var i = 0; i < data.length; i++)
              {
                this.Data.dataBuffer.push(data[i]);
              }
          }


          //moves data from dataBuffer to rawData, sorts data
          //draws data formatted for last graph state
      this.updateDataset = function()
          {
            updateRawData();
            updatePointArray();
            return this.Data.pointArray; //use with d3.update(); draw off screen
          }

      this.Draw = function()
        {
          //recalcules x
          //recalculates y if necessary
          //resizes pointArray
          //resizes raw_Data
          //manages rangeList

          var redrawRangeflag = false;

          if(this.Data.min != this.Data.newMin || this.Data.max != this.Data.newMax){redrawRangeflag = true;} //recalculate y if new data added outside of current range



          if(this.Data.pointArray.length < this.Data.displayNum){return this.Data.pointArr;} //dont need to redraw any values
          else
            {

              redrawRangeflag = this.manageLists(); //returns true if max or min changed



              //need to redraw x values
              //may need to redraw y values

              for(var i = 0; i < this.Data.pointArr.length; i++) //recalculate values
                  {
                    if(redrawRangeflag)
                      {
                        //this.Data.pointArr[i].Y =
                      }

                     //this.Data.pointArr[i].X =

                  }

            }

          //return pointArr

        }
          //handles things that need to happen often
                    //updates dynamic variables
                          //calculates x and y for newMax and newMin and then replaces
                          //max and min with new values. newMax and NewMin set in updateRangeList
                    //recalculates points X & Y if necessary
                    //resizes PointArray to 10 after moving off unused dataPoints off screen
                    //resizes rawData as well


/*------------------Controller Methods --------------------------*/
      this.clearData = function()
        {
          this.Data.pointArray = [];
          this.Data.rawData = [];
          this.Data.rangeList = [];
          this.Data.dataBuffer = [];
          this.Data.max = undefined;
          this.Data.min = undefined;
          this.Data.newMax = undefined;
          this.Data.newMin = undefined;
        }
      this.binaryInsert = function(arr, val, a, b) //inserts val into ordered array
        {
          if(b < 0) b = 0;
          var m = Math.floor((a + b) / 2);

          if(a == b) //final value
            {

               if(arr[m] > val)arr.splice(m,0,val); //add to front of arr (arr[0])
               else arr.splice(m + 1,0,val); //add after arr[m]
               return;
            }

          if(arr[m] < val) this.binaryInsert(arr, val, m + 1, b);
          else this.binaryInsert(arr, val, a, m);
        }
        this.binaryDelete = function(arr, val, a, b) //inserts val into ordered array
          {
            if(b < 0) b = 0;
            var m = Math.floor((a + b) / 2);

            if(a == b) //final value
              {
                var flag = false;
                if(a == 0 || a == arr.length) flag = true; //if deleted from front or back of list return true
                 if(arr[m] > val)arr.splice(m-1,1); //add to front of arr (arr[0])
                 else arr.splice(m,1); //add after arr[m]
                 return flag;
              }
            if(arr[m] < val) this.binaryDelete(arr, val, m + 1, b);
            else this.binaryDelete(arr, val, a, m);
          }

      this.updateRangeList = function(inY) //takes array of raw Y values. adds it to sorted rangeList, update max and min
        {

          var min = inY[0];
          var max = inY[0];

          for(var i = 0; i < inY.length; i++)
            {
              if(inY[i] > max) max = inY[i];
              else if(inY[i] < min) min = inY[i];

              //add to rangeList
              this.binaryInsert(this.Data.rangeList, inY[i], 0, this.Data.rangeList.length - 1);
            }
            //update min and max - remains unchanged if all new ranges are in bounds
            if(max > this.Data.max || typeof this.Data.max == 'undefined') this.Data.newMax = max; //set new max and min if changes
            if(min < this.Data.min || typeof this.Data.min == 'undefined') this.Data.newMin = min;

            if(typeof this.Data.max == 'undefined') this.Data.max = max; //initialize if uninitialized
            if(typeof this.Data.min == 'undefined') this.Data.min = min;
        }

      this.manageRangeList = function(clippings)
        {
          var flag = false;
          for(var i = 0; i < clippings.length; i++)
            {
                flag = this.binaryDelete(this.Data.pointArray, clippings[i].Y);
                //if deleted max or min reset max and min
            }
          return flag;
        }

      this.updateRawData = function() //takes data from dataBuffer and pushes it to rawData
        {

          var raw_Y = []; //temporarily holds Y vales to be passed to updateRangeList()

          for(var i = 0; i < this.Data.dataBuffer.length; i++)
            {
              var val_Y = this.Data.dataBuffer[i];
              this.Data.rawData.push(val_Y);
              raw_Y.push(val_Y);
            }

            this.Data.dataBuffer = []; //resets databuffer
            this.updateRangeList(raw_Y); //updates max and min

        }
      this.updatePointArray = function()//draws data in rawData formatted for last graph
        {                                //state - add off screen to the right to make
                                          //data entrance smoother if no points on graph?

          //calculates formatted x and y for current graph state
          //fills pointArr with formatted values
          //returns pointArr to d3 client to draw off screen

          var val_X;
          var val_Y;
          var range;

            if(this.Data.max == this.Data.min){range = 1;}
            else{range = this.Data.max - this.Data.min;}

          for(var i = this.Data.pointArray.length, j = 0; j < this.Data.rawData.length; i++, j++)
            {
              val_X = ((this.Data.displayWidth / this.Data.displayNum) * i) + (this.Data.tolerance / 2);
              val_Y =   ((this.Data.rawData[j] - this.Data.min) * this.Data.displayHeight / range)
              + this.Data.tolerance / 2;
              this.Data.pointArray.push({"X":val_X,"Y":val_Y});
            }
          return this.Data.pointArray;
        }

     this.manageLists = function()
      {
        var clip = this.Data.pointArr - this.Data.displayNum;


        this.Data.pointArray.slice(0,clip); //resize pointArray
        var clippings = this.Data.rawData.slice(0,clip); //resize raw_Data

        rangeFlag = this.manageRangeList(clippings); //returns true if max or min changed

        return rangeFlag;

      }


    this.test = function()
      {
        var data = [1,2,3,4,5];
        this.addData(data);

        this.updateRawData();
        this.updatePointArray();
        console.log("height: " + this.Data.displayHeight);

        //this.addData(data);
        //this.updateRawData();
        //this.updatePointArray();
      }
}
