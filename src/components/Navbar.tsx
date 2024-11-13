import React from "react"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import Link from "next/link"
import { SignOutButton } from "@clerk/nextjs"
import { Button, buttonVariants } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const Navbar = ({}) => {
  const user = false
  return (
    <nav
      className={"sticky z-[100] h-16 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg transition-all"}>
      <MaxWidthWrapper>
        <div className={"flex h-16 items-center justify-between"}>
          <Link href={"/public"} className={"flex z-40 font-semibold"}>
            Ping<span className={"text-brand-700"}>Panda</span>
          </Link>

          <div className={"flex h-full items-center space-x-4"}>
            {
              user ? <>
                <SignOutButton>
                  <Button size={"sm"} variant={"ghost"}>Sign out</Button>
                </SignOutButton>
                <Link href={"/dashboard"}
                      className={buttonVariants({ size: "sm", className: "sm:flex items-center gap-1" })}>
                  Dashboard <ArrowRight />
                </Link>
              </> : <>
                <Link href={"/dashboard"}
                      className={buttonVariants({
                        size: "sm",
                        variant: "ghost",
                        className: "sm:flex items-center gap-1",
                      })}>
                  Pricing
                </Link>
                <Link href={"/sign-in"}
                      className={buttonVariants({
                        size: "sm",
                        variant: "ghost",
                        className: "sm:flex items-center gap-1",
                      })}>
                  Sign in
                </Link>
                <Link href={"/sign-up"}
                      className={buttonVariants({ size: "sm", className: "sm:flex items-center gap-1 flex gap-2" })}>
                  Sign up <ArrowRight />
                </Link>
              </>
            }
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar