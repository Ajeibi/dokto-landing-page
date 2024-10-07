import { Button } from "@/components/ui/button"
import { Flex } from "@/components/ui/flex"
import Muted from "@/components/ui/typography/muted"
import { PlusIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image";
import Heading4 from "@/components//ui/typography/heading4"

interface IEmpty
{
      imgUrl: string;
      btnLink?: string;
      btnLabel?: string;
      label?: string;
      subLabel?: string;
}

export function Empty({
      imgUrl,
      btnLink,
      label,
      btnLabel,
      subLabel }: IEmpty)
{
      const router = useRouter()

      function handleListProduct()
      {
            router.push(btnLink ?? "")
      }

      return (
            <div className="centered w-full h-auto mt-10">

                  <div className=" p-8 flex flex-col items-center">
                        <Image src={imgUrl || "/empty-product.svg"} alt="" width={300} height={300} />
                        <Flex col className="">
                              <Heading4 className="font-semibold text-5xl">{label}</Heading4>
                              <Muted className="text-xl mt-2">{subLabel} </Muted>
                             {btnLabel &&  <Button onClick={handleListProduct} className="w-[60%] tracking-[0.5%] mt-4 space-x-3" >
                                    <PlusIcon />
                                    <span>{btnLabel}</span>
                              </Button>}
                        </Flex>
                  </div>
            </div>
      )
}