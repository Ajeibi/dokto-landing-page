import { z } from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '@/components/ui/accordion';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { XIcon } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import FormFieldComponent from './form';
import TableComponent from './table';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const bankSetupSchema = z.object({
    accountName: z.string({
        required_error: 'Account Name is required',
        message: 'Please enter a valid account name',
    }),
    bankCode: z.string({
        required_error: 'Bank Code is required',
        message: 'Please enter a valid bank code.',
    }),
    routingNumber: z.string({
        required_error: 'Routing Number is required',
        message: 'Please enter a valid routing number',
    }),
    accountNumber: z.string({
        required_error: 'Account Number is required',
        message: 'Please enter a valid account number',
    }),
    receivingBankName: z.string({
        required_error: 'Receiving Bank Name is required',
        message: 'Please enter a valid bank name',
    }),
    twoFactorQuestion: z.string({
        required_error: '2FA Question is required',
        message: 'Please select an option',
    }),
    twoFactorAnswer: z.string({
        required_error: 'An answer is required',
        message: 'Please enter an answer to the 2FA Question'
    }),
});

type BankSetupFormValues = z.infer<typeof bankSetupSchema>;

export default function BankSetupModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
    const methods = useForm<BankSetupFormValues>({
        resolver: zodResolver(bankSetupSchema),
        defaultValues: {
            accountName: '',
            bankCode: '',
            routingNumber: '',
            accountNumber: '',
            receivingBankName: '',
            twoFactorQuestion: '',
            twoFactorAnswer: '',
        },
    });

    const [isAccountSetup, setIsAccountSetup] = useState<boolean>(false);
    const [savedAccountDetails, setSavedAccountDetails] = useState<BankSetupFormValues | null>(null);
    const isDesktop = useMediaQuery('(min-width: 768px)');

    const onSubmit = (data: BankSetupFormValues) => {
        console.log('Form submitted:', data);
        setSavedAccountDetails(data);
        setIsAccountSetup(true);
        onOpenChange(false);
    };

    useEffect(() => {
        const fetchAccountDetails = async () => {
            const accountDetails = await getSavedAccountDetails();
            if (accountDetails) {
                setSavedAccountDetails(accountDetails);
                setIsAccountSetup(true);
            }
        };
        fetchAccountDetails();
    }, []);

    const formContent = (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6 text-sm">
                <Accordion type="multiple" defaultValue={['bankDetails', '2faSetup']}>
                    <AccordionItem value="bankDetails">
                        <AccordionTrigger className='text-sm text-text mb-3'>Bank Details</AccordionTrigger>
                        <AccordionContent className='space-y-5'>
                            <FormFieldComponent fieldName="accountName" label="Account Name" placeholder="Account Name" />
                            <FormFieldComponent fieldName="routingNumber" label="Routing Number" placeholder="Routing Number" />
                            <FormFieldComponent fieldName="accountNumber" label="Account Number" placeholder="Account Number" />
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="2faSetup">
                        <AccordionTrigger className='text-sm text-text mb-3'>2FA Setup</AccordionTrigger>
                        <AccordionContent className='space-y-5'>
                            <FormFieldComponent
                                fieldName="twoFactorQuestion"
                                label="2FA Question"
                                isSelect={true}
                                options={[
                                    { value: 'city', label: 'What is your favorite city?' },
                                    { value: 'pet', label: "What is your pet's name?" },
                                ]}
                            />
                            <FormFieldComponent fieldName="twoFactorAnswer" label="Answer" placeholder="Answer" />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <div className="flex flex-row items-end gap-3 justify-end">
                    <Button type="submit" className="w-auto">
                        Save
                    </Button>
                </div>
            </form>
        </FormProvider>
    );

    const tableContent = savedAccountDetails && (
        <div>
            <Image
                src='./assets/accountDetails.svg'
                alt='account details'
                width={50}
                height={50}
                className='mb-5'
            />
            <TableComponent
                data={[
                    { label: 'Account Name', value: savedAccountDetails.accountName },
                    { label: 'Bank Code', value: savedAccountDetails.bankCode },
                    { label: 'Routing Number', value: savedAccountDetails.routingNumber },
                    { label: 'Account Number', value: savedAccountDetails.accountNumber },
                    { label: 'Receiving Bank Name', value: savedAccountDetails.receivingBankName },
                ]}
            />
            <div className="flex flex-row gap-3 mt-4">
                <Button className="w-auto">Manage 2FA</Button>
                <Button className="w-auto" onClick={() => setIsAccountSetup(false)}>Edit Information</Button>
            </div>
        </div>
    );

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-xl">
                    <DialogHeader>
                        <DialogTitle
                            className="text-left text-text"
                        >
                            My Bank Setup
                        </DialogTitle>
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
                    <div className='px-3'>
                        {formContent}
                    </div>
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    );
}

async function getSavedAccountDetails() {
    return null;
}
