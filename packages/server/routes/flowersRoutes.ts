import express from "express";
import { db } from "../configs/db.config";
import { checkAuth } from '../auth';
import { mkCtx } from '../db/entities';

export const registerFlowers = () => {
  const app = express.Router();
  const dbCtx = mkCtx();

  //gets all flowers with all data
  app.get("/", checkAuth, async (req, res) => {
    try {
      const flowers = await dbCtx.flowers.orderBy("flower.flower_name").getMany();
      res.status(200).json(flowers);
    } catch (err) {
      console.log(err);
    }
  });

  //get one specific flower
  app.get("/:id", async (req, res) => {
    try {
      const results = await db.query("SELECT * FROM flowers WHERE id = $1", [
        req.params.id,
      ]);
      res.status(200).json(results.rows[0]);
    } catch (err) {
      console.log(err);
    }
  });

  //delete a flower
  app.delete("/:id", async (req, res) => {
    try {
      await dbCtx.flowers
        .softDelete()
        .where("id = :id", { id: req.params.id })
        .execute();

      res.status(204).json({
        status: "success",
        id: Number(req.params.id)
      });
    } catch (err) {
      console.log(err);
    }
  });

  //create a flower
  app.post("/", async (req, res) => {
    console.log(req.body);
    try {
      const results = await db.query(
        "INSERT INTO flowers (flower_name, stem_price) VALUES ($1, $2) returning *",
        [req.body.flower_name, req.body.stem_price]
      );
      res.status(201).json(results.rows[0]);
    } catch (err) {
      console.log(err);
      res.status(500).send();
    }
  });

  //edit a flower
  app.patch("/:id", async (req, res) => {
    try {
      const results = await db.query(
        "UPDATE flowers SET flower_name = $1, stem_price = $2 WHERE id = $3 returning *",
        [
          req.body.flower_name,
          req.body.stem_price,
          req.params.id,
        ]
      );
      res.status(200).json({
        status: "success",
        data: {
          flower: results.rows[0],
        },
      });
    } catch (err) {
      console.log(err);
    }
    console.log(req.params.id);
    console.log(req.body);
  });

  return app;
};
