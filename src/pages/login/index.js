import React, { useState } from "react";
import classes from "./login.module.scss";
function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Vérifie si les informations de connexion sont correctes
    if (username === "malika" && password === "123") {
      // Connexion réussie, redirige l'utilisateur vers la page d'accueil
      window.location.href = "/experience";
    } else {
      // Affiche un message d'erreur si les informations de connexion sont incorrectes
      alert("Nom d'utilisateur ou mot de passe incorrect");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={classes.kotak_login}>
          <h3> Se connecter </h3>
          <label>
            Nom d'utilisateur:
            <input
              class="form-control  m-1"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            Mot de passe:
            <input
              class="form-control m-1"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button className="btn btn-success  m-1" type="submit">Se connecter</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
