var express = require('express');
var router = express.Router();
var uploads = require('../public/javascripts/uploads');
var session = require('express-session');
const jo = require('jpeg-autorotate');
const auth = require('../public/javascripts/loginScripts');

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
  router.post('/deletestudent', auth.checkAuthenticated, function(req, res){
    var sql = "CALL DeleteStudent('" + req.body.id + "');";
    con.query(sql, function (err, result) {
        if (err) throw(err);
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
      res.render('profile.ejs', { title: 'Profile Page', student: selected_student, upload_error_message: req.session.upload_error });
      req.session.destroy();
    });
  });

  router.post('/student-profile/:id/upload', auth.checkAuthenticated, (req, res) => {
    uploads.upload(req, res, (err) => {
      if (err) {
        if (err.message) {
          req.session.upload_error = 'Error: ' + err.message;
        } else {
          req.session.upload_error = err;
        }
        res.redirect(`/admin/student-profile/${req.params.id}`);
      } else {
        
        if (req.file == undefined) {
          req.session.upload_error = "Error: File is Undefined";
          res.redirect(`/admin/student-profile/${req.params.id}`);
        } else {
          update_img_query = `UPDATE Students SET Img = '${req.file.filename}' WHERE StudentId = ${req.params.id};`;
          
          const options = { quality: 100 };
          const path = './public/uploads/images/' + req.file.filename;
          
          jo.rotate(path, options)
            .then(({ buffer, orientation, dimensions, quality }) => {
              console.log('Rotating uploaded file @ ' + path);
              console.log(`Orientation was ${orientation}`);
              console.log(`Dimensions after rotation: ${dimensions.width}x${dimensions.height}`);
              console.log(`Quality: ${quality}`);
          })
          .catch((error) => {
            console.log('An error occurred when rotating the file: ' + error.message + ' ' + path);
          })

          con.query(update_img_query, function (err, result) {
            if (err) throw err;
            res.redirect(`/admin/student-profile/${req.params.id}`);
          });
        }
      }
    });
  });

module.exports = router;

