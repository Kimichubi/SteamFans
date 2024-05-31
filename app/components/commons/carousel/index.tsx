"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import SlideCard from "../slideCard/index";

export default function SlideShow({ posts }: any) {
  let slideCount = posts.length >= 5 ? 5 : posts.length;

  return (
    <div className="relative flex justify-center items-center py-4 p-6 rounded-lg shadow-lg">
      {/* Sobreposição transparente */}
      <div className="absolute inset-0 bg-gray-200 bg-opacity-20 rounded-lg pointer-events-none"></div>

      {/* SlideShow */}
      <Splide
        options={{
          type: "loop",
          perPage: slideCount,
          perMove: 1,
          width: slideCount * 300,
          pagination: false,
          gap: "1rem",
          arrows: posts.length > 5,
          drag: posts.length > 5,
          breakpoints: {
            1200: {
              perPage: slideCount >= 5 ? 4 : 3,
              width: slideCount >= 5 ? 734 : 300,
              drag: posts.length > 5,
            },
            734: {
              perPage: 1,
              width: 300,
              gap: "0rem",
            },
            300: {
              perPage: 1,
              width: 250,
              gap: "0rem",
            },
          },
        }}
      >
        {posts?.map((post: any) => (
          <SplideSlide key={post.id} className="p-4">
            <div className="rounded-lg shadow-md p-6 transform transition-transform duration-300 hover:scale-105">
              <SlideCard post={post} />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}
