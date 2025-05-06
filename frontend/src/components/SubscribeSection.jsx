import { useState } from "react";
import toast from "react-hot-toast";
import { LuAmpersand } from "react-icons/lu";


const SubscribeSection = () => {
  const [value, setValue] = useState("");


  // Send Subscribe Handler
  const sendSubscribeHandler = () => {
    if (!value) {
      toast.error("Please Type Your Email Address");
      return null;
    } else {
      toast.success("You Have Been Successfully Subscribed");
      setValue("");
    }

  };

  return (
    <div className="py-16 flex flex-col gap-4 items-center">

      <div className="text-center">
        <h2 className="text-3xl font-semibold text-gray-700 mb-1">Subsscribe Now & Get 20% Off</h2>
        <p className="font-medium text-gray-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit eveniet ipsa? Official.</p>
      </div>

      <div className="w-full md:w-[800px] border border-gray-400 rounded-md flex items-cetner h-[48px]">
        <input onChange={(event) => { setValue(event.target.value); }} value={value}
          type="text" placeholder="Enter Your Email ID" className="flex-1 outline-none px-2 h-[48px]" />
        <button onClick={sendSubscribeHandler} className="w-[150px] h-[48px] bg-primary text-white cursor-pointer transition-all duration-300 hover:bg-blue-700">SUBSCRIBE</button>
      </div>

    </div>
  );
};

export default SubscribeSection;
