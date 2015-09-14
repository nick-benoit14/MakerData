//Take JSON data produced by weather station and display using D3


//develop Stream Data
//add Numeric Markers



var testData = [
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

];

function Controller(Data){


    var PointArr = [];
    var Databank = [];
        Databank[0] = [];
//Read data

       //create variable titled with object fields that == index of databank array
       for(var j = 1; j <= Object.keys(Data[0]).length; j++){
            Databank.push([]);
          }

          var max = Data[0].Temperature;
          var min = Data[0].Temperature;

  for(var i = 0; i < Data.length; i++){
      if(Data[i].Temperature > max) max = Data[i].Temperature;
      if(Data[i].Temperature < min) min = Data[i].Temperature;
      Databank[1].push(Data[i].Temperature);
      }
      Databank[0][1] = [];
      Databank[0][1][0] = max;
      Databank[0][1][1] = min;


         max = Data[0].Pressure;
         min = Data[0].Pressure;
 for(var i = 0; i < Data.length; i++){
      if(Data[i].Pressure > max) max = Data[i].Pressure;
      if(Data[i].Pressure < min) min = Data[i].Pressure;
      Databank[2].push(Data[i].Pressure);}
      Databank[0][2] = [];
      Databank[0][2][0] = max;
      Databank[0][2][1] = min;


       max = Data[0].Pressure;
       min = Data[0].Pressure;
  for(var i = 0; i < Data.length; i++){
      if(Data[i].Humidity > max) max = Data[i].Humidity;
      if(Data[i].Humidity < min) min = Data[i].Humidity;
      Databank[3].push(Data[i].Humidity);}
      Databank[0][3] = [];
      Databank[0][3][0] = max;
      Databank[0][3][1] = min;



  console.log("New Controller Reporting with: " + Object.keys(Data[0]).length + " Fields!");

  this.addData = function(data){
    //check to see if array
    //if - array

//------Parse Temperature-----------------
                var max = Databank[0][1][0];
                var min = Databank[0][1][1]

            for(var i = 0; i < data.length; i++){
                if(data[i].Temperature > max) max = data[i].Temperature;
                if(data[i].Temperature < min) min = data[i].Temperature;
                Databank[1].push(data[i].Temperature);
                }

              Databank[0][1][0] = max;
              Databank[0][1][1] = min;
//-----Parse Pressure-----------------------
               max = Databank[0][2][0];
               min = Databank[0][2][1]

          for(var i = 0; i < data.length; i++){
              if(data[i].Pressure > max) max = data[i].Pressure;
              if(data[i].Pressure < min) min = data[i].Pressure;
              Databank[2].push(data[i].Pressure);
              }

            Databank[0][2][0] = max;
            Databank[0][2][1] = min;

//-----Parse Humidity-----------------------
               max = Databank[0][3][0];
               min = Databank[0][3][1]

          for(var i = 0; i < data.length; i++){
              if(data[i].Humidity > max) max = data[i].Humidity;
              if(data[i].Humidity < min) min = data[i].Humidity;
              Databank[3].push(data[i].Humidity);
              }

            Databank[0][3][0] = max;
            Databank[0][3][1] = min;
    }

/*
  ViewMode -
        0 - fit all data to view port
        1 - view only most recent 10 data points

*/
  this.Data = function(viewMode,index, X_View, Y_View)
    {
      //init data function that calculates range and stores data
      //if Range != Range then recalculate range
            //reformat data

        PointArr = [];
        var tolerance = 100;
        X_View -= tolerance;
        Y_View -= tolerance;

        var dataLength = Databank[index].length;
        var dataRange = 0;
        var R = 5;


        if(viewMode == 0) /*fit all data to screen*/
          {
               //dataRange = Databank[0][index][0] - Databank[0][index][1]; //Max - Min
               var min = Databank[0][index][1];
               var max = Databank[0][index][0];
               dataRange = max - min;

                 for(var i = 0; i < dataLength; i++)
                       {
                           //var val_Y = (((Databank[index][i] - min) * Y_View) / (dataRange - min)) + (tolerance / 2); // + ((Y_View / dataRange) / 2);// - ((Y_View / dataRange)/2);// + (2*R);
                           var val_Y = (((Databank[index][i] - min) * Y_View) / dataRange) + (tolerance / 2); // + ((Y_View / dataRange) / 2);// - ((Y_View / dataRange)/2);// + (2*R);

                           var val_X = ((X_View / dataLength) * i) + ((X_View / dataLength)/2);
                           PointArr.push({"X":val_X, "Y":val_Y});
                       }
                  return PointArr;
        }

      if(viewMode == 1) /*fit last 10 data points to screen*/
        {
               var plotLength = dataLength - 10;
               var max = Databank[index][plotLength];
               var min = Databank[index][plotLength];
               for(var i = plotLength + 1; i < dataLength; i++)
                  {
                    if(Databank[index][i] > max) max = Databank[index][i];
                    if(Databank[index][i] < min) min = Databank[index][i];
                  }
               var dataRange = max - min;

               for(var i = plotLength, j = 0; i < dataLength; i++, j++)
                  {
                    //var val_Y = (((Databank[index][i] - min) * Y_View) / (dataRange - min)) + (tolerance / 2); // + ((Y_View / dataRange) / 2);// - ((Y_View / dataRange)/2);// + (2*R);
                    var val_Y = (((Databank[index][i] - min) * Y_View) / dataRange) + (tolerance / 2); // + ((Y_View / dataRange) / 2);// - ((Y_View / dataRange)/2);// + (2*R);
                    var val_X = ((X_View / 10) * j) + ((X_View / 20) + (tolerance / 2));
                    PointArr.push({"X":val_X, "Y":val_Y});
                  }

                return PointArr;
      }
  }
}
