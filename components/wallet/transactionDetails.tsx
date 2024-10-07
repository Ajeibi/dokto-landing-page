import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMediaQuery } from '@/hooks/use-media-query';
import { XIcon } from 'lucide-react';
import TableComponent from './table';

interface TransactionDetailsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    withdrawDetails: { amount: number; secretAnswer: string; password: string } | null;
    bankDetails: Record<string, string>;
}

export default function TransactionDetailsModal({
    open,
    onOpenChange,
    withdrawDetails,
    bankDetails,
}: TransactionDetailsModalProps) {
    const isDesktop = useMediaQuery('(min-width: 768px)');

    const data = [
        { label: 'Amount to withdraw', value: `$${withdrawDetails?.amount || 0}` },
        { label: 'Account Name', value: bankDetails.accountName },
        { label: 'Bank Code [SWIFT/BIC]', value: bankDetails.bankCode },
        { label: 'Routing Number', value: bankDetails.routingNumber },
        { label: 'Account Number', value: bankDetails.accountNumber },
        { label: 'Receiving Bank Name', value: bankDetails.receivingBankName },
    ];

    const transactionContent = (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Transaction Details</h2>
            <TableComponent data={data} />
            <div className="flex flex-row items-end gap-3 justify-end">
                <Button type="button" variant="tertiary" onClick={() => onOpenChange(false)}>
                    Cancel
                </Button>
                <Button type="button">Withdraw</Button>
            </div>
        </div>
    );

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Withdraw Funds</DialogTitle>
                    </DialogHeader>
                    <ScrollArea>{transactionContent}</ScrollArea>
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
                    <div className="px-3">{transactionContent}</div>
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    );
}
