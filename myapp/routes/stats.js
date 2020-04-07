var express = require('express');
var router = express.Router();
const auth = require('../public/javascripts/loginScripts');

/* GET home page. */
router.get('/', auth.checkAuthenticated, function(req, res, next) {
  var sql = "SELECT MIN(CurrentDate) as startDate FROM cnp_data.DailyActivities;";
  con.query(sql, function(err,result){
    sql = "SELECT * FROM cnp_data.Activities;";
    con.query(sql, function(err,a){
      sql = "SELECT * FROM cnp_data.Students;";
      con.query(sql, function(err,s){
        res.render('stats', { title: 'Stats' , startDate: result[0].startDate, activities: JSON.stringify(a), students: JSON.stringify(s)});
      });
    });
  });
});

router.post('/getdata', auth.checkAuthenticated, function(req, res, next) {
  var id = req.body.id, prime = req.body.prime, beta = req.body.beta, weather = req.body.weather, start = req.body.start, end = req.body.end, caller = req.body.caller;
  var inputs = {id:id,prime:prime,beta:beta,weather:weather,caller:caller};
  var all = false;
  var sql,sql2,sql4;
  
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
        sql = "SELECT ast.*, ad.*, bs.StudentId as bId, bs.StudentName as bName, bs.Birthdate as bbirthdate FROM cnp_data.Students ast, cnp_data.DailyActivities ad, cnp_data.Students bs, cnp_data.DailyActivities bd " + 
        "WHERE ast.StudentId = ad.StudentId and ast.StudentId = " + id + " and ast.StudentId != bs.StudentId and bs.StudentId = bd.StudentId " +
        "and bd.ActivityId = ad.ActivityId and bd.CurrentTime = ad.CurrentTime;";
        sql2 = "SELECT * FROM cnp_data.Students;";
      }
    }
    else if(prime == "Activities"){
      if(beta == "Students"){
        sql = "SELECT * FROM cnp_data.Activities p, cnp_data.Students b, cnp_data.DailyActivities da " + 
        "WHERE b.StudentId = da.StudentId and da.ActivityId = p.ActivityId and p.ActivityId = " + id + " and da.CurrentDate BETWEEN '" + start + "' AND '" + end +  "';";
        sql2 = "SELECT * FROM cnp_data.Students;";
      }
    }
  } 
  else{
    if(prime == "Students"){
      if(beta == "Behavior" || beta == "ClassSession"){
        sql = "SELECT * FROM cnp_data.Students p, cnp_data." + beta + " b WHERE p.StudentId = b.StudentId " + " and b.CurrentDate BETWEEN '" + start + "' AND '" + end + "';";
        sql2 = "SELECT * FROM cnp_data.Students;";
      }
      if(beta == "Friends"){
        sql = "SELECT a.*, da.*, b.StudentId as bId, b.StudentName as bName, b.Birthdate as bBirthdate FROM cnp_data.Students a, cnp_data.Students b, cnp_data.DailyActivities da, cnp_data.DailyActivities db WHERE a.StudentId != b.StudentId AND " + 
              "a.StudentId = da.StudentId and b.StudentId = db.StudentId AND da.ActivityId = db.ActivityId AND da.CurrentTime = db.CurrentTime" + " and da.CurrentDate BETWEEN '" + start + "' AND '" + end + "';";
        sql2 = "SELECT * FROM cnp_data.Students;";
      }
      if(beta == "Activities"){
        sql = "SELECT * FROM cnp_data.Students a, cnp_data.Activities b, cnp_data.DailyActivities c WHERE a.StudentId = c.StudentId AND b.ActivityId = c.ActivityId" + " and c.CurrentDate BETWEEN '" + start + "' AND '" + end + "';";
        sql2 = "SELECT * FROM cnp_data.Activities;";
        sql4 = "SELECT * FROM cnp_data.Students;";
      }
    }
    if(prime == "Activities"){
      if(beta == "Students"){
        sql = "SELECT * FROM cnp_data.Students a, cnp_data.Activities b, cnp_data.DailyActivities c WHERE a.StudentId = c.StudentId AND b.ActivityId = c.ActivityId" + " and c.CurrentDate BETWEEN '" + start + "' AND '" + end + "';";
        sql2 = "SELECT * FROM cnp_data.Students;";
        sql4 = "SELECT * FROM cnp_data.Activities;";
      }
    }
  }
  console.log(sql);
  con.query(sql, function (err, primeVal) {
    con.query(sql2, function (err, betaVal) {
      if(all && (prime == "Students" && beta == "Activities") || (prime == "Activities" && beta == "Students")){
        con.query(sql4, function (err, extraVal){
          if(weather == "all"){
            values = {"primeval":primeVal,"betaval":betaVal,"inputs":inputs,"extras":extraVal};
            processData(values,res);
          }
          else{
            var sql3 = "SELECT * FROM cnp_data.Weather WHERE description like '" + weather + "' and dateTimes BETWEEN '" + start + "' AND '" + end + "';";
            con.query(sql3, function (err, weatherVal){
              values = {"primeval":primeVal,"betaval":betaVal,"weatherVal":weatherVal,"inputs":inputs,"extras":extraVal};
              processData(values,res);
            });
          }
        });
      }
      else
      {
        if(weather == "all"){
          values = {"primeval":primeVal,"betaval":betaVal,"inputs":inputs};
          processData(values,res);
        }
        else{
          var sql3 = "SELECT * FROM cnp_data.Weather WHERE description like '" + weather + "' and dateTimes BETWEEN '" + start + "' AND '" + end + "';";
          con.query(sql3, function (err, weatherVal){
            values = {"primeval":primeVal,"betaval":betaVal,"weatherVal":weatherVal,"inputs":inputs};
            processData(values,res);
          });
        }
      }
    });
  });
});

function processData(data,res){
  //res.send(data);
  var outputs = [];
  var meta = {};
  if(data.primeval.length == 0)
  {
    meta.name = "No Data";
  }
  else if(data.inputs.prime == "Students"){
    if(data.inputs.id == "all"){
      if(data.inputs.beta == "Behavior"){
        data.betaval.forEach(element =>{
          var TotalActivity = 0;
          var TotalAccidents = 0;
          var count = 0;
          var input = {};
          meta.mostAccidentsNum = 0;
          meta.mostAccidents = [];
          meta.mostActivityNum = 0;
          meta.mostActivity = [];
          input['name'] = element.StudentName;
          data.primeval.forEach(row => {
            if(element.StudentId == row.StudentId){
              var date = new Date(row.CurrentDate);
              var present = false;
              if(data.inputs.weather != "all"){
                data.weatherVal.forEach(entry =>{
                  var weatherDate = new Date(entry.dateTimes);
                  if(" " +date.getFullYear()+date.getMonth()+date.getDate() == " " + weatherDate.getFullYear()+weatherDate.getMonth()+weatherDate.getDate()){
                    present = true;
                  }
                });
              }
              else{
                present = true;
              }
              if(present){
                TotalActivity = TotalActivity + row.RestroomActivityNumber;
                TotalAccidents = TotalAccidents + row.RestroomAccidentNumber;
                count = count + 1;
              }
            }
          });  
          input['accidents'] = TotalAccidents;
          input['activity'] = TotalActivity;
          input['days'] = count;
          if(TotalAccidents > meta.mostAccidentsNum){
            meta.mostAccidentsNum = TotalAccidents;
            meta.mostAccidents = [input.name];
          }
          else if(TotalAccidents == meta.mostAccidents && TotalAccidents > 0){
            meta.mostAccidents.push(input.name);
          }
          if(TotalActivity > meta.mostActivityNum){
            meta.mostActivityNum = TotalActivity;
            meta.mostActivity = [input.name];
          }
          else if(TotalActivity == meta.mostAccidents && TotalActivity > 0){
            meta.mostActivity.push(input.name);
          }
          outputs.push(input);
        }); 
        outputs.push(meta);  
      }
      else if(data.inputs.beta == "ClassSession"){
        var i = 0;
        data.betaval.forEach(element =>{
          var TotalAbsences = 0;
          var count = 0;
          var input = {};
          meta.mostAbsencesNum = 0;
          meta.mostAbsences = [];
          input['name'] = element.StudentName;
          data.primeval.forEach(row => {
            if(element.StudentId == row.StudentId){
              var date = new Date(row.CurrentDate);
              var present = false;
              if(data.inputs.weather != "all"){
                data.weatherVal.forEach(entry =>{
                  var weatherDate = new Date(entry.dateTimes);
                  if(" " +date.getFullYear()+date.getMonth()+date.getDate() == " " + weatherDate.getFullYear()+weatherDate.getMonth()+weatherDate.getDate()){
                    present = true;
                  }
                });
              }
              else{
                present = true;
              }
              if(present){
                TotalAbsences = TotalAbsences + row.Absent;
                count = count + 1;
              }
            }
          });  
          input['absences'] = TotalAbsences;
          input['days'] = count;
          if(TotalAbsences > meta.mostAbsencesNum){
            meta.mostAbsencesNum = TotalAbsences;
            meta.mostAbsences = [input.name];
          }
          else if(TotalAbsences == meta.mostAbsencesNum && TotalAbsences > 0){
            meta.mostAbsences.push(input.name);
          }
          outputs.push(input);
        }); 
        outputs.push(meta);
      }
      else if(data.inputs.beta == "Friends"){
        data.betaval.forEach(top =>{
          var minimeta = {name:top.StudentName,id:top.StudentId,bestFriendCount:0};
          minimeta.bestFriend = [];
          var student = [];
          var i = 0;
          var total = 0;
          data.betaval.forEach(element =>{
            if(element.StudentId != top.StudentId){
              var input = {};
              input['friend'] = element.StudentName;
              input['id'] = element.StudentId;
              var count = 0;
              data.primeval.forEach(row =>{
                if(row.bId == element.StudentId && row.StudentId == top.StudentId){
                  var date = new Date(row.CurrentDate);
                  var present = false;
                  if(data.inputs.weather != "all"){
                    data.weatherVal.forEach(entry =>{
                      var weatherDate = new Date(entry.dateTimes);
                      if(" " +date.getFullYear()+date.getMonth()+date.getDate() == " " + weatherDate.getFullYear()+weatherDate.getMonth()+weatherDate.getDate()){
                        present = true;
                      }
                    });
                  }
                  else{
                    present = true;
                  }
                  if(present){
                    count = count + 1;
                    total = total + 1;
                  }
                }
              });
              input['timestogether'] = count;
              student.push(input);
              i = i + 1;
              if(input.timestogether > minimeta.bestFriendCount){
                minimeta.bestFriendCount = input.timestogether;
                friend = {friend:input.friend,friendId:input.id};
                minimeta.bestFriend = [friend];
              }
              else if(input.timestogether == minimeta.bestFriendCount && input.timestogether > 0){
                friend = {friend:input.friend,friendId:input.id};
                minimeta.bestFriend.push(friend);
              }
            }
            minimeta.totalPlayedwithothers = total;
          })
          student.push(minimeta);
          outputs.push(student);
        });
      }
      else if(data.inputs.beta == "Activities"){
        data.extras.forEach(extraz =>{
          var student = [];
          var minimeta = {};
          minimeta.favoriteAct = [];
          minimeta.favoriteActNum = 0;
          minimeta.Studentname = extraz.StudentName;
          
          var i = 0;
          data.betaval.forEach(element => {
            var activity = {name:element.ActivityName};
            var count = 0;
            var prevDate = null, prevType = null;
            data.primeval.forEach(row =>{
              var date = new Date(row.CurrentDate);
              if(prevDate != null && row.ActivityId == prevType && " " + date.getFullYear()+date.getMonth()+date.getDate() == " " +prevDate.getFullYear()+prevDate.getMonth()+prevDate.getDate()){
              }
              else{
                if(element.ActivityName == row.ActivityName && row.StudentName == extraz.StudentName){
                  var present = false;
                  if(data.inputs.weather != "all"){
                    data.weatherVal.forEach(entry =>{
                      var weatherDate = new Date(entry.dateTimes);
                      if(" " +date.getFullYear()+date.getMonth()+date.getDate() == " " + weatherDate.getFullYear()+weatherDate.getMonth()+weatherDate.getDate()){
                        present = true;
                      }
                    });
                  }
                  else{
                    present = true;
                  }
                  if(present){
                    count = count + 1;
                  }
                }
                prevDate = date;
                prevType = row.ActivityId;
              }
            });
            activity.value = count;
            student.push(activity);
            if(count > minimeta.favoriteActNum){
              minimeta.favoriteActNum = count;
              minimeta.favoriteAct = [activity.name];
            }
            else if(count == minimeta.favoriteActNum && count > 0){
              minimeta.favoriteAct.push(activity.name);
            }
            i = i+1;
          });
          student.push(minimeta);
          outputs.push(student);
        });
      }
    }
    else{
      meta.name = data.primeval[0].StudentName;
      if(data.inputs.beta == "Activities"){
        meta["caller"] = data.inputs.caller;
        var i = 0;
        data.betaval.forEach(element => {
          var activity = {activityName:element.ActivityName};
          var count = 0;
          var prevDate = null, prevType = null;
          data.primeval.forEach(row =>{
            var date = new Date(row.CurrentDate);
            if(prevDate != null && row.ActivityId == prevType && " " + date.getFullYear()+date.getMonth()+date.getDate() == " " +prevDate.getFullYear()+prevDate.getMonth()+prevDate.getDate()){
            }
            else{
              if(element.ActivityName == row.ActivityName){
                var present = false;
                if(data.inputs.weather != "all"){
                  data.weatherVal.forEach(entry =>{
                    var weatherDate = new Date(entry.dateTimes);
                    if(" " +date.getFullYear()+date.getMonth()+date.getDate() == " " + weatherDate.getFullYear()+weatherDate.getMonth()+weatherDate.getDate()){
                      present = true;
                    }
                  });
                }
                else{
                  present = true;
                }
                if(present){
                  count = count + 1;
                }
              }
              prevDate = date;
              prevType = row.ActivityId;
            }
          });
          activity.value = count;
          outputs.push(activity);
          i = i+1;
        });
        outputs.push(meta);
      }
      else if(data.inputs.beta == "Behavior"){
        var i = 0;
        var totAccident = 0, totActivity = 0;
        data.primeval.forEach(row =>{
          var input = {};
          var date = new Date(row.CurrentDate);
          var present = false;
          if(data.inputs.weather != "all"){
            data.weatherVal.forEach(entry =>{
              var weatherDate = new Date(entry.dateTimes);
              if(" " +date.getFullYear()+date.getMonth()+date.getDate() == " " + weatherDate.getFullYear()+weatherDate.getMonth()+weatherDate.getDate()){
                present = true;
              }
            });
          }
          else{
            present = true;
          }
          if(present){
            input['restroom'] = row.RestroomActivityNumber;
            input['accident'] = row.RestroomAccidentNumber;
            totAccident = totAccident + row.RestroomAccidentNumber;
            totActivity = totActivity + row.RestroomActivityNumber;
            outputs.push(input);
            i = i + 1;
          }
        });
        
        meta.TotalAccidents = totAccident;
        meta.TotalActivity = totActivity;
        meta.totalDays = i;
        outputs.push(meta);
      }
      else if(data.inputs.beta == "ClassSession"){
        var i = 0;
        meta.absences = 0;
        data.primeval.forEach(row =>{
          var input = {};
          var date = new Date(row.CurrentDate);
          var present = false;
          if(data.inputs.weather != "all"){
            data.weatherVal.forEach(entry =>{
              var weatherDate = new Date(entry.dateTimes);
              if(" " +date.getFullYear()+date.getMonth()+date.getDate() == " " + weatherDate.getFullYear()+weatherDate.getMonth()+weatherDate.getDate()){
                present = true;
              }
            });
          }
          else{
            present = true;
          }
          if(present){
            input['absent'] = row.Absent;
            meta.absences = meta.absences + row.Absent;
            outputs.push(input);
            i = i + 1;
          }
          
        });
        meta.totalDays = i;
        outputs.push(meta);
      }
      else if(data.inputs.beta == "Friends"){
        var i = 0;
        var total = 0;
        data.betaval.forEach(element =>{
          if(element.StudentId != data.primeval[0].StudentId){
            var input = {};
            input['friend'] = element.StudentName;
            var count = 0;
            data.primeval.forEach(row =>{
              if(row.bId == element.StudentId){
                var date = new Date(row.CurrentDate);
                var present = false;
                if(data.inputs.weather != "all"){
                  data.weatherVal.forEach(entry =>{
                    var weatherDate = new Date(entry.dateTimes);
                    if(" " +date.getFullYear()+date.getMonth()+date.getDate() == " " + weatherDate.getFullYear()+weatherDate.getMonth()+weatherDate.getDate()){
                      present = true;
                    }
                  });
                }
                else{
                  present = true;
                }
                if(present){
                  count = count + 1;
                  total = total + 1;
                }
              }
            });
            input['timestogether'] = count;
            outputs.push(input);
            i = i + 1;
          }
          meta.totalPlayedwithothers = total;
        })
        outputs.push(meta);
      }
    }
  }
  else if(data.inputs.prime == "Activities"){
    if(data.inputs.id == "all"){
      if(data.inputs.beta == "Students"){
        data.extras.forEach(extraz =>{
          var activity = [];
          var minimeta = {};
          minimeta.mostUsedBy = [];
          minimeta.favoriteNum = 0;
          minimeta.ActivityName = extraz.ActivityName;
          data.betaval.forEach(element => {
            var student = {name:element.StudentName};
            var count = 0;
            var prevDate = null, prevType = null;
            data.primeval.forEach(row =>{
              var date = new Date(row.CurrentDate);
              if(prevDate != null && row.ActivityId == prevType && " " + date.getFullYear()+date.getMonth()+date.getDate() == " " +prevDate.getFullYear()+prevDate.getMonth()+prevDate.getDate()){
              }
              else{
                if(element.StudentName == row.StudentName && row.ActivityName == extraz.ActivityName){
                  var present = false;
                  if(data.inputs.weather != "all"){
                    data.weatherVal.forEach(entry =>{
                      var weatherDate = new Date(entry.dateTimes);
                      if(" " +date.getFullYear()+date.getMonth()+date.getDate() == " " + weatherDate.getFullYear()+weatherDate.getMonth()+weatherDate.getDate()){
                        present = true;
                      }
                    });
                  }
                  else{
                    present = true;
                  }
                  if(present){
                    count = count + 1;
                  }
                }
                prevDate = date;
                prevType = row.StudentId;
              }
            });
            student.value = count;
            activity.push(student);
            if(count > minimeta.favoriteNum){
              minimeta.favoriteNum = count;
              minimeta.mostUsedBy = [student.name];
            }
            else if(count == minimeta.favoriteNum && count > 0){
              minimeta.mostUsedBy.push(student.name);
            }
          });
          activity.push(minimeta);
          outputs.push(activity);
        });
      }
    }
    else{
      if(data.inputs.beta == "Students"){
        meta.ActivityName = data.primeval[0].ActivityName;
        data.betaval.forEach(element => {
          var student = {};
          student.name = element.StudentName;
          var count = 0;
          var prevDate = null, prevType = null;
          data.primeval.forEach(row =>{
            var date = new Date(row.CurrentDate);
            if(prevDate != null && row.ActivityId == prevType && " " + date.getFullYear()+date.getMonth()+date.getDate() == " " +prevDate.getFullYear()+prevDate.getMonth()+prevDate.getDate()){
            }
            else{
              if(element.StudentName == row.StudentName){
                var present = false;
                if(data.inputs.weather != "all"){
                  data.weatherVal.forEach(entry =>{
                    var weatherDate = new Date(entry.dateTimes);
                    if(" " +date.getFullYear()+date.getMonth()+date.getDate() == " " + weatherDate.getFullYear()+weatherDate.getMonth()+weatherDate.getDate()){
                      present = true;
                    }
                  });
                }
                else{
                  present = true;
                }
                if(present){
                  count = count + 1;
                }
              }
              prevDate = date;
              prevType = row.StudentId;
            }
          });
          student.value = count;
          outputs.push(student);
        });
      }
    }
  }
  res.send(outputs);
}
module.exports = router;