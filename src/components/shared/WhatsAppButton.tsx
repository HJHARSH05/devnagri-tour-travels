import { MessageCircle } from "lucide-react";

const phoneNumber = "919456193464";
const message =
  "Thanks for contacting Devnagri Tours and Travels. How may I help you?";

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Devnagri Tours and Travels on WhatsApp"
      title="Chat with us on WhatsApp"
      className="whatsapp-button"
    >
      <MessageCircle className="h-7 w-7" strokeWidth={2.25} aria-hidden="true" />
    </a>
  );
}