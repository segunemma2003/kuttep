import React, { useEffect, useState } from "react";

import { plane } from "../assets/assets";
import Button from "./Button";
import mystyle from "./Earn.module.css";
import { useAccount } from "wagmi";
import { getReferralCode, taskSummary } from "../lib/api";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { shortenAddress, timeAgo } from "../lib/utils";

const EarnTask = () => {
  const [referral_code, setReferralCode] = useState("");
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);

  const [earnings, setEarnings] = useState([]);
  const HEADERS = ["Rank", "Wallet", "Total Task", "Total Amount"];

  const getAddress = async () => {
    if(!address){
      alert('Kindly connect wallet');
    }
    setLoading(true);
    // function body goes here
    try {
      const da ={
        "address":address
      }
    const data = await getReferralCode(da);
    console.log("data: refAdd", data['referral_code']); // Fetch settings data
    setReferralCode(data['referral_code']);
  } catch (error) {
    console.log(error);
    // notifyError("Failed to fetch settings.");
  }
  setLoading(false);
};


useEffect(() => {
  if (earnings.length ==0) {
    const fetchEarnings = async () => {
      try {
        const data = await taskSummary();
        console.log("data:", data); // Fetch settings data
        
        setEarnings(data); // Store settings in state
      } catch (error) {
        console.log(error);
        // notifyError("Failed to fetch settings.");
      }
    };

    fetchEarnings();
  }
}, [earnings]);
  
  return (
    <>
    <section className={`section `}>
      <div className={`sectionContainer  space-y-2 `}>
      <div>
        <h1 class="text-center underline title">How To Earn from Tasks</h1>
      </div>
        <div
          className={`contentContainer bg-[#fff] h-max border-1 border-slate-950 `}
        >
         
          <div>
            <h2 className="title  text-center text-[#3B2621] ">Task 1</h2>
            <h3 className={`text mt-0 text-[1.2rem] text-[#3B2621]`}>
             Refer Someone to Earn 1000 points
            </h3>

            <p className="text mt-0 text-[1.2rem] text-[#3B2621]">
            Alright, Kutties, gather ‘round! It’s time to level up and invite more friends into the fold. But first, let’s set you up for your adventure. Head over to Metamask.io, hit that download button, and add the Metamask extension to your browser. Follow the simple steps to create your wallet and guard your private key like it’s your most valuable possession – it’s what keeps your MoonBag safe and sound.

                Now, let’s talk referrals. Click the “Get Referral Code” button below to generate your unique code. Share this code with the people you're referring, and when they use it while buying KAI, both of you will reap the rewards! Remember, you can only refer a user once, but feel free to refer as many different Kutties as you’d like.

                So, go ahead, gather your squad, share the love, and let’s watch our KAI family grow together!
            </p>
           
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col space-y-4 text-center">
              <div className="border-2 border-dashed border-[#3B2621] text-[#3B2621] p-4 inline-block">
                <CopyToClipboard text={referral_code}>
                  <p>{referral_code ? referral_code : "Generate Referral Code"}</p>
                </CopyToClipboard>
              </div>
              <div className="text-center">
                <Button
                  disabled={loading}
                  colored
                  text={loading ? `Loading...` : `Start Referring`}
                  clickFunction={getAddress}
                  className="mt-4"
                />
              </div>
            </div>
          </div>

      </div>
      <div
          className={`contentContainer bg-[#fff] h-max border-1 border-slate-950 `}
        >
          <div>
            <h2 className="title  text-center text-[#3B2621] "> Task 2 </h2>
            <h3 className={`text mt-0 text-[1.2rem] text-[#3B2621]`}>
              Join X Account - 2000 points
            </h3>

            <p className="text mt-0 text-[1.2rem] text-[#3B2621]">
            Ready to kick-start your points journey? The next big task on your list is to join an X account and instantly earn a rewarding 2,000 points! It’s an easy step with a massive reward, making it the perfect opportunity to boost your point tally.

To get started, all you need to do is visit X and create an account if you don’t already have one. Simply follow the registration steps, which involve providing your name, email address, and a password. If you already have an account, you’re one step ahead! Make sure to connect your existing X account with the platform, and you’ll automatically be credited with your 2,000 points.

What’s great about this task is that it helps you engage with a thriving digital community. X offers endless streams of content, updates, and opportunities to stay connected with trending conversations. Whether you’re interested in technology, entertainment, sports, or even niche topics, X provides a space to explore, follow, and engage with a variety of content creators and influencers.

Once you’ve successfully joined X and linked your account, you’ll receive your points as a reward. You can now use these points to unlock more features, enter giveaways, or participate in exclusive opportunities on the platform. And remember, the more you engage, the more chances you have to earn extra points.

So why wait? Join the X community today, earn your 2,000 points, and start exploring everything the platform has to offer!


            </p>
            <br />
            <div className="flex items-center justify-center">
            <div className="flex flex-col space-y-4 text-center">
              {/* <div className="border-2 border-dashed border-[#3B2621] text-[#3B2621] p-4 inline-block">
                <CopyToClipboard text={referral_code}>
                  <p>{referral_code ? referral_code : "Generate Referral Code"}</p>
                </CopyToClipboard>
              </div> */}
              <div className="text-center">
                <Button
                
                  colored
                  text={`Join X account`}
                  clickFunction={()=>console.log('telegram')}
                  className="mt-4"
                />
              </div>
            </div>
          </div>
          </div>
        </div>
        <div
          className={`contentContainer bg-[#fff] h-max border-1 border-slate-950 `}
        >
          <div>
            <h2 className="title  text-center text-[#3B2621] "> Task 3 </h2>
            <h3 className={`text mt-0 text-[1.2rem] text-[#3B2621]`}>
            Join the Telegram Group and Earn 1,000 Points
            </h3>

            <p className="text mt-0 text-[1.2rem] text-[#3B2621]">
            Another great way to rack up points is by joining our exclusive Telegram group! By completing this task, you’ll earn a solid 1,000 points while connecting with a like-minded community that shares valuable insights, tips, and updates.

Joining the Telegram group is simple. If you don’t have the Telegram app yet, download it from your app store. Once you’ve set it up, click on the link provided to join the group. It’s a community space where members can discuss important updates, share experiences, and stay informed about the latest happenings.

What makes this Telegram group so valuable is the real-time interaction with other members and admins. You can ask questions, get quick answers, and share your thoughts. Whether you’re a newbie or a seasoned pro, there’s always something to learn or contribute. Plus, group discussions often cover exclusive updates or events that you won’t want to miss.

After successfully joining the group, your 1,000 points will be credited to your account. This is a quick and easy way to grow your point balance and stay connected with the community at the same time. So take a moment, join the Telegram group, and enjoy the benefits that come with being part of a vibrant online community.
            </p>

            <div className="flex items-center justify-center">
            <div className="flex flex-col space-y-4 text-center">
              {/* <div className="border-2 border-dashed border-[#3B2621] text-[#3B2621] p-4 inline-block">
                <CopyToClipboard text={referral_code}>
                  <p>{referral_code ? referral_code : "Generate Referral Code"}</p>
                </CopyToClipboard>
              </div> */}
              <div className="text-center">
                <Button
                
                  colored
                  text={` Telegram group`}
                  clickFunction={()=>console.log('telegram')}
                  className="mt-4"
                />
              </div>
            </div>
          </div>
          </div>

          </div>


          

          <div
          className={`contentContainer bg-[#fff] h-max border-1 border-slate-950 `}
        >
          <div>


            <h2 className="title  text-center text-[#3B2621] "> Task 4 </h2>
            <h3 className={`text mt-0 text-[1.2rem] text-[#3B2621]`}>
            Join the Telegram Channel and Earn 1,000 Points
            </h3>

            <p className="text mt-0 text-[1.2rem] text-[#3B2621]">
            Your next opportunity to earn points is just a click away! By joining our Telegram channel, you’ll instantly earn 1,000 points. But that’s not all – you’ll also stay updated with the latest announcements, promotions, and opportunities.

The Telegram channel functions as an official news feed where you can receive all the latest updates directly to your phone. Unlike the group, where discussions happen, the channel is focused on delivering important news and alerts straight to you. It’s a great way to ensure you never miss out on any special promotions, new features, or updates related to the platform.

Joining is easy. Simply download the Telegram app if you don’t already have it, then click the link to join the channel. You’ll receive real-time updates, so you can stay ahead of the curve and make the most of your experience.

Once you’ve successfully joined the channel, you’ll be awarded 1,000 points! Not only will you stay informed, but you’ll also be rewarded for being an active participant in the community. It’s a win-win!

So, what are you waiting for? Join the Telegram channel now, claim your points, and stay connected with the latest updates!
            </p>
            <div className="flex items-center justify-center">
            <div className="flex flex-col space-y-4 text-center">
              {/* <div className="border-2 border-dashed border-[#3B2621] text-[#3B2621] p-4 inline-block">
                <CopyToClipboard text={referral_code}>
                  <p>{referral_code ? referral_code : "Generate Referral Code"}</p>
                </CopyToClipboard>
              </div> */}
              <div className="text-center">
                <Button
                
                  colored
                  text={`Telegram Channel`}
                  clickFunction={()=>console.log('telegram')}
                  className="mt-4"
                />
              </div>
            </div>
          </div>

          
          </div>

          
          
        </div>


        <div
          className={`contentContainer bg-[#fff] h-max border-1 border-slate-950 `}
        >
          <div>


            <h2 className="title  text-center text-[#3B2621] "> Task 5 </h2>
            <h3 className={`text mt-0 text-[1.2rem] text-[#3B2621]`}>
            Refer 5 People and Earn 10,000 Points
            </h3>

            <p className="text mt-0 text-[1.2rem] text-[#3B2621]">
            Looking for a big points boost? Here's your chance to earn a whopping 10,000 points! All you need to do is refer five people to join the platform, and you’ll be rewarded handsomely.

Referring is simple: click on the "Get Referral Code" button below to generate your unique code. Share this code with your friends, family, or anyone who might be interested in joining. Once they use your referral code while signing up, both you and the new member will earn points.

The beauty of this task is that you can refer as many people as you want. The more you refer, the more points you’ll earn. However, to earn the 10,000 points, you must successfully refer five people who complete the sign-up process.

Think of all the possibilities with those extra points! Whether it’s unlocking exclusive features, entering giveaways, or gaining access to special promotions, the rewards are within your reach. Referring is not only a great way to earn, but it also helps grow the community, making it more vibrant and engaging for everyone.

So go ahead, refer five people today, and get your 10,000 points! Your code is waiting, and so are the rewards.
            </p>
            <div className="flex items-center justify-center">
            <div className="flex flex-col space-y-4 text-center">
              <div className="border-2 border-dashed border-[#3B2621] text-[#3B2621] p-4 inline-block">
                <CopyToClipboard text={referral_code}>
                  <p>{referral_code ? referral_code : "Generate Referral Code"}</p>
                </CopyToClipboard>
              </div>
              <div className="text-center">
                <Button
                  disabled={loading}
                  colored
                  text={loading ? `Loading...` : `Start Referring`}
                  clickFunction={getAddress}
                  className="mt-4"
                />
              </div>
            </div>
          </div>
          </div>
          
        </div>

        <div
          className={`contentContainer bg-[#fff] h-max border-1 border-slate-950 `}
        >
          <div>


            <h2 className="title  text-center text-[#3B2621] "> Top Earners</h2>
        <div className="table-responsive mt-[3rem] h-[500px] overflow-y-scroll  ">
          <table className={`${mystyle.tableStyle} `}>
            <thead>
              <tr>
                {HEADERS.map((th, index) => (
                  <th className={`${mystyle.thStyle}`} key={index}>
                    {th}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {earnings.map((recent, index) => (
                <tr key={recent['id']} className={`h-[70px]`}>
                  <td className={`${mystyle.tdStyle}`}>{index + 1}</td>

                  <td className={`${mystyle.tdStyle}`}> {shortenAddress(recent["address"]['address'])}</td>

                  <td className={`${mystyle.tdStyle} `}> {recent["total_tasks"] } tasks</td>

                  <td className={`${mystyle.tdStyle}`}>{recent["total_amount"] } Points</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
</div>
</div>
</div>

        

    </section>
  
    </>
  );
};



export default EarnTask;
