import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import styles from "./userdetail.module.scss";
import Loader from "../../components/Loader";
import { Card, Image } from "@mantine/core";

const getUserDetail = async ({ queryKey }) => {
  const userId = queryKey[1];
  const response = await fetch(
    `https://ftm.pythonanywhere.com/api/user/${userId}/`
  );
  return response.json();
};

const UserDetail = () => {
  const { userId } = useParams();
  const { data, isLoading } = useQuery(["user-id", userId], getUserDetail);

  return (
    <div className={styles["user-detail-container"]}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={[styles["card-container"]]}>
            <Card style={{ padding: 0 }} shadow="sm" radius="md" withBorder>
              <div className={styles["card-first-half"]}>
                <Image
                  fit="cover"
                  src={data.profile.profileimg}
                  alt="User Profile Image"
                  height={100}
                  width={100}
                  radius={100}
                  className={styles["profile-image"]}
                />
                <div className={styles["card-view-request"]}>
                  <p>Send Request</p>
                </div>
              </div>
              <div className={styles["card-second-half"]}>
                <div>{data.profile.bio}</div>
              </div>
            </Card>
          </div>

          <div className={[styles["generic-pill"]]}>
            <p>Work Experience</p>
            <p>{data.profile.exp[0].work_experience}</p>
          </div>

          <div className={[styles["generic-pill"]]}>
            <p>Certificates</p>
            <p>{data.profile.certificates}</p>
          </div>

          <div className={[styles["generic-pill"]]}>
            <p>Github/Portfolio</p>
            <p>{data.profile.portfolio}</p>
          </div>

          <div className={[styles["generic-pill"]]}>
            <p>User Comments</p>
            <p>{data.profile.review[0].comments}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDetail;
