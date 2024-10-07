"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Paragraph from "@/components/ui/typography/paragraph";
import { Rating } from "@/components/rating";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
}

export const AppointmentRatingsModal = ({ isOpen, setIsOpen, name }: Props) => {
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [review, setReview] = useState<string | undefined>(undefined);

  const router = useRouter();

  const handleRating = (ratingValue: number) => {
    setRating(ratingValue);
  };

  const handleCancelClick = () => {
    setIsOpen(false);
    router.push("/dashboard/appointment");
  };

  const handleSubmitReview = () => {
    //todo connect endpoint
    console.log(review);
    console.log(rating);
    router.push("/dashboard/appointment");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[600px] p-6 pb-8">
        <DialogHeader>
          <DialogTitle className="font-medium text-base text-[#232324]">
            Rating and Feedback
          </DialogTitle>
        </DialogHeader>

        <div className="text-left mt-5">
          <div className="mb-5">
            <Paragraph className="font-medium text-sm text-[#4F5E71] mb-4">
              Tap to Rate {name}
            </Paragraph>
            <Rating onRate={handleRating} />
          </div>

          <Label
            htmlFor="feedback"
            className="font-medium text-sm text-[#4F5E71] mb-3"
          >
            Feedback
          </Label>

          <Textarea
            id="feedback"
            placeholder="Input your feedback here"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="border-[#CCCCCC4D] placeholder:text-[#4F5E71B2] placeholder:text-xs"
          />

          <div className="mt-9 w-full flex gap-4">
            <Button
              variant={"outline"}
              className="w-1/2 rounded-full"
              onClick={handleCancelClick}
            >
              Cancel
            </Button>

            <Button
              className="w-1/2 rounded-full bg-[#2CACDA] hover:bg-[#26a3d1]"
              onClick={handleSubmitReview}
              disabled={!rating || !review}
            >
              Send Review
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
