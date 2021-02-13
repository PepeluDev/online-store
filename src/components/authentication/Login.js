import React, { useState } from "react";

// Data that will came from context or somewhere
const uriPrefix = "http://localhost:3001";
const loginUri = "/login";

const defaultUserData = {
  email: "regular@example.com",
  password: "password",
  accessToken: "",
};

const LoginComponent = (props) => {
  const [userData, setUserData] = useState(defaultUserData);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.email && userData.password) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      };
      fetch(uriPrefix + loginUri, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setUserData({ ...userData, accessToken: data.accessToken });
        })
        .catch((error) => console.log(error));
    } else alert("Login and password are mandatory.");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          id="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginComponent;
