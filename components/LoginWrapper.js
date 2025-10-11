// components/LoginWrapper.js
import { useSelector, useDispatch } from "react-redux";
import Login from "@/pages/Home/Login";
import { closeLogin } from "@/redux/loginSlice";

export default function LoginWrapper() {
  const dispatch = useDispatch();
  const { isLoginOpen, redirectTo } = useSelector((state) => state.login);

  if (!isLoginOpen) return null;

  return <Login onClose={() => dispatch(closeLogin())} redirectTo={redirectTo} />;
}
