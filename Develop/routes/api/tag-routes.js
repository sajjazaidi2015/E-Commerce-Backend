const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      attributes: ["id", "tag_name"],
      // be sure to include its associated Product data
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });
    res.json(tagData);
  } catch (error) {
    res.status(400).json({ message: "Server is down" });
  }
  
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  try {
    const tagID = await Tag.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "tag_name"],
      // be sure to include its associated Product data
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });
    return res.json(tagID);
  } catch (error) {
    res.status(400).json({ message: "Server is down" });
  }
  
});

router.post('/', async(req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    return res.json(newTag);
  } catch (error) {
    res.status(400).json({ message: "Server is down" });
  }
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try {
    console.log("req.params.id ===>", req.params.id);
    const tagID = await Tag.update(
      { tag_name: req.body.tag_name },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    console.log("tagID ====>", tagID);

    return res.json(tagID);
  } catch (error) {
    res.status(400).json({ message: "Server is down" });
  }
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.json(deleteTag);
  } catch (error) {
    res.status(400).json({ message: "Server is down" });
  }
});

module.exports = router;
