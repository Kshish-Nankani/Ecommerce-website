// require("dotenv").config();

// const axios = require("axios");

// const createdOrder = async (req, res) => {
//     try {
//         const { amount } = req.body;

//         if (!amount) {
//             return res.status(400).json({
//                 message: "Amount is required"
//             });
//         }

//         const basketId = `SHOPNEST-${Date.now()}`;

//         const response = await axios.post(
//             "https://ipguat.apps.net.pk/Ecommerce/api/Transaction/GetAccessToken",
//             new URLSearchParams({
//                 MERCHANT_ID: process.env.PAYFAST_MERCHANT_ID,
//                 SECURED_KEY: process.env.PAYFAST_SECURED_KEY,
//                 BASKET_ID: basketId,
//                 TXNAMT: amount,
//                 CURRENCY_CODE: "PKR"
//             }),
//             {
//                 headers: {
//                     "Content-Type": "application/x-www-form-urlencoded"
//                 }
//             }
//         );

//         console.log("PAYFAST RESPONSE:", response.data);

//         res.json({
//             basketId,
//             amount,
//             payment: response.data
//         });

//     } catch (error) {
//         console.log(
//             "PAYFAST ERROR:",
//             error.response?.data || error.message
//         );

//         res.status(500).json({
//             message: "Error creating PayFast payment",
//             error: error.response?.data || error.message
//         });
//     }
// };


// const verifyPayment = async (req, res) => {
//     res.json({
//         message: "Payment verification endpoint is working"
//     });
// };


// module.exports = {
//     createdOrder,
//     verifyPayment
// };


require("dotenv").config();

const axios = require("axios");

const createdOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount) {
            return res.status(400).json({
                message: "Amount is required"
            });
        }

        const basketId = `SHOPNEST-${Date.now()}`;

        const response = await axios.post(
            "https://ipguat.apps.net.pk/Ecommerce/api/Transaction/GetAccessToken",
            new URLSearchParams({
                MERCHANT_ID: process.env.PAYFAST_MERCHANT_ID,
                SECURED_KEY: process.env.PAYFAST_SECURED_KEY,
                BASKET_ID: basketId,
                TXNAMT: amount,
                CURRENCY_CODE: "PKR"
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        );

        console.log(response.data);

        res.json({
            basketId,
            amount,
            payment: response.data
        });

    } catch (error) {
        console.log(
            "PAYFAST ERROR:",
            error.response?.data || error.message
        );

        res.status(500).json({
            message: "Error creating PayFast payment",
            error: error.response?.data || error.message
        });
    }
};


const verifyPayment = async (req, res) => {
    try {

        const {
            basketId,
            amount,
            accessToken
        } = req.body;

        if (!basketId || !amount || !accessToken) {
            return res.status(400).json({
                message: "Payment data is required"
            });
        }

        // PayFast verification/payment-status logic
        // will go here after the checkout transaction.

        res.json({
            message: "Payment verification request received",
            basketId,
            amount
        });

    } catch (error) {

        console.log(
            "PAYFAST VERIFY ERROR:",
            error.response?.data || error.message
        );

        res.status(500).json({
            message: "Payment verification failed",
            error: error.response?.data || error.message
        });
    }
};


module.exports = {
    createdOrder,
    verifyPayment
};