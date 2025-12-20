import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import TableData from "./TableData";

const AllUser = () => {
  const axiosSecure = useAxiosSecure();
  const [AllUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosSecure.get("/user");
      setAllUsers(res.data);
    };

    fetchData();
  }, [axiosSecure]);

  return (
    <div className="space-y-5">
      {AllUsers.map((user, i) => (
        <TableData key={i} user={user}></TableData>
      ))}
    </div>
  );
};

export default AllUser;
