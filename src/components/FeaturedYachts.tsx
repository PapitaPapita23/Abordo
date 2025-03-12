import { useState } from "react";
import YachtCard from "./YachtCard";
import { Button } from "@/components/ui/button";
import { Yacht } from "@/types";

const featuredYachts: Yacht[] = [
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

const FeaturedYachts = () => {
  const [filter, setFilter] = useState<string>("all");

  // Extraer categorías únicas de los yates
  const categories = Array.from(
    new Set(featuredYachts.map((yacht) => yacht.category.toLowerCase()))
  );

  // Filtrar y ordenar los yates según la puntuación
  const sortedYachts = featuredYachts.sort((a, b) => b.rating - a.rating); // Ordenar de mayor a menor según la puntuación
  const topYachts = sortedYachts.slice(0, 4); // Obtener solo los 4 primeros

  const filteredYachts =
    filter === "all"
      ? topYachts
      : topYachts.filter((yacht) =>
          yacht.category.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <section id="yachts" className="py-20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="space-y-3 mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-[#152B3D] font-inter">
              Barcos Destacados
            </h2>
            <p className="text-[#599ACF] max-w-lg text-[15px] font-inter">
              Descubre nuestra selección de barcos premium disponibles para
              alquiler.
            </p>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 space-x-2 flex-wrap">
            {/* Botón "Todos los Tipos" */}
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
              className={`whitespace-nowrap ${
                filter === "all" ? "bg-[#152B3D] text-white" : ""
              } w-auto`}
            >
              Todos los Tipos
            </Button>

            {/* Botones dinámicos para cada categoría */}
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(category)}
                className={`whitespace-nowrap ${
                  filter === category ? "bg-[#152B3D] text-white" : ""
                } w-auto`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
                {/* Capitaliza la primera letra */}
              </Button>
            ))}
          </div>
        </div>

        {/* Mostrar los yates filtrados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredYachts.map((yacht) => (
            <YachtCard key={yacht.id} yacht={yacht} />
          ))}
        </div>

        {/* Botón para ver más yates */}
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            className="bg-[#152B3D] border-[#152B3D] text-[#F5EEE7] hover:bg-[#152B3D] hover:border-[#152B3D] hover:text-[#F5EEE7]"
          >
            Ver Todos los Yates
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedYachts;
