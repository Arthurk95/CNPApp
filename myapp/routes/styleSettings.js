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
var originalFile;
var root;
var hasBeenInitialized = false;

/* Reads style.css file and puts its values into an array of objects, each object containing a Name and Value field */
router.get('/', auth.checkAuthenticated, (req, res) => {
    if(hasBeenInitialized){res.render("styleSettings.ejs", {themeColors: themeColors, textColors: textColors, contentColors: contentColors, otherVariables: otherVariables});}
    else{
        fs.readFile('./public/stylesheets/style.css', function(err, data) {
            originalFile = data.toString("utf8");
            getRoot(originalFile);
            hasBeenInitialized = true;
            res.render("styleSettings.ejs", {themeColors: themeColors, textColors: textColors, contentColors: contentColors, otherVariables: otherVariables});
        });
    }
    
  // res.render('index', { email: req.user.email });
});

function getRoot(data){
    var startingIndex = data.indexOf(":root");
    root = data.substr(startingIndex, data.indexOf('}'));
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
            var value = vals[1].substr(0, vals[1].length-2); // substr removes semi-colon

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

function nextOccurance(character, startingIndex){
    var index;
    for(var i = startingIndex; i < root.length; i++){
        if(root.charAt(i) === character){
            index = i;
            i = root.length + 1;
        }
    }
    return index;
}
module.exports = router;