const express = require('express')
const app = express()
const sql = require('mssql');
const { pick, isNil } = require('lodash')

const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.json())

// configuration of remote database
const config = {
    server: '206.81.11.191',
    port :1433,
    database: 'Vital_Registration_DB',
    user: 'sa', 
    password: 'D@ny_456',
    options: {
      encrypt: false, // For secure connections
    },
  };

//configuration of lan database kirkos
const config2 = {
  server: '192.168.53.14',
  port :1433,
  database: 'Vital_Registration_DB',
  user: 'sa', 
  password: 'D@ny_456',
  options: {
    encrypt: false, // For secure connections
  },
};


//configuration of local machine for replicating both to lan and remote
// Arada Subcity
const config3 = {
  server: '192.168.53.52',
  port :1433,
  database: 'Vital_Registration_DB',
  user: 'sa', 
  password: 'D@ny_456',
  options: {
    encrypt: false, // For secure connections
  },
};


  
// Define a route to fetch data from SQL Server
app.get('/result', (req, res) => {
  sql.connect(config, (err) => {
    if (err) {
      console.log(err);
      return;
    }

    // Query the database
    new sql.Request().query('SELECT * FROM VitalInformation ', (err, result) => {
      if (err) {
        console.log(err);
        return;
      }

      // Send the data as JSON response
      res.json(result.recordset);
    });
  });
}) 

//insert to Arada Branch

app.post('/inputData', (req, res) => {
  const body = req.body; // req.body is called payload
  const data = pick(body, ['stepA', 'stepB', 'stepC', 'stepD', 'stepE', 'stepF']);

 

  sql.connect(config3, (err) => {
    if (err) {
      console.log(err);
      return;
    }

    // Query the database
    const query = `INSERT INTO VitalInformation (RegistrationNo, fname, middlename, lname, dob, gender, nationality, parentalinfo, spouseinfo, witnessinfo, event, documents, branch) 
    VALUES ('${data.stepA.regNo}', '${data.stepA.fname}', '${data.stepA.middlename}', '${data.stepA.lastname}', '${data.stepA.dob}', '${data.stepA.gender}', '${data.stepA.nationality}', '${data.stepB}', '${data.stepC}', '${data.stepD}', '${data.stepE}', '${data.stepF}' , '${data.stepE.Location}')`;
    new sql.Request().query(query, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }

      // Send the data as JSON response
      res.json(result);
    });
  });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/template/step_a.html'));
});

//Insert to lan db
app.post('/inputDataLan', (req, res) => {
  const body = req.body; // req.body is called payload
  const data = pick(body, ['stepA', 'stepB', 'stepC', 'stepD', 'stepE', 'stepF']);

  console.log(data.stepA.regNo, data.stepA.fname, data.stepB);

  sql.connect(config2, (err) => {
    if (err) {
      console.log(err);
      return;
    }

    // Query the database
    const query = `INSERT INTO VitalInformation (RegistrationNo, fname, middlename, lname, dob, gender, nationality, parentalinfo, spouseinfo, witnessinfo, event, documents, branch) 
    VALUES ('${data.stepA.regNo}', '${data.stepA.fname}', '${data.stepA.middlename}', '${data.stepA.lastname}', '${data.stepA.dob}', '${data.stepA.gender}', '${data.stepA.nationality}', '${data.stepB}', '${data.stepC}', '${data.stepD}', '${data.stepE}', '${data.stepF}' , '${data.stepE.Location}')`;
    new sql.Request().query(query, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }

      // Send the data as JSON response
      res.json(result);
    });
  });
});

//Insert to Both
app.post('/inputDataBoth', (req, res) => {
  const body = req.body;
  const data = pick(body, ['stepA', 'stepB', 'stepC', 'stepD', 'stepE', 'stepF']);

  //console.log(data.stepA.regNo, data.stepA.fname, data.stepB);

  sql.connect(config3, (err) => {
    if (err) {
      console.log(err);
      return;
    }
  
    // Query the databases
    const query1 = `INSERT INTO kIRKOS_DB.Vital_Registration_DB.dbo.VitalInformation (RegistrationNo, fname, middlename, lname, dob, gender, nationality, parentalinfo, spouseinfo, witnessinfo, event, documents, branch) 
      VALUES ('${data.stepA.regNo}', '${data.stepA.fname}', '${data.stepA.middlename}', '${data.stepA.lastname}', '${data.stepA.dob}', '${data.stepA.gender}', '${data.stepA.nationality}', '${data.stepB}', '${data.stepC}', '${data.stepD}', '${data.stepE}', '${data.stepF}', '${data.stepE.Location}')`;

    const query2 = `INSERT INTO BOLE_REMOTE.Vital_Registration_DB.dbo.VitalInformation (RegistrationNo, fname, middlename, lname, dob, gender, nationality, parentalinfo, spouseinfo, witnessinfo, event, documents, branch) 
      VALUES ('${data.stepA.regNo}', '${data.stepA.fname}', '${data.stepA.middlename}', '${data.stepA.lastname}', '${data.stepA.dob}', '${data.stepA.gender}', '${data.stepA.nationality}', '${data.stepB}', '${data.stepC}', '${data.stepD}', '${data.stepE}', '${data.stepF}', '${data.stepE.Location}')`;

    const request1 = new sql.Request();
    const request2 = new sql.Request();

    const promise1 = request1.query(query1);
    const promise2 = request2.query(query2);

    Promise.all([promise1, promise2])
      .then(([result1, result2]) => {
        res.json({ result1, result2 });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'An error occurred' });
      });
  });
       
});



app.get('/ReportArada', (req, res) => {
  

  sql.connect(config3, (err) => {
    if (err) {
      console.log(err);
      return;
    }

    // Query the database
    const query = "SELECT * FROM VitalInformation";
    new sql.Request().query(query, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
    
      // Send the data as JSON response
     console.log(result.recordset);
      res.json(result.recordset);
    });
      
    });
  });



  // fetch 192.168.1.4
  app.get('/ReportKirkos', (req, res) => {
 

    sql.connect(config2, (err) => {
      if (err) {
        console.log(err);
        return;
      }
  
      // Query the database
      const query = "SELECT * FROM VitalInformation";
      new sql.Request().query(query, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
      
        // Send the data as JSON response
       console.log(result.recordset);
        res.json(result.recordset);
      });
        
      });
    });
  
    app.get('/ReportBole', (req, res) => {
  

      sql.connect(config, (err) => {
        if (err) {
          console.log(err);
          return;
        }
    
        // Query the database
        const query = "SELECT * FROM VitalInformation";
        new sql.Request().query(query, (err, result) => {
          if (err) {
            console.log(err);
            return;
          }
        
          // Send the data as JSON response
         console.log(result.recordset);
          res.json(result.recordset);
        });
          
        });
      });
    









// Arada And Bole Report Fetch


app.get('/ReportAradaBole', (req, res) => {
  console.log("report backend");

  sql.connect(config3, (err) => {
    if (err) {
      console.log(err);
      return;
    }

    // Query the database
    const query = "SELECT * FROM BOLE_REMOTE.Vital_Registration_DB.dbo.VitalInformation AS BOLE_FRAGMENT LEFT JOIN VitalInformation AS LOCALDB ON BOLE_FRAGMENT.RegistrationNo=LOCALDB.RegistrationNo;";
    new sql.Request().query(query, (err, result) => {
      if(err) {
        console.log(err);
        return;
      }
    
      // Send the data as JSON response
     console.log(result.recordset);
      res.json(result.recordset);
    });
      
    });
  });

// Bole Kirkos
  app.get('/ReportBoleKirkos', (req, res) => {
    console.log("report backend");
  
    sql.connect(config3, (err) => {
      if (err) {
        console.log(err);
        return;
      }
  
      // Query the database
      const query = "SELECT * FROM KIRKOS_DB.Vital_Registration_DB.dbo.VitalInformation AS KIRKOS_FRAGMENT LEFT JOIN BOLE_REMOTE.Vital_Registration_DB.dbo.VitalInformation AS REMOTE_FRAGMENT ON KIRKOS_FRAGMENT.RegistrationNo=REMOTE_FRAGMENT.RegistrationNo;";
      new sql.Request().query(query, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
      
        // Send the data as JSON response
       console.log(result.recordset);
        res.json(result.recordset);
      });
        
      });
    });
  
  








app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/template/step_a.html'));
});




app.post('/data', (req, res) => {
    const body = req.body  //req.body is called payload
    const data = pick(body, ['stepA', 'stepB'])

    console.log(data.stepA.regNo, data.stepB)
   
    res.send("sucess recieved")
})

app.get('/step_a', (req, res) => {
  res.sendFile(path.join(__dirname, '/template/step_a.html'));
});

app.get('/step_b', (req, res) => {
    res.sendFile(path.join(__dirname, '/template/step_b.html'));
});


app.get('/step_c', (req, res) => {
  res.sendFile(path.join(__dirname, '/template/step_c.html'));
});

app.get('/step_d', (req, res) => {
  res.sendFile(path.join(__dirname, '/template/step_d.html'));
});
app.get('/step_e', (req, res) => {
  res.sendFile(path.join(__dirname, '/template/step_e.html'));
});
app.get('/step_f', (req, res) => {
  res.sendFile(path.join(__dirname, '/template/step_f.html'));
});




app.listen(4000, ()=>{
    console.log("server is listening to port 4000")
})