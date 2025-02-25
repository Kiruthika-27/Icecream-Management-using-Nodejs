const express = require("express")
const path = require("path")
const app = express()
// const hbs = require("hbs")
const url="mongodb://localhost:27017/LoginFormPractice";
const {MongoClient}=require("mongodb");
const Client=new MongoClient(url);
const {LogInCollection} = require("./mongo")
const Icecream= require('./home');

const port = process.env.PORT || 3040
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

const tempelatePath = path.join(__dirname, '../templates')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

app.set('view engine', 'hbs')
app.set('views', tempelatePath)
app.use(express.static(publicPath))


// hbs.registerPartials(partialPath)
app.get('/', (req, res) => {
    res.render('initial')
})

app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/login', (req, res) => {
    res.render('login')
})
app.post('/signup', async (req, res) => {
    try {
        const existingUser = await LogInCollection.findOne({ name: req.body.name });
        if (existingUser) {
            res.send("User already exists")
           // return res.render('signup', { error: 'User already exists' });
        } else {
            const newUser = new LogInCollection({
                name: req.body.name,
                password: req.body.password
            });
            await newUser.save();
            return res.status(201).render('home', { naming: req.body.name });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

app.post('/login', async (req, res) => {
    try {
        const user = await LogInCollection.findOne({ name: req.body.name });
        if (!user) {
            res.send("User does not exist")
            //return res.render('login', { error: 'User does not exist' });
        } else {
            if (user.password === req.body.password) {
                return res.status(201).render('home', { naming: req.body.name });
            } else {
                res.send("incorrect password")
               // return res.render('login', { error: 'Incorrect password' });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});
app.get('/home', (req, res) => {
    res.render('home')
})
app.post('/home', async (req, res) => {
    try {
        const icecream_name = await Icecream.findOne({ icecream_name: req.body.icecream_name });
        if (icecream_name) {
           
            res.send("User already  exist")
            //return res.render('home', { error: 'User already exists' });
        } else {
            const register = new Icecream({
                icecream_name: req.body.icecream_name,
                icecream_cost: req.body.icecream_cost,
                icecream_type: req.body.icecream_type,
                icecream_quantity:req.body.icecream_quantity,
    
            });
           await register.save();
            return res.status(201).render('theme', { naming: req.body.icecream_name });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});
app.get('/delete', (req, res) => {
    res.render('delete');
});

// Route to handle delete request
app.post('/delete', async (req, res) => {
    try {
        const IcecreamName = req.body.icecream_name;

        // Check if icecream is provided in the request
        if (!IcecreamName) {
            return res.status(400).send("Missing icecream name");
        }

        // Construct query object
        const query = { icecream_name: IcecreamName };

        // Delete document
        const result = await Icecream.deleteOne(query);

        // Check if document was found and deleted
        if (result.deletedCount === 0) {
            return res.status(404).send("Document not found");
        }

        res.write("<h1>Deleted successfully</h1>");
        res.end();
    } catch (error) {
        console.error('Error deleting document:', error);
        res.status(500).send("Server Error");
    }
});
app.get('/update', (req, res) => {
    res.render('update');
});

app.post("/update", async (req, res) => {
    try {
        const { icecream_name, icecream_type } = req.body;
        // Find the item by name and update its price
        await Icecream.findOneAndUpdate({ icecream_name }, { icecream_type });
         res.send("<h1>Updated successfully</h1>");


    } catch (error) {
        console.error(error);
        res.send("An error occurred");
    }
});
app.get('/display', (req, res) => {
    res.render('display')
});

app.post("/display", async (req, res) => {
    const icecreamName = req.query.icecream_name; // Retrieve the icecream name from query parameter
    try {
        let query = {}; // Define an empty query object
        if (icecreamName) {
            query = { icecream_name: icecreamName }; // If icecreamname is provided, set it as part of the query
        }
        const items = await Icecream.find(query, "icecream_name icecream_cost");
        res.json({ items }); // Send JSON response
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred"); // Send error response with status code 500
    }
});
// Assuming you're using Express.js

// Route for handling logout requests
app.get('/thankyou', (req, res) => {
    res.render('thankyou')
})
    app.post("/thankyou", async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Server Error');
        } else {
            // Redirect the user to the login page after logout
            res.redirect('/login'); // Change '/login' to the appropriate URL
        }
    });
});


app.listen(port, () => {
    console.log('port connected');
})