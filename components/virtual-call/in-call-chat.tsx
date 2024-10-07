"use client";

import { Button } from "@/components/ui/button";
import Heading3 from "@/components/ui/typography/heading3";
import { Icons } from "@/components/icons";
import Paragraph from "@/components/ui/typography/paragraph";
import { useState } from "react";
import { PrescriptionForm } from "../dashboard/prescriptions/prescription-form";

interface Props {
  closeFn: () => void;
  name: string;
  currentMessages: string[];
  storeMessage: (message: string) => void;
  showPrescription?: boolean;
}

export function InCallChat({
  closeFn,
  name,
  currentMessages,
  storeMessage,
  showPrescription = false,
}: Props) {
  const [messages, setMessages] = useState<string[]>(currentMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, newMessage]);
      setNewMessage("");
      storeMessage(newMessage);
    }

    console.log(messages);
  };

  return (
    <div className="bg-white px-6 py-4 rounded-xl w-full lg:w-[380px] flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <Heading3 className="text-lg font-medium">In-call Chat</Heading3>
        <Button onClick={closeFn} variant={"ghost"} className="p-0">
          <Icons.closeIcon />
        </Button>
      </div>

      <div className="flex-grow overflow-y-auto mb-3">
        {messages.length === 0 ? (
          <div className="px-2 py-4 rounded-2xl bg-[#F9F6FD]">
            <Paragraph className="text-sm text-[#4F5E71CC]">
              Messages can only be seen by the participants of the call. All
              messages are automatically deleted once the call ends.
            </Paragraph>
          </div>
        ) : showPrescription ? (
          <PrescriptionForm />
        ) : (
          messages.map((msg) => (
            <div key={msg} className="text-white mb-1">
              <Paragraph className="text-sm font-semibold">{name}</Paragraph>
              <Paragraph className="text-sm">{msg}</Paragraph>
            </div>
          ))
        )}
      </div>

      <div className="flex items-center relative">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here"
          className="flex-grow px-3 py-2 rounded-[40px] border placeholder:font-normal placeholder:text-sm"
        />
        <Button
          onClick={handleSendMessage}
          variant={"ghost"}
          className="absolute right-4 p-0"
        >
          <Icons.sendIcon />
        </Button>
      </div>
    </div>
  );
}
