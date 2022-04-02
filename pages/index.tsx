import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { sanityClient, urlFor } from '../sanity'
import { Collection } from '../typing'

interface Props {
  collections: Collection[]
}
const Home = ({ collections }: Props) => {
  // console.log(collections)

  return (
    <div className="mx-auto mt-2 min-h-screen max-w-6xl rounded-xl ">
      <header className="flex items-center justify-between py-2 px-3 lg:px-7 lg:py-4">
        <h1 className="w-52  text-xl text-gray-500 sm:w-80">
          The{' '}
          <span className="font-bold underline decoration-pink-600/25 ">
            Trump Bro
          </span>{' '}
          NFT Market Place
        </h1>
      </header>
      <hr />
      <main className="bg-slate-100/30 p-12  shadow-lg shadow-pink-400/25 ">
        <div className="grid space-x-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 ">
          {collections.map((collection) => {
            return (
              <Link href={`/nft/${collection.slug.current}`} key={collection._id}>
              <div className=" flex cursor-pointer flex-col items-center justify-center rounded-2xl p-3 transition-all duration-200 hover:scale-105 "
              >
                <img
                  className="h-72 w-64 rounded-2xl object-cover"
                  src={urlFor(collection.Image).url()}
                  alt=""
                />
                <div className="text-center">
                  <h1 className=" mt-3 text-xl font-bold">
                    {collection.title}
                  </h1>
                  <h2 className=" mt-1">{collection.description}</h2>
                </div>
              </div>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type=="collection"]{
  _id,
  title,
  description,
  nftCollectionName,
  Image{
  asset
},
  previewImage{
    asset
  },
  slug{
    current
  },
  creator->{
    _id,
    name,
    address,
    slug{
    current
  },
  },
}`

  const collections = await sanityClient.fetch(query)

  return {
    props: {
      collections,
    },
  }
}
