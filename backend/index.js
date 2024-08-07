const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

// Middleware
app.use(bodyParser.json());
app.use(express.json());
// app.use(cors({ origin: 'http://localhost:3000' }));
app.use(cors({ origin: '*' }));
// app.use(cors({ origin: 'http://localhost:5173' }));

// MongoDB Connection  
mongoose.connect('mongodb+srv://AtulKumar:Atulhp37@cluster0.crkd7ny.mongodb.net/E-commerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

// Serve static files for uploaded images
app.use('/images', express.static(path.join(__dirname, 'upload/images')));

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload/images');
    },
    filename: (req, file, cb) => {
        const filename = `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`;
        cb(null, filename);
    },
});

const upload = multer({ storage });

// Models
const Product = mongoose.model('Product', {
    // id: {
    //     type: Number,
    //     required: false,
    //     unique: true,
    // },   
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
});

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    cartData: {
        type: Map,
        of: Number,
        default: new Map(),
    },
    date: {
        type: Date,
        default: Date.now,
    },
});



// Basic route
app.get('/', (req, res) => {
    res.send('Express app is running');
});

// File upload route
app.post('/upload', upload.single('product'), (req, res) => {
    if (req.file) {
        res.json({
            success: true,
            image_url: `http://localhost:${port}/images/${req.file.filename}`,
        });
    } else {
        res.status(400).json({ success: false, message: 'File upload failed' });
    }
});

// Route to add a new product
// app.post('/addproduct', async (req, res) => {
//     try {
//         const { name, image, category, new_price, old_price } = req.body;
//         // Find the last product ID to assign a new ID
//         const lastProduct = await Product.findOne({}).sort({ id: -1 }).exec();
//         // console.log("req.body", lastProduct);
//         const id = lastProduct ? lastProduct.id + 1 : 1;

//         const product = new Product({
//             // id,
//             name,
//             image,
//             category,
//             new_price,
//             old_price,
//         });

//         await product.save();
//         res.json({ success: true, name });
//     } catch (error) {
//         res.status(500).json({ success: false, errors: error });
//     }
// });
// Route to add a new product
app.post('/addproduct', async (req, res) => {
    try {
        const { name, image, category, new_price, old_price } = req.body;

        const product = new Product({
            name,
            image,
            category,
            new_price,
            old_price,
        });

        await product.save();
        res.json({ success: true, name });
    } catch (error) {
        res.status(500).json({ success: false, errors: error });
    }
});
// Route to remove a product
app.post('/removeproduct', async (req, res) => {
    try {
        const { id } = req.body;
        await Product.findOneAndDelete({ id }).exec();
        res.json({ success: true, message: 'Product removed' });
    } catch (error) {
        res.status(500).json({ success: false, errors: 'Failed to remove product' });
    }
});

// Route to fetch all products
app.get('/allproduct', async (req, res) => {
    try {
        const products = await Product.find({}).exec();
        res.json(products);
    } catch (error) {
        res.status(500).json({ success: false, errors: 'Failed to fetch products' });
    }
});

app.get('/product/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId).exec();

        if (!product) {
            return res.status(404).json({ success: false, errors: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        res.status(501).json({ success: false, errors: 'Failed to fetch product' });
    }
});


// Route to sign up a new user
app.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email }).exec();
        if (existingUser) {
            return res.status(400).json({ success: false, errors: 'User with this email already exists' });
        }

        // Create a new user
        const user = new User({ name, email, password });

        await user.save();

        // Create JWT token with user id
        const token = jwt.sign({ id: user.id }, 'secret_ecom');

        // Return user id and token
        res.json({ success: true, userId: user.id, token });
    } catch (error) {
        res.status(500).json({ success: false, errors: error});
    }
});


// Route for user login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email }).exec();
        if (!user) {
            return res.json({ success: false, errors: 'Invalid email or password' });
        }

        // Check the password
        if (password !== user.password) {
            return res.json({ success: false, errors: 'Invalid email or password' });
        }

        const data = { user: { id: user.id } };
        const token = jwt.sign(data, 'secret_ecom');

        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, errors: 'Failed to authenticate user' });
    }
});

// Route to fetch new collections
app.get('/newcollections', async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8)
    console.log("NewCollecton Fetched");
    res.send(newcollection);
});

// Route to fetch popular products for women
app.get('/popularinwomen', async (req, res) => {
    let products = await Product.find({ category: "women" });
    let popular_in_women = products.slice(0, 4);
    console.log("Popular in women fetched");
    res.send(popular_in_women);
});


const fetchUser = async (req, res, next) => {

    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "Please authenticate using valid token" })
    }
    else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            console.log("middleware", req.user);
            next();
        } catch (error) {
            res.status(401).send({ errors: "Please authenticate using a valid token" })
        }
    }
}




// Route to add an item to the cart
app.post('/addtocart', fetchUser, async (req, res) => {
    let userData = await User.findOne({ _id: req.user.id });
    userData.cartData.set(req.body.itemId, (userData.cartData.get(req.body.itemId) || 0) + 1);
    const updatedUser = await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData }, { new: true });
    res.send(updatedUser);
})

// Route to remove an item from the cart


app.post('/removefromcart', fetchUser, async (req, res) => {
    console.log("removed", req.body.itemId);
    let userData = await User.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] > 0)
        userData.cartData[req.body.itemId] -= 1;
    await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Removed")
})

app.get('/getcart', fetchUser, async (req, res) => {
    if(!req.user || !req.user.id){
        return res.status(401).json({error:'User not authenticated or user ID not found'});
    }
    console.log("GetCart",req.user.id );
    let userData = await User.findOne({ _id: req.user.id });
    res.json(userData.cartData);
})




// Start the server
app.listen(port, (error) => {
    if (!error) {
        console.log("Server is running on port " + port)
    } else {
        console.error("Error: " + error)
    }
})
