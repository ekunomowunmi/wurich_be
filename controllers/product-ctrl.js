const Product = require('../models/product');

createProduct = (req, res) => {
    const body = req.body;

    if(!body) {
        return res.status(400).json({
            success:false,
            error: 'You must provide a product'
        })
    }

    const product = new Product(body);

    if(!product){
            return res.status(400).json({ success: false, error: err })
    }

    product.save()
    .then(() => {
        return res.status(201).json({
            success:true,
            id: product._id,
            message: 'Product Created!',
        });
    })
    .catch(error => {
        return res.status(400).json({
            error, message:'Product not created!'
        })
    })
}

updateProduct = (req, res) => {
    const body = req.body;

    if(!body) {
        return res.status(400).json({
            success:false,
            error: 'You must provide a product'
        })
    }
    Product.findOne({_id:req.params.id}, (err, product) => {
        if(err){
            return res.status(404).json({
                err,
                message: 'Product not found!',
            })
        }
        product.name = body.name
        product.ig_link = body.ig_link
        product.image_Url = body.image_Url
        product.description = body.description
        product.price = body.price
        product.top_ten = body.top_ten
        product.category_id = body.category_id
        product.save()
        .then(() => {
            return res.status(200).json({
                success: true,
                id: product._id,
                message: 'Product updated!',
            })
        })
        .catch(error => {
            return res.status(404).json({
                error,
                message: 'Product not updated!',
            })
        }
        )
    });
}

getProducts = async (req, res) => {
    await Product.find({}, (err, products) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!products.length) {
            return res
                .status(404)
                .json({ success: false, error: `Product not found` })
        }
        return res.status(200).json({ success: true, data: products })
    }).catch(err => console.log(err))
}

getProductById = async (req, res) => {
    await Product.findOne({ _id: req.params.id }, (err, product) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!product) {
            return res
                .status(404)
                .json({ success: false, error: `Product not found` })
        }
        return res.status(200).json({ success: true, data: product })
    }).catch(err => console.log(err))
}



deleteProduct = async (req,res) => {
    await Product.findOneAndDelete({_id:req.params.id}, (err, product) => {
        if(err){
            return res.status(400).json({ success: false, error: err })
        }
        if (!product) {
            return res
                .status(404)
                .json({ success: false, error: `Product not found` })
        }
        return res.status(200).json({ success: true, data: product })
    }).catch(err => console.log(err))
}

module.exports = {
    createProduct,
    getProducts,
    updateProduct,
    getProductById,
    deleteProduct
}