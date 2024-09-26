import { NextResponse } from "next/server";
import db from "../../../config/db";

db.connect();

export const GET = async () => {
  try {
    const response = await db.query("SELECT * FROM ticket");
    return NextResponse.json({
      message: "Successfully Users getting",
      ticket: response.rows,
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
    const { email,username,companyname,jobtitle } = await req.json();
    const query = "INSERT INTO ticket (email,username,companyname,jobtitle) VALUES($1,$2,$3,$4) RETURNING *";
    const response = await db.query(query, [email,username,companyname,jobtitle]);

    return NextResponse.json({
      message: "Successfully created user",
      ticket: response.rows[0],
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong while creating user",
      error: error.message, 
    });
  }
};
