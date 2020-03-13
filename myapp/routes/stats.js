var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var sql = "SELECT MIN(CurrentDate) as startDate FROM cnp_data.DailyActivities;";
  con.query(sql, function(err,result){
    res.render('stats', { title: 'Stats' , startDate: result[0].startDate});
  });
});

router.post('/getdata', function(req, res, next) {
  var id = req.body.id, prime = req.body.prime, beta = req.body.beta, weather = req.body.weather, start = req.body.start, end = req.body.end;
  var all = false;
  var sql,sql2;
  if(id == "all"){
    all = true;
  }
  if(!all){
    if(prime == "Students"){
      if(beta == "Activities"){
        sql = "SELECT * FROM cnp_data.Students p, cnp_data.Activities b, " + 
         "cnp_data.DailyActivities da WHERE p.StudentId = da.StudentId and da.ActivityId = b.ActivityId and p.StudentId = " + id + " and da.CurrentDate BETWEEN '" + start + "' AND '" + end + "';";
        sql2 = "SELECT * FROM cnp_data.Activities;";
      }
      if(beta == "Behavior" || beta == "ClassSession"){
        sql = "SELECT * FROM cnp_data.Students p, cnp_data." + beta + " b WHERE p.StudentId = b.StudentId and p.StudentId = " + id + " and b.CurrentDate BETWEEN '" + start + "' AND '" + end +  "';";
        sql2 = "SELECT * FROM cnp_data." + beta + ";";
      }
      if(beta == "Friends"){
        sql = "SELECT * FROM cnp_data.Students p, cnp_data.Activities b, " + 
        "cnp_data.DailyActivities da WHERE p.StudentId = da.StudentId and da.ActivityId = b.ActivityId and p.StudentId = " + id + " and da.CurrentDate BETWEEN '" + start + "' AND '" + end +
        "' UNION SELECT * FROM cnp_data.Students p, cnp_data.Activities b, cnp_data.DailyActivities da WHERE p.StudentId = da.StudentId and da.ActivityId = b.ActivityId and " +
        "p.StudentId != " + id + " and date_format(da.CurrentTime,'%Y-%m-%d %H:%i') IN (SELECT date_format(CurrentTime,'%Y-%m-%d %H:%i') FROM cnp_data.DailyActivities WHERE StudentId = " + 
        id + " and da.CurrentDate BETWEEN " + start + " AND " + end +  ");";
        sql2 = "SELECT * FROM cnp_data.Students;";
      }
    }
    else if(prime == "Activities"){
      if(beta == "Students"){
        sql = "SELECT * FROM cnp_data.Activities p, cnp_data.Students b, " + 
         "cnp_data.DailyActivities da WHERE p.StudentId = da.StudentId and da.ActivityId = b.ActivityId and p.ActivityId = " + id + " and da.CurrentDate BETWEEN '" + start + "' AND '" + end +  "';";
        sql2 = "SELECT * FROM cnp_data.Students;";
      }
    }
  } 
  else{
    if(prime == "Students"){
      if(beta == "Behavior" || beta == "ClassSession"){
        sql = "SELECT * FROM cnp_data.Students p, cnp_data." + beta + " b WHERE p.StudentId = b.StudentId " + " and b.CurrentDate BETWEEN '" + start + "' AND '" + end + "';";
        sql2 = "SELECT * FROM cnp_data." + beta + ";";
      }
      if(beta == "Playmate"){
        sql = "SELECT * FROM cnp_data.Students a, cnp_data.Students b, cnp_data.DailyActivities da, cnp_data.DailyActivities db WHERE a.StudentId != b.StudentId AND" + 
              "a.StudentId = da.StudentId and b.StudentId = db.StudentId AND da.ActivityId = db.ActivityId AND da.CurrentTime = db.CurrentTime" + " and da.CurrentDate BETWEEN '" + start + "' AND '" + end + "';";
        sql2 = "SELECT * FROM cnp_data.Students;";
      }
      if(beta == "Activities"){
        sql = "SELECT * FROM cnp_data.Students a, cnp_data.Activities b, cnp_data.DailyActivities c WHERE a.StudentId = c.StudentId AND b.ActivityId = c.ActivityId" + " and c.CurrentDate BETWEEN '" + start + "' AND '" + end + "';";
        sql2 = "SELECT * FROM cnp_data.Activities;";
      }
    }
  }
  console.log(sql);
  con.query(sql, function (err, primeVal) {
    con.query(sql2, function (err, betaVal) {
      if(weather == "all"){
        values = {"primeval":primeVal,"betaval":betaVal};
        res.send(values);
      }
      else{
        var sql3 = "SELECT * FROM cnp_data.Weather WHERE description like '" + weather + "';";
        con.query(sql3, function (err, weatherVal){
          values = {"primeval":primeVal,"betaval":betaVal,"weatherVal":weatherVal};
          res.send(values);
        });
      }
    });
  });
});

module.exports = router;