// SECTION == Imports ==

import express from "express";
import session from "express-session";
import lodash from "lodash";
import morgan from "morgan";
import nunjucks from "nunjucks";
import ViteExpress from "vite-express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// !SECTION ==============

// SECTION == Initializers ==

const app = express();
const port = "8000";

// !SECTION ==============

// SECTION == Middle-ware ==
// json parser
// serve static files
// urlencoded
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(
  session({ secret: "ssshhhhh", saveUninitialized: true, resave: false })
);

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

// !SECTION ==============

// SECTION == Databases ==

const MOST_LIKED_FOSSILS = {
  aust: {
    img: "/img/australopith.png",
    name: "Australopithecus",
    num_likes: 584,
  },
  quetz: {
    img: "/img/quetzal_torso.png",
    name: "Quetzal",
    num_likes: 587,
  },
  steg: {
    img: "/img/stego_skull.png",
    name: "Stegosaurus",
    num_likes: 598,
  },
  trex: {
    img: "/img/trex_skull.png",
    name: "Tyrannosaurus Rex",
    num_likes: 601,
  },
};

const OTHER_FOSSILS = [
  {
    img: "/img/ammonite.png",
    name: "Ammonite",
  },
  {
    img: "/img/mammoth_skull.png",
    name: "Mammoth",
  },
  {
    img: "/img/ophthalmo_skull.png",
    name: "Opthalmosaurus",
  },
  {
    img: "/img/tricera_skull.png",
    name: "Triceratops",
  },
];

// !SECTION ==============

// SECTION == Routes ==

app.get("/", (req, res) => {
  res.render("homepage.html.njk");
});

app.post("/get-name", (req, res) => {
  console.log("at get-name page");
  console.log(req.body.name);

  const username = req.body.name;
  console.log(username);

  req.session.username = username;

  res.redirect("/top-fossils");
});

app.get("/random-fossil.json", (req, res) => {
  const randomFossil = lodash.sample(OTHER_FOSSILS);
  res.json(randomFossil);
});

app.get("/top-fossils", (req, res) => {
  console.log("top-fossils route");
  console.log(req.session.username);
  if (req.session.username) {
    console.log("there is a session username");
    res.status(200).render("top-fossils.html.njk", {
      fossils: MOST_LIKED_FOSSILS,
      username: req.session.username,
    });
  } else {
    console.log("there is no session username");
    res.redirect("/");
  }
});

app.post("/like-fossil", (req, res) => {
  console.log("===== like-fossil route =======");
  const likedFossil = req.body.fossilId;
  console.log(likedFossil);

  console.log(MOST_LIKED_FOSSILS[likedFossil]);
  console.log(MOST_LIKED_FOSSILS[likedFossil].num_likes);
  MOST_LIKED_FOSSILS[likedFossil].num_likes++;
  console.log(MOST_LIKED_FOSSILS[likedFossil].num_likes);

  res.render("thank-you.html.njk", {
    username: req.session.username,
  });
});

// !SECTION ==============

// SECTION == Server Listener ==

ViteExpress.listen(app, port, () => {
  console.log(`Server running on http://localhost:${port}...`);
});

// !SECTION ==============
