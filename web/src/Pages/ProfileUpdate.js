import { useEffect, useState, useRef } from "react";
import axios from "axios";

function ProfileUpdate() {
  const [userDetail, setUserDetail] = useState({
    uname: "",
    email: "",
    profilePic: "",
    password: "",
    confirmpassword: ""
  });
  const fileInputRef = useRef(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/auth/getuser",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const user = res.data.user;

        setUserDetail({
          uname: user.uname || "",
          email: user.email || "",
          profilePic: user.profilePic || "",
          password: "",
          confirmpassword: ""
        });

      } catch (error) {
        console.error(error);
      }
    };

    if (token) fetchUser();
  }, [token]);

  const handleChange = (e) => {
    setUserDetail({
      ...userDetail,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async () => {
    const { password, confirmpassword, uname, profilePic } = userDetail;

    if (password !== confirmpassword) {
      alert("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append("uname", uname);
    if (password) formData.append("password", password);
    if (profilePic instanceof File) formData.append("profilePic", profilePic);

    try {
      const res = await axios.put(
        "http://localhost:4000/api/auth/updateuser",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Profile updated");
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setUserDetail(prev => ({
        ...prev,
        profilePic: res.data.user.profilePic || prev.profilePic,
        password: "",
        confirmpassword: ""
      }));

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Update Profile</h2>

        {/* Profile Picture */}
        <div className="flex justify-center mb-6 relative">
          <input
            type="file"
            name="profilePic"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={(e) =>
              setUserDetail({
                ...userDetail,
                profilePic: e.target.files[0],
              })
            }
          />

          <img
            src={
              userDetail.profilePic
                ? typeof userDetail.profilePic === "string"
                  ? `http://localhost:4000/uploads/${userDetail.profilePic}`
                  : URL.createObjectURL(userDetail.profilePic)
                : "https://via.placeholder.com/150"
            }
            alt="profile"
            className="h-28 w-28 rounded-full object-cover border-4 border-gray-300 cursor-pointer hover:border-blue-500 transition"
            onClick={() => fileInputRef.current.click()}
          />
          
        </div>

        {/* Form */}
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            name="uname"
            value={userDetail.uname}
            onChange={handleChange}
            placeholder="Name"
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            value={userDetail.email}
            disabled
            className="border rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed"
          />

          <input
            type="password"
            name="password"
            value={userDetail.password}
            onChange={handleChange}
            placeholder="New password"
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            name="confirmpassword"
            value={userDetail.confirmpassword}
            onChange={handleChange}
            placeholder="Confirm password"
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileUpdate;
