import { AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useState } from "react";
import { User } from "types/types";
import { getTokenData } from "util/auth";
import { requestBackend } from "util/requests";
import './styles.css';
import Form from "./Form";

const NewAppointment = () => {

  const [user, setUser] = useState<User | null>(null);

  const getUser = useCallback(async () => {
      try {
          const email = getTokenData()?.user_name;

          if (email) {
              const params: AxiosRequestConfig = {
              method: "GET",
              url: `/users/email/${email}`,
              withCredentials: true,
          };

          const response = await requestBackend(params);
          setUser(response.data);
      }
      } catch (error) {
          console.log("Error: " + error);
      }
  }, []);

  useEffect(() => {
      getUser();
  }, [getUser]);
         
    return(
        <div className="new-appointment-container">
          <h1>New Appointment</h1>
              {user && 
                  <Form client={user}/>
              }
        </div>
    );
}

export default NewAppointment;