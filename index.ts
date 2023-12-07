import express from 'express';

const app = express();
const port = 3000;

interface Item {
  id: number;
  name: string;
}

let item_list: Item[] = [];


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/greet', (req, res) => {

  const name = req.query.name;

  if (name) {
    res.send(`Hello ${name}`);
  } else {
    res.send('Hello stranger');
  }
});

app.post('/submit', (req, res) => {
    console.log(`Received POST request on: ${port}`);

    const message = req.body.message;
    res.send(`Message received: ${message}`);
});



//// CRUD operation routes

// Create  | (POST)
app.post('/Crud/createItem', (req, res) => {
  console.log(`CREATE REQUEST`);

  const newItem: Item = {
    id: item_list.length + 1,
    name: req.body.name,
  };

  item_list.push(newItem);

  console.log(item_list);
  res.send(`Item created: ${newItem.name}`);

});

// Read    | (GET)
app.get('/Crud/readItem', (req, res) => {
  console.log(`READ REQUEST`);

  const id = req.body.id;

  const item = item_list.find(x => x.id == id);

  if (item) {
    res.send(`Item: ${item.name} matches id #${id}`);
    console.log(`Item: ${item.name} matches id #${id}`)
  } else {
    res.status(404).send(`Item with id #${id} not found`)
  }
  

});

// Update  | (PUT)
app.put('/Crud/updateItem', (req, res) => {
  console.log(`UPDATE REQUEST`);
});

// Delete  | (DELETE)
app.delete('/Crud/deleteItem', (req, res) => {
  console.log(`DELETE REQUEST`);
});


app.listen(port, () => { 
  console.log(`Server running on http://localhost:${port}`);
});
