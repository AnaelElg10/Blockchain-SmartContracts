"use client"
import { defineChain } from 'viem'
import { Outfit } from 'next/font/google'
import './globals.css'
import {PrivyProvider} from '@privy-io/react-auth';
import React from 'react';
import { url } from 'inspector';

const font = Outfit({subsets: ['latin']})

const BitTorrent = defineChain({
    id: 1029,
    name: 'BitTorrent Chain Testnet',
    network: 'BitTorrent Chain Testnet',
    nativeCurrency: {
        name: 'BitTorrent Chain Testnet',
        symbol: 'BTTC',
        decimals: 18,
    },
    rpcUrls: {
        default:{
            http: ['https://pre-rpc.bt.io']
        }
    } as any ,
    blockExplorers: {
        default: {
            name: 'Explorer', url: 'https://testnet.bttcscan.com'
        }
    }

})



export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='en'>
            <body className={font.className}>
                <PrivyProvider
                    appId="cm4o7bxte00ufw8lj6r7x6n59"
                    config={{
                        // Customize Privy's appearance in your app
                        appearance: {
                            theme: 'dark',
                            accentColor: '#676FFF',
                            logo: 'https://your-logo-url',
                        },
                        // Create embedded wallets for users who don't have a wallet
                        embeddedWallets: {
                            createOnLogin: 'users-without-wallets',
                        },
                        defaultChain: BitTorrent,
                        supportedChains: [BitTorrent]
                    }}
                >
                    {children}
                </PrivyProvider>
            </body>
        </html>
    )
}
