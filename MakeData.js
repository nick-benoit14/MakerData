//---------------------current
      //working on rangeListUpdate
      //working on updateRawData

//---------------------TODO
      //test updateRangeList
      //test addData


//---------------------updates
     //take displayNum as argument to controller
//---------------------Notes

/*
        this.addData() - Adds data to dataBuffer
        this.updateDataset() - Flushes data buffer to raw_Data, updates rangeList max/min, 

              //updateRawData()
              //updatePointArray()
              //return PointArray;


        this.Draw()
*/


function Controller(displayNum, height, width) //takes number of data points to be displayed as argument
    {
      var Data =
        {
          "displayNum":displayNum, //number of points to be graphed
          "displayHeight":height, //height of viewing window upon creation
          "displayWidth":width, //width of viewing window upon creation

          "rawData":[], //holds unformatted data - INDEXED CHRONOLOGICALLY
          "dataBuffer":[], //holds new data until added to rawData with updateDataset()
          "pointArray":[], //holds array of values returned to D3 to plot

          "rangeList":[], //holds ordered list of raw y values - INDEXED BY SIZE
          "max":undefined, //updates in updateRangeList - rawData and rangelist deleted in Draw
          "min":undefined     //implement check values for max or min before deleting then update max and min

        };



      this.addData = function(data)  //takes array of data and passes it to dataBuffer
          {
            for(var i = 0; i < data.length; i++)
              {
                dataBuffer.push(data[i]);
              }
          }


          //moves data from dataBuffer to rawData, sorts data
          //draws data formatted for last graph state
      this.updateDataset = function()
          {
            //updateRawData()
            //updatePointArray()
            //return PointArray;
          }

      this.Draw = function(){} //handles things that need to happen often
                    //updates dynamic variables
                    //recalculates points X & Y if necessary
                    //resizes PointArray to 10 after moving off unused dataPoints off screen
                    //resizes dataBank??


/*------------------Controller Methods --------------------------*/

      var binaryInsert = function(arr, val, a, b) //inserts val into ordered array
        {
          if(b < 0) b = 0;
          var m = Math.floor((a + b) / 2);

          if(a == b) //final value
            {

               if(arr[m] > val)arr.splice(m,0,val); //add to front of arr (arr[0])
               else arr.splice(m + 1,0,val); //add after arr[m]
               return;
            }

          if(arr[m] < val) binaryInsert(arr, val, m + 1, b);
          else binaryInsert(arr, val, a, m);
        }
      var updateRangeList = function(inY) //takes array of raw Y values. adds it to sorted rangeList, update max and min
        {

          var min = inY[0];
          var max = inY[0];

          for(var i = 0; i < inY.length; i++)
            {
              if(inY[i] > max) max = inY[i];
              else if(inY[i] < min) min = inY[i];

              //add to rangeList
              binaryInsert(Data.rangeList, inY[i], 0, Data.rangeList.length - 1);
            }
            //update min and max - remains unchanged if all new ranges are in bounds
            if(max > Data.max) Data.max = max;
            if(min < Data.min) Data.min = min;
        }




      var updateRawData = function() //takese data from dataBuffer and pushes it to rawData
        {

          var raw_Y = []; //temporarily holds Y vales to be passed to updateRangeList()

          for(var i = 0; i < dataBuffer.length; i++) //updateRawData
            {
              var val_Y = dataBuffer[i];

              rawData.push(val_Y);
              raw_Y.push(val_Y);

            }

            updateRangeList(format_Y);

        }

      var updatePointArray = function(){}//draws data in rawData formatted for last graph state - add off screen to the right to make data entrance smoother if no points on graph?
      function Point(){} //stores x and y value to be graphed
//-------------------------------------Testing

this.test = function()
  {
      var arr = [1,2,3,4,5];

      updateRangeList(arr);

      var arr2 = [3,4,6,3,1];
      updateRangeList(arr2);


      console.log(Data.rangeList);








  }


this.test();

    }
