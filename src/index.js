import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json())

let counter = 6;
let users = [
  { id: 1, userName: "User", surname: "Userov" },
  { id: 2, userName: "User2", surname: "Userov" },
  { id: 3, userName: "User3", surname: "Userov" },
  { id: 4, userName: "User4", surname: "Userov" },
  { id: 5, userName: "User5", surname: "Userov" },
];


app.get("/users", (req, res) => {
  res.send(users);
});

//Get User by Id
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const selectUser = users.find((x) => x.id === +id);
  if (selectUser) {
    res.send(selectUser);
  } else {
    res.status(500).json({ message: "user not found" });
  }
});

//Delete User
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const userId = users.find((x) => x.id === +id);
  console.log(userId);
  if (userId) {
    users = users.filter((x) => x.id !== +id);
    res.send(users);
  } else {
    res.status(500).json({ message: "not foundede" });
  }
});

//Add User
app.post("/users", (req, res) => {
  const userObj = {
    id: counter++,
    userName: req.body.userName,
    surname: req.body.surname,
  };
  users.push(userObj)
  res.send(users)
});


//Update User 
// app.put('/users/:id',(req,res) => {
//     const {id} = req.params
//     const updatedIndex = users.findIndex(x => x.id === +id)
//     users[updatedIndex] = {
//         id:+id,
//         ...req.body
//     }
//     res.send(users)
// })


app.put("/users/:id",(req,res) => {
    const {id} = req.params
    const updatedUserIndex = users.findIndex(x => x.id === +id)
    users[updatedUserIndex] = {
        id:+id,
        ...req.body
    }
    res.send(users)
})

app.post('/users', (req,res) => {
    users.push({ id: id++, ...req.body })
    res.send(arr)
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
