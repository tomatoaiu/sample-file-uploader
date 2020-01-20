var express = require("express");
var multer = require("multer");
var path = require("path");

var app = express();
app.use(express.static(path.join(__dirname, "public")));

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, "public"));
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

app.post("/profile", upload.single("avatar"), function(req, res, next) {
  console.log(req.file);
  console.log(req.body);
  console.log(req.body.username);
});

app.post("/photos/upload", upload.array("photos", 12), function(
  req,
  res,
  next
) {});

var cpUpload = upload.fields([
  { name: "avatar", maxCount: 1 },
  { name: "gallery", maxCount: 8 }
]);
app.post("/cool-profile", cpUpload, function(req, res, next) {});

// 8080番ポートで待ちうける
app.listen(8080, () => {
  console.log("Running at Port 8080...");
});

// その他のリクエストに対する404エラー
app.use((req, res) => {
  res.sendStatus(404);
});
