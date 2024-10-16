import { createAppKit } from '@reown/appkit/react'

import { WagmiProvider} from 'wagmi'
import {  mainnet, sepolia,defineChain, holesky} from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
// import { defaultWagmiConfig } from '@reown/wagmi'

// import { base, blast, bsc, bscTestnet, polygon } from 'viem/chains'

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId from https://cloud.reown.com
const projectId = '61f529aa30c77838f2502740d05202ad'

// 2. Create a metadata object - optional
const metadata = {
  name: 'TEK',
  description: 'TEK Dapp',
  url: 'https://tekpresale.netlify.app/', // origin must match your domain & subdomain
  // icons: ['https://avatars.githubusercontent.com/u/179229932']  //icons
}


// Define the custom networ

const networks =  [mainnet, sepolia]

// 3. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  ssr: false,
  networks,
  projectId
})

// const config = defaultWagmiConfig ({
//   chains,
//   projectId,
//   metadata,
//   // ...wagmiOptions // Optional - Override createConfig parameters
// })

// 4. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks: networks,
  // metadata,
  projectId,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

export function AppKitProvider({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}