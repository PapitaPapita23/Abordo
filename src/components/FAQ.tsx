import { FAQ as FAQType } from '@/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';

const faqs: FAQType[] = [
  {
    id: '1',
    question: 'What is included in the yacht charter price?',
    answer: 'Our charter prices typically include the yacht rental, professional crew, insurance, and standard amenities. Additional costs may include fuel, provisions, dockage, taxes, gratuities, and special requests. We provide a detailed breakdown of inclusions in your personalized quote.'
  },
  {
    id: '2',
    question: 'How far in advance should I book a yacht charter?',
    answer: 'For peak season (summer months and holidays), we recommend booking 6-12 months in advance to secure your preferred yacht and dates. For off-peak periods, 3-6 months ahead is generally sufficient, though last-minute bookings can sometimes be accommodated.'
  },
  {
    id: '3',
    question: 'Can I customize the itinerary for my yacht charter?',
    answer: 'Absolutely! Customization is a key benefit of private yacht charters. Your captain will work with you to design an itinerary based on your preferences, while considering weather conditions, sailing distances, and recommended highlights for your chosen cruising area.'
  },
  {
    id: '4',
    question: 'What is the cancellation policy?',
    answer: 'Cancellation policies vary depending on the yacht and booking time. Generally, cancellations made more than 90 days prior receive a partial refund (minus deposit). Cancellations within 90 days may be non-refundable. We offer trip insurance options to protect your investment.'
  },
  {
    id: '5',
    question: 'Do I need sailing experience to charter a yacht?',
    answer: 'No experience is necessary for crewed charters, as our professional captains and crew handle all aspects of navigation and yacht operation. For bareboat charters (without crew), at least one person must demonstrate sailing competency and relevant experience.'
  },
  {
    id: '6',
    question: 'What crew members will be on board during my charter?',
    answer: 'Crew configurations vary by yacht size. Smaller yachts may have a captain and chef/stewardess, while larger vessels can include additional stewards/stewardesses, deckhands, engineers, and dedicated chefs. All crew members are professionally trained and certified.'
  },
  {
    id: '7',
    question: 'Can I specify dietary preferences or restrictions?',
    answer: "Yes, we accommodate all dietary requirements. Prior to your charter, you'll complete a preference sheet detailing any allergies, restrictions, and food/beverage preferences. Our chefs will tailor all meals and provisions accordingly."
  },
  {
    id: '8',
    question: 'What happens in case of bad weather?',
    answer: 'Your captain continuously monitors weather conditions and will adapt the itinerary as necessary for safety and comfort. If severe weather is forecasted, we may recommend rescheduling or adjusting your charter. Most charter agreements include provisions for weather-related contingencies.'
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block text-sm font-medium text-blue-600">Frequently Asked Questions</span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mt-2 mb-4">
            Common Questions About Our Yacht Charters
          </h2>
          <p className="text-gray-600">
            Find answers to common questions about our luxury yacht charter services.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-subtle border border-gray-100 overflow-hidden">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-b border-gray-100 last:border-0">
                <AccordionTrigger className="px-6 py-4 hover:no-underline text-navy-dark hover:text-blue-600 transition-colors duration-300 text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Have more questions? We're here to help you plan your perfect charter experience.</p>
          <Button size="lg" className="bg-navy-dark hover:bg-navy-light text-white">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
