const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { pool } = require("./db/db");
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

const app = express();

// ------------------------
// Middleware
// ------------------------
app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static("./uploads"));

// ------------------------
// CORS setup
// ------------------------
const allowedOrigins = [
  "https://shopvera-mern-ecommerence.onrender.com", // deployed frontend
  "http://localhost:5173"  // dev
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow Postman / server
    if (allowedOrigins.includes(origin)) return callback(null, true); // allow frontend
    return callback(new Error("CORS not allowed"));
  },
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"], // include OPTIONS
  credentials: true
}));

// ------------------------
// Routes
// ------------------------
app.get("/data", async (req, res) => {
  console.log("Received /data request");

  try {
    const [data] = await pool.query("SELECT * FROM products");
    console.log("First row:", data[0]);
    return res.status(200).json(data);
  } catch (error) {
    console.error("🔥 Query error:", error.message);
    return res.status(500).json({
      msg: "Database rejected the request",
      error: error.message
    });
  }
});

app.get("/detail/:id/:category", async (req, res) => {
  try {
    const { id, category } = req.params;
    const [data] = await pool.query(
      "SELECT * FROM products WHERE id=? AND category=?",
      [id, category]
    );
    console.log("Detail row:", data[0]);
    return res.status(200).json(data);
  } catch (error) {
    console.error("Detail error:", error.message);
    return res.status(404).json({ msg: "Error fetching detail" });
  }
});

// User routes
app.use("/user", require("./routes/userRoute").userRouter);

// ------------------------
// Nodemailer
// ------------------------
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

app.post("/sendMail", async (req, res) => {
  const { checkInDate, checkOutDate, guests } = req.body.data;

  const mailConfig = {
    from: "aad769650@gmail.com",
    to: "aad769650@gmail.com",
    subject: `New Booking – ${guests} guest(s)`,
    text: `
New Booking Details

Check-in Date: ${checkInDate}
Check-out Date: ${checkOutDate}
Number of Guests: ${guests}
    `,
  };

  try {
    await transport.sendMail(mailConfig);
    console.log("Email sent");
    return res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (err) {
    console.error("Email error:", err.code || err.message);
    return res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

// ------------------------
// Listen
// ------------------------
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});