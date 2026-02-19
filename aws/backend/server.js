const express = require("express");
const app = express();
app.get("/monitoring", (req,res) => 
  {
    res.json(
      {
        status:"Running Successfully",
        endpoint: "/monitoring"
      }
      );
  }
  );
app.listen(5000, () =>
  {
    console.log("Server started successfully")
  }
  );


      
  
