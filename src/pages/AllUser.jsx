import { useEffect, useState } from "react";
import { UserService } from "../services/UserService";

const AllUser = () => {
  const [allUser, setAllUser] = useState([])
  useEffect(() => { 
    UserService.getAllUser()
    .then((res) => { 
      console.log('res: ', res);
    })
    .catch((err) => { 
      console.log('err: ', err);
    })
  }, [])
  return <h1>All User</h1>;
};

export default AllUser;
