const router = require("express").Router();
const db = require("../db/models");

router.post("/", async function (req, res) {
  const { userPhotoId } = req.body;
  const filedata = req.file;
  const modifyPath = filedata.path.replace('public', '');

  if (userPhotoId) {
    await db.User.update({logo: modifyPath}, {
      where: {
        id: userPhotoId,
      },    
    }
    );
    res.json(modifyPath);
  }
});

module.exports = router;
