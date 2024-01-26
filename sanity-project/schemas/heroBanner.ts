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
      name: 'primaryHeroImage',
      title: 'Primary Hero Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'secondaryHeroImage',
      title: 'Secondary Hero Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }
  ]
}