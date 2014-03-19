/*
index.js is attempted to be loaded by node when a folder
is required as a module, and no package.json exists in the root of the folder directory
*/

exports.index = function(req, res){
  res.render('index', { name: "Vikram Somu" });
}