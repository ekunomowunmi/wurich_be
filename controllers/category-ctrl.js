const Category = require('../models/category');

createCategory = (req, res) => {
    const body = req.body;

    if(!body) {
        return res.status(400).json({
            success:false,
            error: 'You must provide a category'
        })
    }

    const category = new Category(body);

    if(!category){
        return res.status(400).json({ success: false, error: err })
    }

    category.save()
    .then(() => {
        return res.status(201).json({
            success:true,
            id: category._id,
            message: 'Category Created!',
        });
    })
    .catch(error => {
        return res.status(400).json({
            error, message:'Product not created!'
        })
    })
}

getCategories = async (req,res) => {
    await Category.find({}, (err, categories) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if(!categories.length){
            return res
            .status(404)
            .json({ success: false, error: `Category not found` })
        }
        return res.status(200).json({success:true, data: categories})
    }).catch(err => console.log(err))
}

module.exports = {
    createCategory,
    getCategories
}