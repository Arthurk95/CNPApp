var express = require('express');
var router = express.Router();
const auth = require('../public/javascripts/loginScripts');
/* GET home page. */
router.get('/', auth.checkAuthenticated, function (req, res, next) {
  var Students = [];
  var daily_query = "CALL PullUnhiddenStudents();";
  con.query(daily_query, function (err, dailyStudents) {
    if (err) {
      console.log(err);
    }

    recurseDailies(Students, dailyStudents, 0, res);
  })

  function recurseDailies(Students, dailyStudents, i, res) {
    var Student = { id: 0, name: "", listOfActivities: [], pottyBreaks: 0, pottyAccidents: 0 };
    if (i < (dailyStudents[0].length)) {
      Student.id = dailyStudents[0][i].StudentId;
      Student.name = dailyStudents[0][i].StudentName;

      Students.push({
        id: Student.id,
        name: Student.name,
        listOfActivities: [],
        pottyBreaks: 0,
        pottyAccidents: 0
      });
      activities_query = "CALL ShowStudentDailyActivitiesToday(" + Students[i].id + ");";
      con.query(activities_query, function (err, act) {
        if (err) {
          console.log(err);
        }

        con.query(`CALL PullRestroomNumberId(${Students[i].id});`, function (err, pottyCount) {
          if (err) {
            console.log(err);
          }
          con.query(`CALL PullAccidentNumberId(${Students[i].id});`, function (err, accidentCount) {
            if (err) {
              console.log(err);
            }
            var [pottyAccidents] = accidentCount[0];
            console.log(pottyAccidents);
            try {
              Students[i].pottyAccidents = pottyAccidents.RestroomAccidentNumber;
            } catch (e) {
              Students[i].pottyAccidents = 'err';
              console.log(e);
            }
            var [pottyBreaks] = pottyCount[0];
            console.log(pottyBreaks);
            try {
              Students[i].pottyBreaks = pottyBreaks.RestroomActivityNumber;
            } catch (e) {
              Students[i].pottyBreaks = 'err';
              console.log(e);
            }

            var looper = act[0];
            looper.forEach(element => {
              if (element) {
                Students[i].listOfActivities.push(element);
              }
            });

            recurseDailies(Students, dailyStudents, i + 1, res);
            if (i == (dailyStudents[0].length) - 1) {
              bottomLayer(res, Students, con);
            }
          });
        });
      });
    }
    if (0 == (dailyStudents[0].length)) {
      bottomLayer(res, Students);
    }

  }

});
function bottomLayer(res, Students, con) {
  console.log(Students);
  res.render('reports.ejs', { title: 'CNP Daily Report', reports: Students });
}
module.exports = router;
