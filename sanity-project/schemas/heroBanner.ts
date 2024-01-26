export default {
  name: 'heroBanner',
  title: 'Hero Banner',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Hero Banner Title',
      type: 'string'
    },
    {
      name: 'image',
      title: 'Hero Banner Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }
  ]
}