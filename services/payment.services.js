const axios = require("axios");

class PaymentService {
    async createPayment(req, res) {
        const url = "https://api.mercadopago.com/checkout/preferences";
        const {name, price} = req.body

        const body = {
        payer: { email: "test_user_1641334@testuser.com" },
        items: [
            {
            title: name,
            description: "Dummy description",
            picture_url: "http://www.myapp.com/myimage.jpg",
            category_id: "cat123",
            unit_price: price,
            quantity: 1,
            },
        ],
        back_urls: {
            success: "http://localhost:3000/confirmed",
            failure: "http://localhost:3000/failure",
            pending: "http://localhost:3000/pending",
        }
        };

        const payment = await axios.post(url, body, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
        });

        return payment.data;
    }
}

module.exports = PaymentService;