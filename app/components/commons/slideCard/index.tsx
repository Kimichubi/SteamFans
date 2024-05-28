import Image from "next/image";
import Link from "next/link";

export default function SlideCard({ posts }: any) {
  return (
    <div className="relative cursor-pointer w-auto h-64">
      <p className="text-lg font-bold text-center text-gray-400">{posts.author.name}</p>
      <img
        src={posts.fanArtUrl}
        alt={posts.thumbnailUrl}
        className="rounded-lg w-full h-64 object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300 rounded-lg"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-4">
        <p className="text-lg font-semibold">{posts.name}</p>
        <p className="text-sm">{posts.synopsis}</p>
      </div>
    </div>
  );
}
