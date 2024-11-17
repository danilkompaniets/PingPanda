"use client"
import { PropsWithChildren, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CATEGORY_NAME_VALIDATOR } from "@/lib/validators/category-validator"
import Modal from "@/app/dashboard/Modal"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/utils"
import { Button } from "@/components/ui/button"
import { client } from "@/lib/client"
import LoadingSpinner from "@/components/LoadingSpinner"

const EVENT_CATEGORY_VALIDATOR = z.object({
  name: CATEGORY_NAME_VALIDATOR,
  color: z.string().min(1, "Color is required.").regex(/^#[0-9A-F]{6}$/i, "Invalid color format."),
  emoji: z.string().emoji("Invalid emoji format.").optional(),
})

type EventCategoryForm = z.infer<typeof EVENT_CATEGORY_VALIDATOR>

const COLOR_OPTIONS = [
  "#FF6B6B", // bg-[#FF6B6B] ring-[#FF6B6B] Bright Red
  "#4ECDC4", // bg-[#4ECDC4] ring-[#4ECDC4] Teal
  "#45B7D1", // bg-[#45B7D1] ring-[#45B7D1] Sky Blue
  "#FFA07A", // bg-[#FFA07A] ring-[#FFA07A] Light Salmon
  "#98D8C8", // bg-[#98D8C8] ring-[#98D8C8] Seafoam Green
  "#FDCB6E", // bg-[#FDCB6E] ring-[#FDCB6E] Mustard Yellow
  "#6C5CE7", // bg-[#6C5CE7] ring-[#6C5CE7] Soft Purple
  "#FF85A2", // bg-[#FF85A2] ring-[#FF85A2] Pink
  "#2ECC71", // bg-[#2ECC71] ring-[#2ECC71] Emerald Green
  "#E17055", // bg-[#E17055] ring-[#E17055] Terracotta
]

const EMOJI_OPTIONS = [
  { emoji: "💰", label: "Money (Sale)" },
  { emoji: "👤", label: "User (Sign-up)" },
  { emoji: "🎉", label: "Celebration" },
  { emoji: "📅", label: "Calendar" },
  { emoji: "🚀", label: "Launch" },
  { emoji: "📢", label: "Announcement" },
  { emoji: "🎓", label: "Graduation" },
  { emoji: "🏆", label: "Achievement" },
  { emoji: "💡", label: "Idea" },
  { emoji: "🔔", label: "Notification" },
]

const CreateEventCategoryModal = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()

  const { mutate: createEventCategory, isPending: isCreatingCategory } = useMutation({
    mutationFn: async (data: EventCategoryForm) => {
      await client.category.createEventCategory.$post(data)
      setIsOpen(false)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-event-categories"],
      })
    },
  })

  const { register, setValue, handleSubmit, watch, formState: { errors } } = useForm<EventCategoryForm>({
    resolver: zodResolver(EVENT_CATEGORY_VALIDATOR),
  })
  const color = watch("color")
  const selectedEmoji = watch("emoji")

  const onSubmit = (data: EventCategoryForm) => {
    createEventCategory(data)
  }

  return (
    <>
      <div className={"w-full"} onClick={() => setIsOpen(true)}>
        {children}
      </div>
      <Modal isOpen={isOpen} closeFn={() => setIsOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)} className={"space-y-6"}>
          <div>
            <h2 className={"text-lg/7 font-medium text-gray-950"}>
              New event category
            </h2>
            <p className={"text-sm/6 text-gray-600"}>
              Create a new event category to organize your events
            </p>
          </div>

          <div className={"space-y-5"}>
            <div>
              <Label htmlFor={"name"}>
                Name
              </Label>
              <Input autoFocus={true}
                     id={"name"}
                     {...register("name")}
                     placeholder={"e.e user-signup"}
                     className={"w-full"} />
              {errors.name && (
                <p className={"text-sm text-red-600"}>
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className={""}>
              <Label>
                Color
              </Label>
              <div className={"flex flex-wrap gap-3"}>
                {COLOR_OPTIONS.map((premadeColor) => (
                  <button
                    onClick={() => setValue("color", premadeColor)}
                    key={premadeColor} type={"button"}
                    className={cn(
                      `bg-[${premadeColor}]`,
                      "size-10 rounded-full ring-2 ring-offset-2 transition-all",
                      color === premadeColor ? "ring-brand-700 scale-110" : "ring-transparent hover:scale-105",
                    )}>
                  </button>
                ))}
              </div>

              {errors.color && (
                <p className={"text-sm mt-1 text-red-600"}>
                  {errors.color.message}
                </p>
              )}
            </div>

            <div className={"flex flex-wrap gap-3"}>
              {EMOJI_OPTIONS.map(({ emoji, label }) => (
                <button
                  onClick={() => setValue("emoji", emoji)}
                  key={emoji} type={"button"}
                  className={cn(
                    `bg-[${emoji}]`,
                    "size-10 flex items-center justify-center text-xl rounded-md transition-all",
                    selectedEmoji === emoji ? "bg-brand-100 ring-2 ring-brand-700 scale-110" : "bg-brand-100  hover:bg-brand-200",
                  )}>
                  {emoji}
                </button>
              ))}
            </div>

            {errors.emoji && (
              <p className={"text-sm mt-1 text-red-600"}>
                {errors.emoji.message}
              </p>
            )}
          </div>

          <div className={"flex w-full justify-end space-x-3 pt-4 border-t"}>
            <Button type={"button"} variant={"outline"} onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type={"submit"} disabled={isCreatingCategory}>
              {isCreatingCategory ? (<LoadingSpinner className={"size-3 w-[100px]"} />) : (<p>Create category</p>)}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default CreateEventCategoryModal