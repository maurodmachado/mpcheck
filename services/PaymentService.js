const axios = require("axios");

class PaymentService {
  constructor() {
    this.tokensMercadoPago = {
      prod: {},
      test: {
        access_token:
          "TEST-3512637281862943-082820-69fd02c3b2ff52a67aee5dbf03c62e9e-282971304"
      }
    };
    this.mercadoPagoUrl = "https://api.mercadopago.com/checkout";
  }

  async createPaymentMercadoPago(name, price, unit, img) {
    const url = `${this.mercadoPagoUrl}/preferences?access_token=${this.tokensMercadoPago.test.access_token}`;

    const items = [
      {
        id: "1234",
        title: name,
        description: "Dispositivo movil de Tienda e-commerce",
        picture_url: "https://courseit.com.ar/static/logo.png",
        category_id: "1234",
        quantity: parseInt(unit),
        currency_id: "ARS",
        unit_price: parseFloat(price)
      }
    ];

  //   {
  //     "id": 815138620,
  //     "nickname": "TESTCWPGTHOS",
  //     "password": "qatest684",
  //     "site_status": "active",
  //     "email": "test_user_12858620@testuser.com"
  // }
    const preferences = {
      items,
      external_reference: "medicatgrow@gmail.com",
      payer: {
        name: "Cosme",
        surname: "Fulanito",
        email: "test_user_12858620@testuser.com",
        phone: {
          area_code: "11",
          number: "22223333"
        },
        address: {
          zip_code: "1111",
          street_name: "False",
          street_number: "123"
        }
      },
      payment_methods: {
        excluded_payment_methods: [
          {
            id: "amex"
          }
        ],
        excluded_payment_types: [{ id: "atm" }],
        installments: 6,
        default_installments: 6
      },
      back_urls: {
        success: "https://mpcheck.herokuapp.com/success",
        pending: "https://mpcheck.herokuapp.com/pending",
        failure: "https://mpcheck.herokuapp.com/error"
      },
      notification_url: "https://mpcheck.herokuapp.com/webhook",
      auto_return: "approved"
    };

    try {
      const request = await axios.post(url, preferences, {
        headers: {
          "Content-Type": "application/json",
          "x-integrator-id": "dev_24c65fb163bf11ea96500242ac130004"
        }
      });
      return request.data;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = PaymentService;
