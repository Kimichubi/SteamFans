"use client";

import "@splidejs/react-splide/css";
export default function SlideCard({ post }: any) {
  return (
    <div className="relative cursor-pointer w-auto h-auto b">
      <p className="text-lg font-bold text-center text-gray-400">
        {post.author.name}
      </p>
      <p className="text-lg font-semibold">{post.name}</p>
      <img
        src={`http://localhost:8080${post.fanArtUrl}`}
        className="rounded-lg w-full h-64 object-cover"
      />
    </div>
  );
}
