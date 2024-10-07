import React from 'react';
import { z } from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from '@/components/ui/drawer';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { AlertTriangle, XIcon } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';

const withdrawFundsSchema = z.object({
    amount: z
        .coerce.number({
            required_error: 'Amount is required',
            invalid_type_error: 'Amount must be a number',
        })
        .positive('Amount must be a positive number'),

    secretAnswer: z.string({
        required_error: 'Answer to the secret question is required',
    }).min(1, 'Answer cannot be empty'),

    password: z.string({
        required_error: 'Password is required',
    }).min(8, 'Password must be at least 8 characters long'),
});

type WithdrawFundsFormValues = z.infer<typeof withdrawFundsSchema>;

export default function WithdrawFundsModal({
    open,
    onOpenChange,
    onTransactionOpen,
    setWithdrawDetails,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onTransactionOpen: (open: boolean) => void;
    setWithdrawDetails: (details: WithdrawFundsFormValues) => void;
}) {
    const methods = useForm<WithdrawFundsFormValues>({
        resolver: zodResolver(withdrawFundsSchema),
        defaultValues: {
            amount: 0,
            secretAnswer: '',
            password: '',
        },
    });

    const isDesktop = useMediaQuery('(min-width: 768px)');

    //hardcoded for now.
    const walletBalance = 2137.67;
    const isBankSetup = false;

    const onSubmit = (data: WithdrawFundsFormValues) => {
        console.log('Withdraw funds:', data);
        setWithdrawDetails(data);
        onOpenChange(false);
        onTransactionOpen(true);
    };

    const formContent = (
        <FormProvider {...methods}>
            <p className="text-text text-sm font-semibold">
                Current balance in your wallet is: ${walletBalance.toFixed(2)}
            </p>

            {!isBankSetup && (
                <div className="bg-gray-100 p-4 my-4 rounded-lg flex flex-col items-start space-y-2 text-text text-sm">
                    <AlertTriangle className="text-red-500" size={24} />
                    <p>Complete Bank Setup</p>
                    <p className="text-xs">
                        Click here to set up your bank account and enable 2FA. This is to ensure your funds are sent to the correct account when you make a withdrawal.
                    </p>
                </div>
            )}

            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6 text-sm">
                <FormField
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Amount to withdraw: (min $10)</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="min $10"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="secretAnswer"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Security question: What is your favorite color?</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter Answer" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Enter your Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Your Password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-row items-end gap-3 justify-end">
                    <Button type="button" variant="tertiary" className="w-auto" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button type="submit" className="w-auto" disabled={!isBankSetup}>
                        Proceed
                    </Button>
                </div>
            </form>
        </FormProvider>
    );

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Withdraw Funds</DialogTitle>
                    </DialogHeader>
                    <ScrollArea>{formContent}</ScrollArea>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent className="h-[calc(100%-73px)] mx-2">
                <ScrollArea>
                    <DrawerHeader className="relative mb-6">
                        <DrawerTitle>Withdraw Funds</DrawerTitle>
                        <div
                            className="absolute top-3 right-4 ring-1 ring-text rounded-md w-5 h-5 grid place-items-center p-0.5"
                            onClick={() => onOpenChange(false)}
                        >
                            <XIcon className="w-3 h-3" />
                        </div>
                    </DrawerHeader>
                    <div className="px-3">{formContent}</div>
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    );
}