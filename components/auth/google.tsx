import { API_ENDPOINTS } from "@/lib/api-endpoints";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

export default function GoogleSignIn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    setIsLoading(true);

    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.AUTH.GOOGLE}`;

      router.push(url);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      className="w-full rounded-md bg-[#fbf7ff] gap-2"
      variant={"ghost"}
      onClick={handleLogin}
      isLoading={isLoading}
      disabled={isLoading}
    >
      <span>
        <img className="w-[16px]" src="/images/google-logo.png" alt="" />
      </span>
      Continue with Google
    </Button>
  );
}
