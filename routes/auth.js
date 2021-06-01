const router = require("express").Router();
const Guestbook = require("../model/Guestbook");
const {guestbookValidation} = require("../validation");
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = (new JSDOM('')).window;
const DOMPurify = createDOMPurify(window);

router.post("/", async (req, res) => {
  const purifyOptions = {
    FORBID_ATTR: ["style"],
    ALLOWED_TAGS: ['a', 'abbr', 'b', 'bdi', 'bdo', 'br', 'code', 'del', 'em', 'i', 'ins', 'mark', 'q', 's', 'samp', 'small', 'sub', 'sup', 'var', 'wbr']
  };
  const clean_body = {
    name: DOMPurify.sanitize(req.body.name, purifyOptions),
    message: DOMPurify.sanitize(req.body.message, purifyOptions)
  };

  const {error} = guestbookValidation(clean_body);
  if (error) {
    return res.status(200).json({post_success: false, error: error.details[0].message});
  }

  const bookentry = new Guestbook({
    name: clean_body.name,
    message: clean_body.message
  });

  try {
    await bookentry.save();
    res.status(200).json({success: true})
  } catch (err) {
    res.status(200).json({success: false, error: err});
  };
});

router.get("/", async (req, res) => {
  Guestbook.find({}).then(entry => {
    res.status(200).json(entry);
  });
});

module.exports = router;