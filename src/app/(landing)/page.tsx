import React from "react"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import Heading from "@/components/Heading"
import { Check, Star } from "lucide-react"
import ShinyButton from "@/components/ShinyButton"
import MockDiscordUi from "@/components/MockDiscordUi"
import { AnimatedList, AnimatedListItem } from "@/components/ui/animated-list"
import DiscordMessage from "@/components/DiscordMessage"
import Image from "next/image"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/light"
import { Icons } from "@/components/icons"

const Page = async () => {
  const codeSnippet = `await fetch("http://localhost:3000/api/v1/events", {
  method: "POST",
  body: JSON.stringify({
    category: "sale",
    fields: {
      plan: "PRO",
      email: "zoe.martinez2001@email.com",
      amount: 49.00
    }
  }),
  headers: {
    Authorization: "Bearer <YOUR_API_KEY>"
  }
})`

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

      <section className={"relative py-24 sm:py-32 bg-brand-25"}>
        <MaxWidthWrapper classname={"flex flex-col items-center gap-16 sm:gap-20"}>
          <div>
            <h2 className={"text-center text-base leading-7 font-semibold text-brand-600"}>
              Intuitive Monitoring
            </h2>

            <Heading>
              Stay ahead with real-time insights
            </Heading>
          </div>

          <div className={"grid gap-4 lg:grid-cols-3 grid-rows-2"}>
            {/* First bento grid item */}
            <div className={"relative lg:row-span-2"}>
              <div className={"absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"} />
              <div
                className={"relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg) + 1px)] lg:rounded-l-[calc(2rem + 1px)]"}>
                <div className={"px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10"}>
                  <p className={"mt-2 text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center"}>
                    Real-time notifications
                  </p>
                  <p className={"mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center"}>
                    Get notified about critical events the moment they happen, np matter if you're at home or on the go
                  </p>
                </div>

                <div
                  className={"relative min-h-[25rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm"}>
                  <div
                    className={"absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 shadow-2xl bg-gray-900"}>
                    <Image className={"size-full rounded-md object-cover object-top"} src={"/phone-screen.png"}
                           alt={"phone image"} width={1000} height={1000} />
                  </div>
                </div>
              </div>

              <div
                className={"pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem] "} />
            </div>

            {/*Second bento grid item*/}
            <div className="relative max-lg:row-start-1">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]" />
              <div
                className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center">
                    Track Any Event
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    From new user signups to successful payments, PingPanda
                    notifies you for all critical events in your SaaS.
                  </p>
                </div>
                <div
                  className="flex relative flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                  <Image
                    className="w-full max-lg:max-w-xs"
                    src="/bento-any-event.png"
                    alt="Bento box illustrating event tracking"
                    width={1000}
                    height={10}
                  />
                </div>
              </div>

              <div
                className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]" />
            </div>

            {/*Third bento grid item*/}

            <div className={"relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2"}>
              <div className={"absolute inset-px rounded-lg bg-white "} />
              <div
                className={"relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+ 1px)]"}>
                <div className={"px-8 pt-8 sm:px-10 sm:pt-10"}>
                  <p className="mt-2 text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center">
                    Track Any Properties
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Add any custom event you like to an event, such as a user email, a purchase amount or an exceeded
                    quota.
                  </p>
                </div>

                <div
                  className={"flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2"}>
                  <Image src={"/bento-custom-data.png"} alt={"bento box"} className={"w-full max-lg:max-w-xs"}
                         width={500} height={300} />
                </div>
              </div>
              <div className={"pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"} />
            </div>

            {/*Fourth bento element*/}
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]">
                <div
                  className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">

                  <div className="px-8 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                    <p className="mt-2 text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center">
                      Easy integration
                    </p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                      Connect PingPanda with your existing workflows in minutes and call our intuitive API from any
                      language.
                    </p>
                  </div>

                  <div className="relative min-h-[30rem] w-full grow">
                    <div
                      className="absolute bottom-0 left-10 right-0 top-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">

                      <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                        <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                          <div
                            className="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white">
                            pingpanda.js
                          </div>
                        </div>
                      </div>

                      <div className="overflow-hidden">
                        <div className="mh-[30rem]">
                          <SyntaxHighlighter
                            language="javascript"
                            style={{
                              ...oneDark,
                              "pre[class*=\"language-\"]": {
                                ...oneDark["pre[class*=\"language-\"]"],
                                backgroundColor: "transparent",
                                overflow: "hidden",
                              },
                              "code[class*=\"language-\"]": {
                                ...oneDark["code[class*=\"language-\"]"],
                                backgroundColor: "transparent",
                                overflow: "hidden",
                              },
                            }}
                          >
                            {codeSnippet}
                          </SyntaxHighlighter>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              <div
                className={"pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"} />

            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className={"relative py-24 sm:py-32 bg-brand-25"}>
        <MaxWidthWrapper classname={"flex flex-col items-center gap-16 sm:gap-20"}>
          <div>
            <h2 className={"text-center text-base/7 font-semibold text-brand-600"}>
              Real World Experiences
            </h2>

            <Heading className={"text-center"}>
              What our customers say
            </Heading>
          </div>

          <div
            className={"mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:divide-y-0 lg:divide-x divide-gray-200"}>
            <div
              className="flex flex-auto flex-col gap-4 bg-brand-25 p-6 sm:p-8 lg:p-16 rounded-t-[2rem] lg:rounded-tr-none lg:rounded-l-[2rem]">
              <div className="flex gap-0.5 mb-2 justify-center lg:justify-start">
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
              </div>

              <p
                className="text-base sm:text-lg lg:text-lg/8 font-medium tracking-tight text-brand-950 text-center lg:text-left text-pretty">
                PingPanda has been a game-changer for me. I've been using it for
                two months now and seeing sales pop up in real-time is super
                satisfying.
              </p>

              <div
                className="flex flex-col justify-center lg:justify-start sm:flex-row items-center sm:items-start gap-4 mt-2">
                <Image
                  src="/user-2.png"
                  className="rounded-full object-cover"
                  alt="Random user"
                  width={48}
                  height={48}
                />
                <div className="flex flex-col items-center sm:items-start">
                  <p className="font-semibold flex items-center">
                    Freya Larsson
                    <Icons.verificationBadge className="size-4 inline-block ml-1.5" />
                  </p>
                  <p className="text-sm text-gray-600">@itsfreya</p>
                </div>
              </div>
            </div>

            <div
              className="flex flex-auto flex-col gap-4 bg-brand-25 p-6 sm:p-8 lg:p-16 rounded-t-[2rem] lg:rounded-tl-none lg:rounded-r-[2rem]">
              <div className="flex gap-0.5 mb-2 justify-center lg:justify-start">
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
                <Star className="size-5 text-brand-600 fill-brand-600" />
              </div>

              <p
                className="text-base sm:text-lg lg:text-lg/8 font-medium tracking-tight text-brand-950 text-center lg:text-left text-pretty">
                PingPanda has been a game-changer for me. I've been using it for
                two months now and seeing sales pop up in real-time is super
                satisfying.
              </p>

              <div
                className="flex flex-col justify-center lg:justify-start sm:flex-row items-center sm:items-start gap-4 mt-2">
                <Image
                  src="/user-1.png"
                  className="rounded-full object-cover"
                  alt="Random user"
                  width={48}
                  height={48}
                />
                <div className="flex flex-col items-center sm:items-start">
                  <p className="font-semibold flex items-center">
                    Danil Kompaniets
                    <Icons.verificationBadge className="size-4 inline-block ml-1.5" />
                  </p>
                  <p className="text-sm text-gray-600">@danilkompaniets</p>
                </div>
              </div>
            </div>
          </div>
        <ShinyButton href={"/sign-up"}
                     className={"relative z-10 h-14 w-full max-w-xs text-base shadow-lg transition-shadow duration-300 hover:shadow-xl"}>
          Start For Free Today
        </ShinyButton>
        </MaxWidthWrapper>
      </section>
    </>
  )
}

export default Page