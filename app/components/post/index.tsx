import route from "@/app/api/route";
import { Alert } from "@mui/material";
import { useState } from "react";

export default function PostForm() {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categorias, setCategorias] = useState([
    "Categoria 1",
    "Categoria 2",
    "Categoria 3",
    "Categoria 4",
    "Categoria 5",
    "Categoria 6",
    "Categoria 7",
    "Categoria 8",
    "Categoria 9",
    "Categoria 10",
    "Categoria 11",
    "Categoria 12",
    "Categoria 13",
    "Categoria 14",
    "Categoria 15",
  ]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const [selectedImage, setSelectedImage] = useState(""); // Estado para armazenar a imagem selecionada

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    //@ts-ignore
    const formData = new FormData(ev.currentTarget);
    const name = formData.get("name")?.toString();
    //@ts-ignore
    const fanArtUrl = formData.get("fanArtUrl");

    const response = await route.posts.newPost(name!, fanArtUrl);
    if (response.status === 200) {
      // Reset the form
      const form = ev.target as HTMLFormElement;
      form.reset();
      setSelectedImage("");

      // Display success message
      setOpen(true);
      setColor("bg-green-500");
      setMessage(response.data.message);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
      return;
    }
    // Reset the form
    const form = ev.target as HTMLFormElement;
    form.reset();
    setSelectedImage("");

    // Display failed message
    setOpen(true);
    setColor("bg-red-500");
    setMessage(response.data.message);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  const handleSelectOption = (option: string) => {
    //@ts-ignore
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      //@ts-ignore
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const filteredCategorias = categorias.filter((categoria) =>
    categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    //@ts-ignore
    const file = ev.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {open === true && (
        <div className="flex mb-6">
          <Alert
            className={`${color} flex justify-center items-center w-64  text-bold m-auto mt-0`}
          >
            {message}
          </Alert>
        </div>
      )}
      <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md flex flex-col justify-center w-96">
        <h2 className="text-2xl font-bold mb-4">Novo Post</h2>
        <form
          name="formData"
          id="formData"
          method="POST"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium text-gray-700">
              Nome do Post
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:ring-opacity-50 px-4 py-2 transition duration-300 ease-in-out"
              placeholder="Digite o nome do post"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="categorias"
              className="block font-medium text-gray-700 mb-2"
            >
              Categorias
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowOptions(!showOptions)}
                className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 flex justify-between items-center focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                {showOptions ? "Fechar Opções" : "Selecionar Categorias"}
                <svg
                  className={`h-5 w-5 ml-2 ${
                    showOptions ? "transform rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414zM10 3a1 1 0 011 1v6a1 1 0 11-2 0V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {showOptions && (
                <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                  <input
                    type="text"
                    placeholder="Pesquisar categoria"
                    className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="divide-y divide-gray-200">
                    {filteredCategorias.map((categoria) => (
                      <button
                        key={categoria}
                        type="button"
                        onClick={() => handleSelectOption(categoria)}
                        className={`w-full text-left py-2 px-4 hover:bg-gray-100 focus:outline-none ${
                          //@ts-ignore
                          selectedOptions.includes(categoria)
                            ? "bg-indigo-500 text-white"
                            : ""
                        }`}
                      >
                        {categoria}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="fanArtUrl"
              className="block font-medium text-gray-700 mb-2"
            >
              Imagem
            </label>
            <div className="flex items-center">
              <label
                htmlFor="fanArtUrl"
                className="flex items-center justify-center bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer py-2 px-4"
              >
                <svg
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span className="ml-2">Escolher arquivo</span>
              </label>
              <input
                type="file"
                required
                name="fanArtUrl"
                id="fanArtUrl"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Imagem selecionada"
                className="mt-2 w-full max-w-sm mx-auto"
              />
            )}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
