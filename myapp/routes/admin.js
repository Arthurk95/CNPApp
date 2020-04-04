var express = require('express');
var router = express.Router();
var uploads = require('../public/javascripts/uploads');
const jo = require('jpeg-autorotate');
const auth = require('../public/javascripts/loginScripts');
const fs = require('fs');

  router.post('/addstudent', auth.checkAuthenticated, function(req, res){
    var sql = "CALL CreateNewStudentFinal('" + req.body.name + "','" + req.body.birthday + "','" + req.body.contact +
     "','" + req.body.email + "','" + req.body.contactNum + "','" + req.body.contact2 + "','" + req.body.email2 + 
     "','" + req.body.contactNum2 + "','" + req.body.mon + "','" + req.body.tue +
     "','" + req.body.wed + "','" + req.body.thu + "','" + req.body.fri + "','" + req.body.sat + 
     "','" + req.body.sun + "','" + req.body.halfDay + "','" + req.body.enroll + "');";
    con.query(sql, function (err, result) {
        if (err) throw(err);
        res.end();
    });
  });
  router.put('/savestudent', auth.checkAuthenticated, function(req, res){
    var sql = "CALL UpdateStudent('" + req.body.id + "', '" + req.body.name + "', '" + req.body.birthday + "', '" + req.body.G1Name + "', '" + req.body.G1EMail + 
              "', '" + req.body.G1Phone + "', '" + req.body.G2Name + "', '" + req.body.G2EMail + "', '" + req.body.G2Phone + "', '" + req.body.mon + 
              "', '" + req.body.tue + "', '" + req.body.wed + "', '" + req.body.thu + "', '" + req.body.fri + "', '" + 0 + "', '" + 0 + "', '" + req.body.fullday + 
              "', '" + 1 + "');";
              console.log(sql);
    con.query(sql, function (err, result) {
        if (err) res.end();
        res.end();
    });
  });

  router.post('/addactivity', auth.checkAuthenticated, function(req, res){
    var sql = "CALL CreateNewActivity('" + req.body.name + ", " + req.body.helper + "');";
    con.query(sql, function (err, result) {
        if (err) res.end("failure to add");
        res.end("added succesfully");
    });
  });

  router.post('/deleteactivity', auth.checkAuthenticated, function(req, res){
    var sql = "CALL DeleteActivity('" + req.body.id + "');";
    con.query(sql, function (err, result) {
        if (err) res.end();
        res.end();
    });
    
  });

  router.put('/hideactivity', auth.checkAuthenticated, function(req, res){
    var sql = "CALL HideActivity('" + req.body.id + "');";
    con.query(sql, function (err, result) {
        if (err) res.end();
        res.end();
    });
  });

  router.put('/unhideactivity', auth.checkAuthenticated, function(req, res){
    var sql = "CALL UnhideActivity('" + req.body.id + "');";
    con.query(sql, function (err, result) {
        if (err) res.end();
        res.end();
    });
  });

  router.put('/editactivity', auth.checkAuthenticated, function(req, res){
    var sql = "UPDATE Activities set ActivityName = '" + req.body.name + "' WHERE ActivityId = " + req.body.id + ";";
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) res.end();
        res.end();
    });
  });

  router.post('/addtask', auth.checkAuthenticated, function(req, res){
    var sql = "INSERT INTO cnp_data.Tasks (Priority,NoteContent) VALUES (" + req.body.priority + ",'" + req.body.name + "');";
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) res.end();
        res.end();
    });
  });

  router.put('/changetask', auth.checkAuthenticated, function(req, res){
    var sql = "UPDATE cnp_data.Tasks SET Priority = " + req.body.priority + " WHERE TaskId = " + req.body.id + ";";
    con.query(sql, function (err, result) {
        if (err) res.end();
        res.end();
    });
  });

  router.put('/completetask', auth.checkAuthenticated, function(req, res){
    var sql = "UPDATE cnp_data.Tasks SET Completed = " + req.body.completed + " WHERE TaskId = " + req.body.id + ";";
    con.query(sql, function (err, result) {
        if (err) res.end();
        res.end();
    });
  });

  router.post('/deletetask', auth.checkAuthenticated, function(req, res){
    var sql = "DELETE FROM cnp_data.Tasks WHERE TaskId = " + req.body.id + ";";
    con.query(sql, function (err, result) {
        if (err) res.end();
        res.end();
    });
  });

  /* GET home page. */
  router.get('/', auth.checkAuthenticated, function(req, res, next) {
    var student_query = "CALL PullStudentsAndDayType();"; 
    var activity_query = "CALL ShowAllActivities();";
    var task_query = "SELECT * FROM cnp_data.Tasks;";
    con.query(student_query, function (err, sQuery) {
      if (err) throw err;
      con.query(activity_query, function (err, aQuery) {
        if (err) throw err;
        con.query(task_query,function (err, tQuery){
          if(err) throw err;
          var tasks = [], completed = [];
          for(var i = 0;i < tQuery.length;++i){
            if(tQuery[i].Completed == 0){
              tasks.push(tQuery[i]);
            }
            else{
              completed.push(tQuery[i]);
            }
          }
          res.render('admin.ejs', {title: 'Admin Page', students: sQuery[0],  activities: aQuery[0], tasks: tasks, compTasks: completed});
        }
        );
        
      });
    });
    
  });

  // Access student profile page
  router.get('/student-profile/:id', auth.checkAuthenticated, function (req, res, next) {
    student_id = req.params.id
    var student_query = `CALL PullStudentData(${student_id})`;
    
    con.query(student_query, function (err, result) {
      if (err) throw err;
      if(result[0].length==0){
        res.redirect('/admin');
      }
      //'result' contains requested student [index 0] as well as 'OkPacket' [index 1]
      //strip away OkPacket, create selected_student as new array
      [selected_student] = result[0];
      res.render('profile.ejs', { title: 'Profile Page', student: selected_student });
    });
  });

  router.post('/student-profile/:id/upload', auth.checkAuthenticated, (req, res) => {
    uploads.upload(req, res, (err) => {
      if (err) {
        if (err.message) {
          req.flash('upload_error', `Error: ${err}`);
        } else {
          req.flash('upload_error', `${err}`);
        }
        res.redirect(`/admin/student-profile/${req.params.id}`);
      } else {
        
        if (req.file == undefined) {
          req.flash('upload_error', "Error: File is Undefined");
          res.redirect(`/admin/student-profile/${req.params.id}`);
        } else {
          update_img_query = `UPDATE Students SET Img = '${req.file.filename}' WHERE StudentId = ${req.params.id};`;
          
          const options = { quality: 100 };
          const path = './public/uploads/images/' + req.file.filename;
          
          //rotate file if contains exif data
          jo.rotate(path, options, function (error, buffer, orientation) {
            if (error) {
              console.log('An error occurred when rotating the file: ' + error.message)
              return
            }
            console.log(`Orientation was ${orientation}`)
            // Do whatever you need with the resulting buffer
            fs.writeFile(path, buffer, function(err) {
              if(err) {
                return console.log(err);
              }
              console.log("File was successfully rotated.");
            });
            
          })
          //end exif removal/rotation

          con.query(update_img_query, function (err, result) {
            if (err) throw err;
            req.flash('upload_successful', "Student Image Updated!");
            res.redirect(`/admin/student-profile/${req.params.id}`);
          });
        }
      }
    });
  });

  router.post('/student-profile/:id/delete-student', auth.checkAuthenticated, function (req, res) {
      var delete_stu_query = `CALL DeleteStudent("${req.params.id}");`;
      con.query(delete_stu_query, function (err, result) {
        if (err) {
          throw (err);
        }
        res.redirect('/admin'); 
      });
  });
    
  router.post('/student-profile/:id/save-changes', auth.checkAuthenticated, function (req, res) {
    var sql_calls = [
      `CALL UpdateStudentGuardian1(${req.params.id}, "${req.body.guardian1Name}", "${req.body.guardian1Email}", "${req.body.guardian1Number}");`,
      `CALL UpdateStudentGuardian2(${req.params.id}, "${req.body.guardian2Name}", "${req.body.guardian2Email}", "${req.body.guardian2Number}");`,
      `CALL UpdateStudentBirthday(${req.params.id}, "${req.body.birthdate}")`,
      `CALL UpdateStudentName(${req.params.id}, "${req.body.studentName}");`
      //`CALL UpdateStudentSchedule(${req.params.id}, ${req.body.mon}, ${req.body.tue}, ${req.body.wed}, ${req.body.thu}, ${req.body.fri}, ${req.body.fullDayFlag}, 1);`;
    ]

    for (var i = 0; i < sql_calls.length; i++){
      update_student_query = sql_calls[i];
      var error_flag = false;
      (function (query, is_error) {
        con.query(query, function (err, result) {
          if (err) {
            error_flag = true;
            throw (err);
          }
        });
      })(update_student_query, error_flag); //closure necesssary for async
    }
    if (error_flag) {
      req.flash('changes_error', "Error Updating Profile");
    } else {
      req.flash('changes_saved', "Profile Updated!");
    }
    res.end();
  });

module.exports = router;

