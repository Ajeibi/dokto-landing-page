"use client";

import { useUpdateRole } from "@/api/auth/update-role";
import { useWhoAmI } from "@/api/auth/whoami";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

// https://dokto.health/auth/google?token=token&newUser=false

export default function GoogleAuthRedirectPage({
  searchParams,
}: {
  searchParams: Record<"token" | "newUser", string>;
}) {
  const router = useRouter();
  const { fetchWhoAmI } = useWhoAmI();
  const { mutateAsync: updateRole, isPending } = useUpdateRole();

  const [showRoleSelection, setShowRoleSelection] = React.useState(false);
  const [userType, setUserType] = React.useState<"patient" | "doctor">(
    "patient"
  );

  if (
    !searchParams.token ||
    searchParams.token === "" ||
    searchParams.token === undefined ||
    searchParams.token.length < 10 ||
    searchParams.token === null
  ) {
    router.replace("/auth/login");
  }

  useEffect(() => {
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 2);

    const parseNewUser = searchParams.newUser === "true" ? true : false;

    if (parseNewUser) {
      console.log("new user");
      setShowRoleSelection(true);
    } else {
      console.log("old user");

      Cookies.set("dokto-token", searchParams.token, {
        secure: true,
        sameSite: "Strict",
        expires: expirationDate,
      });

      fetchWhoAmI && fetchWhoAmI();
      router.replace("/dashboard/overview");
    }
  }, []);

  function handleUpdateUserRole() {
    updateRole({
      token: searchParams.token,
    }).then(() => {
      fetchWhoAmI && fetchWhoAmI();
      console.log("role updated");
    });

    router.replace("/dashboard/overview");
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      {showRoleSelection ? (
        <Dialog open={showRoleSelection} onOpenChange={setShowRoleSelection}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Google Login</DialogTitle>
              <DialogDescription>
                Select what you want to use the platform as before proceeding.
              </DialogDescription>
            </DialogHeader>

            <>
              <RadioGroup
                value={userType}
                onValueChange={(val: "patient" | "doctor") => setUserType(val)}
                className="grid gap-4 py-4"
              >
                <div className="flex items-center space-x-2 tracking-wider">
                  <RadioGroupItem value="patient" id="patient" />
                  <Label htmlFor="patient">Patient</Label>
                </div>
                <div className="flex items-center space-x-2 tracking-wider">
                  <RadioGroupItem value="doctor" id="doctor" />
                  <Label htmlFor="doctor">Practitioner</Label>
                </div>
              </RadioGroup>
            </>
            <DialogFooter>
              <Button
                className="w-full rounded-md gap-2"
                variant={"outline"}
                onClick={handleUpdateUserRole}
                isLoading={isPending}
                disabled={isPending}
              >
                <span>
                  <img
                    className="w-[16px]"
                    src="/images/google-logo.png"
                    alt=""
                  />
                </span>
                Continue with Google
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Loading />
      )}
    </div>
  );
}
