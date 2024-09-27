import { NextResponse } from "next/server";
import db from "../../../config/db";
import Cors from "cors";
const cors = Cors({
  methods: ['GET', 'POST', 'OPTIONS'],
  origin: 'https://ticket-generation.vercel.app', // Adjust as necessary
});

// Middleware to handle CORS preflight
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

db.connect();

export const GET = async () => {
  await runMiddleware(req, NextResponse.next(), cors);
  try {
    const response = await db.query("SELECT * FROM users");
    return NextResponse.json({
      message: "Successfully Users getting",
      users: response.rows,
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({
      message: "something went wrong Users getting",
      error: JSON.stringify(error),
    });
  }
};

export const POST = async (req) => {
  await runMiddleware(req, NextResponse.next(), cors);
  try {
    const { username, email, phone, city } = await req.json();
    const query =
      "INSERT INTO users (username, email, phone, city) VALUES($1, $2, $3, $4) RETURNING *";
    const response = await db.query(query, [username,email,  phone, city]);

    return NextResponse.json({
      message: "Successfully created user",
      user: response.rows[0],
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong while creating user",
      error: error.message, // Returning the error message for easier debugging
    });
  }
};
