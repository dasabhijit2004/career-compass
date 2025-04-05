// const express = require('express');
import express from "express";
import admin from "firebase-admin";
import methodOverride from "method-override";

// import serviceAccount from './serviceAccountKey.json' with { type: "json" };

import cors from "cors";
import dotenv from "dotenv";
import careerRoutes from "./routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(methodOverride('_method')); // Use '_method' query parameter for method overriding



// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// const db = admin.firestore();
// const auth = admin.auth();
// const itemsCollection = db.collection('items');
const port = parseInt(process.env.PORT) || process.argv[3] || 8080;



app.use("/api", careerRoutes);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});


// Collections

// Create
