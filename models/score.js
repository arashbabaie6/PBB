var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const ScoreboardSchema = new Schema({
  sports_content: {
    sports_meta: {
      date_time: {
        type: "String"
      },
      season_meta: {
        calendar_date: {
          type: "String"
        },
        season_year: {
          type: "String"
        },
        stats_season_year: {
          type: "String"
        },
        stats_season_id: {
          type: "String"
        },
        stats_season_stage: {
          type: "String"
        },
        roster_season_year: {
          type: "String"
        },
        schedule_season_year: {
          type: "String"
        },
        standings_season_year: {
          type: "String"
        },
        season_id: {
          type: "String"
        },
        display_year: {
          type: "String"
        },
        display_season: {
          type: "String"
        },
        season_stage: {
          type: "String"
        },
        league_id: {
          type: "String"
        }
      },
      next: {
        url: {
          type: "String"
        }
      }
    },
    games: {
      game: {
        type: ["Mixed"]
      }
    }
  }
});

const Scoreboard = mongoose.model('scoreboard', ScoreboardSchema);

module.exports = Scoreboard;
