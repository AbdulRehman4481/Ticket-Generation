import { NextResponse } from "next/server";
import db from "../../../config/db";

db.connect();

export const GET = async () => {
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
