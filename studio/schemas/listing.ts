export default {
  name: 'listing',
  title: 'Listing',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'startingBid',
      title: 'Starting Bid',
      type: 'number',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'currentBid',
      title: 'Current Bid',
      type: 'number'
    },
    {
      name: 'marketValue',
      title: 'Market Value',
      type: 'number',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Ending Soon', value: 'ending-soon' },
          { title: 'Coming Soon', value: 'coming-soon' },
          { title: 'Featured', value: 'featured' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'charity',
      title: 'Charity',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    }
  ]
} 