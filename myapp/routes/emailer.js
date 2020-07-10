var express = require('express');
var router = express.Router();
const auth = require('../public/javascripts/loginScripts');
const nodemailer = require('nodemailer');
var ejs = require('ejs');

router.post('/emailReport', auth.checkAuthenticated, (req, res) => {
  var reports = JSON.parse(req.body.report);
  res.render('emailReport.ejs', { reports: reports });
});

/* GET home page. */
router.get('/', auth.checkAuthenticated, function (req, res, next) {
  var Students = [];
  var daily_query = "CALL PullUnhiddenStudentsEmail();";
  //clear previous 'daily' entries--no need to keep them day-to-day (space saving)
  //unable to alter database remotely so this fix will work for now
  con.query('DELETE FROM DailySummary WHERE Dates < CURRENT_DATE', function (err) {
    if (err) {
      console.log(err);
    }
    con.query('DELETE FROM DailyAmFood WHERE Dates < CURRENT_DATE', function (err) {
      if (err) {
        console.log(err);
      }
      con.query('DELETE FROM DailyLunch WHERE Dates < CURRENT_DATE', function (err) {
        if (err) {
          console.log(err);
        } else {
          con.query(daily_query, function (err, dailyStudents) {
            if (err) res.end();
            recurseDailies(Students, dailyStudents, 0, res);
          })
        }
      })
    })
  })

  function recurseDailies(Students, dailyStudents, i, res) {
    var Student = { id: 0, name: "", listOfActivities: [] };
    if (i < (dailyStudents[0].length)) {
      Student.id = dailyStudents[0][i].StudentId;
      Student.name = dailyStudents[0][i].StudentName;

      Students.push({
        id: Student.id,
        name: Student.name,
        listOfActivities: [],
        listOfBehaviors: {}
      });
      activities_query = "CALL ShowStudentDailyActivitiesToday(" + Students[i].id + ");";
      con.query(activities_query, function (err, act) {
        if (err) {
          console.log(err);
        }
        var looper = act[0];
        looper.forEach(element => {
          if (element) {
            Students[i].listOfActivities.push(element);
          }
        });
        pull_daily_beh_query = `CALL PullDailyBehaviors(${Students[i].id})`;
        con.query(pull_daily_beh_query, function (err, result) {
          if (err) {
            console.log(err)
          }

          [result] = result[0];
          try {
            result = JSON.parse(JSON.stringify(result));
            Students[i].listOfBehaviors = result;
          } catch (e) {
            console.log(e);
          }
          recurseDailies(Students, dailyStudents, i + 1, res);
          if (i == (dailyStudents[0].length) - 1) {
            bottomLayer(res, Students);
          }
        });//end daily beh query
      });//end activity query
    }
    if (0 == (dailyStudents[0].length)) {
      bottomLayer(res, Students);
    }

  }
});
function bottomLayer(res, Students,) {
  var get_template = "CALL ShowUnhiddenTemplateObject();";
  con.query(get_template, function (err, behave) {
    behave = behave[0];
    var Behaviors = [];
    if (behave.length == 0) {
      Behaviors.push({ name: 'No behaviors in database:' });
    }
    else {
      behave.forEach((element) => {
        bObj = { name: element.NameOf };
        if (element.CategoryOne != "" && element.CategoryOne != null) {
          bObj.op1 = element.CategoryOne;
        }
        if (element.CategoryTwo != "" && element.CategoryTwo != null) {
          bObj.op2 = element.CategoryTwo;
        }
        if (element.CategoryThree != "" && element.CategoryThree != null) {
          bObj.op3 = element.CategoryThree;
        }
        if (element.CategoryFour != "" && element.CategoryFour != null) {
          bObj.op4 = element.CategoryFour;
        }
        if (element.CategoryFive != "" && element.CategoryFive != null) {
          bObj.op5 = element.CategoryFive;
        }
        Behaviors.push(bObj);
      })
    }
    var get_reminders = "CALL ShowUnhiddenRemindersObject();";
    con.query(get_reminders, function (err, remind) {
      remind = remind[0];
      var Reminders = [];
      if (remind.length == 0) {
        Reminders.push({ title: "No reminders in database" });
      }
      else {
        remind.forEach((element) => {
          Reminders.push({ title: element.NameOf, contents: element.MainParagraphs });
        });
      }

      var get_summary = `CALL PullDailySummaryToday()`;
      con.query(get_summary, function (err, sum_result) {
        if (err) {
          console.log('Unable to pull daily summary: ' + err);
        } else {
          try {
            [stripped_result] = sum_result[0];
            var summary = '';
            if (stripped_result) {
               summary = stripped_result.MainParagraphs;
            }
          } catch (e) {
             summary = 'error accessing daily summary';
            console.log(e);
          }
        }

        var get_snack = `CALL PullDailyAmFoodToday()`;
        con.query(get_snack, function (err, snack_result) {
          if (err) {
            console.log('Unable to pull AM snack: ' + err);
          } else {
            var snack = '';
            try {
              [stripped_result] = snack_result[0];
              if (stripped_result) {
                 snack = stripped_result.MainParagraphs;
              }
            } catch (e) {
               snack = 'error accessing snack info';
              console.log(e);
            }
          }

          var get_lunch = `CALL PullDailyLunchToday()`;
          con.query(get_lunch, function (err, lunch_result) {
            if (err) {
              console.log('Unable to pull lunch: ' + err);
            } else {
              var lunch = '';
              try {
                [stripped_result] = lunch_result[0];
                if (stripped_result) {
                  lunch = stripped_result.MainParagraphs;
                }
              } catch (e) {
                lunch = 'error accessing lunch info';
                console.log(e);
              }
            }

            con.query(`CALL ShowHeader();`, function (err, header_result) {
              if (err) {
                console.log(`Unable to pull header: ${err}`)
              }
              try {
                [stripped_result] = header_result[0];
                if (stripped_result) {
                  var header = stripped_result.MainParagraphs.replace(/CLEANSED AMPERSAND STRING/g, '&')
                    .replace(/CLEANSED ADDITION STRING/g, '+')
                    .replace(/CLEANSED APSTR STRING/g, "'");
                }
              } catch (e) {
                var header = 'error grabbing header'
                console.log(e);
              }

              con.query(`CALL ShowFooter();`, function (err, footer_result) {
                if (err) {
                  console.log(`Unable to pull footer: ${err}`)
                }
                try {
                  [stripped_result] = footer_result[0];
                  if (stripped_result) {
                    var footer = stripped_result.MainParagraphs.replace(/CLEANSED AMPERSAND STRING/g, '&')
                      .replace(/CLEANSED ADDITION STRING/g, '+')
                      .replace(/CLEANSED APSTR STRING/g, "'");
                  }
                } catch (e) {
                  var footer = 'error grabbing header'
                  console.log(e);
                }

                con.query(`SELECT Email FROM Admins WHERE Username="SenderAdmin"`, function (err, email_sender) {
                  if (err) res.end();
                  email_sender = email_sender[0].Email;
                  
                  res.render('emailer.ejs', { title: 'CNP Daily Report', reports: Students, behaviors: Behaviors, reminders: Reminders, summary: summary, snack: snack, lunch: lunch, header: header, footer: footer, emailSender: email_sender});
                });//end sender info query
              });//end footer query
            });//end header query
          }); // end lunch query
        }); // end snack query
      }); // end summary query
    });
  });
}
router.post('/push-dailies', auth.checkAuthenticated, function (req, res, next) {
  var summary = req.body.summary_HTML;
  var snack = req.body.snack_HTML;
  var lunch = req.body.lunch_HTML;
  // summary = summary.replace(/CLEANSED AMPERSAND STRING/g, '&')
  //   .replace(/CLEANSED ADDITION STRING/g, '+')
  //   .replace(/CLEANSED APSTR STRING/g, "'");
  //   snack = snack.replace(/CLEANSED AMPERSAND STRING/g, '&')
  //   .replace(/CLEANSED ADDITION STRING/g, '+')
  //   .replace(/CLEANSED APSTR STRING/g, "'");
  //   lunch = lunch.replace(/CLEANSED AMPERSAND STRING/g, '&')
  //   .replace(/CLEANSED ADDITION STRING/g, '+')
  //   .replace(/CLEANSED APSTR STRING/g, "'");
    var sql_calls = [
      `CALL AddDailySummary('${summary}');`,
      `CALL AddDailyAmFood('${snack}');`,
      `CALL AddDailyLunch('${lunch}');`
  ]
  for (var i = 0; i < sql_calls.length; i++) {
    var push_daily_query = sql_calls[i];
    (function (query) {
      con.query(query, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log(query);
        }
      });
    })(push_daily_query); //closure necesssary for async
  }
  res.end();
  });

// router.post('/push-summary', auth.checkAuthenticated, function (req, res, next) {
//   var summary = req.body.text;
//   summary = summary.replace(/CLEANSED AMPERSAND STRING/g, '&')
//     .replace(/CLEANSED ADDITION STRING/g, '+')
//     .replace(/CLEANSED APSTR STRING/g, "'");
//   save_template_query = `CALL AddDailySummary('${summary}');`;
//   con.query(save_template_query, function (err, result) {
//     if (err) {
//       console.log(`Unable to add [${summary}] to daily summary. ` + err);
//       res.end();
//     } else {
//       console.log('Daily summary updated: ' + summary);
//       res.end();
//     }
//   });


// });

router.post('/refresh-behaviors', auth.checkAuthenticated, function (req, res, next) {
  pull_daily_beh_query = `CALL PullDailyBehaviors(${req.body.id})`;
  con.query(pull_daily_beh_query, function (err, result) {
    if (err) {
      console.log(err)
      res.end()
    }
    [result] = result[0];
    // result = JSON.parse(JSON.stringify(result));
    res.send(result);
  });
});


// router.post('/push-am-snack', auth.checkAuthenticated, function (req, res, next) {
//   var snack = req.body.text;
//   snack = snack.replace(/CLEANSED AMPERSAND STRING/g, '&')
//     .replace(/CLEANSED ADDITION STRING/g, '+')
//     .replace(/CLEANSED APSTR STRING/g, "'");
//   save_template_query = `CALL AddDailyAmFood('${snack}');`;

//   con.query(save_template_query, function (err, result) {
//     if (err) {
//       console.log(`Unable to add [${snack}] to AM snack. ` + err);
//       res.end();
//     } else {
//       console.log('AM snack updated: ' + snack);
//       res.end();
//     }
//   });


// });

// router.post('/push-lunch', auth.checkAuthenticated, function (req, res, next) {
//   var lunch = req.body.text;
//   lunch = lunch.replace(/CLEANSED AMPERSAND STRING/g, '&')
//     .replace(/CLEANSED ADDITION STRING/g, '+')
//     .replace(/CLEANSED APSTR STRING/g, "'");
//   save_template_query = `CALL AddDailyLunch('${lunch}');`;

//   con.query(save_template_query, function (err, result) {
//     if (err) {
//       console.log(`Unable to add [${lunch}] to lunch. ` + err);
//       res.end();
//     } else {
//       console.log('Lunch updated: ' + lunch);
//       res.end();
//     }
//   });


// });

router.post('/push-behavior', auth.checkAuthenticated, function (req, res, next) {
  var behavior_names = req.body.behaviorNames.split(',');
  var behavior_selection = req.body.studentsBehaviorSelection.split(',');
  var behavior_notes = req.body.studentsBehaviorNotes.split(',');

  for (var i = 0; i < behavior_names.length; i++) {
    push_behaviors_query = `CALL AddBehavior(${req.body.id}, "${behavior_names[i]}", "${behavior_selection[i]}", "${behavior_notes[i]}");`;
    (function (query) {
      con.query(query, function (err, result) {
        if (err) {
          console.log(`Unable to add behaviors: ${err}`);
        }
        console.log(query);
      })
    })(push_behaviors_query); //closure necessary for async consistency
  }
  res.end();
});

router.post('/student-approved', auth.checkAuthenticated, function (req, res) {
  var call_query = `CALL ApproveChanges(${req.body.id});`
  con.query(call_query, function (err, msg) {
    if (err) { console.log(err); }
    else { res.end(); }
  });
});

router.post('/student-unapproved', auth.checkAuthenticated, function (req, res) {
  var call_query = `CALL UnapproveChanges(${req.body.id});`
  con.query(call_query, function (err, msg) {
    if (err) { console.log(err); }
    else { res.end(); }
  })
});

router.post('/send', (req, res) => {
  con.query(`CALL PullEmail(${req.body.id})`, function (err, email_pull) {
    if (err) {
      console.log(`Unable to add behaviors: ${err}`);
    }

    pull_daily_beh_query = `CALL PullDailyBehaviors(${req.body.id})`;
    con.query(pull_daily_beh_query, function (err, behavior_pull) {
      if (err) {
        console.log(err)
      }
      sendEmail(email_pull, req.body.listOfActivities, behavior_pull);
    });//end daily beh query
  });

  async function sendEmail(pulled_emails, activities, pulled_personal_behaviors) {
    var [parent_emails] = pulled_emails[0];
    parent_emails = Object.values(parent_emails);
    console.log(`Sending email(s) to: ${parent_emails}`)
    for (var key in req.body) {
      req.body[key] = req.body[key].replace(/CLEANSED AMPERSAND STRING/g, '&')
        .replace(/CLEANSED ADDITION STRING/g, '+')
        .replace(/CLEANSED GT STRING/g, '>')
        .replace(/CLEANSED LT STRING/g, '<')
        .replace(/CLEANSED APSTR STRING/g, "'")
    }
    var name = req.body.name
    var [personal_behaviors] = pulled_personal_behaviors[0];
    var personal_behavior_parsed = [];
    var todaysBehaviorNames = JSON.parse(req.body.todaysBehaviorNames)
    todaysBehaviorNames.forEach(behavior_name => {
      personal_behavior_parsed.push({
        name: behavior_name,
        selection: personal_behaviors[behavior_name],
        note: ('' + personal_behaviors[behavior_name + 'Note']).replace(/CLEANSED AMPERSAND STRING/g, "&").replace(/CLEANSED COMMA STRING/g, ",")
      })
    })
    var cc_email = '';
    if (req.body.email === 'cnp.daily.report@gmail.com') {
      // cc_email = 'creativenatureplayschool@gmail.com';
      req.body.emailPassword = process.env.EMAIL_PASSWORD;
    } else {
      req.body.emailPassword = req.body.emailPassword.replace(/CLEANSED AMPERSAND STRING/g, '&');
    }
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: req.body.email,
        pass: req.body.emailPassword
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    try {
      let info = await transporter.sendMail({
        from: '"Creative Nature Playschool" <cnp.daily.report@gmail.com>', // sender address
        to: parent_emails, // list of receivers
        subject: "CNP Daily Report", // Subject line
        cc: cc_email,
        text: "", // plain text body
        html: await ejs.renderFile('./views/emailTemplate.ejs', {
          name: name,
          email: parent_emails,
          header: req.body.header,
          footer: req.body.footer,
          summary: req.body.summaryHTML,
          reminders: JSON.parse(req.body.reminders),
          snack: req.body.snackHTML,
          lunch: req.body.lunchHTML,
          activities: JSON.parse(activities),
          behaviors: personal_behavior_parsed //personal_behavior_parsed[i].name .selection .note
        })
      });
      res.send({ name: name, emails: parent_emails, status: 'Sent', message: '' })
    } catch (e) {
      res.send({ name: name, emails: parent_emails, status: 'Failed', message: e.message })
    }
  }
  // res.end();
});


router.post('/render-email-view', (req, res) => {
  for (var key in req.body) {
    req.body[key] = req.body[key].replace(/CLEANSED AMPERSAND STRING/g, '&')
      .replace(/CLEANSED ADDITION STRING/g, '+')
      .replace(/CLEANSED GT STRING/g, '>')
      .replace(/CLEANSED LT STRING/g, '<')
      .replace(/CLEANSED APSTR STRING/g, "'")
  }

  pull_daily_beh_query = `CALL PullDailyBehaviors(${req.body.id})`;
  con.query(pull_daily_beh_query, function (err, behavior_pull) {
    if (err) {
      console.log(err)
    }
    try {
      renderEmail(req.body.listOfActivities, behavior_pull);
    } catch (e) {
      console.log(e);
    }
  });//end daily beh query

  function renderEmail(activities, pulled_personal_behaviors) {
    var name = req.body.name;
    var [personal_behaviors] = pulled_personal_behaviors[0];
    var personal_behavior_parsed = [];
    var todaysBehaviorNames = JSON.parse(req.body.todaysBehaviorNames)
    todaysBehaviorNames.forEach(behavior_name => {
      personal_behavior_parsed.push({
        name: behavior_name,
        selection: '' + personal_behaviors[behavior_name],
        note: ('' + personal_behaviors[behavior_name + 'Note']).replace(/CLEANSED AMPERSAND STRING/g, "&").replace(/CLEANSED COMMA STRING/g, ",")
      })
    })
    var email_HTML = ejs.renderFile('./views/emailTemplate.ejs', {
      name: name,
      header: req.body.header,
      footer: req.body.footer,
      summary: req.body.summaryHTML,
      reminders: JSON.parse(req.body.reminders),
      snack: req.body.snackHTML,
      lunch: req.body.lunchHTML,
      activities: JSON.parse(activities),
      behaviors: personal_behavior_parsed //personal_behavior_parsed[i].name .selection .note
    })
    email_HTML.then(function (result) {
      res.send({ rendered_HTML: result })
    })
  }
});



module.exports = router;