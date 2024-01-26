export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Product Title',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Product Description',
      type: 'text'
    },
    {
      name: 'price',
      title: 'Product Price',
      type: 'number'
    },
    {
      name: 'slug',
      title: 'Product Slug',
      type: 'slug',
      options: {
        source: 'title'
      }
    },
    {
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }
  ]
}