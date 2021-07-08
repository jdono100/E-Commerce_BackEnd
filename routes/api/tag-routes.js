const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', (req, res) => {
  Tag.findAll(
    {
      include: {
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id']
      }
    }
  ).then((tagData) => {
    if (!tagData) {
      res.status(404).json(
        {
          message: 'No tags could be found'
        }
      );
      return;
    }
    res.json(tagData);
  }).catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.get('/:id', (req, res) => {
  Tag.findOne(
    {
      where: {
        id: req.params.id
      },
      include: {
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id']
      }
    }
  ).then((oneTag) => {
    if (!oneTag) {
      res.status(404).json(
        {
          message: 'No tags could be found with this id'
        }
      );
      return;
    }
    res.json(oneTag);
  }).catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.post('/', (req, res) => {
  Tag.create(
    {
      tag_name: req.body.tag_name
    }
  ).then(
    (createTag) => res.json(createTag)
  ).catch((err) => {
    console.log(err);
    res.status(400).json(err);
  })
});

router.put('/:id', (req, res) => {
  Tag.update(req.body,
    {
      where: {
        id: req.params.id
      }
    }
  ).then((updateTag) => {
    if (!updateTag) {
      res.status(404).json(
        {
          message: 'No tags could be found with this id'
        }
      );
      return;
    }
    res.json(updateTags);
  }).catch((err) => {
    console.log(err);
    res.status(400).json(err);
  })
});

router.delete('/:id', (req, res) => {
  Tag.destroy(
    {
      where: {
        id: req.params.id
      }
    }
  ).then((deleteTag) => {
    if (!deleteTag) {
      res.status(404).json(
        {
          message: 'No tags could be found with this id'
        }
      );
      return;
    }
    res.json(deleteTag);
  }).catch((err) => {
    console.log(err);
    res.status(400).json(err);
  })
});

module.exports = router;
