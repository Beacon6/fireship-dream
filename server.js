import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { createApi } from "unsplash-js";

dotenv.config();

const unsplash = createApi({
    accessKey: process.env.UNSPLASH_API,
});

const app = express();
app.use(cors());
app.use(express.json());

app.post("/dream", async (req, res) => {
    const prompt = req.body.prompt;

    const searchResult = await unsplash.search.getPhotos({
        query: prompt,
        orientation: "squarish",
    });

    res.send({ searchResult });
});

app.listen(8080, () => console.log("Search photos on http://localhost:8080/dream"));
