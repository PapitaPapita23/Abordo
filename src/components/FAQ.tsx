
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
    question: '¿Qué está incluido en el precio del chárter de yate?',
    answer: 'Nuestros precios de chárter típicamente incluyen el alquiler del yate, tripulación profesional, seguro y comodidades estándar. Los costos adicionales pueden incluir combustible, provisiones, tarifas de atraque, impuestos, propinas y solicitudes especiales. Proporcionamos un desglose detallado de las inclusiones en tu cotización personalizada.'
  },
  {
    id: '2',
    question: '¿Con cuánta antelación debo reservar un chárter de yate?',
    answer: 'Para temporada alta (meses de verano y días festivos), recomendamos reservar con 6-12 meses de antelación para asegurar tu yate y fechas preferidas. Para períodos fuera de temporada, con 3-6 meses de antelación es generalmente suficiente, aunque a veces se pueden acomodar reservas de último minuto.'
  },
  {
    id: '3',
    question: '¿Puedo personalizar el itinerario para mi chárter de yate?',
    answer: '¡Absolutamente! La personalización es un beneficio clave de los chárters privados de yates. Tu capitán trabajará contigo para diseñar un itinerario basado en tus preferencias, considerando las condiciones climáticas, distancias de navegación y puntos destacados recomendados para tu área de navegación elegida.'
  },
  {
    id: '4',
    question: '¿Cuál es la política de cancelación?',
    answer: 'Las políticas de cancelación varían según el yate y el momento de la reserva. Generalmente, las cancelaciones realizadas con más de 90 días de antelación reciben un reembolso parcial (menos el depósito). Las cancelaciones dentro de los 90 días pueden no ser reembolsables. Ofrecemos opciones de seguro de viaje para proteger tu inversión.'
  },
  {
    id: '5',
    question: '¿Necesito experiencia en navegación para alquilar un yate?',
    answer: 'No se necesita experiencia para los chárters con tripulación, ya que nuestros capitanes y tripulación profesionales manejan todos los aspectos de la navegación y operación del yate. Para chárters sin tripulación, al menos una persona debe demostrar competencia en navegación y experiencia relevante.'
  },
  {
    id: '6',
    question: '¿Qué miembros de la tripulación estarán a bordo durante mi chárter?',
    answer: 'Las configuraciones de la tripulación varían según el tamaño del yate. Los yates más pequeños pueden tener un capitán y un chef/azafata, mientras que los buques más grandes pueden incluir azafatas/azafatos adicionales, marineros, ingenieros y chefs dedicados. Todos los miembros de la tripulación están profesionalmente entrenados y certificados.'
  },
  {
    id: '7',
    question: '¿Puedo especificar preferencias o restricciones dietéticas?',
    answer: "Sí, nos adaptamos a todos los requisitos dietéticos. Antes de tu chárter, completarás una hoja de preferencias detallando alergias, restricciones y preferencias de comida/bebida. Nuestros chefs adaptarán todas las comidas y provisiones en consecuencia."
  },
  {
    id: '8',
    question: '¿Qué sucede en caso de mal tiempo?',
    answer: 'Tu capitán monitorea continuamente las condiciones climáticas y adaptará el itinerario según sea necesario para la seguridad y comodidad. Si se pronostica mal tiempo severo, podemos recomendar reprogramar o ajustar tu chárter. La mayoría de los acuerdos de chárter incluyen provisiones para contingencias relacionadas con el clima.'
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block text-sm font-medium text-blue-600">Preguntas Frecuentes</span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mt-2 mb-4">
            Preguntas Comunes Sobre Nuestros Chárters de Yates
          </h2>
          <p className="text-gray-600">
            Encuentra respuestas a preguntas comunes sobre nuestros servicios de chárter de yates de lujo.
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
          <p className="text-gray-600 mb-4">¿Tienes más preguntas? Estamos aquí para ayudarte a planificar tu experiencia perfecta de chárter.</p>
          <Button size="lg" className="bg-navy-dark hover:bg-navy-light text-white">
            Contáctanos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
