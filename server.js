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

  try {
    const photo = searchResult.response.results[0].urls.full;
    const profileLink = searchResult.response.results[0].user.links.html;
    const profileName = searchResult.response.results[0].user.name;

    console.log("Currently displaying:");
    console.log(photo);

    res.send({ photo, profileLink, profileName });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong...");
  }
});

app.listen(8080, () => console.log("Search photos on http://localhost:8080/dream"));
