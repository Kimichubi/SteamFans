//@ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import SlideCard from "../slideCard";
import Link from "next/link";

export default function SlideComponent({ posts }: any) {
  let slideCount = 0;

  if (posts.length >= 5) {
    slideCount = 5;
  } else if (posts) {
    slideCount = posts.length;
  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center py-4">
        <Splide
          options={{
            type: "loop",
            perPage: slideCount,
            perMove: 1,
            width: slideCount * 300,
            pagiantion: false,
            gap: "1rem",
            arrows: posts.length > 5 ? true : false,
            drag: posts.length > 5 ? true : false,
            breakpoints: {
              1200: {
                perPage: slideCount >= 5 ? 4 : 3,
                width: slideCount >= 5 ? 734 : 300,
                drag: posts.length > 5 ? true : false,
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
          {posts?.map((posts: any) => (
            <SplideSlide key={posts.id}>
              <SlideCard posts={posts} />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </>
  );
}
