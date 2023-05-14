const express = require("express");
// const http = require("http");
const cors = require("cors");
const app = express();
// const server = http.createServer(app);
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { default: axios } = require("axios");
dotenv.config();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// parse application/json
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const Skey = process.env.SKEY;

const Pkey = process.env.PKEY;

const stripe = require("stripe")(Skey);

const PORT = process.env.PORT || 3200;

// console.clear();

// console.log(process.env.PKEY);

// key get from stripe account

app.get("/get-key", (req, res) => {
  res.send({
    key: Pkey,
    message: "Key get successfully",
    status: 200,
  });
});

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;
  console.log(amount);
  // Create a PaymentIntent with the order amount and currency
  if (amount === undefined) {
    res.send({
      message: "Amount is required",
      status: 404,
    });
    return;
  }
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Number(amount) * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

//aamar_pay

app.post("/aamar_pay_payment_request", async (req, res) => {
  const data = req.body;
  const tran_id = Math.random().toString(36).substr(2, 20);
  let uploadAbleData = new FormData();
  const body = {
    ...data,
    success_url: "http://localhost:3200/callback",

    signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
    // signature_key: process.env.AMAR_PAY_SIGNATURE_KEY,
    tran_id: tran_id,
    // store_id: process.env.STORE_ID,
    store_id: "aamarpaytest",
  };
  // console.log(uploadAbleData);
  for (const x in body) { gi 
    uploadAbleData.append(x, body[x]);
  }
  // const url = "https://secure.aamarpay.com/request.php";
  const url = "https://sandbox.aamarpay.com/index.php";
  try {
    const response = await axios.post(url, uploadAbleData);
    const data = await response.data;
    // console.log(response);
    // https://sandbox.aamarpay.com/paynow.php?track=AAM1683444992104443
    if (response.data === "Invalid Store ID") {
      res.send({
        message: "Invalid Store ID",
        status: 404,
        data: body,
      });
      return;
    }
    if (data) {
      res.send({
        message: "Payment request success",
        status: 200,
        // url: `https://secure.aamarpay.com${data}`
        data: data,
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      message: "Payment request failed",
      status: 404,
    });
  }
});

app.post("/callback", async (req, res, next) => {
  // Callback data
  console.log(req.body);
  const {
    pay_status,
    cus_name,
    cus_phone,
    cus_email,
    currency,
    pay_time,
    amount,
  } = req.body;
  res.render("callback", {
    title: "Payment Status",
    pay_status,
    cus_name,
    cus_phone,
    cus_email,
    currency,
    pay_time,
    amount,
  });



  res.send({
    pay_status,
    cus_name,
    cus_phone,
    cus_email,
    currency,
    pay_time,
    amount,
  });
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () =>
  console.log(`Server is running on port http://localhost:${PORT}`)
);
