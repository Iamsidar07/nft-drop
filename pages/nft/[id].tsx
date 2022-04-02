import React from 'react'
import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { sanityClient, urlFor } from '../../sanity'
import { Collection } from '../../typing'

interface Props{
  collection:Collection,
}
const Nftdrop = ({collection}: Props) => {
  console.log("❤️",collection)
  const connectWithMetamask = useMetamask()
  const disconnect = useDisconnect()
  const address = useAddress()
  return (
    <div className="flex  flex-col  justify-center  lg:grid lg:grid-cols-10 ">
      <div className="  bg-[url('/images/left.png')] flex  w-full flex-col  items-center justify-center  py-1 lg:col-span-4 lg:min-h-screen">
        <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl  p-2">
          <img
            className="w-28 lg:h-72  rounded-xl object-cover lg:w-60"
            src={urlFor(collection.previewImage).url()}
            alt=""
          />
        </div>
        <div className="py-2 cursor-pointer text-center lg:space-y-2">
          <h1 className="w-72 text-2xl   font-bold text-white lg:w-96 lg:text-5xl">
           {collection.title}
          </h1>
          <p className="  text-gray-500 ">{collection.description}</p>
        </div>
      </div>

      <div className="flex flex-col justify-between lg:col-span-6">
        <header className="flex items-center justify-between py-2 px-3 lg:px-7 lg:py-4">
          <Link href={"/"}>
          <h1 className="w-52  text-xl sm:w-80 text-gray-500">
            The{' '}
            <span className="font-bold underline decoration-pink-600/25 ">
              Trump Bro
            </span>{' '}
            NFT Market Place
          </h1>
          </Link>
          <button
            onClick={ address?disconnect: connectWithMetamask}
            className=" lg:w-32 w-28 rounded-full  h-10 lg:h-12 bg-gradient-to-r from-sky-500 to-indigo-500 px-2   font-bold lg:px-4 text-white"
          >
            {address ? 'Sign Out ' : 'Sign In'}
          </button>
        </header>
         
        <hr />
        <p className='text-sm text-red-500 mt-3 text-center w-auto'>
            {
              address?`You have been successfully loged in with address ${address.substring(0,address.length-15)}`
              :"You have been loged out"
            }
          </p>
        <div className="flex flex-1 flex-col items-center justify-center space-y-1">
          <img
            className="mt-10 w-28 object-contain  lg:h-40 lg:w-60 lg:pb-4"
            src={urlFor(collection.Image).url()}
            alt=""
          />
          <div className="mb-20 space-y-2 text-center">
            <h1 className="text-xl font-bold lg:text-3xl mt-2">
              {
                collection.title
              }
            </h1>
            <p className="text-green-400">12/30 collected</p>
          </div>
        </div>
        <div className="mt-10 lg:mt-2">
          <button className="w-full  rounded-full h-10 lg:h-14 bg-gradient-to-r from-sky-500 to-indigo-500 py-2 text-xl font-extrabold text-white">
            Mint NFT (0.02Eth)
          </button>
        </div>
      </div>
    </div>
  )
}

export default Nftdrop;
export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const query = `*[_type=="collection" && slug.current==$id][0]{
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

  const collection = await sanityClient.fetch(query,{
 id: params?.id
  })
  
  return {
    props: {
      collection,
    },
  }
}

