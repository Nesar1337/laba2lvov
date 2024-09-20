const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

app.listen(3000, () => {
      console.log("Сервер ожидает подключения на http://localhost:3000");
    });
    

app.get("/api/users/:id", (req, res) => {
      const id = req.params.id; 
      const content = fs.readFileSync("users.json", "utf8");
      const users = JSON.parse(content);
    });
    
let user = null;

for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
          user = users[i];
          console.log("🚀 ~ app.get ~ user:", user);
          break;
        }
      }
        

  
if (user) {
    res.json({ success: true, message: user });
  } else {
    res.status(404).json({ success: false, message: "" });
  }


app.post("/api/users", (req, res) => {
      
      const { name, age } = req.body;
      
    
      if (name == null || age == null) {
        
        res.status(404).json({ success: false, message: "Данные не заполнены" });
        
      }
    
      const data = fs.readFileSync("users.json", "utf8");
     
      const users = JSON.parse(data);
      
    
      let user = { name, age };
     
    
      
      const id = Math.max.apply(
        Math,
        users.map((o) => {
          
          return o.id;
          
        }),
      );
      
    
     
      user.id = id + 1;
      
    
      
      users.push(user);
      
    
      const newData = JSON.stringify(users);
      
    
     
      fs.writeFileSync("users.json", newData);
      
    
      res.json({ success: true, message: user });
      
    });
    

app.delete("/api/users/:id", (req, res) => {
      
      const id = req.params.id;
     
    
      if (id == null || id == "") {
        
        res.status(404).json({ success: false, message: "Данные не заполнены" });
        
      }
    
      const data = fs.readFileSync("users.json", "utf8");
     
      const users = JSON.parse(data);
     
    
      let index = -1;
      
    
      
      for (let i = 0; i < users.length; i++) {
        
        if (users[i].id == id) {
         
          index = i;
         
          break;
          
        }
      }
    
      if (index > -1) {
        
        
        const user = users.splice(index, 1)[0];
        
    
        const data = JSON.stringify(users);
       
    
        fs.writeFileSync("users.json", data);
       
    
        
        res.json({ success: true, message: user });
       
      } else {
       
        res.status(404).json({ success: false, message: "Ошибка записи" });
        
      }
    });
    
app.put("/api/users", (req, res) => {
      
      const { name, age, id } = req.body;
      
    
      if (name == null || age == null || id == null) {
        
        res.status(404).json({ success: false, message: "Данные не заполнены" });
        
      }
    
      const data = fs.readFileSync("users.json", "utf8");
      
      const users = JSON.parse(data);
      
    
      let user;
      
    
      for (let i = 0; i < users.length; i++) {
        
        if (users[i].id == id) {
          
          user = users[i];
          
          break;
          
        }
      }
    
      
      if (user) {
        
        user.age = age;
       
        user.name = name;
        
    
        const newData = JSON.stringify(users);
       
    
        fs.writeFileSync("users.json", newData);
        
    
        res.json({ success: true, message: user });
        
      } else {
        
        res.status(404).json({ success: false, message: "Ошибка записи" });
       
      }
    });
    