import express from "express";
import dotenv from "dotenv";
import pg from "pg";
import cors from "cors";

dotenv.config();
const db = new pg.Pool({ connectionString: process.env.DB_URL });
const app = express();
app.use(cors());
app.use(express.json());

app.listen(3000, () => console.log("Server running on 3000"));

app.post("/addMsg", (req, res) => {
  const body = req.body;
  const query = db.query(
    `INSERT INTO guestbook (massage, guest_name, hosts_name) VALUES ($1, $2, $3)`,
    [body.message, body.guest_name, body.hosts_name]
  );
  res.json(query);
});

app.get("/getMsg", async (req, res) => {
  const data = await db.query(`SELECT * FROM guestbook`);
  let dataJson = data.rows;
  res.json(dataJson);
});
