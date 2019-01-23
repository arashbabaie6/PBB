const express = require("express");
const router = express.Router();
const axios = require("axios");

function modifyLeaugeLeaders(obj) {
  return obj.resultSet.find(r => r.name == "LeadersTiles");
}

router.get("/:statCategory/Player", (req, res) => {
  axios
    .get(
      `http://stats.nba.com/stats/leaderstiles/?leagueId=00&season=2018-19&seasonType=Regular+Season&stat=${
        req.params.statCategory
      }&playerOrTeam=Player&gameScope=Season&playerScope=All+Players`
    )
    .then(response => {
      let responseClient = modifyLeaugeLeaders(response.data);
      res.json(responseClient);
    })
    .catch(err => {
      console.log(err);
    });
});
router.get("/:statCategory/Team", (req, res) => {
  axios
    .get(
      `http://stats.nba.com/stats/leaderstiles/?leagueId=00&season=2018-19&seasonType=Regular+Season&stat=${
        req.params.statCategory
      }&playerOrTeam=Team&gameScope=Season&playerScope=All+Players`
    )
    .then(response => {
      let responseClient = modifyLeaugeLeaders(response.data);
      res.json(responseClient);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;

/*http://nbasense.com/nba-api/Stats/Stats/Homepage/LeadersTiles*/
