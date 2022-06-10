const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  try {
    const categoriesData = await Category.findAll({
      attributes: ["id", "category_name"],
      // be sure to include its associated Products
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });
    res.json(categoriesData);
  } catch (error) {
    res.status(400).json({ message: "Server is down" });
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  try {
    const categoriesData = await Category.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "category_name"],
      // be sure to include its associated Products
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });
    return res.json(categoriesData);
  } catch (error) {
    res.status(400).json({ message: "Server is down" });
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const createCategory = await Category.create({
      category_name: req.body.category_name,
    });
    return res.json(createCategory);
  } catch (error) {
    res.status(400).json({ message: "Server is down" });
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    console.log("req.params.id ===>", req.params.id);
    const updateCategory = await Category.update(
      { category_name: req.body.category_name },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    console.log("updateCategory ====>", updateCategory);

    return res.json(updateCategory);
  } catch (error) {
    res.status(400).json({ message: "Server is down" });
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.json(deleteCategory);
  } catch (error) {
    res.status(400).json({ message: "Server is down" });
  }
});

module.exports = router;
