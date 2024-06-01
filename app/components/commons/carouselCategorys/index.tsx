"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import SlideCategoryCard from "../slideCategoryCard";

export default function SlideShowCategorys({ categorias }: any) {
  let slideCount = 3;

  return (
    <div className="relative flex justify-center items-center py-4 p-6 rounded-lg shadow-lg ">
      {/* Sobreposição transparente */}
      <div className="absolute inset-0 bg-opacity-20 rounded-lg pointer-events-none "></div>

      {/* SlideShow */}
      <Splide
        options={{
          type: "loop",
          perPage: slideCount,
          perMove: 1,
          width: slideCount * 300,
          pagination: false,
          gap: "1rem",
          arrows: categorias.length > 3,
          drag: categorias.length > 3,
          breakpoints: {
            1200: {
              perPage: slideCount >= 5 ? 4 : 3,
              width: slideCount >= 5 ? 1200 : 900,
              drag: categorias.length > 5,
            },
            900: {
              perPage: 2,
              width: 600,
              gap: "1rem",
            },
            600: {
              perPage: 1,
              width: 300,
              gap: "0.5rem",
            },
          },
        }}
      >
        {categorias?.map((categoria: any) => (
          <SplideSlide key={categoria.id} className="p-4">
            <div className="rounded-lg shadow-md p-4 transform transition-transform duration-300 hover:scale-105">
              <SlideCategoryCard categorias={categoria} />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}
