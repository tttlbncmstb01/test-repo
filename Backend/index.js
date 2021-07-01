var express = require("express");
var mysql = require("mysql");
var jwt = require("jsonwebtoken");
var app = express();
var hasher = require("wordpress-hash-node");
var unserialize = require('locutus/php/var/unserialize');
var serialize = require('locutus/php/var/serialize')
app.listen(3000);
var connection = mysql.createConnection({
  host: "moigioi.hoieothon.com",
  user: "nksportv_bdsdn",
  password: "truemilk123",
  database: "nksportv_bds",
});

// var sql =
//   "select * from wp54_users where user_email='ulquiorra.es.4@gmail.com'";
// connection.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log(result);
// });
let get_user_meta = (user_id, meta_key, storage_name) => {
    return new Promise((resolve, reject) => {
        connection.query(
        "select * from wp54_usermeta where user_id=" +
            user_id +
            " and meta_key='" +
            meta_key +
            "'",
            function (error, rows, fields) {
                if (!!error) {
                    return reject(
                        new Error("Có lỗi trong quá trình querry Or không thể kết nối csdl")
                    );
                }
                var jsonVariable = {};
                if (rows.length > 0) {
                if(storage_name){
                    jsonVariable[storage_name] = rows[0]["meta_value"];
                }else{
                    jsonVariable = rows[0]["meta_value"];
                }
                } else {
                if(storage_name){
                    jsonVariable[storage_name] = "";
                }else{
                    jsonVariable=null;
                }
                }
                resolve(jsonVariable);
            }
        );
    });
};
function update_usermeta(user_id, meta_key, meta_value) {
    connection.query(
      "select * from wp54_usermeta where user_id=" +
        user_id +
        " and meta_key='" +
        meta_key +
        "'",
      function (error, rows, fields) {
        if (!!error) {
          console.log("Error in the query update_meta");
          error_query = "yes";
          error_back = "An unexpected error occurred.";
        } else if (rows.length > 0) {
          var sql =
            "UPDATE wp54_usermeta SET meta_value = '" +
            meta_value +
            "' WHERE user_id = " +
            user_id +
            " and meta_key='" +
            meta_key +
            "'";
          connection.query(sql, function (err, result) {
            if (err) throw err;
            // return console.log("1 record updated");
          });
        } else if (rows.length == 0) {
          var sql =
            "INSERT INTO wp54_usermeta (user_id, meta_key, meta_value) VALUES ( " +
            user_id +
            ", '" +
            meta_key +
            "', '" +
            meta_value +
            "')";
          connection.query(sql, function (err, result) {
            if (err) throw err;
            // return console.log("1 record inserted");
          });
        }
      }
    );
}
app.post("/users", function (req, res) {
    if (req.method == "POST") {
      var jsonString = "";
      var error_query = "no";
      var error_back = "";
      req.on("data", function (data) {
        jsonString += data;
        jsonString = JSON.parse(jsonString);
        connection.query(
          "select * from wp54_users where user_login='" +
            jsonString.userInfo.phone +
            "'",
          function (error, rows, fields) {
            if (!!error) {
              console.log("Error in the query users post");
              error_query = "yes";
              error_back = "An unexpected error occurred.";
            } else if (rows.length > 0) {
              console.log("Phone number existed.");
              error_back = "Số điện thoại đã tồn tại.";
              error_query = "yes";
            } else if (rows.length == 0) {
              var hash = hasher.HashPassword(jsonString.userInfo.password);
              var sql =
                "INSERT INTO wp54_users (user_login, user_pass, user_nicename, display_name) VALUES ( '" +
                jsonString.userInfo.phone +
                "', '" +
                hash +
                "', '" +
                jsonString.userInfo.name +
                "', '" +
                jsonString.userInfo.name +
                "')";
              connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
                connection.query("select ID from wp54_users where user_login='" + jsonString.userInfo.phone + "'", function (err, rows, fields) {
                    if (err) throw err;
                    update_usermeta(rows[0]['ID'],'phone',jsonString.userInfo.phone);
                });
              });
            }
            if (error_query == "yes") {
              res.status(400).send(error_back);
            } else if (error_query == "no") {
              res.send();
            }
          }
        );
      });
    }
  });

app.post("/auth", function (req, res) {
    if (req.method == "POST") {
      var jsonString = "";
      var error_query = "no";
      var userID = 0;
      var userName = "";
      req.on("data", function (data) {
        jsonString += data;
        jsonString = JSON.parse(jsonString);
        connection.query(
          "select * from wp54_users where user_login='" + jsonString.phone + "' ",
          function (error, rows, fields) {
            if (!!error || typeof rows == "undefined" || rows.length == 0) {
              console.log("Error in the query auth post");
              console.log(error);
              error_query = "yes";
            } else {
              var password = jsonString.password;
              var hashpass = rows[0]["user_pass"];
              var checked = hasher.CheckPassword(password, hashpass);
              if (checked == true) {
                console.log("Success in the query");
                userID = rows[0]["ID"];
                userName = rows[0]["display_name"];
              } else {
                error_query = "yes";
                console.log("Wrong password.");
              }
            }
            if (error_query == "yes") {
              res.status(404).end();
            } else if (error_query == "no") {
              Promise.all([
                get_user_meta(userID, "chieu_cao", "chieu_cao"),
                get_user_meta(userID, "can_nang", "can_nang"),
                get_user_meta(userID, "vong_eo", "vong_eo"),
                get_user_meta(userID, "vong_mong", "vong_mong"),
                get_user_meta(userID, "imageUri_app", "imageUri"),
              ])
                .then((respond) => {
                  const token = jwt.sign(
                    {
                      respond: respond,
                      userID: userID,
                      name: userName,
                      phone: jsonString.phone,
                    },
                    "jwtPrivateKey"
                  );
                  res.send(token);
                })
                .catch((err) => console.log(err));
            }
          }
        );
      });
    }
});

app.post("/privateInfo", function (req, res) {
  if (req.method == "POST") {
    var jsonString = "";
    req.on("data", function (data) {
      jsonString += data;
      jsonString = JSON.parse(jsonString);
      var users = jsonString.userInfo.users;
      var can_nang = jsonString.userInfo.BodyIndex.can_nang;
      var chieu_cao = jsonString.userInfo.BodyIndex.chieu_cao;
      var vong_eo = jsonString.userInfo.BodyIndex.vong_eo;
      var vong_mong = jsonString.userInfo.BodyIndex.vong_mong;
      update_usermeta(users.userID, "can_nang", can_nang ? can_nang : "");
      update_usermeta(users.userID, "chieu_cao",chieu_cao ? chieu_cao : "");
      update_usermeta(users.userID, "vong_eo", vong_eo ? vong_eo : "");
      update_usermeta(users.userID, "vong_mong", vong_mong ? vong_mong : "");

      // get_user_meta(users.userID,"weight_statistics")
      // .then((respond)=>{
      //   var date_n = new Date();
      //   var currentTimeStr = ( date_n.getMonth() + 1)+"/"+date_n.getDate()+"/"+date_n.getFullYear();
      //   var mdyToNew = new Date(currentTimeStr);
      //   var mdyMs = mdyToNew.getTime();
      //   var the_array = {};
      //   if(page04.currentweight != ""){
      //     if(!respond){
      //       the_array[mdyMs]=page04.currentweight;
      //       var the_result = serialize(the_array);
      //       update_usermeta(users.userID,"weight_statistics",the_result)
      //     }else{
      //       respond = unserialize(respond);
      //       respond[mdyMs] = page04.currentweight;
      //       var the_result = serialize(respond);
      //       update_usermeta(users.userID,"weight_statistics",the_result)
      //     }
      //   }
      // })
      // .catch((error)=>console.log(error))
      res.send();
    });
  }
});