"use client";
import { useEffect, useState } from "react";
import HeaderAuth from "@/components/homeAuth/header";
import AccountInfo from "@/components/profile/accountInfo";
import PostsLikedsByUser from "@/components/profile/postsCurtidos";
import FavoritedPosts from "@/components/profile/favoritedPosts";
import FollowingCategorys from "@/components/profile/followingCategorys";
import UserPosts from "@/components/profile/userPosts";
import { FaBars } from "react-icons/fa";
import { Container } from "@mui/material";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  useEffect(() => {
    const token = sessionStorage.getItem("steam-token");
    if (!token) {
      router.push("/register");
      return;
    }
  });

  const [activeTab, setActiveTab] = useState("accountInfo");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
    setMenuOpen(false); // Close the menu after selecting a tab
  };

  return (
    <>
      <HeaderAuth />
      <div className="bg-slate-100 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <div className="hidden md:flex space-x-4">
            <button
              className={`py-2 px-4 rounded-md ${
                activeTab === "accountInfo"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600"
              }`}
              onClick={() => handleTabChange("accountInfo")}
            >
              Informações da Conta
            </button>
            <button
              className={`py-2 px-4 rounded-md ${
                activeTab === "likedPosts"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600"
              }`}
              onClick={() => handleTabChange("likedPosts")}
            >
              Posts Curtidos
            </button>
            <button
              className={`py-2 px-4 rounded-md ${
                activeTab === "favoritePosts"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600"
              }`}
              onClick={() => handleTabChange("favoritePosts")}
            >
              Posts Favoritados
            </button>
            <button
              className={`py-2 px-4 rounded-md ${
                activeTab === "followedCategories"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600"
              }`}
              onClick={() => handleTabChange("followedCategories")}
            >
              Categorias Seguidas
            </button>
            <button
              className={`py-2 px-4 rounded-md ${
                activeTab === "yourPosts"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600"
              }`}
              onClick={() => handleTabChange("yourPosts")}
            >
              Seus Posts
            </button>
          </div>
          <button
            className="md:hidden text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars className="w-6 h-6" />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden flex flex-col space-y-4 mt-4">
            <button
              className={`py-2 px-4 rounded-md ${
                activeTab === "accountInfo"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600"
              }`}
              onClick={() => handleTabChange("accountInfo")}
            >
              Informações da Conta
            </button>
            <button
              className={`py-2 px-4 rounded-md ${
                activeTab === "likedPosts"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600"
              }`}
              onClick={() => handleTabChange("likedPosts")}
            >
              Posts Curtidos
            </button>
            <button
              className={`py-2 px-4 rounded-md ${
                activeTab === "favoritePosts"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600"
              }`}
              onClick={() => handleTabChange("favoritePosts")}
            >
              Posts Favoritados
            </button>
            <button
              className={`py-2 px-4 rounded-md ${
                activeTab === "followedCategories"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600"
              }`}
              onClick={() => handleTabChange("followedCategories")}
            >
              Categorias Seguidas
            </button>
            <button
              className={`py-2 px-4 rounded-md ${
                activeTab === "yourPosts"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600"
              }`}
              onClick={() => handleTabChange("yourPosts")}
            >
              Seus Posts
            </button>
          </div>
        )}
      </div>
      <Container className="bg-neutral-900 min-w-full min-h-screen flex flex-wrap justify-center items-center">
        <div className="p-4 text-white ">
          {activeTab === "accountInfo" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Informações da Conta
              </h2>
              <AccountInfo />
            </div>
          )}

          {activeTab === "likedPosts" && (
            <div>
              <h2 className="text-xl  font-semibold mb-4">Posts Curtidos</h2>
              <PostsLikedsByUser />
            </div>
          )}

          {activeTab === "favoritePosts" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Posts Favoritados</h2>
              <FavoritedPosts />
            </div>
          )}

          {activeTab === "followedCategories" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Categorias Seguidas
              </h2>
              <FollowingCategorys />
            </div>
          )}
          {activeTab === "yourPosts" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Seus posts!</h2>
              <UserPosts />
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
