import Link from "next/link";

const SlideCategoryCard = ({ categorias }: any) => {
  return (
    <div className="relative cursor-pointer max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg">
      <Link href={`/category/${categorias.id}`}>
        <div className="p-4">
          <p className="text-lg font-bold text-center text-gray-700">
            {categorias.name}
          </p>

          <div className="relative h-64">
            <img
              src={`http://localhost:8080${categorias.imageUrl}`}
              className="absolute top-0 left-0 w-full h-full rounded-t-lg object-cover transition-transform duration-300 hover:scale-105"
              alt={`${categorias.name} image`}
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
              <p className="text-sm">{categorias._count.likes}</p>
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
              <p className="text-sm">{categorias._count.favorites}</p>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2.93 8.1l5.67 5.668a4.001 4.001 0 005.656 0l5.67-5.67a4.001 4.001 0 00-5.657-5.657L10 6.342 8.828 5.17a4.001 4.001 0 00-5.656 5.657l-.242.243z" />
              </svg>
              <p className="text-sm">{categorias._count.posts}</p>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 2a6 6 0 100 12 6 6 0 100-12zm3.54 7.88a.89.89 0 01-.23.19 1 1 0 01-.93.04l-2.8-1.35-2.8 1.35a1 1 0 01-1.16-1.42l.5-1.7-1.3-1.2a1 1 0 01.56-1.72l1.78-.24.7-1.48a1 1 0 011.8 0l.7 1.48 1.78.24a1 1 0 01.56 1.72l-1.3 1.2.5 1.7c.07.24.06.5-.08.73z" />
              </svg>
              <p className="text-sm">{categorias._count.followers}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SlideCategoryCard;
