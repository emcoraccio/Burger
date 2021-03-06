const express = require("express");
let router = express.Router();

const burger = require("../models/burger");

router.get("/", function(req, res){
  burger.selectAll(function(data) {
    let dataObj = {burgers: data};
    res.render("index", dataObj);
  });
});

router.post("/api/burgers", function(req, res) {
  burger.insertOne([req.body.burger_name], function(result){
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res) {
  let condition = `id = ${req.params.id}`;
  
  burger.updateOne({
    devoured: req.body.devoured
  }, condition, function(result) {
    if(result.changedRows == 0) {
      return res.status(404).end();
    }
    else {
      res.status(200).end();
    }
  });
});

module.exports = router;