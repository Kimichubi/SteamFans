import Link from "next/link";

export default function SlideCard({ post }: any) {
  return (
    <div className="relative cursor-pointer max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg">
      <Link href={`/register`}>
        <div className="p-4">
          <p className="text-lg font-bold text-center text-gray-700">
            {post.author.name}
          </p>
          <p className="text-lg font-bold text-center text-gray-700">
            {post.category.name}
          </p>
          <p className="text-sm font-semibold text-gray-900 mt-auto text-center">
            {post.name}
          </p>
          <div className="relative h-64">
            <img
              src={`https://database-steam-fans.onrender.com${post.fanArtUrl}`}
              className="absolute top-0 left-0 w-full h-full rounded-t-lg object-cover transition-transform duration-300 hover:scale-105"
              alt={`${post.name} image`}
            />
          </div>
          <div className="flex justify-between items-center mt-2 text-gray-600">
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3.172 3.172a4.001 4.001 0 015.656 0L10 4.343l1.172-1.171a4.001 4.001 0 115.656 5.656l-1.414 1.414-6.364 6.364a1 1 0 01-1.414 0l-6.364-6.364a4.001 4.001 0 010-5.656z" />
              </svg>
              <p className="text-sm">{post._count.likes}</p>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927C9.21 2.64 9.509 2.5 9.83 2.5h.34c.321 0 .62.14.781.427l1.181 2.43a1 1 0 00.753.545l2.678.39c.346.05.642.265.803.574a1 1 0 01-.139 1.007l-1.938 1.889a1 1 0 00-.287.883l.457 2.667c.06.348-.084.706-.373.924a1 1 0 01-.984.123L10 13.737l-2.398 1.26a1 1 0 01-.984-.123 1 1 0 01-.373-.924l.457-2.667a1 1 0 00-.287-.883L4.546 7.873a1 1 0 01-.139-1.007c.16-.309.457-.524.803-.574l2.678-.39a1 1 0 00.753-.545l1.181-2.43z" />
              </svg>
              <p className="text-sm">{post._count.favorites}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
