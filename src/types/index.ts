
export interface Yacht {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  capacity: number;
  cabins: number;
  length: number;
  pricePerDay: number;
}

export interface PremiumFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface BookingStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Destination {
  id: string;
  name: string;
  url: string;
}
