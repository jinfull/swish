// const thisYear = '2018-19';
// const jokic = 203999;

// var request = new XMLHttpRequest();
// let params = `&Season=${thisYear}&PlayerID=${jokic}`;
// request.open('GET', 'https://stats.nba.com/stats/shotchartdetail?Period=0&VsConference&LeagueID=00&LastNGames=0&TeamID=0&PlayerPosition&Location&Outcome&ContextMeasure=FGA&DateFrom&StartPeriod&DateTo&OpponentTeamID=0&ContextFilter&RangeType&AheadBehind&EndRange&VsDivision&PointDiff&RookieYear&GameSegment&Month=0&ClutchTime&EndPeriod&SeasonType=Regular+Season&SeasonSegment&GameID' + params, true);

// request.onload = function () {
//     if (request.status >= 200 && request.status < 400) {
//         // Success!
//         var resp = request.responseText;
//         console.log(resp);
//     } else {
//         // We reached our target server, but it returned an error
//     }
// };

// request.send();

// export const playerShotChart = (playerId, season) => {
//     $.ajax({
//     url: "https://stats.nba.com/stats/shotchartdetail",
//     type: "get", //send it through get method
//     data: {
//         Period: 0,
//         VsConference: null,
//         LeagueID: "00",
//         LastNGames: 0,
//         TeamID: 0,
//         PlayerPosition: null,
//         Location: null,
//         Outcome: null,
//         ContextMeasure: "FGA",
//         DateFrom: null,
//         StartPeriod: null,
//         DateTo: null,
//         OpponentTeamID: null,
//         ContextFilter: null,
//         RangeType: null,
//         Season: `${season}`,
//         AheadBehind: null,
//         PlayerID: `${playerId}`,
//         EndRange: null,
//         VsDivision: null,
//         PointDiff: null,
//         RookieYear: null,
//         GameSegment: null,
//         Month: 0,
//         ClutchTime: null,
//         EndPeriod: null,
//         SeasonType: "Regular Season",
//         SeasonSegment: null,
//         GameID: null
//     },
//     success: function (res) {
//         console.log(res);
//     }
// })};
