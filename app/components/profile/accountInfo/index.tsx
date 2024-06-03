import route from "@/app/api/route";
import { useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
  password: string;
}

export default function AccountInfo() {
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false); // Estado para controlar a edição dos campos

  // Estado para armazenar os novos valores dos campos
  const [editedUser, setEditedUser] = useState<User>({
    name: "",
    email: "",
    password: "",
  });

  // Estados para controlar as senhas
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const getUserInfos = async () => {
      try {
        const response = await route.user.getUserInfos();
        if (response.status === 200) {
          setUser(response.data.message);
          setEditedUser(response.data.message); // Inicialmente, os campos editáveis têm os valores do usuário
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    getUserInfos();
  }, []);

  // Função para atualizar os campos editáveis
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  // Função para atualizar a senha antiga
  const handleOldPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };

  // Função para atualizar a senha nova
  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  // Função para atualizar a confirmação da senha nova
  const handleConfirmNewPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmNewPassword(e.target.value);
  };

  // Função para enviar os dados atualizados para a API
  const handleUpdateUserInfo = async () => {
    try {
      // Atualizar os dados do usuário
      const updateResponse = await route.user.updateUserInfo(
        editedUser.email,
        editedUser.name
      );
      if (updateResponse.status === 200) {
        // Atualizar o estado do usuário com as novas informações
        setUser(editedUser);
        // Sair do modo de edição
        setEditing(false);
      } else if (updateResponse.status === 400) {
        setError("Erro ao atualizar informações, email já cadastrado!");
      }
    } catch (error) {
      setError("Erro");
    }
  };

  // Função para enviar os dados atualizados da senha para a API
  const handleUpdatePassword = async () => {
    try {
      // Verificar se a senha nova coincide com a confirmação
      if (newPassword !== confirmNewPassword) {
        setError("A nova senha e a confirmação não coincidem.");
        return;
      }

      // Atualizar os dados do usuário
      const updateResponse = await route.user.updateUserPassword(
        oldPassword,
        newPassword
      );
      if (updateResponse.status === 200) {
        // Atualização bem-sucedida
        // Limpar os campos de senha
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        // Sair do modo de edição
        setEditing(false);
      } else if (updateResponse.status === 400) {
        setError("Erro ao atualizar a senha. Verifique a senha antiga.");
      }
    } catch (error) {
      setError("Erro");
    }
  };

  return (
    <>
      {user && (
        <div className="max-w-md mx-auto">
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Nome:
              </label>
              {editing ? (
                <input
                  type="text"
                  name="name"
                  value={editedUser.name}
                  onChange={handleInputChange}
                  className="border rounded-md px-3 py-2 w-full"
                />
              ) : (
                <p>{user.name}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Email:
              </label>
              {editing ? (
                <input
                  type="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleInputChange}
                  className="border rounded-md px-3 py-2 w-full"
                />
              ) : (
                <p>{user.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Senha:
              </label>
              {editing ? (
                <>
                  <input
                    type="password"
                    name="password"
                    value={oldPassword}
                    onChange={handleOldPasswordChange}
                    placeholder="Senha antiga"
                    className="border rounded-md px-3 py-2 w-full mb-2"
                  />
                  <input
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    placeholder="Nova senha"
                    className="border rounded-md px-3 py-2 w-full mb-2"
                  />
                  <input
                    type="password"
                    name="confirmNewPassword"
                    value={confirmNewPassword}
                    onChange={handleConfirmNewPasswordChange}
                    placeholder="Confirmar nova senha"
                    className="border rounded-md px-3 py-2 w-full"
                  />
                </>
              ) : (
                <p>********</p>
              )}
            </div>
            {editing ? (
              <>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleUpdateUserInfo}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Salvar Informações
                  </button>
                  <button
                    type="button"
                    onClick={handleUpdatePassword}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Atualizar Senha
                  </button>
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
              </>
            ) : (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Editar
              </button>
            )}
          </form>
        </div>
      )}
    </>
  );
}
