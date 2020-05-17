var express = require('express');
var router = express.Router();
var uploads = require('../public/javascripts/uploads');
const jo = require('jpeg-autorotate');
const auth = require('../public/javascripts/loginScripts');
const bcrypt = require('bcrypt');
const fs = require('fs');

  router.post('/addstudent', auth.checkAuthenticated, function(req, res){
    
    var sql = "CALL CreateNewStudentFinal('" + req.body.name + "','" + req.body.birthday + "','" + req.body.contact +
     "','" + req.body.email + "','" + req.body.contactNum + "','" + req.body.contact2 + "','" + req.body.email2 + 
     "','" + req.body.contactNum2 + "','" + req.body.mon + "','" + req.body.tue +
     "','" + req.body.wed + "','" + req.body.thu + "','" + req.body.fri + "','" + req.body.sat + 
      "','" + req.body.sun + "','" + req.body.halfDay + "','" + req.body.enroll + "','" + req.body.allergies + "','" + req.body.accommodations + "');";
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) {
          res.end();}
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
        if (err){
          res.end();}
        res.end();
    });
  });

  router.post('/addactivity', auth.checkAuthenticated, function(req, res){
    var sql = "CALL CreateNewActivity('" + req.body.name + "', '" + req.body.helper + "');";
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

  router.post('/hidereminder', auth.checkAuthenticated, function(req, res){
    var sql;
    if(req.body.hide == "true"){
      sql = "CALL HideRemindersObject('" + req.body.id + "');";
    }
    else{
      sql = "CALL UnhideRemindersObject('" + req.body.id + "');";
    }
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) res.end();
        res.end();
    });
  });

  router.post('/editreminder', auth.checkAuthenticated, function(req, res){
    var sql = "UPDATE cnp_data.RemindersObject SET NameOf = '" + req.body.name + "', MainParagraphs = '" + req.body.content + "' WHERE TemplateId = '" + req.body.id + "';";
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) res.end();
        res.end();
    });
  });

  router.post('/deletereminder', auth.checkAuthenticated, function(req, res){
    var sql = "CALL DeleteRemindersObject('" + req.body.id + "');";
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) res.end();
        res.end();
    });
  });

  router.post('/addbehavior', auth.checkAuthenticated, function(req, res){
    var sql = "CALL AddTemplateObject('" + req.body.name + "', '" + req.body.op1 + "', '" + req.body.op2 + "', '" + req.body.op3 + "', '" + req.body.op4 + "', '" + req.body.op5 + "');";
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) res.end();
        res.end();
    });
  });

  router.post('/deletebehavior', auth.checkAuthenticated, function(req, res){
    var sql = "CALL DeleteTemplateObject('" + req.body.id + "');";
    con.query(sql, function (err, result) {
        if (err) res.end();
        res.end();
    });
  });

  router.post('/editbehavior', auth.checkAuthenticated, function(req, res){
    var sql = "UPDATE cnp_data.TemplateObject SET NameOf = '" + req.body.name + "', CategoryOne = '" + req.body.op1 + "', CategoryTwo = '" + req.body.op2 + "', CategoryThree = '" + req.body.op3 + "', CategoryFour = '" + req.body.op4 + "', CategoryFive = '" + req.body.op5 + "' WHERE TemplateId = '" + req.body.id + "';";
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) res.end();
        res.end();
    });
  });

  router.post('/hidebehavior', auth.checkAuthenticated, function(req, res){
    var sql;
    if(req.body.hide == "true"){
      sql = "CALL HideTemplateObject('" + req.body.id + "');";
    }
    else{
      sql = "CALL UnhideTemplateObject('" + req.body.id + "');";
    }
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) res.end();
        res.end();
    });
  });

router.post('/addreminder', auth.checkAuthenticated, function (req, res) {
  var data = req.body.data;
  data = data.replace("--::a very ugly string that Nathan made so it wouldn't happen naturally::--",'&');
    var sql = "CALL AddRemindersObject('" + req.body.name + "', '" + data + "');";
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) res.end();
        res.end();
    });
  });

  router.post('/emailsettings', auth.checkAuthenticated, function(req, res){
    var form = req.body.form;
    var sql;
    if(form == "editHeaderForm"){
      sql = "CALL ShowHeader();";
    }
    else if(form == "editSignatureForm"){
      sql = "CALL ShowFooter();";
    }
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) res.end();
        res.send({data:result[0], form:form});
    });
  });
  
  router.post('/saveemailsettings', auth.checkAuthenticated, function(req, res){
    var form = req.body.form;
    var data = req.body.data;
    data = data.replace("--::a very ugly string that Nathan made so it wouldn't happen naturally::--",'&');
    var sql;
    if(form == "header"){
      sql = `CALL ChangeHeader('${data}');`;
    }
    else if(form == "signature"){
      sql = `CALL ChangeFooter('${data}');`;
    }
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) res.end();
        res.end();
    });
  });

  router.post('/addroster', auth.checkAuthenticated, function(req, res){
    var student = req.body.id;
    var sql = "CALL PullHiddenStudents();";
    console.log(sql);
    con.query(sql, function (err, result) {
      if (err) res.end();
      var found = false;
      result[0].forEach((element)=>{
        if(element.StudentId == student){
          found = true;
        }
      });

      if(found){
        sql = "CALL StudentAppears(" + student + ");";
      }
      else{
        sql = "CALL MarkStudentUnabsent(" + student + ");";
      }
      console.log(sql);
      con.query(sql, function (err, result) {
        if (err) res.end();
        res.end();
      });
    });
  });
  
  router.post('/changeroster', auth.checkAuthenticated, function(req, res){
    var student = req.body.id;
    var whatdo = req.body.do;
    var sql;
    if(whatdo == "remove"){
      sql = "CALL MarkStudentAbsent("+ student +");";
    }
    else if(whatdo == "add"){
      StudentAppears
      sql = "CALL MarkStudentUnabsent("+ student +");";
    }
    console.log(sql);
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
    var get_reminders = "CALL ShowAllRemindersObject();";
    var get_behaviors = "CALL ShowAllTemplateObject();";
    var todays_students_query = "CALL PullUnhiddenStudents();";
    var present_students = "SELECT s.StudentId, s.StudentName FROM cnp_data.Students s, cnp_data.ClassSession cs WHERE s.StudentId = cs.StudentId AND cs.CurrentDate=CURRENT_DATE AND cs.Absent=0;";
    con.query(present_students, function(err,pStudents) {
      if(err) res.end();
      con.query(student_query, function (err, sQuery) {
        if (err) res.end();
        con.query(activity_query, function (err, aQuery) {
          if (err) res.end();
          con.query(task_query,function (err, tQuery){
            if(err) res.end();
            var tasks = [], completed = [];
            for(var i = 0;i < tQuery.length;++i){
              if(tQuery[i].Completed == 0){
                tasks.push(tQuery[i]);
              }
              else{
                completed.push(tQuery[i]);
              }
            }
            con.query(get_reminders, function(err, remind){
              remind = remind[0];
              var Reminders = [];
              if(remind.length == 0){
                Reminders.push({title: "No reminders in database", value:-1});
              }
              else{
                remind.forEach((element) => {
                  Reminders.push({title: element.NameOf, contents: element.MainParagraphs, id: element.TemplateId,hidden:element.Hidden});
                });
              }
              
              con.query(get_behaviors, function(err, behave){
                behave = behave[0];
                var Behaviors = [];
                if(behave.length == 0){
                  Behaviors.push({title: "No behaviors in database", value:-1});
                }
                else{
                  behave.forEach((element) => {
                    Behaviors.push({title: element.NameOf, cat1:element.CategoryOne, cat2:element.CategoryTwo, cat3:element.CategoryThree, cat4:element.CategoryFour, cat5:element.CategoryFive,id:element.TemplateId,Hidden:element.Hidden});
                  })
                }
                con.query(todays_students_query, function (err, t_students) {
                  if (err) res.end();
                  res.render('admin.ejs', {title: 'Admin Page', students: sQuery[0],  activities: aQuery[0], tasks: tasks, compTasks: completed, reminders: Reminders, behaviors: Behaviors, todays_students: t_students[0],present:pStudents});
                });
              });
            });
          });
          
        });
      });
  })
    
  });

  // Access student profile page
  router.get('/student-profile/:id', auth.checkAuthenticated, function (req, res, next) {
    student_id = req.params.id
    var student_query = `CALL PullStudentData(${student_id})`;
    
    con.query(student_query, function (err, result) {
      if (err) res.end();
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
            if (err) res.end();
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
          res.end();
        }
        res.redirect('/admin'); 
      });
  });
    
router.post('/student-profile/:id/save-changes', auth.checkAuthenticated, function (req, res) {
    var sql_calls = [
      `CALL UpdateStudentGuardian1(${req.params.id}, "${req.body.guardian1Name}", "${req.body.guardian1Email}", "${req.body.guardian1Number}");`,
      `CALL UpdateStudentGuardian2(${req.params.id}, "${req.body.guardian2Name}", "${req.body.guardian2Email}", "${req.body.guardian2Number}");`,
      `CALL UpdateStudentBirthday(${req.params.id}, "${req.body.birthdate}")`,
      `CALL UpdateAccommodations(${req.params.id}, "${req.body.accommodations}");`,
      `CALL UpdateStudentName(${req.params.id}, "${req.body.studentName}");`,
      `CALL UpdateAllergies(${req.params.id}, "${req.body.allergies}");`,
      `CALL UpdateStudentSchedule(${req.params.id}, ${req.body.mon}, ${req.body.tue}, ${req.body.wed}, ${req.body.thu}, ${req.body.fri}, ${req.body.fullDayFlag}, 1);`//${req.body.fullDayFlag}, ${req.body.isEnrolled});`
  ]
  
    for (var i = 0; i < sql_calls.length; i++){
      update_student_query = sql_calls[i];
      var error_flag = false;
      (function (query, is_error) {
        con.query(query, function (err, result) {
          if (err) {
            error_flag = true;
            console.log(err);
          }
          if(i == sql_calls.length-1){
            synccleaner(res,req,error_flag);
          }
        });
      })(update_student_query, error_flag); //closure necesssary for async
    }
});

function synccleaner(res,req,error_flag){
  if (error_flag) {
    req.flash('changes_error', "Error Updating Profile");
  } else {
    req.flash('changes_saved', "Profile Updated!");
  }
  res.end();
}

router.get('/reset-password', auth.checkAuthenticated, (req, res) => {
  res.render('resetPassword.ejs');
});

router.post('/reset-password', auth.checkAuthenticated, async (req, res) => {
  if (req.body.email !== 'default@cnp.com') {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10); //10 is good hash default value
      push_user = `UPDATE Admins set Passwords = "${hashedPassword}" WHERE Email = "${req.body.email}";`//(Username, Email, Passwords, Names) VALUES ("${req.body.name}", "${req.body.email}", "${hashedPassword}", "temp");`
      con.query(push_user, function (err, result) {
        if (err) {
          console.log(err);
          res.send(err.sqlMessage)
        } else {
          res.redirect('/admin');
        }
      });
    } catch (e) {
      console.log(e);
      res.redirect('/admin');
    };
  } else {
    res.send('Cannot reset default password.');
  }
});


module.exports = router;

