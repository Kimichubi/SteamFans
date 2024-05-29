"use client";

import "@splidejs/react-splide/css";
export default function SlideCard({ post }: any) {
  return (
    <div className="relative cursor-pointer w-auto h-64">
      <p className="text-lg font-bold text-center text-gray-400">
        {post.author.name}
      </p>
      <img
        src={post.fanArtUrl}
        className="rounded-lg w-full h-64 object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300 rounded-lg"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-4">
        <p className="text-lg font-semibold">{post.name}</p>
        <p className="text-sm">{post.synopsis}</p>
      </div>
    </div>
  );
}
