import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { backend_url } from './../App';
import axios from "axios";
import { IoClose } from "react-icons/io5";

const Users = ({ aToken }) => {
  const [users, setUsers] = useState([]);


  // Get All Users
  const getAllUsers = async () => {
    try {
      const response = await axios.get(backend_url + "/api/admin/users", {
        headers: { authorization: "Bearer " + aToken }
      });
      if (response.data.success) {
        setUsers(response.data.users);
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  console.log(users);

  return (
    <div className='py-8 px-[3vw] w-full h-[calc(100vh-70px)] overflow-y-scroll'>
      <div className='flex flex-col gap-5 w-full lg:w-[600px]'>
        {
          users.map((user, index) => (
            <div key={index} className='border border-gray-400 p-5 rounded-md grid grid-cols-1 sm:grid-cols-[1fr_2fr_0.5fr] gap-4 items-center'>
              <img src={user.image} alt='user-image' className='w-12 h-12 rounded-full p-[2px] bg-gray-400 border border-primary' />
              <div>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
              </div>
              <div>
                <p className='w-6 h-6 text-xl border border-red-600 bg-red-700 text-white rounded-full flex items-cetner justify-center  cursor-pointer transition-all duration-300 hover:bg-red-400'><IoClose /></p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Users;
