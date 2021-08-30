const router = require("express").Router();
const db = require("../db/models");

router.post("/", async function (req, res) {
  let { userPhotoId } = req.body;
  let filedata = req.file;
  const modifyPath = filedata.path.replace('public', '');

  if (userPhotoId) {
    await db.User.update({logo: modifyPath}, {
      where: {
        id: userPhotoId,
      },    
    }
    );
    res.json(modifyPath);
    // res.sendStatus(200)
  }
});

module.exports = router;
