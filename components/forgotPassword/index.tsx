import route from "@/app/api/route";
import { Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

export default function SendCodeForm() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [confirmationChange, setConfirmationChange] = useState<boolean>(false);
  const [sucessEmailCode, setSucessEmailCode] = useState<string>("");
  const [sucessEmailCodeOpen, setSucessEmailCodeOpen] =
    useState<boolean>(false);
  const [sucessEmailCodeStyle, setSucessEmailCodeStyle] = useState<string>("");

  const [code, setCode] = useState<string>("");
  const [codeIsRight, setCodeIsRight] = useState<boolean>(false);
  const [codeAlert, setCodeAlert] = useState<boolean>(false);
  const [codeMessage, setCodeMessage] = useState<string>("");
  const [codeStyle, setCodeStyle] = useState<string>("");

  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordAlert, setPasswordAlert] = useState<boolean>(false);
  const [passwordAlertMessage, setPasswordAlertMessage] = useState<string>("");
  const [passwordAlertStyle, setPasswordAlertStyle] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await route.user.userForgotPassword(email);

    if (response.status === 200) {
      setConfirmationChange(true);
      setSucessEmailCodeOpen(true);
      setSucessEmailCode(response.data.message);
      setSucessEmailCodeStyle("bg-green-600");
      setTimeout(() => {
        setSucessEmailCodeOpen(false);
      }, 1000 * 3);
      return;
    } else if (response.status !== 200) {
      setSucessEmailCodeOpen(true);
      setSucessEmailCode("Erro!");
      setSucessEmailCodeStyle("bg-red-600");
      setTimeout(() => {
        setSucessEmailCodeOpen(false);
      }, 1000 * 3);
      return;
    }
    return;
  };

  const handleSubmitCode = async (e: FormEvent) => {
    e.preventDefault();
    const response = await route.user.userConfirmation(email, code);

    if (response.data.status === 200) {
      setCodeIsRight(true);
      setCodeAlert(true);
      setCodeMessage("Código correto!");
      setCodeStyle("bg-green-600");
      setTimeout(() => {
        setCodeAlert(false);
      }, 1000 * 3);
      return;
    }
  };

  const handleSubmitPassword = async (e: FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordAlert(true);
      setPasswordAlertMessage("As senhas digitadas não são iguais!");
      setPasswordAlertStyle("bg-red-600");
      setTimeout(() => {
        setPasswordAlert(false);
      }, 1000 * 3);
      return;
    } else {
      const response = await route.user.userUpdatePassowrdByEmail(
        email,
        newPassword
      );
      if (response.status === 200) {
        setPasswordAlert(true);
        setPasswordAlertMessage("Senha alterada com sucesso!");
        setPasswordAlertStyle("bg-green-600");
        router.push("/login");
        return;
      } else {
        setPasswordAlert(true);
        setPasswordAlertMessage(response.data.message);
        setPasswordAlertStyle("bg-red-600");
        setTimeout(() => {
          setPasswordAlert(false);
        }, 1000 * 3);
      }
    }
  };

  return (
    <>
      {confirmationChange ? (
        <>
          <div className="flex flex-col items-center justify-center w-auto h-auto">
            {sucessEmailCodeOpen ? (
              <>
                <Alert
                  className={`${sucessEmailCodeStyle} flex justify-center text-black    `}
                >
                  {sucessEmailCode}
                </Alert>
              </>
            ) : (
              <></>
            )}
            {codeIsRight ? (
              <>
                {codeAlert ? (
                  <>
                    {" "}
                    <Alert className={`${codeStyle} text-black`}>
                      {codeMessage}
                    </Alert>
                  </>
                ) : (
                  <></>
                )}
                {passwordAlert ? (
                  <>
                    {" "}
                    <Alert className={`${passwordAlertStyle} text-black`}>
                      {passwordAlertMessage}
                    </Alert>
                  </>
                ) : (
                  <></>
                )}
                <form
                  onSubmit={handleSubmitPassword}
                  className="bg-white p-6 rounded shadow-md w-full max-w-sm"
                >
                  <h2 className="text-2xl mb-4 text-center text-slate-800">
                    Change your password!
                  </h2>
                  <div className="mb-4">
                    <label
                      htmlFor="newPassword"
                      className="block text-slate-800 mb-2"
                    >
                      New Password:
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-800"
                    />
                    <div className="mb-4">
                      <label
                        htmlFor="confirmationPassword"
                        className="block text-slate-800 mb-2"
                      >
                        Confirmation New Password:
                      </label>
                      <input
                        type="password"
                        id="confirmationPassword"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-800"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-slate-800 text-white p-2 rounded hover:bg-slate-700 transition-colors"
                  >
                    Send Confirmation Code
                  </button>
                </form>
              </>
            ) : (
              <>
                {" "}
                <form
                  onSubmit={handleSubmitCode}
                  className="bg-white p-6 rounded shadow-md w-full max-w-sm"
                >
                  <h2 className="text-2xl mb-4 text-center text-slate-800">
                    Send Confirmation Code
                  </h2>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-slate-800 mb-2"
                    >
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-800"
                    />
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-slate-800 mb-2"
                      >
                        Confirmation Code:
                      </label>
                      <input
                        type="text"
                        id="confirmationCode"
                        required
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-800"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-slate-800 text-white p-2 rounded hover:bg-slate-700 transition-colors"
                  >
                    Send Confirmation Code
                  </button>
                </form>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className="flex flex-col items-center justify-center w-auto h-auto">
            =
            {sucessEmailCodeOpen ? (
              <>
                <Alert className={`${sucessEmailCodeStyle}  text-black    `}>
                  {sucessEmailCode}
                </Alert>
              </>
            ) : (
              <></>
            )}
            =
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded shadow-md w-full max-w-sm"
            >
              <h2 className="text-2xl mb-4 text-center text-slate-800">
                Send Confirmation Code
              </h2>
              <div className="mb-4">
                <label htmlFor="email" className="block text-slate-800 mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-800"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-slate-800 text-white p-2 rounded hover:bg-slate-700 transition-colors"
              >
                Send Confirmation Code
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
}
