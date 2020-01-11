const router = require("express").Router();
const Guestbook = require("../model/Guestbook");
const {guestbookValidation} = require("../validation");


router.post("/guestbook", async (req, res) => {
  const {error} = guestbookValidation(req.body);
  if (error) {
    return res.status(200).json({post_success: false, error: error.details[0].message});
  }

  const bookentry = new Guestbook({
    name: req.body.name,
    message: req.body.message
  });

  try {
    await bookentry.save();
    res.status(200).json({success: true})
  } catch (err) {
    res.status(200).json({success: false, error: err});
  };
});

router.get("/guestbook", async (req, res) => {
  Guestbook.find({}).then(entry => {
    res.status(200).json(entry);
  });
});

module.exports = router;