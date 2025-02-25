const express = require("express")
const path = require("path")
const app = express()
// const hbs = require("hbs")
const {LogInCollection} = require("./mongo")
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

app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/', (req, res) => {
    res.render('login')
})
app.get('/home', (req, res) => {
         res.render('home')
 })

app.post('/signup', async (req, res) => {
    
    // const data = new LogInCollection({
    //     name: req.body.name,
    //     password: req.body.password
    // })
    // await data.save()

    const data = {
        name: req.body.name,
        password: req.body.password
    }
const  userdata=await LogInCollection.insertMany([data]);
console.log(userdata);
})   

app.post('/login', async (req,  res) => {

    try {
        const check = await LogInCollection.findOne({ name: req.body.name })

        if (check.password === req.body.password) {
            res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}` })
        }

        else {
            res.send("incorrect password")
        }


    } 
    
    catch (e) {

        res.send("wrong details")
    
    }
})
//app.post('/insert',async (req,res)=>{

//}
app.get('/insert', (req, res) => {
    res.render('insert');
});

app.post('/insert', async (req, res) => {
    const { iceItem, price } = req.body;
    try {
        const newItem = new IceItem({ iceItem, price });
        await newItem.save();
        res.redirect('/display');
    } catch (error) {
        console.error(error);
        res.send("An error occurred");
    }
});
// Display route
app.get('/display', async (req, res) => {
    try {
        const items = await IceItem.find({}, "iceItem price");
        res.render('display', { items });
    } catch (error) {
        console.error(error);
        res.send("An error occurred");
    }
});
app.listen(port, () => {
    console.log('port connected');
})