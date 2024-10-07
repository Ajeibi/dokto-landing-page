import { useChangePassword } from "@/api/auth/change-password";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, PasswordInput } from "@/components/ui/input";
import { DialogProps } from "@/lib/generic-types";
import { passwordRegex } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    currentPassword: z
      .string({ required_error: "Please enter password" })
      .min(8, {
        message: "Password should be at least 8 characters",
      })
      .regex(passwordRegex, {
        message:
          "Password should contain at least (one uppercase, one lowercase, one number, one special character)",
      }),
    newPassword: z
      .string({ required_error: "Please enter password" })
      .min(8, {
        message: "Password should be at least 8 characters",
      })
      .regex(passwordRegex, {
        message:
          "Password should contain at least (one uppercase, one lowercase, one number, one special character)",
      }),
    confirmPassword: z
      .string({ required_error: "Please enter password" })
      .min(8, {
        message: "Password should be at least 8 characters",
      })
      .regex(passwordRegex, {
        message:
          "Password should contain at least (one uppercase, one lowercase, one number, one special character)",
      }),
  })
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "Passwords do not match",
      });
    }
  });

export type ChangePasswordType = z.infer<typeof formSchema>;

export default function ChangePasswordModal({
  onOpenChange,
  open,
}: DialogProps) {
  const { mutateAsync: changePassword, isPending } = useChangePassword();

  const form = useForm<ChangePasswordType>({
    resolver: zodResolver(formSchema),
  });

  function handleChangePassword(data: ChangePasswordType) {
    console.log(data);

    const payload = {
      password: data.currentPassword,
      newPassword: data.newPassword,
    };

    changePassword(payload).then(() => {
      onOpenChange(false);
    });

  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="border-b border-dashed border-primary mb-4 pb-2 text-center">
            Change Password
          </DialogTitle>
          <DialogDescription>
            Your new password must be different from your previous password.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            className="space-y-3"
            onSubmit={form.handleSubmit(handleChangePassword)}
          >
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs lg:text-sm font-medium text-text-sec">
                    Current Password
                  </FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs lg:text-sm font-medium text-text-sec">
                    New Password
                  </FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs lg:text-sm font-medium text-text-sec">
                    Re-enter New Password
                  </FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-5 md:pt-3">
              <Button className="w-full" type="submit" isLoading={isPending}>
                Change Password
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
