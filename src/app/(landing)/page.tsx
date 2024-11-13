import React from "react"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import Heading from "@/components/Heading"
import { Check } from "lucide-react"
import ShinyButton from "@/components/ShinyButton"
import MockDiscordUi from "@/components/MockDiscordUi"
import { AnimatedList, AnimatedListItem } from "@/components/ui/animated-list"
import DiscordMessage from "@/components/DiscordMessage"

const Page = () => {
  return (
    <>
      <section className={"relative py-24 sm:py-32 bg-brand-25"}>
        <MaxWidthWrapper classname={"text-center"}>
          <div className={"relative mx-auto flex text-center flex-col items-center gap-y-10"}>
            <div>
              <Heading>
                <span>
                  Real-Time SaaS Insights,
                </span>
                <br />
                <span
                  className={"relative bg-gradient-to-r from-brand-700 to to-brand-800 text-transparent bg-clip-text"}>
                  Delivered to Your Discord
                </span>
              </Heading>
            </div>
            <p className={"text-base/7 text-gray-600 max-w-prose text-center text-pretty"}>
              Ping Panda is the easiest way to monitor your SaaS. Get instant notifications for {" "}
              <span className={"font-semibold text-gray-700"}>
                sales, new user, or any other event {""}
              </span>
              sent directly to your Discord.
            </p>
            <ul className={"space-y-2 text-base/7 text-gray-600 text-left flex flex-col items-center sm:items-start"}>
              {["Real-time Discord alerts for critical events",
                "Buy once, use forever",
                "Track sales, new users, or any other event"].map((item, index) => (
                <li key={index} className={"flex gap-1.5 items-center text-left"}>
                  <Check className={"size-5 shrink-0"} />
                  {item}
                </li>
              ))}
            </ul>

            <div
              className={" relative z-10 text-base shadow-lg transition-shadow duration-300 hover:shadow-xl w-full max-w-80"}>
              <ShinyButton href={"/sign-up"}>
                Start For Free Today
              </ShinyButton>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      <section className={"relative bg-brand-25 pb-4"}>
        <div className={"absolute inset-x-0 bottom-24 top-24 bg-brand-700"} />
        <div className={"relative mx-auto"}>
          <MaxWidthWrapper classname={"relative"}>
            <div
              className={"-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4"}>
              <MockDiscordUi>
                <AnimatedList>
                  <AnimatedListItem>
                    <DiscordMessage avatarSrc={"/brand-asset-profile-picture.png"} avatarAlt={"PingPanda Avatar"}
                                    username={"PingPanda"} timestamp={"Today at 12:35PM"} badgeText={"SignUp"}
                                    badgeColor={"#43b581"} title={"🙎🏻‍♂️ New user signed up"}
                                    content={{ name: "Mateo", email: "m.ortiz129@gmail.com" }} />
                  </AnimatedListItem>
                  <AnimatedListItem>
                    <DiscordMessage avatarSrc={"/brand-asset-profile-picture.png"} avatarAlt={"PingPanda Avatar"}
                                    username={"PingPanda"} timestamp={"Today at 12:35PM"} badgeText={"Revenue"}
                                    badgeColor={"#faa61a"} title={"💳 Payment received"}
                                    content={{
                                      amount: "$49.00",
                                      email: "danil123@gmail.com",
                                      plan: "PRO" }}
                    />
                  </AnimatedListItem>
                  <AnimatedListItem>
                    <DiscordMessage avatarSrc={"/brand-asset-profile-picture.png"} avatarAlt={"PingPanda Avatar"}
                                    username={"PingPanda"} timestamp={"Today at 12:35PM"} badgeText={"SignUp"}
                                    badgeColor={"#43b581"} title={"🙎🏻‍♂️ New user signed up"}
                                    content={{ name: "danil", email: "danil123@gmail.com" }} />
                  </AnimatedListItem>
                </AnimatedList>
              </MockDiscordUi>
            </div>
          </MaxWidthWrapper>
        </div>
      </section>
      <section></section>
      <section></section>
    </>
  )
}

export default Page