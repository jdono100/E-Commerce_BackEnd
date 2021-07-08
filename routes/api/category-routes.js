const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', (req, res) => {
  Category.findAll(
    {
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    }
  ).then((categoryData) => {
    if (!categoryData) {
      res.status(404).json(
        {
          message: 'No categories could be found'
        }
      );
      return;
    }
    res.json(categoryData);
  }).catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.get('/:id', (req, res) => {
  Category.findOne(
    {
      where: {
        id: req.params.id
      },
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    }
  ).then((oneCategory) => {
    if (!oneCategory) {
      res.status(404).json(
        {
          message: 'No categories could be found'
        }
      );
      return;
    }
    res.json(oneCategory);
  }).catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.post('/', (req, res) => {
  Category.create(
    {
      category_name: req.body.category_name
    }
  ).then(
    (createCategory) => res.json(createCategory)
  ).catch((err) => {
    console.log(err);
    res.status(400).json(err);
  })
});

router.put('/:id', (req, res) => {
  Category.update(req.body,
    {
      where: {
        id: req.params.id
      }
    }
  ).then((updateCategory) => {
    if (!updateCategory) {
      res.status(404).json(
        {
          message: 'No categories could be found with this id'
        }
      );
      return;
    }
    res.json(updateCategory);
  }).catch((err) => {
    console.log(err);
    res.status(400).json(err);
  })
});

router.delete('/:id', (req, res) => {
  Category.destroy(
    {
      where: {
        id: req.params.id
      }
    }
  ).then((deleteCategory) => {
    if (!deleteCategory) {
      res.status(404).json(
        {
          message: 'No categories could be found with this id'
        }
      );
      return;
    }
    res.json(deleteCategory);
  }).catch((err) => {
    console.log(err);
    res.status(400).json(err);
  })
});

module.exports = router;