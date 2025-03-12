
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import YachtCard from "@/components/YachtCard";
import { Search, SlidersHorizontal, Star, Ship, WifiIcon, ChefHat, BedDouble } from "lucide-react";
import { Yacht } from "@/types";
import Navbar from "@/components/Navbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Using the same data from FeaturedYachts
const allYachts: Yacht[] = [
  {
    id: "1",
    name: "Serenity Sail",
    category: "Velero",
    image:
      "https://images.unsplash.com/photo-1599772335946-23f8573a49c3?q=80&w=1000",
    rating: 4.8,
    reviews: 12,
    capacity: 6,
    cabins: 3,
    length: 42,
    pricePerDay: 1250,
  },
  {
    id: "2",
    name: "Ocean Explorer",
    category: "Catamarán",
    image:
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1000",
    rating: 4.9,
    reviews: 31,
    capacity: 8,
    cabins: 4,
    length: 50,
    pricePerDay: 1800,
  },
  {
    id: "3",
    name: "Velocity",
    category: "Speedboat",
    image:
      "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?q=80&w=1000",
    rating: 4.7,
    reviews: 25,
    capacity: 10,
    cabins: 5,
    length: 62,
    pricePerDay: 2300,
  },
  {
    id: "4",
    name: "Luxury Wave",
    category: "Yate",
    image:
      "https://images.unsplash.com/photo-1621406775527-76ace47159ce?q=80&w=1000",
    rating: 4.9,
    reviews: 19,
    capacity: 12,
    cabins: 6,
    length: 78,
    pricePerDay: 4500,
  },
  {
  id: "5",
    name: "Dream Voyager",
    category: "Velero",
    image:
      "https://images.unsplash.com/photo-1558473079-8ecf6b06e4cf?q=80&w=1000",
    rating: 4.6,
    reviews: 15,
    capacity: 4,
    cabins: 2,
    length: 36,
    pricePerDay: 950,
  },
  {
    id: "6",
    name: "Sunset Cruise",
    category: "Catamarán",
    image:
      "https://images.unsplash.com/photo-1552070074-62b8b349bf2a?q=80&w=1000",
    rating: 4.8,
    reviews: 22,
    capacity: 10,
    cabins: 5,
    length: 55,
    pricePerDay: 2200,
  },
  {
    id: "7",
    name: "Speed Racer",
    category: "Speedboat",
    image:
      "https://images.unsplash.com/photo-1548096237-d67b3ffbce9f?q=80&w=1000",
    rating: 4.5,
    reviews: 40,
    capacity: 8,
    cabins: 3,
    length: 45,
    pricePerDay: 1500,
  },
  {
    id: "8",
    name: "Royal Odyssey",
    category: "Yate",
    image:
      "https://images.unsplash.com/photo-1611862724040-08d37d530682?q=80&w=1000",
    rating: 5.0,
    reviews: 50,
    capacity: 20,
    cabins: 10,
    length: 100,
    pricePerDay: 7500,
  },
];

const AllYachts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 8000]);
  const [minRating, setMinRating] = useState(0);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [cabinsFilter, setCabinsFilter] = useState("all");

  // Get unique categories
  const categories = Array.from(
    new Set(allYachts.map((yacht) => yacht.category))
  );

  // Equipment options
  const equipmentOptions = [
    { id: "fishing", label: "Fishing Gear" },
    { id: "snorkeling", label: "Snorkeling Gear" },
    { id: "jetski", label: "Jet Ski" },
    { id: "paddleboard", label: "Paddleboard" },
  ];

  // Amenities options
  const amenitiesOptions = [
    { id: "wifi", label: "Wi-Fi", icon: <WifiIcon className="h-4 w-4" /> },
    { id: "chef", label: "On-board Chef", icon: <ChefHat className="h-4 w-4" /> },
    { id: "aircon", label: "Air Conditioning", icon: null },
    { id: "jacuzzi", label: "Jacuzzi", icon: null },
  ];

  // Cabins filter options
  const cabinsOptions = [
    { value: "all", label: "All Cabins" },
    { value: "1-2", label: "1-2 Cabins" },
    { value: "3-4", label: "3-4 Cabins" },
    { value: "5+", label: "5+ Cabins" },
  ];

  // Toggle equipment selection
  const toggleEquipment = (equipmentId: string) => {
    setSelectedEquipment(prev =>
      prev.includes(equipmentId)
        ? prev.filter(id => id !== equipmentId)
        : [...prev, equipmentId]
    );
  };

  // Toggle amenities selection
  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenityId)
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  // Helper to check if cabin count matches the filter
  const matchesCabinsFilter = (cabinCount: number) => {
    if (cabinsFilter === "all") return true;
    if (cabinsFilter === "1-2") return cabinCount >= 1 && cabinCount <= 2;
    if (cabinsFilter === "3-4") return cabinCount >= 3 && cabinCount <= 4;
    if (cabinsFilter === "5+") return cabinCount >= 5;
    return true;
  };

  // Filter yachts based on all criteria
  const filteredYachts = allYachts.filter((yacht) => {
    const matchesSearch = yacht.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || yacht.category === selectedCategory;
    const matchesPrice =
      yacht.pricePerDay >= priceRange[0] && yacht.pricePerDay <= priceRange[1];
    const matchesRating = yacht.rating >= minRating;
    const matchesCabins = matchesCabinsFilter(yacht.cabins);

    // For demo purposes, we'll assume certain yachts have certain equipment and amenities
    // In a real app, these would be properties of the yacht object
    const hasRequiredEquipment = selectedEquipment.length === 0 || 
      selectedEquipment.some(eq => parseInt(yacht.id) % (selectedEquipment.length + 1) === 0);
    const hasRequiredAmenities = selectedAmenities.length === 0 || 
      selectedAmenities.some(am => parseInt(yacht.id) % (selectedAmenities.length + 1) === 0);

    return matchesSearch && matchesCategory && matchesPrice && 
           matchesRating && hasRequiredEquipment && hasRequiredAmenities && matchesCabins;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <div className="container mx-auto px-4 lg:px-8 pt-28 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#152B3D]">
            Todos los Yates
          </h1>
          <div className="hidden md:flex items-center text-sm text-gray-500">
            <span>{filteredYachts.length} yates encontrados</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters sidebar */}
          <div className="lg:sticky lg:top-28 space-y-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
            <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
              <SlidersHorizontal className="h-5 w-5 text-[#152B3D]" />
              <span className="font-medium text-[#152B3D]">Filtros</span>
            </div>

            {/* Search */}
            <div className="space-y-2">
              <Label className="text-sm text-gray-600">Buscar</Label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Buscar yates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <Accordion type="multiple" className="w-full">
              {/* Category filter */}
              <AccordionItem value="category" className="border-b border-gray-100">
                <AccordionTrigger className="text-sm text-gray-600 py-2">Categoría</AccordionTrigger>
                <AccordionContent>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las categorías</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </AccordionContent>
              </AccordionItem>

              {/* Price range filter */}
              <AccordionItem value="price" className="border-b border-gray-100">
                <AccordionTrigger className="text-sm text-gray-600 py-2">Rango de precio</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <Slider
                      value={priceRange}
                      min={0}
                      max={8000}
                      step={100}
                      onValueChange={setPriceRange}
                      className="mt-2"
                    />
                    <div className="flex justify-between items-center">
                      <div className="px-3 py-1 bg-gray-50 rounded text-sm text-gray-600">
                        ${priceRange[0]}
                      </div>
                      <div className="px-3 py-1 bg-gray-50 rounded text-sm text-gray-600">
                        ${priceRange[1]}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Rating filter */}
              <AccordionItem value="rating" className="border-b border-gray-100">
                <AccordionTrigger className="text-sm text-gray-600 py-2">
                  <div className="flex items-center gap-2">
                    Valoración mínima
                    <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[minRating]}
                      min={0}
                      max={5}
                      step={0.5}
                      onValueChange={(value) => setMinRating(value[0])}
                      className="flex-1"
                    />
                    <span className="px-2 py-1 bg-gray-50 rounded text-sm text-gray-600 w-12 text-center">
                      {minRating}
                    </span>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Equipment filter */}
              <AccordionItem value="equipment" className="border-b border-gray-100">
                <AccordionTrigger className="text-sm text-gray-600 py-2">
                  <div className="flex items-center gap-2">
                    Equipamiento
                    <Ship className="h-4 w-4 text-[#152B3D]" />
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {equipmentOptions.map((equipment) => (
                      <div key={equipment.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`equipment-${equipment.id}`}
                          checked={selectedEquipment.includes(equipment.id)}
                          onCheckedChange={() => toggleEquipment(equipment.id)}
                        />
                        <label
                          htmlFor={`equipment-${equipment.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {equipment.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Amenities filter */}
              <AccordionItem value="amenities" className="border-b border-gray-100">
                <AccordionTrigger className="text-sm text-gray-600 py-2">Comodidades</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {amenitiesOptions.map((amenity) => (
                      <div key={amenity.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`amenity-${amenity.id}`}
                          checked={selectedAmenities.includes(amenity.id)}
                          onCheckedChange={() => toggleAmenity(amenity.id)}
                        />
                        <label
                          htmlFor={`amenity-${amenity.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                        >
                          {amenity.icon}
                          {amenity.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Cabins filter */}
              <AccordionItem value="cabins" className="border-b border-gray-100">
                <AccordionTrigger className="text-sm text-gray-600 py-2">
                  <div className="flex items-center gap-2">
                    Cabinas
                    <BedDouble className="h-4 w-4 text-[#152B3D]" />
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Select
                    value={cabinsFilter}
                    onValueChange={setCabinsFilter}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar número de cabinas" />
                    </SelectTrigger>
                    <SelectContent>
                      {cabinsOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Yachts grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredYachts.map((yacht) => (
                <YachtCard key={yacht.id} yacht={yacht} />
              ))}
            </div>
            {filteredYachts.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                <div className="text-gray-500 mb-2">
                  No se encontraron yates que coincidan con los filtros seleccionados.
                </div>
                <div className="text-sm text-gray-400">
                  Intenta ajustar los filtros para ver más resultados.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllYachts;
