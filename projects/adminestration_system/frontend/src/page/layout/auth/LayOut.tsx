import "./LayOut.css"
import { Outlet } from "react-router-dom";
import { AuthContainer } from "./authcontainer.tsx";
export const AuthLayOut: React.FC = () => {
  return (
    <main className="watercolor-bg">
      <AuthContainer>
        <Outlet />
      </AuthContainer>
    </main>
  )
}


export default AuthLayOut;
