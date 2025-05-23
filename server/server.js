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

app.post("/addMsg", async (req, res) => {
  const body = req.body;
  const query = await db.query(
    `INSERT INTO guestbook (massage, guest_name, hosts_name) VALUES ($1, $2, $3) RETURNING id`,
    [body.message, body.guest_name, body.hosts_name]
  );
  res.json(query.rows);
});

app.get("/getMsg", async (req, res) => {
  const query = await db.query(`SELECT * FROM guestbook ORDER BY id ASC`);
  let data = query.rows;
  res.json(data);
});

app.put("/updateMsg/:id/likes/:likes", (req, res) => {
  const params = req.params;
  const query = db.query(`UPDATE guestbook SET likes=($1) WHERE id=($2)`, [
    params.likes,
    params.id,
  ]);
  res.json(query);
});

app.delete("/deleteMsg/:id", (req, res) => {
  const params = req.params;
  const query = db.query(`DELETE FROM guestbook WHERE id=($1)`, [params.id]);
  res.json(query);
});
