import React, { useEffect, useState } from 'react'
import { useAddress, useDisconnect, useMetamask,useNFTDrop } from '@thirdweb-dev/react'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { sanityClient, urlFor } from '../../sanity'
import { Collection } from '../../typing'
import { BigNumber } from 'ethers'
import toast,{Toaster} from "react-hot-toast"
interface Props{
  collection:Collection,
}
const Nftdrop = ({collection}: Props) => {
  console.log("❤️",collection)
  const connectWithMetamask = useMetamask()
  const disconnect = useDisconnect()
  const address = useAddress()
  const nftDrop=useNFTDrop(collection.address)
  const [claimedSupply,setClaimedSupply]=useState<number>(0)
  const [totalSupply,setTotalSupply]=useState<BigNumber>()
  const [loading,setLoading]=useState<boolean>(true)
  const [price,setPrice]=useState<String>()
  

  useEffect(() => {
    const fetchPrice=async ()=>{
       const claimCondition=await nftDrop?.claimConditions.getAll();
       setPrice(claimCondition?.[0].currencyMetadata.displayValue)
    }
    fetchPrice()
  }, [nftDrop])
  
  useEffect(() => {
   if(!nftDrop) return;
   const fetchNftDropData=async ()=>{
     setLoading(true)
     const claimed= await nftDrop.getAllClaimed();
     const total=await nftDrop.totalSupply();
     setClaimedSupply(claimed.length)
     setTotalSupply(total)
     setLoading(false)
   }
   fetchNftDropData()
  }, [nftDrop])
  
  const mintNft=()=>{
    if(!nftDrop||!address) return;

    const quantity=1;
    const notification=toast.loading("Meenting your nft...",{
      style:{
         background:"white",
         padding:"20px",
         color:"green",
         fontSize:"17px",
         fontWeight:"bolder"
      }
    })
    setLoading(true)
    nftDrop.claimTo(address,quantity).then((tx)=>{
      const receipt=tx[0].receipt;
      const claimedTokenId=tx[0].id;
      const claimedUrl=tx[0].data()
      toast("Successfully minted..",{
        duration:5000,
        style:{
         background:"green",
         padding:"20px",
         color:"white",
         fontSize:"17px",
         fontWeight:"bolder"
        }

      })
    }).catch((err)=>{
      console.log(err)
      toast("Something went wrong..",{
        style:{
         background:"red",
         padding:"20px",
         color:"white",
         fontSize:"17px",
         fontWeight:"bolder"
        }
      })
    }).finally(()=>{
      setLoading(false)
      toast.dismiss(notification)
    })
  }
  return (
    <div className="flex  flex-col  justify-center  lg:grid lg:grid-cols-10 ">
     <Toaster position="bottom-center" />
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
            {
              loading?<p className='text-red-600 animate-bounce'>loading supply count...</p>:
            <p className="text-green-400">{claimedSupply}/{totalSupply?.toString()} claimed</p>

            }

            {
              loading&& <img className='h-36  w-80 object-contain'
               src="https://media3.giphy.com/media/WiIuC6fAOoXD2/200w.webp?cid=ecf05e47c45pk1hi68krip9mcgxmgskwmbouiobe5x9fti3z&rid=200w.webp&ct=g" alt="" />
            }


          </div>
        </div>
        <div className="mt-10 lg:mt-2">
          <button onClick={mintNft} disabled={loading||!address||claimedSupply==totalSupply?.toNumber()} className="w-full disabled:bg-gray-500 rounded-full h-10 lg:h-14 bg-gradient-to-r from-sky-500 to-indigo-500 py-2 text-xl font-extrabold text-white">
           {
             loading?<>Loading</>
             :claimedSupply==totalSupply?.toNumber()?(
               <>Sold Out</>
             ):!address?(
               <>Sign to Mint NFT</>
             ):(
              <span className='font-bold'>Mint NFT ({price}) ETH</span>
             )
           }
            
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

