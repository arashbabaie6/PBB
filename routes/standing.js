const express = require("express");
const router = express.Router();
const axios = require("axios");

function modifyStanding(obj) {
  for (var i in obj.sports_content.standings.conferences) {
    if (i !== "East" && i !== "West") {
      delete obj.sports_content.standings.conferences[i];
    }
  }
  return obj;
}

router.get("/main", (req, res) => {
  axios
    .get("http://data.nba.net/json/cms/2018/standings/conference.json")
    .then(response => {
      let responseObj = modifyStanding(response.data);
      res.json(responseObj);
    })
    .catch(err => {
      console.log(err);
    });
});
module.exports = router;
/*http://nbasense.com/nba-api/Data/Cms/Standings/ConferenceStanding*/
