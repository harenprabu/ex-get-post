
var databaseUrl = "localhost/webex6";
var mongojs = require("./node_modules/mongojs");

var db = mongojs(databaseUrl);
db.collection("employee");
console.log("Connected dbmodule ready......");

exports.authenticateUser = function (usid, pass, responce) {db.employee.find({ "_id": usid, "Password": pass, },
        function (err, users) {
            if (err || !users) {
                
                responce.write("Login Faild" || err);
                responce.end();
            } else {
                
               
                responce.write(usid + " Login Sucess");
                responce.end();
            }
        });
}

exports.saveUser = function (usid, pass, usname, org, gen, branch, exp, email, mob, responce) {
    console.log('Saving user to mongo');
    db.employee.insert({ "_id": usid, "Password": pass, "Name": usname, "Organisation": org, "Gender": gen, "Branch": branch,"Experiance": exp, "Email": email, "Mobile": mob },
        function (err, saved) {
            if (err)
                console.log(err + "Error");
            if (err || !saved) {
                responce.write(usname + " is not Saved");
                console.log(err);
            }
            else {
                responce.write(usname + "  is Saved ");
                console.log("User saved" + saved);
                responce.end();
            }
        });
}