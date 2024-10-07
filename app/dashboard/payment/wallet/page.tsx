'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Eye, EyeOff, RefreshCw } from 'lucide-react';
import { formatAmountWithCurrency } from '@/lib/utils';
import AnimatedCounter from '@/components/dashboard/subscriptions/AnimatedCounter';
import Tabs from "@/components/ui/nav-tab";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import { EmptyWalletState } from '@/components/ui/empty-state/empty-states';
import { Button } from '@/components/ui/button';
import BankSetupModal from '@/components/wallet/accountSetup';
import WithdrawFundsModal from '@/components/wallet/withdrawFunds';
import TransactionDetailsModal from '@/components/wallet/transactionDetails';
import { useFetchWallet } from '@/api/dashboard/wallet/get-wallet';
import { useCreateWallet } from '@/api/dashboard/wallet/create-wallet';
import Loading from '@/components/loading';
import { useRouter, useSearchParams } from 'next/navigation';
import { parseTabs } from '@/lib/utils';
import { wallet_tabs } from '@/constants/wallet';
import { DataTable } from '@/components/ui/data-table';
import { wallet_columns } from '@/components/columns/wallet-columns';

const wallet_nav_tabs = [
    {
        name: "All Transactions",
        href: "all"
    },
    {
        name: "Completed Transactions",
        href: "completed"
    },
    {
        name: "Pending Transactions",
        href: "pending"

    },
    {
        name: "Failed Transactions",
        href: "failed"

    },
];

const WalletPage = () => {
    const [showBalance, setShowBalance] = useState(true);
    const [isBankModalOpen, setIsBankModalOpen] = useState(false);
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const [isTransactionModalOpen, setTransactionModalOpen] = useState(false);
    const [withdrawDetails, setWithdrawDetails] = useState<
        { amount: number; secretAnswer: string; password: string } | null
    >(null);
    const [bankDetails, setBankDetails] = useState<Record<string, string>>({});

    const { data: walletData, isLoading: isWalletLoading, error: walletError, refetch: refetchWallet } = useFetchWallet();
    const { mutate: createWallet, status } = useCreateWallet();
    const isCreatingWallet = status === 'pending';

    const router = useRouter();
    const searchParams = useSearchParams();
    const query = Object.fromEntries(searchParams.entries());
    const currentTab = parseTabs(wallet_tabs, query['tab']);

    useEffect(() => {
        if (currentTab !== query['tab']) {
            router.push(`/dashboard/payment?tab=${currentTab}`);
        }
    }, [currentTab, query, router]);

    useEffect(() => {
        if (!isWalletLoading) {
            if (!walletData?.data && !walletError) {
                createWallet(undefined, {
                    onSuccess: () => {
                        refetchWallet();
                    },
                });
            }
        }
    }, [isWalletLoading, walletData, walletError, createWallet, refetchWallet]);

    if (isWalletLoading || isCreatingWallet) {
        return <Loading />;
    }

    if (walletError) {
        return <div>omooo</div>;
    }

    const amount = walletData?.data?.balance || 0;
    const formattedAmount = formatAmountWithCurrency(amount, 'USD');

    return (
        <>
            <section className="mb-5">
                <div className="relative w-full h-auto mx-auto flex justify-center items-center overflow-hidden">
                    <Image
                        src="/assets/walletBG.svg"
                        alt="Wallet Background"
                        fill
                        objectFit="cover"
                        className="rounded-md"
                    />
                    <div className="relative z-10 text-center text-black py-10">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <span className="text-base font-normal">Available balance</span>
                            <Button className='bg-transparent border-none hover:border-none hover:bg-transparent text-blue-1 p-0 shadow-none' onClick={() => setShowBalance(!showBalance)}>
                                {showBalance ? <Eye size={15} /> : <EyeOff size={15} />}
                            </Button>
                        </div>

                        <div className="text-2xl font-normal mt-2">
                            {showBalance ? <AnimatedCounter amount={amount} /> : '******'}
                        </div>
                        <div className="text-sm flex items-center justify-center space-x-2 mt-3 text-[#4F5E71]">
                            <span>Last updated 3 mins ago</span>
                            <Button className="border border-gray-500 bg-transparent hover:bg-transparent rounded-md p-1 text-[#4F5E71]">
                                <RefreshCw size={15} />
                            </Button>
                        </div>

                        <div className="flex flex-row gap-3 sm:flex-col md:flex-row mt-5">
                            <Button
                                className="text-primary border border-primary bg-transparent hover:bg-transparent"
                                onClick={() => setIsBankModalOpen(true)}
                            >
                                My Bank Setup
                            </Button>
                            <Button onClick={() => setIsWithdrawModalOpen(true)}>
                                Withdraw Funds
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 md:space-y-6">
                    <ScrollArea>
                        <Tabs tabs={wallet_nav_tabs} />
                        <Scrollbar orientation="horizontal" className="pt-1" />
                    </ScrollArea>

                    <DataTable
                        data={walletData?.data?.transactions || []}
                        columns={wallet_columns}
                        emptyState={<EmptyWalletState />}
                        show_headings={true}
                        show_pagination={false}
                        showSearch={false}
                        show_toolbar={false}
                        className="bg-white/95"
                    />
                </div>
            </section>
            <BankSetupModal
                open={isBankModalOpen}
                onOpenChange={setIsBankModalOpen}
            />

            <WithdrawFundsModal
                open={isWithdrawModalOpen}
                onOpenChange={setIsWithdrawModalOpen}
                onTransactionOpen={setTransactionModalOpen}
                setWithdrawDetails={setWithdrawDetails}
            />

            <TransactionDetailsModal
                open={isTransactionModalOpen}
                onOpenChange={setTransactionModalOpen}
                withdrawDetails={withdrawDetails}
                bankDetails={bankDetails}
            />
        </>
    );
};

export default WalletPage;