var express = require('express');
var fs = require('fs');
var router = express.Router();
const nodemailer = require('nodemailer');
const auth = require('../public/javascripts/loginScripts');
var ejs = require('ejs');

var themeColors = [];
var textColors = [];
var contentColors = [];
var otherVariables = [];
var originalFileContent;
var root;
var newRoot;
var originalRoot;
var hasBeenInitialized = false;

/* Reads style.css file and puts its values into an array of objects, each object containing a Name and Value field */
router.get('/', auth.checkAuthenticated, (req, res) => {
    clearVariables();
    fs.readFile('./public/stylesheets/style.css', function(err, data) {
        originalFileContent = data.toString("utf8");
        getRoot(originalFileContent);
        hasBeenInitialized = true;
        res.render("styleSettings.ejs", {themeColors: themeColors, textColors: textColors, contentColors: contentColors, otherVariables: otherVariables});
    });
});

router.post('/write', auth.checkAuthenticated, function (req, res, next) {
    var lines = root.split('\n');
    for(var i = 0; i < req.body.varName.length; i++){
        for(var j = 0; j < lines.length; j++){
            var line = lines[j].trim();
            if(line.charAt(0) === '}'){j = lines.length;}
            else if(line.includes("--" + req.body.varName[i] + ":")){
                if(line.includes("-Original")){}
                if(!line.includes(req.body.varVal[i])){ // variable value is different than already written value
                    var newLine = "  --" + req.body.varName[i] + ": " + req.body.varVal[i] + ";";
                    replaceLineWith(newLine, j);
                    j = lines.length;
                }
            }
        }
    }

    if(root === originalRoot){}// nothing changed
    else{
        var newContent = originalFileContent.replace(originalRoot, root);
        fs.writeFile("./public/stylesheets/style.css", newContent, function (err) {
            if (err) throw err;
          });
    }
    res.end();
});

router.post('/reset-to-defaults', auth.checkAuthenticated, (req, res) => {
    fs.readFile('./public/stylesheets/style-backup.css', function(err, data) {
        fs.writeFile("./public/stylesheets/style.css", data.toString("utf8"), function (err) {
            if (err) throw err;
            res.end();
        });
    });
});

function getRoot(data){
    var startingIndex = data.indexOf(":root");
    root = data.substr(startingIndex, data.indexOf('}'));
    originalRoot = root;
    getVariables(root);
}

function getVariables(root){
    var lines = root.split('\n');
    for(var i = 0; i < lines.length; i++){
        var line = lines[i];
        line = line.trim();
        if(line.substr(0,1) === '}'){i = lines.length;}
        if(line.substr(0,2) === "--"){
            var vals = line.split(':');
            var name = vals[0].split("--")[1]; // split removes dashes
            var value = vals[1].substr(0, vals[1].length-1).trim(); // substr removes semi-colon

            if(name.includes("-Original")){} // don't display original values so we can restore defaults
            else{
                var variable = {"Name": name, "Value": value};
                if(name.includes("Text")){
                    textColors.push(variable);
                }
                else if(name.includes("Theme")){
                    themeColors.push(variable);
                }
                else if(name.includes("Content")){
                    contentColors.push(variable);
                }
                else {otherVariables.push(variable);}
            }
            j = line.length;
        }
        
        
    }
}

// made this because substr and trim() affected other variables as well (pointers or something idk)
function replaceLineWith(line, lineIndex){
    var lines = originalRoot.split('\n');
    lines[lineIndex] = line;
    root = lines.join('\n');
}

function clearVariables(){
    themeColors = [];
    textColors = [];
    contentColors = [];
    otherVariables = [];
}

module.exports = router;