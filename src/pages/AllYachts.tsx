import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import YachtCard from "@/components/YachtCard";
import { Search } from "lucide-react";
import { Yacht } from "@/types";

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

  // Get unique categories
  const categories = Array.from(
    new Set(allYachts.map((yacht) => yacht.category))
  );

  // Filter yachts based on search, category, and price
  const filteredYachts = allYachts.filter((yacht) => {
    const matchesSearch = yacht.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || yacht.category === selectedCategory;
    const matchesPrice =
      yacht.pricePerDay >= priceRange[0] && yacht.pricePerDay <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="container mx-auto px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#152B3D] mb-8">
          Todos los Yates
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* Filters sidebar */}
          <div className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
            {/* Search */}
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

            {/* Category filter */}
            <div className="space-y-2">
              <Label>Categoría</Label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
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
            </div>

            {/* Price range filter */}
            <div className="space-y-2">
              <Label>Rango de precio por día</Label>
              <Slider
                value={priceRange}
                min={0}
                max={8000}
                step={100}
                onValueChange={setPriceRange}
                className="mt-2"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Yachts grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredYachts.map((yacht) => (
                <YachtCard key={yacht.id} yacht={yacht} />
              ))}
            </div>
            {filteredYachts.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No se encontraron yates que coincidan con los filtros seleccionados.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllYachts;
