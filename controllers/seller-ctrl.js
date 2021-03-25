const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config.json');

const validateRegisterInput = require('../_helpers/validation/register');
const validateLoginInput = require('../_helpers/validation/login');

const Seller = require('../models/seller');

createAccount = (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Seller.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({ email: 'Email already exists '});
            } else {
                const newSeller = new Seller({
                    name: req.body.name,
                    phonenumber: req.body.phoneNumber,
                    email: req.body.email,
                    password: req.body.password,
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newSeller.password, salt, (err, hash) => {
                        if (err) throw err;
                        newSeller.password = hash;
                        newSeller.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        });
}


authenticate = (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    // const { email, password } = req.body;
    const email = req.body.email;
    const password = req.body.password;

    Seller.findOne({ email }).then(seller => {
        if (!seller) {
            return res.status(404).json({ emailnotfound: 'Email not found' });
        }

        bcrypt.compare(password, seller.password).then(isMatch => {
            if (isMatch) {
                // create jwt payload
                const payload = {
                    id: seller.id,
                    name: seller.name
                }

                // sign token
                jwt.sign(
                    payload,
                    keys.secret,
                    {
                        expiresIn: '7d'
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    }
                );
            } else {
                return res.status(400).json({ passwordIncorrect: 'Password incorrect'})
            }
        })
    })
}


module.exports = {
    createAccount,
    authenticate
}





// refactored....
// createAccount = (req, res) => {
//     res.send('Hii Richard')
//     // const {name, phonenumber, email, password} = req.body;
//     const body = req.body;
//     const seller = new Seller(body);
//     // console.log(seller)

//     if (seller.password) {
//         seller.password = bcrypt.hashSync(seller.password, 10);
//     }
//     // console.log(seller)
//     seller.save()
//         .then(() => res.json('Seller Account Created....'))
//         // .then(() => console.log('Seller Account Created....'))
//         .catch(err => res.status(400).json({err: err}))
//         // .then(() => {
//         //     return res.status(201).json({
//         //         success: true,
//         //         messgae: 'Account Created'
//         //     })
//         // })
//         // .catch(error => {
//         //     return res.status(400).json({
//         //         message: 'Account not created',
//         //         error
//         //     })
//         // })
//         // .then(() => console.log('Account Created'))
        
// }

// authenticate = (req, res) => {

// }
// refactored....


