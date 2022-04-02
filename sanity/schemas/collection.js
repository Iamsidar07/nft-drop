export default {
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Enter the Your NFT Drop title',
      type: 'string',
    },
   
    {
      name: 'description',
      title: 'description',
      type: 'string',
    },
   
    
    {
      name:"nftCollectionName",
      title:"Name of NFT collection",
      type:"string"
    },
    {
      name:"address",
      title:"Address",
      type:"string"
    },
    {
      name: 'slug',
      title: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      }
    },
    {
      name: 'creator',
      title: 'Creator',
      type: 'reference',
      to: {type: 'creator'},
    },
    {
      name: 'Image',
      title: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'previewImage',
      title: 'preview image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  
    
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      })
    },
  },
}
