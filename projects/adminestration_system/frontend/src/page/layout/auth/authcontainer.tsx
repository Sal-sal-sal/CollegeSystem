import type React from "react";
import "./authcontainer.css"


interface LayOutprops {
  children: React.ReactNode;
}

export const AuthContainer: React.FC<LayOutprops> = ({ children }) => {
  return (
    <section className="auth-continer">
      <h1>
        Adminestration system
      </h1>
      {children}
    </section>
  )
}


export default AuthContainer;
