
const postStepA = () => {
    
    var payloadA = {
        regNo: $("#input1").val(),
        fname: $("#input2").val(),
        middlename: $("#input3").val(),
        lastname: $("#input4").val(),
        dob: $("#input5").val(),
        gender: $("#input6").val(),
        nationality: $("#input7").val(),
        picture: $("#input8").val(),
    
    };

    //let save it on localstorage
    localStorage.setItem("payloadA", JSON.stringify(payloadA));
    window.location.replace("http://localhost:4000/step_b");
  }

  const postStepB = () => {

        var payloadB = {
            parentid: $("#input1").val(),
            fname: $("#input2").val(),
            middlename: $("#input3").val(),
            lastname: $("#input4").val(),
            dob: $("#input5").val(),
            gender: $("#input6").val(),
            birthplace: $("#input7").val(),
        
        };
    
        //let save it on localstorage
        localStorage.setItem("payloadB", JSON.stringify(payloadB));
        window.location.replace("http://localhost:4000/step_c");
      }

      const postStepC = () => {
       
            var payloadC = {
                spouseid: $("#input1").val(),
                fname: $("#input2").val(),
                middlename: $("#input3").val(),
                lastname: $("#input4").val(),
                dob: $("#input5").val(),
                nationality: $("#input6").val(),
            
            
            };
        
            //let save it on localstorage
            localStorage.setItem("payloadC", JSON.stringify(payloadC));
            window.location.replace("http://localhost:4000/step_d");
          }
    
          const postStepD = () => {
          
                var payloadD = {
                    witnessid: $("#input1").val(),
                    fname: $("#input2").val(),
                    middlename: $("#input3").val(),
                    lastname: $("#input4").val(),
                    contact: $("#input5").val(),
                    identificaiton: $("#input6").val(),
                
                
                };
            
                //let save it on localstorage
                localStorage.setItem("payloadD", JSON.stringify(payloadD));
                window.location.replace("http://localhost:4000/step_e");
              }


 const postStepE = () => {
            
                    var payloadE = {
                        EventId: $("#input1").val(),
                        EventType: $("#input2").val(),
                        Location: $("#input3").val(),
                    
                    };
              
                    //let save it on localstorage
                    localStorage.setItem("payloadE", JSON.stringify(payloadE));
                    window.location.replace("http://localhost:4000/step_f");
                  }

     const postStepF = () => {
                   
                        var payloadF = {
                            DocumentId: $("#input1").val(),
                            Description: $("#input2").val(),
                            File: $("#input3").val(),
                        
                        };
                    
                        //let save it on localstorage
                        localStorage.setItem("payloadF", JSON.stringify(payloadF));
                        if(payloadE.Location==1)
                        {
                        
                           save();
                        }
                        else if(payloadE.Location==2)
                        {
                            
                            saveToLan();
                        }
                        else if(payloadE.Location==3)
                        {
                           
                            saveToRemoteLan();
                        }
                       
                        window.location.replace("http://localhost:4000/step_a");
                      }
    //lets get our  payloads
    const payloadA =  JSON.parse(localStorage.getItem("payloadA"));
    const payloadB =  JSON.parse(localStorage.getItem("payloadB"));
    const payloadC =  JSON.parse(localStorage.getItem("payloadC"));
    const payloadD =  JSON.parse(localStorage.getItem("payloadD"));
    const payloadE =  JSON.parse(localStorage.getItem("payloadE"));
    const payloadF =  JSON.parse(localStorage.getItem("payloadF"));

    function save()
    {
       
        $.ajax({
            url: '/inputData',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data_inputs),
            success: function (response) {
         
              
                // for(var i=0; i<response.length;i++)
                // {
                //     $('#r').append(`<div>${response[i].RegistrationNo} ${response[i].fname}</div>`)
                   
                // }
           
              
            },
            error: function (response) {
                alert("error")
            }
        })
      

    }

    function saveToLan()
    {
        $.ajax({
            url: '/inputDataLan',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data_inputs),
            success: function (response) {
                console.log(response);
    
                // for(var i=0; i<response.length;i++)
                // {
                //     $('#r').append(`<div>${response[i].RegistrationNo} ${response[i].fname}</div>`)
                   
                // }
           
              
            },
            error: function (response) {
                alert("error")
            }
        })
      

    }

// replicate both in remote and lan databases 
    function saveToRemoteLan()
    {
       
        $.ajax({
            url: '/inputDataBoth',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data_inputs),
            success: function (response) {
                console.log(response);
    
                // for(var i=0; i<response.length;i++)
                // {
                //     $('#r').append(`<div>${response[i].RegistrationNo} ${response[i].fname}</div>`)
                   
                // }
           
              
            },
            error: function (response) {
                alert("error")
            }
        })
      

    }

    var data_inputs = {
        stepA: payloadA,
        stepB: payloadB,
        stepC: payloadC,
        stepD: payloadD,
        stepE: payloadE,
        stepF: payloadF,

    }
    
    // reports 

const PostReport = () => {

       
        var payloadReport = {
            Location: $("#input9").val(),
        
        };
     
            
            if(payloadReport.Location==1)  //Arada
            {
              $('#r').empty(); // Empty the div before appending new content
              $.ajax({
                url: '/ReportArada',
                type: 'GET',
                contentType: 'application/json',
                success: function (response) {
              
                 
                  var table = $('<table class="table"></table>'); // Create a table element with Bootstrap table class
                  
                  // Create table headers
                  var headers = $('<thead><tr><th>Registration No</th><th>First Name</th><th>Middle Name</th><th>Last Name</th><th>Date of Birth</th><th>Gender</th><th>Nationality</th><th>Parental Info</th><th>Spouse Info</th><th>Witness Info</th><th>Event</th><th>Branch</th></tr></thead>');
                  table.append(headers);
                  
                  var tbody = $('<tbody></tbody>'); // Create table body
                  
                  // Iterate over the response data and create table rows
                  for (var i = 0; i < response.length; i++) {
                    var row = $('<tr></tr>');
                    
                    // Add table cells with data from the response
                    row.append('<td>' + response[i].RegistrationNo + '</td>');
                    row.append('<td>' + response[i].fname + '</td>');
                    row.append('<td>' + response[i].middlename + '</td>');
                    row.append('<td>' + response[i].lname + '</td>');
                    row.append('<td>' + response[i].dob + '</td>');
                    row.append('<td>' + response[i].gender + '</td>');
                    row.append('<td>' + response[i].nationality + '</td>');
                    row.append('<td>' + "Permission Needed" + '</td>');
                    row.append('<td>' + "Permission Needed" + '</td>');
                    row.append('<td>' + "Permission Needed" + '</td>');
                    row.append('<td>' + "Permission Needed" + '</td>');
                    
                    row.append('<td>' + JSON.stringify(response[i].branch) + '</td>');
                    //row.append('<td>' + JSON.stringify(parentalInfo[i]) + '</td>');
                   // row.append('<td>' + JSON.stringify(response[i].spouseinfo) + '</td>');
                    //row.append('<td>' + JSON.stringify(response[i].witnessinfo) + '</td>');
                  //  row.append('<td>' + JSON.stringify(response[i].event) + '</td>');
                   // row.append('<td>' + JSON.stringify(response[i].branch) + '</td>');
                    
                    tbody.append(row);
                  }
                  
                  table.append(tbody); // Add table body to the table element
                  $('#r').append(table); // Append the table to the div with id "r"
                },
                error: function (response) {
                  alert("error");
                }
              });
              
            

            }


            if(payloadReport.Location==2)  //kirkos
            {
              $('#r').empty(); // Empty the div before appending new content
              $.ajax({
                url: '/ReportKirkos',
                type: 'GET',
                contentType: 'application/json',
                success: function (response) {
                  var table = $('<table class="table"></table>'); // Create a table element with Bootstrap table class
                  
                  // Create table headers
                  var headers = $('<thead><tr><th>Registration No</th><th>First Name</th><th>Middle Name</th><th>Last Name</th><th>Date of Birth</th><th>Gender</th><th>Nationality</th><th>Parental Info</th><th>Spouse Info</th><th>Witness Info</th><th>Event</th><th>Branch</th></tr></thead>');
                  table.append(headers);
                  
                  var tbody = $('<tbody></tbody>'); // Create table body
                  
                  // Iterate over the response data and create table rows
                  for (var i = 0; i < response.length; i++) {
                    var row = $('<tr></tr>');
                    
                    // Add table cells with data from the response
                    row.append('<td>' + response[i].RegistrationNo + '</td>');
                    row.append('<td>' + response[i].fname + '</td>');
                    row.append('<td>' + response[i].middlename + '</td>');
                    row.append('<td>' + response[i].lname + '</td>');
                    row.append('<td>' + response[i].dob + '</td>');
                    row.append('<td>' + response[i].gender + '</td>');
                    row.append('<td>' + response[i].nationality + '</td>');
                    row.append('<td>' + "Permission Needed" + '</td>');
                    row.append('<td>' + "Permission Needed" + '</td>');
                    row.append('<td>' + "Permission Needed" + '</td>');
                    row.append('<td>' + "Permission Needed" + '</td>');
                    row.append('<td>' + JSON.stringify(response[i].branch) + '</td>');
                 //  row.append('<td>' + JSON.stringify(response[i].parentalinfo) + '</td>');
                 //  row.append('<td>' + JSON.stringify(response[i].spouseinfo) + '</td>');
                 //  row.append('<td>' + JSON.stringify(response[i].witnessinfo) + '</td>');
                 //   row.append('<td>' + JSON.stringify(response[i].event) + '</td>');
                 //   
                    
                    tbody.append(row);
                  }
                  
                  table.append(tbody); // Add table body to the table element
                  $('#r').append(table); // Append the table to the div with id "r"
                },
                error: function (response) {
                  alert("error");
                }
              });
              
            }


            if(payloadReport.Location==3)  //Bole Subcity
            {
            
              $('#r').empty(); // Empty the div before appending new content
              $.ajax({
                url: '/ReportBole',
                type: 'GET',
                contentType: 'application/json',
                success: function (response) {
                  var table = $('<table class="table"></table>'); // Create a table element with Bootstrap table class
                  
                  // Create table headers
                  var headers = $('<thead><tr><th>Registration No</th><th>First Name</th><th>Middle Name</th><th>Last Name</th><th>Date of Birth</th><th>Gender</th><th>Nationality</th><th>Parental Info</th><th>Spouse Info</th><th>Witness Info</th><th>Event</th><th>Branch</th></tr></thead>');
                  table.append(headers);
                  
                  var tbody = $('<tbody></tbody>'); // Create table body
                  
                  // Iterate over the response data and create table rows
                  for (var i = 0; i < response.length; i++) {
                    var row = $('<tr></tr>');
                    
                    // Add table cells with data from the response
                    row.append('<td>' + response[i].RegistrationNo + '</td>');
                    row.append('<td>' + response[i].fname + '</td>');
                    row.append('<td>' + response[i].middlename + '</td>');
                    row.append('<td>' + response[i].lname + '</td>');
                    row.append('<td>' + response[i].dob + '</td>');
                    row.append('<td>' + response[i].gender + '</td>');
                    row.append('<td>' + "Permission Needed" + '</td>');
                    row.append('<td>' + "Permission Needed" + '</td>');
                    row.append('<td>' + "Permission Needed" + '</td>');
                    row.append('<td>' + "Permission Needed" + '</td>');
                    row.append('<td>' + JSON.stringify(response[i].branch) + '</td>');
                  //  row.append('<td>' + JSON.stringify(response[i].parentalinfo) + '</td>');
                  //  row.append('<td>' + JSON.stringify(response[i].spouseinfo) + '</td>');
                  //  row.append('<td>' + JSON.stringify(response[i].witnessinfo) + '</td>');
                 //   row.append('<td>' + JSON.stringify(response[i].event) + '</td>');
                  // 
                    
                    tbody.append(row);
                  }
                  
                  table.append(tbody); // Add table body to the table element
                  $('#r').append(table); // Append the table to the div with id "r"
                },
                error: function (response) {
                  alert("error");
                }
              });
               
            }

            else if (payloadReport.Location == 4) { // Arada & Bole
              $('#r').empty(); // Empty the div before appending new content
                  $.ajax({
                    url: '/ReportAradaBole',
                    type: 'GET',
                    contentType: 'application/json',
                    success: function (response) {
                      var table = $('<table class="table"></table>'); // Create a table element with Bootstrap table class
                      
                      // Create table headers
                      var headers = $('<thead><tr><th>Registration No</th><th>First Name</th><th>Middle Name</th><th>Last Name</th><th>Date of Birth</th><th>Gender</th><th>Nationality</th><th>Parental Info</th><th>Spouse Info</th><th>Witness Info</th><th>Event</th><th>Branch</th></tr></thead>');
                      table.append(headers);
                      
                      var tbody = $('<tbody></tbody>'); // Create table body
                      
                      // Iterate over the response data and create table rows
                      for (var i = 0; i < response.length; i++) {
                        var row = $('<tr></tr>');
                        
                        // Add table cells with data from the response
                        row.append('<td>' + response[i].RegistrationNo + '</td>');
                        row.append('<td>' + response[i].fname + '</td>');
                        row.append('<td>' + response[i].middlename + '</td>');
                        row.append('<td>' + response[i].lname + '</td>');
                        row.append('<td>' + response[i].dob + '</td>');
                        row.append('<td>' + response[i].gender + '</td>');
                        row.append('<td>' + response[i].nationality + '</td>');
                        row.append('<td>' + "Permission Needed" + '</td>');
                        row.append('<td>' + "Permission Needed" + '</td>');
                        row.append('<td>' + "Permission Needed" + '</td>');
                        row.append('<td>' + "Permission Needed" + '</td>');
                        row.append('<td>' + JSON.stringify(response[i].branch) + '</td>');
                        //row.append('<td>' + JSON.stringify(response[i].parentalinfo) + '</td>');
                      // row.append('<td>' + JSON.stringify(response[i].spouseinfo) + '</td>');
                      // row.append('<td>' + JSON.stringify(response[i].witnessinfo) + '</td>');
                      //  row.append('<td>' + JSON.stringify(response[i].event) + '</td>');
                  
                        
                        tbody.append(row);
                      }
                      
                      table.append(tbody); // Add table body to the table element
                      $('#r').append(table); // Append the table to the div with id "r"
                    },
                    error: function (response) {
                      alert("error");
                    }
                  });
                                }

              else if (payloadReport.Location == 5) { // Bole & Kirkos
              
                $('#r').empty(); // Empty the div before appending new content
                $.ajax({
                  url: '/ReportBoleKirkos',
                  type: 'GET',
                  contentType: 'application/json',
                  success: function (response) {
                    var table = $('<table class="table"></table>'); // Create a table element with Bootstrap table class
                    
                    // Create table headers
                    var headers = $('<thead><tr><th>Registration No</th><th>First Name</th><th>Middle Name</th><th>Last Name</th><th>Date of Birth</th><th>Gender</th><th>Nationality</th><th>Parental Info</th><th>Spouse Info</th><th>Witness Info</th><th>Event</th><th>Branch</th></tr></thead>');
                    table.append(headers);
                    
                    var tbody = $('<tbody></tbody>'); // Create table body
                    
                    // Iterate over the response data and create table rows
                    for (var i = 0; i < response.length; i++) {
                      var row = $('<tr></tr>');
                      
                      // Add table cells with data from the response
                      row.append('<td>' + response[i].RegistrationNo + '</td>');
                      row.append('<td>' + response[i].fname + '</td>');
                      row.append('<td>' + response[i].middlename + '</td>');
                      row.append('<td>' + response[i].lname + '</td>');
                      row.append('<td>' + response[i].dob + '</td>');
                      row.append('<td>' + response[i].gender + '</td>');
                      row.append('<td>' + response[i].nationality + '</td>');
                      row.append('<td>' + "Permission Needed" + '</td>');
                      row.append('<td>' + "Permission Needed" + '</td>');
                      row.append('<td>' + "Permission Needed" + '</td>');
                      row.append('<td>' + "Permission Needed" + '</td>');
                      row.append('<td>' + JSON.stringify(response[i].branch) + '</td>');
                     // row.append('<td>' + JSON.stringify(response[i].parentalinfo) + '</td>');
                    //  row.append('<td>' + JSON.stringify(response[i].spouseinfo) + '</td>');
                    //  row.append('<td>' + JSON.stringify(response[i].witnessinfo) + '</td>');
                   //   row.append('<td>' + JSON.stringify(response[i].event) + '</td>');
                    //  row.append('<td>' + JSON.stringify(response[i].branch) + '</td>');
                      
                      tbody.append(row);
                    }
                    
                    table.append(tbody); // Add table body to the table element
                    $('#r').append(table); // Append the table to the div with id "r"
                  },
                  error: function (response) {
                    alert("error");
                  }
                });
       
              }

          
                
    
        }

            
          
        
      
   
    
     
    
       
    