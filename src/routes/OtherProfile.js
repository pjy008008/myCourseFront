import { useParams, Link, useNavigate } from "react-router-dom";
import styles from "./OtherProfile.module.css";
import List from "../components/List";
import ai from "../image/ai.png";
import cs from "../image/cs.png";
import coding from "../image/coding.png";
import teach from "../image/teach.png";
import { useEffect, useState } from "react";
import axios from "axios";

const chkPre = (item) => {
  return (
    <div className={styles.imageContainer}>
      {item.prefer === "ai" && <img src={ai} alt="ai" />}
      {item.prefer === "cs" && <img src={cs} alt="cs" />}
      {item.prefer === "teach" && <img src={teach} alt="teach" />}
      {item.prefer === "coding" && <img src={coding} alt="coding" />}
    </div>
  );
};

const OtherProfile = () => {
  const params = useParams();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const otherClick = () => {
    navigate("/other");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8080/member/everyone",
          {
            headers: {
              Accept: "application/json;charset=UTF-8",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userWithMatchingAccount = response.data.data.find(
          (user) => user.account === params.id
        );
        setUserData(userWithMatchingAccount);
        console.log(userData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>
          <List />
        </div>
      </div>
      {userData ? (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={`${styles.tableLeft} ${styles.top}`}></th>
                <th className={styles.top}>1학기</th>
                <th className={`${styles.tableRight} ${styles.top}`}>
                  2학기
                </th>
              </tr>
            </thead>
            <tbody>
              {[0, 2, 4, 6].map((row) => (
                <tr key={row}>
                  <td className={styles.tableLeft}>{row / 2 + 1}</td>
                  {[0, 1].map((col) => (
                    <td key={col}>
                      {userData.subject[row + col].map((subjectCode, i) => (
                        <p key={i}>{`과목: ${subjectCode}`}</p>
                      ))}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      {userData ? (
          <div className={styles.userContainer}>
            <div>{chkPre(userData)}</div>
            <div className={styles.textContainer}>
              <div className={styles.boldText}>학번</div>
              <div>{userData.stdnum}</div>
              <div className={styles.boldText}>이수 학년·학기</div>
              <div>{userData.completionsem}</div>
            </div>
            {/* 여기에 필요한 다른 데이터 렌더링 */}
          </div>
    ) : (
      <div>No user data available</div>
    )}
    <button className={styles.storeBtn}>내 커리큘럼에 추가하기 </button>
    <button onClick={otherClick} className={styles.goBackBtn}>뒤로 가기</button>
    </div>
  );
};

export default OtherProfile;
