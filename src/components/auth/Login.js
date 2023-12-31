import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import styles from "./Login.module.css";
const Login = ({ setToggle, setIsLoggedIn }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    //Login data Validation
    axios
      .post(
        "http://localhost:8080/sign-in",
        {
          account: id,
          password: password,
        },
        {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json;charset=UTF-8",
        }
      )
      .then(function (response) {
        console.log(response);
        localStorage.setItem("token", response.data.data.token);
        // window.location.reload();
        setIsLoggedIn(true);
      })
      .catch(function (error) {
        console.log(error);
        alert(error.response.data.message);
        // setError((prev) => "로그인에 실패했습니다.");
      });

    // console.log(id);
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "id") {
      setId((prev) => value);
    } else if (name === "password") {
      setPassword((prev) => value);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <h1 className={styles.title}>
            My <br /> Course
          </h1>
        </div>
        <div className={styles.rightContainer}>
          <form className={styles.form} onSubmit={onSubmit}>
            <h2 className={styles.subTitle}>Login</h2>
            <input
              className={styles.idInput}
              required
              onChange={onChange}
              placeholder="아이디"
              name="id"
              value={id}
              type="text"
            />
            <br />
            <input
              className={styles.pwdInput}
              onChange={onChange}
              required
              placeholder="비밀번호"
              name="password"
              value={password}
              type="password"
            />
            <br />
            <button className={styles.submitBtn}>로그인</button>
          </form>
          <button
            className={styles.submitBtn}
            onClick={() => {
              setToggle((prev) => !prev);
            }}
          >
            <span>계정이 없으신가요?</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
