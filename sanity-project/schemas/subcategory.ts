export default {
  name: 'subcategory',
  title: 'Subcategory',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Subcategory Title',
      type: 'string'
    },
    {
      name: 'category',
      title: 'Parent Category',
      type: 'reference',
      to: [{ type: 'category' }]
    }
  ]
}