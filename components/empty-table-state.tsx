import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Icons } from "@/components/icons";
import { FileSearch } from "lucide-react";

interface IEmptyState {
  label?: string;
}
export default function EmptyState({ label }: IEmptyState) {
  const [isFetching, setIsFetching] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsFetching(true);

    setTimeout(() => {
      setIsFetching(false);
    }, 15000);
  }, [router.refresh]);

  return isFetching ? (
    <div className="w-full grid place-content-center">
      <div>
        <Icons.spinner fill="white" className="dark:block hidden" />
        <Icons.spinner fill="black" className="dark:hidden block" />
      </div>
    </div>
  ) : (
    <div>
      <div className="flex flex-col justify-center items-center p-10 h-[70vh]">
        <div>
          <FileSearch size={56} />
        </div>

        <div className="max-w-sm text-center mt-4">
          <span className="text-sm">
            {label || "No result found or check your connectivity."}
          </span>
        </div>
      </div>
    </div>
  );
}
