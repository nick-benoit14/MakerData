//Take JSON data produced by weather station and display using D3


var testData = [
  {"Temperature":0.00, "Pressure":50.00, "Humidity":10},
  {"Temperature":0.00, "Pressure":50.00, "Humidity":20},
  {"Temperature":0.00, "Pressure":50.00, "Humidity":30},
  {"Temperature":0.00, "Pressure":50.00, "Humidity":40}
  /*{"Temperature":0.00, "Pressure":50.00, "Humidity":50},
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
  {"Temperature":0.00, "Pressure":50.00, "Humidity":10}*/

];

function Controller(Data){

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


  this.getSlope = function(PointA, PointB){
      if(PointA.PointFlag && PointB.PointFlag){
              var Y = PointB.getY()-PointA.getY();
              var X = PointB.getX()-PointA.getX();
              var slope = Infinity;
            if(X != 0) slope = Y/X;

            return slope;
          }
      else{console.log("Cannot Calculate Slope of Non-Point Object \n");}}

  this.getData = function(index, X, Y){
    var PointArr = []; //Pointer to Selected Data Type

    var R = 5;
    X -= R;
    Y -= R;
    //Format Data from raw data to fit on screen
    var range_1 = Databank[0][index][0] - Databank[0][index][1];
    //console.log("Range: " + range);


    if(index > Object.keys(Data[0]).length){
        console.log("getData: Index Out Of Bounds! \n");
        return;}
    else{

       for(var i = 0; i < Databank[index].length; i++){
         //set appropriate range
         var range = ((Databank[index][i] * Y) / range_1)- (2*R);
         console.log("Range: " + range);

         PointArr.push(range);
       }

        return PointArr;
    }}




}
