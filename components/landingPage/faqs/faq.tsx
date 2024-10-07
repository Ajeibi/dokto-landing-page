import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQAccordion() {
    return (
        <div className="md:my-20 my-10 md:mx-20 mx-5">
            <h2 className="font-sans mb-10 font-medium text-3xl text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-left text-base font-sans mb-5 font-normal">How do I know if I need treatment for hypertension?</AccordionTrigger>
                    <AccordionContent className="text-sm font-normal text-gray-500 mx-5">
                        If you’ve been feeling dizzy, have frequent headaches, or notice changes in your heartbeat, it’s a good idea to get checked out. Our doctors can assess your blood pressure and create a plan to help you stay in control.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="text-left text-base font-sans mb-5 font-normal">
                        Can I get treatment for hypertension without leaving home?
                    </AccordionTrigger>
                    <AccordionContent className="text-sm font-normal text-gray-500 mx-5">
                        Absolutely. We offer telehealth consultations so you can talk to your doctor from the comfort of your home and get your treatment plan started right away.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="text-left text-base font-sans mb-5 font-normal">
                        Is weight loss program only for people who want to lose a lot of weight?
                    </AccordionTrigger>
                    <AccordionContent className="text-sm font-normal text-gray-500 mx-5">
                        If you’ve been feeling dizzy, have frequent headaches, or notice changes in your heartbeat, it’s a good idea to get checked out. Our doctors can assess your blood pressure and create a plan to help you stay in control.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger className="text-left text-base font-sans mb-5 font-normal">
                        What should I expect during my first mental health therapy session?
                    </AccordionTrigger>
                    <AccordionContent className="text-sm font-normal text-gray-500 mx-5">
                        If you’ve been feeling dizzy, have frequent headaches, or notice changes in your heartbeat, it’s a good idea to get checked out. Our doctors can assess your blood pressure and create a plan to help you stay in control.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger className="text-left text-base font-sans mb-5 font-normal">
                        What lifestyle changes can help manage diabetes?
                    </AccordionTrigger>
                    <AccordionContent className="text-sm font-normal text-gray-500 mx-5">
                        If you’ve been feeling dizzy, have frequent headaches, or notice changes in your heartbeat, it’s a good idea to get checked out. Our doctors can assess your blood pressure and create a plan to help you stay in control.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                    <AccordionTrigger className="text-left text-base font-sans mb-5 font-normal">
                        Why is blood pressure monitoring important?
                    </AccordionTrigger>
                    <AccordionContent className="text-sm font-normal text-gray-500 mx-5">
                        If you’ve been feeling dizzy, have frequent headaches, or notice changes in your heartbeat, it’s a good idea to get checked out. Our doctors can assess your blood pressure and create a plan to help you stay in control.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-7">
                    <AccordionTrigger className="text-left text-base font-sans mb-5 font-normal">
                        Can I talk to a therapist online?
                    </AccordionTrigger>
                    <AccordionContent className="text-sm font-normal text-gray-500 mx-5">
                        If you’ve been feeling dizzy, have frequent headaches, or notice changes in your heartbeat, it’s a good idea to get checked out. Our doctors can assess your blood pressure and create a plan to help you stay in control.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-8">
                    <AccordionTrigger className="text-left text-base font-sans mb-5 font-normal">
                        What’s the best way to manage diabetes day-to-day?
                    </AccordionTrigger>
                    <AccordionContent className="text-sm font-normal text-gray-500 mx-5">
                        If you’ve been feeling dizzy, have frequent headaches, or notice changes in your heartbeat, it’s a good idea to get checked out. Our doctors can assess your blood pressure and create a plan to help you stay in control.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-9">
                    <AccordionTrigger className="text-left text-base font-sans mb-5 font-normal">
                        What are the first steps to managing mental health?
                    </AccordionTrigger>
                    <AccordionContent className="text-sm font-normal text-gray-500 mx-5">
                        If you’ve been feeling dizzy, have frequent headaches, or notice changes in your heartbeat, it’s a good idea to get checked out. Our doctors can assess your blood pressure and create a plan to help you stay in control.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-10">
                    <AccordionTrigger className="text-left text-base font-sans mb-5 font-normal">
                        How can I lower my blood pressure naturally?
                    </AccordionTrigger>
                    <AccordionContent className="text-sm font-normal text-gray-500 mx-5">
                        If you’ve been feeling dizzy, have frequent headaches, or notice changes in your heartbeat, it’s a good idea to get checked out. Our doctors can assess your blood pressure and create a plan to help you stay in control.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}