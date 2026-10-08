import { CarFront, House, BriefcaseBusiness, HeartHandshake, KeyRound, Truck, Umbrella, ShieldCheck, Phone, MapPin, Check, Mail, Menu, X, ChevronDown, CircleHelp, FileText, Headphones, CheckCheck } from "lucide-react";

const icons = { car: CarFront, home: House, business: BriefcaseBusiness, heart: HeartHandshake, key: KeyRound, truck: Truck, umbrella: Umbrella, shield: ShieldCheck, phone: Phone, pin: MapPin, check: Check, mail: Mail, menu: Menu, close: X, chevron: ChevronDown, help: CircleHelp, document: FileText, support: Headphones, compare: CheckCheck };

export function Icon({ name, size = 24, className = "" }: { name: string; size?: number; className?: string }) {
  const Component = icons[name as keyof typeof icons] || ShieldCheck;
  return <Component size={size} strokeWidth={1.6} className={className} aria-hidden="true" />;
}
