import React from 'react'
import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react'
const Nftdrop = () => {
  const connectWithMetamask = useMetamask()
  const disconnect = useDisconnect()
  const address = useAddress()
  return (
    <div className="flex  flex-col  justify-center  lg:grid lg:grid-cols-10 ">
      <div className="  bg-[url('/images/left.png')] flex  w-full flex-col  items-center justify-center  py-1 lg:col-span-4 lg:min-h-screen">
        <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl  p-2">
          <img
            className="w-28  rounded-xl object-cover lg:w-60"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-Uakcss5YTH8XGYWgHb3H38zyCr8i-hRjEA&usqp=CAU"
            alt=""
          />
        </div>
        <div className="py-2 cursor-pointer text-center lg:space-y-2">
          <h1 className="w-72 text-2xl   font-bold text-white lg:w-96 lg:text-5xl">
            Trump Bro Apes
          </h1>
          <p className="  text-gray-500 ">A collection of Trump</p>
        </div>
      </div>

      <div className="flex flex-col justify-between lg:col-span-6">
        <header className="flex items-center justify-between py-2 px-3 lg:px-7 lg:py-4">
          <h1 className="w-52  text-xl sm:w-80 text-gray-500">
            The{' '}
            <span className="font-bold underline decoration-pink-600/25 ">
              Trump Bro
            </span>{' '}
            NFT Market Place
          </h1>
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
            src="data:image/png;base64,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"
            alt=""
          />
          <div className="mb-20 space-y-2 text-center">
            <h1 className="text-xl font-bold lg:text-3xl mt-2">
              The PAPAFAM Ape Coding Club|NFT Drop
            </h1>
            <p className="text-green-400">12/30 collected</p>
          </div>
        </div>
        <div className="mt-10 lg:mt-2">
          <button className="w-full rounded-full h-10 lg:h-14 bg-gradient-to-r from-sky-500 to-indigo-500 py-2 text-xl font-extrabold text-white">
            Mint NFT (0.02Eth)
          </button>
        </div>
      </div>
    </div>
  )
}

export default Nftdrop
