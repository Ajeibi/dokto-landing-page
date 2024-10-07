"use client";

import { Icons } from "@/components/icons";
import * as EmptyState from "./empty-state";

export const EmptyFilterState = () => (
  <EmptyState.Wrapper>
    <Icons.documentFilter />
    <EmptyState.Header>We couldn&apos;t find any match.</EmptyState.Header>
    <EmptyState.InnerParagraph>
      Try changing or removing filters.
    </EmptyState.InnerParagraph>
  </EmptyState.Wrapper>
);

export const EmptyAppointmentState = ({
  appointment,
}: {
  appointment: string;
}) => (
  <EmptyState.Wrapper>
    <Icons.emptyAppointments />

    <EmptyState.InnerParagraph>
      Oops! looks like you don’t have any{" "}
      <span className="capitalize">{appointment}</span> appointment. Do you care
      to change that? Let’s help you book an appointment
    </EmptyState.InnerParagraph>
  </EmptyState.Wrapper>
);

export const EmptyPractitionersAppointmentState = () => (
  <EmptyState.Wrapper>
    <Icons.doctorEmptyState />

    <EmptyState.InnerParagraph>
      Oops! No data available at the moment. Please check back later.
    </EmptyState.InnerParagraph>
  </EmptyState.Wrapper>
);

export const EmptyPrescriptionState = () => (
  <EmptyState.Wrapper>
    <Icons.emptyAppointments />
    <EmptyState.InnerParagraph>
      Oops! looks like you don’t have an already prescribed drugs on this list.
      Care to change that? Let’s enter a prescription for you.
    </EmptyState.InnerParagraph>
  </EmptyState.Wrapper>
);

export const EmptyPrescriptionDoctorState = () => (
  <EmptyState.Wrapper>
    <Icons.doctorEmptyState />
    <EmptyState.InnerParagraph>
      Oops! There is no prescription waiting for request at the moment. check
      back later.
    </EmptyState.InnerParagraph>
  </EmptyState.Wrapper>
);

export const EmptySubscriptionState = () => (
  <EmptyState.Wrapper>
    <Icons.emptyAppointments />
    <EmptyState.InnerParagraph>
      Oops! looks like you don’t have any subscriptions yet.
    </EmptyState.InnerParagraph>
  </EmptyState.Wrapper>
);

export const EmptyWalletState = () => (
  <EmptyState.Wrapper>
    <Icons.emptyAppointments />
    <EmptyState.InnerParagraph>
      Oops! There are no transactions yet.
    </EmptyState.InnerParagraph>
  </EmptyState.Wrapper>
);
