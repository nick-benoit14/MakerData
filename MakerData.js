//Take JSON data produced by weather station and display using D3


//develop Stream Data
//add Numeric Markers

//calculate range for last 10 data points
//look at notes in draw
//develop viewMOde 1

//updates------------------
  //stored prev_dataLength in data object
  //sets newDataFlag if aspect changes

var testData = [
  {"Temperature":0.00, "Pressure":50.00, "Humidity":10},
  {"Temperature":0.00, "Pressure":50.00, "Humidity":20},
  {"Temperature":0.00, "Pressure":50.00, "Humidity":30},
  {"Temperature":0.00, "Pressure":50.00, "Humidity":40}

/*  {"Temperature":0.00, "Pressure":50.00, "Humidity":50},
  {"Temperature":0.00, "Pressure":50.00, "Humidity":60},
  {"Temperature":0.00, "Pressure":50.00, "Humidity":60},
  {"Temperature":0.00, "Pressure":50.00, "Humidity":50},
  {"Temperature":0.00, "Pressure":50.00, "Humidity":40},
  {"Temperature":0.00, "Pressure":50.00, "Humidity":30},
  {"Temperature":0.00, "Pressure":50.00, "Humidity":20},
  {"Temperature":0.00, "Pressure":50.00, "Humidity":10},
  {"Temperature":0.00, "Pressure":50.00, "Humidity":0},
  {"Temperature":0.00, "Pressure":50.00, "Humidity":10},
  {"Temperature":0.00, "Pressure":50.00, "Humidity":20},
  {"Temperature":0.00, "Pressure":50.00, "Humidity":30},
  {"Temperature":0.00, "Pressure":50.00, "Humidity":40},
  {"Temperature":0.00, "Pressure":50.00, "Humidity":50},
  {"Temperature":0.00, "Pressure":50.00, "Humidity":60},
  {"Temperature":0.00, "Pressure":50.00, "Humidity":60},
  {"Temperature":0.00, "Pressure":50.00, "Humidity":50},
  {"Temperature":0.00, "Pressure":50.00, "Humidity":40},
  {"Temperature":0.00, "Pressure":50.00, "Humidity":30},
  {"Temperature":0.00, "Pressure":50.00, "Humidity":20},
  {"Temperature":0.00, "Pressure":50.00, "Humidity":10}
*/
];

/*
  ViewMode -
        0 - fit all data to view port
        1 - view only most recent 10 data points
*/

function Controller(viewMode, X_View, Y_View){


    var mode = viewMode;
    var tolerance = 100;

    var Data = {
              "reDrawRangeFlag":[],
              "newDataFlag"  : [], /*set to true when addData() called*/
              "newData"  : [],
              "max"  : [],
              "min"  : [],
              "current_min":[],
              "current_max":[],
              "buffer":[],
              "prev_dataLength":[],
              "X_View":X_View -= tolerance,
              "Y_View":Y_View -= tolerance,
              "fields":0,
              "tolerance":100,
              "viewMode":viewMode


               };
      var PointArr = [];
      var Databank = [];

  this.addData = function(data){

      //add data to correct buffers
      //set appropriate flags to true
      if(Databank.length == 0) //initialize fields if not initialized
        {
          Data.fields = Object.keys(data[0]).length;
          for(var j = 0; j < Data.fields; j++)
             {
               Databank.push([]);
               Data.newDataFlag.push(false);
               Data.newData.push(0);
               Data.max.push(undefined);
               Data.min.push(undefined);
               Data.current_min.push(undefined);
               Data.current_max.push(undefined);
               Data.buffer.push([]);
               Data.prev_dataLength.push(undefined);
             }
        }
      for(var i = 0; i <  data.length; i++)
          {
            Data.buffer[0].push(data[i].Temperature);
            Data.newData[0]++;
          }
      Data.max[0] = Data.buffer[0][0];
      Data.min[0] = Data.buffer[0][0];
      Data.newDataFlag[0] = true;

      for(var i = 0; i < data.length; i++)
          {
            Data.buffer[1].push(data[i].Pressure);
            Data.newData[1]++;
          }
      Data.max[1] = Data.buffer[1][0];
      Data.min[1] = Data.buffer[1][0];
      Data.newDataFlag[1] = true;

      for(var i = 0; i < data.length; i++)
          {
            Data.buffer[2].push(data[i].Humidity);
            Data.newData[2]++;
          }
      Data.max[2] = Data.buffer[2][0];
      Data.min[2] = Data.buffer[2][0];
      Data.newDataFlag[2] = true;

    }

  this.updateDataSet = function(index) //Take new Data from buffer and add it to PointArr

    {

      for(var i = 0; i < Data.newData[index]; i++) //find new data range
          {
            if(Data.buffer[index][i] < Data.min[index])
                {
                  Data.min[index] = Data.buffer[index][i];
                  Data.reDrawRangeFlag[index] = true;
                }
            if(Data.buffer[index][i] > Data.max[index])
                {
                  Data.max[index] = Data.buffer[index][i];
                  Data.reDrawRangeFlag[index] = true;
                }
            Databank[index].push(Data.buffer[index][i]);

          }
     if(Data.viewMode == 0)
        {
          var dataLength;
          if(PointArr.length > 0){dataLength = PointArr.length;} //if PointArr empty add first data from buffer
          else{dataLength = Data.buffer[index].length;}

          var dataRange = Data.max[index] - Data.min[index];
          var j = Databank[index].length;
          var X_Increment = (Data.X_View / dataLength)

          for(var i = 0; i <  Data.newData[index]; i++)
                {
                  Data.prev_dataLength[index] = X_Increment;
                  var val_Y = (((Databank[index][i] - Data.min[index]) * Data.Y_View) / dataRange) + (Data.tolerance / 2);
                  //var val_X = ((Data.X_View / dataLength) * i) + ((Data.X_View / dataLength) / 2);
                  var val_X = (j * X_Increment) + (X_Increment / 2) + (Data.tolerance / 2);
                  PointArr.push({"X":val_X, "Y":val_Y});
                  j++;
                }
        }
/*     else if(Data.ViewMode == 1)
        {
          //var dataRange = Data.max[index] - Data.min[index];
          var dataRange =
          var dataLength = 10;
          var X_Increment = (Data.X_View / dataLength)


          var j = dataLength;
          for(var i = 0; i <  Data.newData[index]; i++)
                {
                  Data.prev_dataLength[index] = X_Increment;
                  var val_Y = (((Databank[index][i] - Data.min[index]) * Data.Y_View) / dataRange) + (Data.tolerance / 2);
                  //var val_X = ((Data.X_View / dataLength) * i) + ((Data.X_View / dataLength) / 2);
                  var val_X = (j * X_Increment) + (X_Increment / 2) + (Data.tolerance / 2);
                  PointArr.push({"X":val_X, "Y":val_Y});
                  j++;
                }

        }
*/

      Data.newData[index] = 0;
      Data.buffer[index] = [];
      return PointArr;
    }


  this.Draw = function(index, X_View, Y_View) //returns array of objects containing x and y to be graphed
    {
      if(X_View - Data.tolerance != Data.X_View)
          {Data.newDataFlag[index] = true;}
      if(Y_View - Data.tolerance != Data.Y_View)
          {
            Data.newDataFlag[index] = true;
            Data.reDrawRangeFlag[index] = true;
          }
      Data.X_View = X_View-= Data.tolerance;
      Data.Y_View = Y_View-= Data.tolerance;

        if(viewMode == 0) //fit all data
            {
                if(Data.newDataFlag[index]) //new data must be processed
                    { //recalculate x and y values

                    var dataLength = Databank[index].length;
                    var dataRange = Data.max[index] - Data.min[index];
                    var X_Increment = (Data.X_View / dataLength)

                       if(Data.reDrawRangeFlag[index]) //recalculate y and x values
                          {
                            var dataRange = Data.max[index] - Data.min[index];
                            for(var i = 0; i < dataLength; i++)
                                {
                                    var val_Y = (((Databank[index][i] - Data.min[index]) * Data.Y_View) / dataRange) + (Data.tolerance / 2);
                                    var val_X = (i * X_Increment) + (X_Increment / 2) + (Data.tolerance / 2);
                                    PointArr[i] = {"X":val_X, "Y":val_Y};
                                }
                            Data.reDrawRangeFlag[index] = false;
                          }
                       else //recalculate x values
                          {
                            for(var i = 0; i < dataLength; i++)
                                {
                                      var val_X = (i * X_Increment) + (X_Increment / 2) + (Data.tolerance / 2);
                                      PointArr[i].X = val_X;
                                }

                          }
                      Data.newDataFlag[index] = false;

                      return PointArr;
              }
          else //no new data
              {return PointArr;}
        }
/*    else if(viewMode == 1)//stream latest ten data points
        {

          //recalculate dataRange only last 10 digits
          //array.shift() to remove objects from front of array

          //update adds new point
          //draw shifts them over and removes last point

          //calculate range in draw function initialize to

          if(newDataFlag[index])
              {
                //var dataLength = Databank[index].length;
                var dataLength = 10;
                var dataRange = Data.max[index] - Data.min[index];
                //var X_Increment = (Data.X_View / dataLength)
                var X_Increment = Data.x_View / 10;


                if(Data.reDrawRangeFlag[index]) //recalculate y and x values
                      {
                        //var dataRange = Data.max[index] - Data.min[index];
                        var dataRange =
                        for(var i = 0; i < dataLength; i++)
                            {
                                var val_Y = (((Databank[index][i] - Data.min[index]) * Data.Y_View) / dataRange) + (Data.tolerance / 2);
                                var val_X = (i * X_Increment) + (X_Increment / 2) + (Data.tolerance / 2);
                                PointArr[i] = {"X":val_X, "Y":val_Y};
                            }
                        Data.reDrawRangeFlag[index] = false;
                      }
                   else //recalculate x values
                      {
                        for(var i = 0; i < dataLength; i++)
                            {
                                  //var val_X = PointArr[i].X * ( Data.prev_dataLength[index] / dataLength)  + (Data.tolerance / 2);
                                  var val_X = (i * X_Increment) + (X_Increment / 2) + (Data.tolerance / 2);
                                  PointArr[i].X = val_X;
                            }

                      }



            }
          else{return PointArr;}

        }
*/
   }
}
