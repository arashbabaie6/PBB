const express = require("express");
const router = express.Router();
const axios = require("axios");
var moment = require("moment");
var jalaali = require("moment-jalaali");

const teamNameTable = {
  MIL: { city: "میلواکی", title: "باکس" },
  GSW: { city: "گلدن استیت", title: "واریورز" },
  TOR: { city: "تورنتو", title: "رپتورز" },
  DEN: { city: "دنور", title: "ناگتس" },
  IND: { city: "ایندیانا", title: "پیسرز" },
  POR: { city: "پرتلند", title: "تریل بلیزرز" },
  PHI: { city: "فیلادلفیا", title: "سونتی‌ سیکسرز" },
  OKC: { city: "اکلاهما", title: "سیتی تاندر" },
  BOS: { city: "بوستون", title: "سلتیکس" },
  SAS: { city: "سن آنتونیو", title: "اسپرز" },
  HOU: { city: "هیوستون", title: "راکتس" },
  BKN: { city: "بروکلین", title: "نتس" },
  UTA: { city: "یوتا", title: "جاز" },
  MIA: { city: "میامی", title: "هیت" },
  LAL: { city: "لس آنجلس", title: "لیکرز" },
  CHA: { city: "شارلوت", title: "هورنتز" },
  LAC: { city: "لس آنجلس", title: "کلیپرز" },
  DET: { city: "دیترویت", title: "پیستونز" },
  SAC: { city: "ساکرامنتو", title: "کینگز" },
  WAS: { city: "واشینگتن", title: "ویزاردز" },
  MIN: { city: "مینه‌ سوتا", title: "تیمبرولوز" },
  ORL: { city: "اورلندو", title: "مجیک" },
  NOP: { city: "نیو اورلینز", title: "پلیکانز" },
  ATL: { city: "آتلانتا", title: "هاکس" },
  DAL: { city: "دالاس", title: "ماوریکس" },
  NYK: { city: "نیویورک", title: "نیکس" },
  MEM: { city: "ممفیس", title: "گریزلیز" },
  CHI: { city: "شیکاگو", title: "بولز" },
  PHX: { city: "فینیکس", title: "سانز" },
  CLE: { city: "کلیولند", title: "کاوالیرز" }
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
        e.date_ir = jalaali(yesterdayGames + "T" + e.time)
          .add(8, "hours")
          .add(30, "minutes")
          .format("jYYYY,jMM,jDD");
        e.time_ir = jalaali(yesterdayGames + "T" + e.time)
          .add(8, "hours")
          .add(30, "minutes")
          .format("hh:mm a");
        e.home.name_persian = teamNameTable[e.home.abbreviation];
        e.visitor.name_persian = teamNameTable[e.visitor.abbreviation];
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
        e.date_ir = jalaali(preday + "T" + e.time)
          .add(8, "hours")
          .add(30, "minutes")
          .format("jYYYY,jMM,jDD");
        e.time_ir = jalaali(preday + "T" + e.time)
          .add(8, "hours")
          .add(30, "minutes")
          .format("hh:mm a");
        e.home.name_persian = teamNameTable[e.home.abbreviation];
        e.visitor.name_persian = teamNameTable[e.visitor.abbreviation];
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
        e.date_ir = jalaali(incday + "T" + e.time)
          .add(8, "hours")
          .add(30, "minutes")
          .format("jYYYY,jMM,jDD");
        e.time_ir = jalaali(incday + "T" + e.time)
          .add(8, "hours")
          .add(30, "minutes")
          .format("hh:mm a");
        e.home.name_persian = teamNameTable[e.home.abbreviation];
        e.visitor.name_persian = teamNameTable[e.visitor.abbreviation];
      });
      res.json(responseOBJ);
    });
});

module.exports = router;
