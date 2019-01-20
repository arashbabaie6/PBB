const express = require("express");
const router = express.Router();
const axios = require("axios");
var moment = require("moment");
var jalaali = require("moment-jalaali");

const teamNameTable = {
  ATL: { city: "آتلانتا", title: "هاکس" },
  BKN: { city: "بروکلین", title: "نتس" },
  BOS: { city: "بوستون", title: "سلتیکس" },
  CHA: { city: "شارلوت", title: "هورنتز" },
  CHI: { city: "شیکاگو", title: "بولز" },
  CLE: { city: "کلیولند", title: "کاوالیرز" },
  DAL: { city: "دالاس", title: "ماوریکس" },
  DEN: { city: "دنور", title: "ناگتس" },
  DET: { city: "دیترویت", title: "پیستونز" },
  GSW: { city: "گلدن استیت", title: "واریورز" },
  HOU: { city: "هیوستون", title: "راکتس" },
  IND: { city: "ایندیانا", title: "پیسرز" },
  LAC: { city: "لس آنجلس", title: "کلیپرز" },
  LAL: { city: "لس آنجلس", title: "لیکرز" },
  MEM: { city: "ممفیس", title: "گریزلیز" },
  MIA: { city: "میامی", title: "هیت" },
  MIL: { city: "میلواکی", title: "باکس" },
  MIN: { city: "مینه‌ سوتا", title: "تیمبرولوز" },
  NOP: { city: "نیو اورلینز", title: "پلیکانز" },
  NYK: { city: "نیویورک", title: "نیکس" },
  OKC: { city: "اکلاهما", title: "سیتی تاندر" },
  ORL: { city: "اورلندو", title: "مجیک" },
  PHI: { city: "فیلادلفیا", title: "سونتی‌ سیکسرز" },
  PHX: { city: "فینیکس", title: "سانز" },
  POR: { city: "پرتلند", title: "تریل بلیزرز" },
  SAC: { city: "ساکرامنتو", title: "کینگز" },
  SAS: { city: "سن آنتونیو", title: "اسپرز" },
  TOR: { city: "تورنتو", title: "رپتورز" },
  UTA: { city: "یوتا", title: "جاز" },
  WAS: { city: "واشینگتن", title: "ویزاردز" },
};
moment.updateLocale("en", {
  meridiem: function(hour) {
    if (hour < 6) {
      return "بامداد";
    } else if (hour < 12) {
      return "صبح";
    } else if (hour < 17) {
      return "بعد از ضهر";
    } else if (hour < 20) {
      return "غروب";
    } else {
      return "شب";
    }
  }
});
function boxscoreModify(obj, date) {
  let responseOBJ = obj;
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
    e.date_ir = jalaali(date + "T" + e.time)
      .add(8, "hours")
      .add(30, "minutes")
      .format("jYYYY,jMM,jDD");
    e.time_ir = jalaali(date + "T" + e.time)
      .add(8, "hours")
      .add(30, "minutes")
      .format("hh:mm a");
    e.home.name_persian = teamNameTable[e.home.abbreviation];
    e.visitor.name_persian = teamNameTable[e.visitor.abbreviation];
  });
  return responseOBJ;
}

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
      responseOBJ = boxscoreModify(responseOBJ, yesterdayGames)
      res.json(responseOBJ);
    }).catch(function (error) {
      console.log(error);
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
      responseOBJ = boxscoreModify(responseOBJ, preday)
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
      responseOBJ = boxscoreModify(responseOBJ, incday)
      res.json(responseOBJ);
    });
});

module.exports = router;