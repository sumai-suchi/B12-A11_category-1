import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../AuthContext/AuthContext";

const AllUser = () => {
  const { user: newUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  console.log(newUser?.email);
  const [AllUsers, setAllUsers] = useState([]);
  const [recentUser, setRecentUser] = useState({});
  console.log(recentUser);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosSecure.get("/user");
      setAllUsers(res.data);
    };
    fetchData();
  }, [axiosSecure]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosSecure.get(`/user/role/data/${newUser?.email}`);
      console.log(res.data);
      setRecentUser(res.data);
    };
    fetchData();
  }, [axiosSecure, newUser?.email]);

  const handleChangeStatus = async (email, status) => {
    const res = await axiosSecure.patch(
      `/update/user/status?email=${email}&status=${status}`
    );
    setAllUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.email === email ? { ...user, status } : user
      )
    );
    console.log(res.data);
  };

  const handleStatus = async (email, role) => {
    console.log(role);

    const res = await axiosSecure.patch(
      `/update/user/role?email=${email}&role=${role}`
    );
    setAllUsers((prevUsers) =>
      prevUsers.map((user) => (user.email === email ? { ...user, role } : user))
    );
    console.log(res.data);
  };

  return (
    <div className="space-y-5">
      {AllUsers.map((user, i) => (
        <div className="w-full" key={i}>
          <div className="block md:hidden space-y-4">
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body items-center text-center">
                <div className="avatar">
                  <div className="w-20 rounded-full ring ring-red-500 ring-offset-base-100 ring-offset-2">
                    <img src={user.mainPhotoUrl} alt={user.name} />
                  </div>
                </div>

                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>

                <div className="flex gap-2 mt-2">
                  <span className="badge badge-error">{user.bloodGroup}</span>
                  <span className="badge badge-success">{user.status}</span>
                  <span className="badge badge-primary">{user.role}</span>
                </div>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="stat bg-base-200 rounded-xl">
                <div className="stat-title">District</div>
                <div className="stat-value text-sm">{user.districts}</div>
              </div>

              <div className="stat bg-base-200 rounded-xl">
                <div className="stat-title">Upazila</div>
                <div className="stat-value text-sm">{user.upazila}</div>
              </div>

              <div className="flex gap-2 justify-center items-center">
                <div className="stat bg-base-200 rounded-xl col-span-2">
                  <div className="stat-title">Joined</div>
                  <div className="stat-value text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  {user?.status === "active" ? (
                    <button
                      className="badge badge-success cursor-pointer"
                      onClick={() => handleChangeStatus(user?.email, "blocked")}
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      className="badge badge-warning cursor-pointer"
                      onClick={() => handleChangeStatus(user?.email, "active")}
                    >
                      Activate
                    </button>
                  )}
                </div>
              </div>

              <div>
                {recentUser?.role === "admin" && (
                  <td>
                    <div className="dropdown dropdown-start">
                      <div tabIndex={0} role="button" className="btn m-1">
                        make
                      </div>
                      <ul
                        tabIndex="-1"
                        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                      >
                        <li>
                          <button
                            onClick={() =>
                              handleStatus(user?.email, "volunteer")
                            }
                          >
                            volunteer
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleStatus(user?.email, "admin")}
                          >
                            admin
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                )}

                {recentUser?.role === "volunteer" && (
                  <td>
                    <div className="dropdown dropdown-start">
                      <div tabIndex={0} role="button" className="btn m-1">
                        make
                      </div>
                      <ul
                        tabIndex="-1"
                        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                      >
                        <li>
                          <button>volunteer</button>
                        </li>
                        <li>
                          <button>admin</button>
                        </li>
                      </ul>
                    </div>
                  </td>
                )}
              </div>
            </div>
          </div>

          {/* ================= TABLET & DESKTOP ================= */}
          <div className="hidden md:block overflow-x-auto bg-base-100 rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4 text-red-600">
              🩸 User Information
            </h2>

            <table className="table table-zebra w-full">
              <tbody>
                <tr>
                  <td className="font-semibold">User</td>
                  <td className="flex items-center gap-4">
                    <div className="avatar">
                      <div className="w-12 rounded-full ring ring-red-400 ring-offset-2">
                        <img src={user.mainPhotoUrl} alt={user.name} />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="font-semibold">Blood Group</td>
                  <td>
                    <span className="badge badge-error badge-outline text-lg">
                      {user.bloodGroup}
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="font-semibold">Location</td>
                  <td>
                    {user.upazila}, {user.districts}
                  </td>
                </tr>

                <tr>
                  <td className="font-semibold">Role</td>
                  <td>
                    <span className="badge badge-primary">{user.role}</span>
                  </td>
                </tr>

                <tr>
                  <td className="font-semibold">Status</td>
                  <td>
                    <span className="badge badge-success">{user.status}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    {user?.status === "active" ? (
                      <button
                        className="badge badge-success cursor-pointer"
                        onClick={() =>
                          handleChangeStatus(user?.email, "blocked")
                        }
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        className="badge badge-warning cursor-pointer"
                        onClick={() =>
                          handleChangeStatus(user?.email, "active")
                        }
                      >
                        Activate
                      </button>
                    )}
                  </td>

                  {recentUser?.role === "admin" && (
                    <td>
                      <div className="dropdown dropdown-start">
                        <div tabIndex={0} role="button" className="btn m-1">
                          make
                        </div>
                        <ul
                          tabIndex="-1"
                          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                        >
                          <li>
                            <button
                              onClick={() =>
                                handleStatus(user?.email, "volunteer")
                              }
                            >
                              volunteer
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleStatus(user?.email, "admin")}
                            >
                              admin
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  )}
                  {recentUser?.role === "volunteer" && (
                    <td>
                      <div className="dropdown dropdown-start">
                        <div tabIndex={0} role="button" className="btn m-1">
                          make
                        </div>
                        <ul
                          tabIndex="-1"
                          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                        >
                          <li>
                            <button>volunteer</button>
                          </li>
                          <li>
                            <button>admin</button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  )}
                </tr>

                <tr>
                  <td className="font-semibold">Joined At</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllUser;
