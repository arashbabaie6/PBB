const express = require("express");
const router = express.Router();
const axios = require("axios");
var moment = require("moment");

router.get("/", (req, res) => {
  let yesterdayGames = moment()
    .subtract(1, "days")
    .format("YYYYMMDD");
  axios
    .get(
      `http://data.nba.net/json/cms/noseason/scoreboard/${yesterdayGames}/games.json`
    )
    .then(response => {
      let responseOBJ = response.data;
      responseOBJ.sports_content.games.game.forEach(e => {
        delete e.game_url;
        delete e.home_start_date;
        delete e.home_start_time;
        delete e.visitor_start_date;
        delete e.visitor_start_time;
        delete e.previewAvailable;
        delete e.recapAvailable;
        delete e.notebookAvailable;
        delete e.ticket;
        delete e.lp;
        delete e.dl;
        delete e.broadcasters;
      });
      res.json(responseOBJ);
    });
});

router.get("/decDay/:date", (req, res) => {
  let preday = moment(req.params.date)
    .subtract(1, "days")
    .format("YYYYMMDD");
  axios
    .get(
      `http://data.nba.net/json/cms/noseason/scoreboard/${preday}/games.json`
    )
    .then(response => {
      let responseOBJ = response.data;
      responseOBJ.sports_content.games.game.forEach(e => {
        delete e.game_url;
        delete e.home_start_date;
        delete e.home_start_time;
        delete e.visitor_start_date;
        delete e.visitor_start_time;
        delete e.previewAvailable;
        delete e.recapAvailable;
        delete e.notebookAvailable;
        delete e.ticket;
        delete e.lp;
        delete e.dl;
        delete e.broadcasters;
      });
      res.json(responseOBJ);
    });
});

router.get("/incDay/:date", (req, res) => {
  let incday = moment(req.params.date)
    .add(1, "days")
    .format("YYYYMMDD");
  axios
    .get(
      `http://data.nba.net/json/cms/noseason/scoreboard/${incday}/games.json`
    )
    .then(response => {
      let responseOBJ = response.data;
      responseOBJ.sports_content.games.game.forEach(e => {
        delete e.game_url;
        delete e.home_start_date;
        delete e.home_start_time;
        delete e.visitor_start_date;
        delete e.visitor_start_time;
        delete e.previewAvailable;
        delete e.recapAvailable;
        delete e.notebookAvailable;
        delete e.ticket;
        delete e.lp;
        delete e.dl;
        delete e.broadcasters;
      });
      res.json(responseOBJ);
    });
});

module.exports = router;
