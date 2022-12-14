import { Button, Input, PasswordInput } from "@mantine/core";
import styles from "./login.module.scss";
import { IconLogin, IconKey } from "@tabler/icons";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginDetail, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const mutation = useMutation((userLogin) => {
    return fetch("https://ftm.pythonanywhere.com/api/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userLogin),
    });
  });

  const handleFormChange = (event) => {
    mutation.reset();
    setLoginDetails((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFormSubmit = () => {
    mutation.mutate(
      { ...loginDetail },
      {
        onSuccess: navigate("/user-list"),
      }
    );
  };

  return (
    <section>
      <div className={styles["form-container"]}>
        <h2 className={styles["form-header"]}>Login</h2>
        <Input
          className={styles["form-input"]}
          placeholder="Username"
          icon={<IconLogin />}
          onChange={handleFormChange}
          name="username"
        />
        <PasswordInput
          className={styles["form-input"]}
          icon={<IconKey />}
          placeholder="111"
          withAsterisk
          onChange={handleFormChange}
          name="password"
        />
        <Button onClick={handleFormSubmit} className={styles["button"]}>
          {mutation.isLoading ? "Logging you in" : "Login"}
        </Button>
      </div>
    </section>
  );
};

export default Login;
