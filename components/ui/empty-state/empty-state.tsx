"use client";

import Heading1 from "../typography/heading1";
import Paragraph from "../typography/paragraph";
import { ComponentProps, ReactNode } from "react";

const Header = ({ children, ...props }: ComponentProps<typeof Heading1>) => (
  <Heading1 className="pt-8 text-xl font-semibold text-black" {...props}>
    {children}
  </Heading1>
);

const InnerParagraph = ({
  children,
  ...props
}: ComponentProps<typeof Paragraph>) => (
  <Paragraph className="pt-4 text-black-300 font-normal text-base" {...props}>
    {children}
  </Paragraph>
);

const Wrapper = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col items-center justify-center mt-16 mx-auto max-w-[586px]">
    {children}
  </div>
);

export { Header, InnerParagraph, Wrapper };
