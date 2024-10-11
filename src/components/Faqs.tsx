import React, { useState } from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import { AiOutlineCaretDown } from "react-icons/ai";
import { Fade } from "react-awesome-reveal";

const Faqs = () => {

    const [closeFaq, setCloseFaq] = useState(false);


    return (
        <>
            <div id="faqs" className="w-full px-8 lg:px-28">
                <Fade>
                    <span className="flex items-center justify-center text-[#F79341] lg:text-[48px] text-[24px] font-black mb-16"> F.A.Q </span>
                </Fade>
                <div className="bg-[#1D1D1D] rounded-[25px] w-full">
                    <Accordion allowZeroExpanded={true} className='flex flex-col w-full'>
                        <Fade cascade triggerOnce duration={1000} className='w-full'>
                            <div className='bg-[#2C2C2C] w-full rounded-t-[25px] py-4 px-8'>
                                <Fade triggerOnce className='w-full'>
                                    <div className='flex items-center justify-between gap-1 w-full' onClick={() => setCloseFaq(!closeFaq)}>
                                        <p className='text-[#F79341] text-[16px]'> How to Buy Pudel? </p>
                                        <p> <AiOutlineCaretDown color='#F79341' size={24.65} /> </p>
                                    </div>
                                    <>
                                        {!closeFaq && (
                                            <>
                                                <div className='flex-col text-[#FFFFFF] text-[14px] w-full py-4 px-2'>
                                                    1. Install MetaMask or TrustWallet
                                                    Open your Google Chrome or Firefox and visit metamask.io. Download the MetaMask chrome extension and set up a wallet. On mobile? Get MetaMask’s app for iPhone or Android.
                                                    <p className='my-2' />
                                                    2. Purchase BNB/USDT/BUSD on an Exchange
                                                    Purchase BNB or USDT or BUSD on an Exchange. Transfer BNB/USDT/BUSD to your MetaMask or TrustWallet.
                                                    <p className='my-2' />
                                                    3.After pressing the wallet connection button, purchase PUDEL.
                                                </div>
                                            </>
                                        )}
                                    </>
                                </Fade>
                            </div>

                            <AccordionItem>
                                <AccordionItemHeading className='w-full rounded-t-[25px] py-4 px-8'>
                                    <AccordionItemButton className='flex items-center justify-between gap-1 w-full'>
                                        <p className='text-[#F79341] text-[16px]'> When will it launch? </p>
                                        <p> <AiOutlineCaretDown color='#F79341' size={24.65} /> </p>
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel className='text-[#FFFFFF] text-[14px] w-full py-4 px-8'>
                                    When the presale is finished and after the 30 day vesting period.
                                </AccordionItemPanel>
                            </AccordionItem>

                            <AccordionItem>
                                <AccordionItemHeading className='w-full rounded-t-[25px] py-4 px-8'>
                                    <AccordionItemButton className='flex items-center justify-between gap-1 w-full'>
                                        <p className='text-[#F79341] text-[16px]'> When will the stages end? </p>
                                        <p> <AiOutlineCaretDown color='#F79341' size={24.65} /> </p>
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel className='text-[#FFFFFF] text-[14px] w-full py-4 px-8'>
                                    When we reach the price of the next stage. Example: Stage 2 starts when price increases to $0.0000025
                                </AccordionItemPanel>
                            </AccordionItem>

                            <AccordionItem>
                                <AccordionItemHeading className='w-full rounded-t-[25px] py-4 px-8'>
                                    <AccordionItemButton className='flex items-center justify-between gap-1 w-full'>
                                        <p className='text-[#F79341] text-[16px]'> What is the marketcap at launch? </p>
                                        <p> <AiOutlineCaretDown color='#F79341' size={24.65} /> </p>
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel className='text-[#FFFFFF] text-[14px] w-full py-4 px-8'>
                                    The marketcap cannot be calculated at this time as tokens are still being sold.
                                </AccordionItemPanel>
                            </AccordionItem>

                            <AccordionItem>
                                <AccordionItemHeading className='w-full rounded-t-[25px] py-4 px-8'>
                                    <AccordionItemButton className='flex items-center justify-between gap-1 w-full'>
                                        <p className='text-[#F79341] text-[16px]'> PUDEL token is not visible. </p>
                                        <p> <AiOutlineCaretDown color='#F79341' size={24.65} /> </p>
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel className='text-[#FFFFFF] text-[14px] w-full py-4 px-8'>
                                    Add tokens from Metamask or Trust Wallet.
                                    <br /> Contract address :
                                    <br /> 0x6113E696A85cAcF0fE9E4Fd5F420598d9bA2fE85
                                </AccordionItemPanel>
                            </AccordionItem>

                        </Fade>
                    </Accordion>
                </div>
            </div>
        </>
    )
}

export default Faqs
