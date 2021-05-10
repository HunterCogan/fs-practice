const express = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const cors = require('cors');

const app = express();
process.env.port = 5000;

mongoose.connect('mongodb://localhost:27017/testDb',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }).then((e) => console.log('Connected to db.'));

app.use(cors());
app.use(express.json());

app.listen(process.env.port || 3000, () => {
  console.log('Listening to 5000');
});

const studentSchema = new Schema({
  name: String,
  age: Number,
  color: String
});

const Student = mongoose.model('Student', studentSchema);

//clear clutter on reset
//Student.deleteMany({}, e => console.log(e));

app.get('/allStudents', (req, res) => {
  Student.find().then(response => res.json(response));
});

app.post('/newStudent', (req, res) => {
  console.log(req.body);
  Student.create({name: req.body.name, age: req.body.age, color: req.body.color}).then(result => res.json(result))
    .catch(err => console.log('error: ', err));
});

