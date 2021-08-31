const router = require("express").Router();
const db = require("../db/models");

router.post("/", async function (req, res) {
  const { userPhotoId, orgPhotoId } = req.body;
  const filedata = req.file;
  const modifyPath = filedata.path.replace('public', '');

  if (userPhotoId) {
    await db.User.update({logo: modifyPath}, {
      where: {
        id: userPhotoId,
      },    
    }
    );
    return res.json(modifyPath);
  }

  if (orgPhotoId) {
    await db.Organization.update({logo: modifyPath}, {
      where: {
        id: Number(orgPhotoId),
      }
    });
    return res.json(modifyPath);
  }
  return res.json(null);
});

module.exports = router;
