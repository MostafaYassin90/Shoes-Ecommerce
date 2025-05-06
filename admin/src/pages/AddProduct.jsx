import { useRef, useState } from 'react';
import { assets } from './../assets/asset';
import { toast } from 'react-hot-toast';
import { backend_url } from './../App';
import axios from 'axios';

const AddProduct = ({ aToken }) => {
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("Select Category");
  const [sizes, setSizes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const eleRef = useRef(null);

  // Add Sizes Handler
  const addSizesHandler = (size) => {
    let sizesClone = [...sizes];
    if (sizesClone.includes(size)) {
      sizesClone = sizesClone.filter((item) => item !== size);
    } else {
      sizesClone.push(size);
    }
    setSizes(sizesClone);
  };

  // On Submit Handler
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!image1 && !image2 && !image3 && !image4) {
      toast.error("Please Select Your Product Image");
      return null;
    }
    if (category === "Select Category") {
      toast.error("Please Select Your Product Category");
      return null;
    }
    if (sizes.length === 0) {
      toast.error("Please Select Your Product Size");
      return null;
    }
    if (!title || !description || !price || !discount || !color || !brand) {
      toast.error("The Requireds Data Is Missing");
      return null;
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image1", image1);
      formData.append("image2", image2);
      formData.append("image3", image3);
      formData.append("image4", image4);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("discount", discount);
      formData.append("color", color);
      formData.append("brand", brand);
      formData.append("category", category);
      formData.append("sizes", JSON.stringify(sizes));

      const response = await axios.post(backend_url + "/api/product/add", formData, {
        headers: { authorization: "Bearer " + aToken }
      });
      if (response.data.success) {
        toast.success(response.data.message);
        eleRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        setIsLoading(false);
        setTitle("");
        setDescription("");
        setPrice("");
        setDiscount("");
        setColor("");
        setBrand("");
        setCategory("Select Category");
        setSizes([]);
        setImage1("");
        setImage2("");
        setImage3("");
        setImage4("");
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
      setIsLoading(false);
    }

  };


  return (
    <div className=' h-[calc(100vh-70px)] w-full overflow-y-scroll'>
      <div className='w-full lg:w-[850px]'>
        <form onSubmit={onSubmitHandler} ref={eleRef}
          className='flex flex-col gap-5 px-[3vw] py-8'>
          {/* Image */}
          <div className='flex  items-center gap-4'>
            <label htmlFor='image1' className='cursor-pointer'>
              <img src={image1 ? URL.createObjectURL(image1) : assets.upload_area} className='w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] md:w-[100px] md:h-[100px] p-1 border-2 rounded-sm outline outline-primary border-gray-200' />
              <input type="file" id='image1' hidden
                onChange={(event) => { setImage1(event.target.files[0]); }} />
            </label>
            <label htmlFor='image2' className='cursor-pointer'>
              <img src={image2 ? URL.createObjectURL(image2) : assets.upload_area} className='w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] md:w-[100px] md:h-[100px] p-1 border-2 rounded-sm outline outline-primary border-gray-200' />
              <input type="file" id='image2' hidden
                onChange={(event) => { setImage2(event.target.files[0]); }} />
            </label>
            <label htmlFor='image3' className='cursor-pointer'>
              <img src={image3 ? URL.createObjectURL(image3) : assets.upload_area} className='w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] md:w-[100px] md:h-[100px] p-1 border-2 rounded-sm outline outline-primary border-gray-200' />
              <input type="file" id='image3' hidden
                onChange={(event) => { setImage3(event.target.files[0]); }} />
            </label>
            <label htmlFor='image4' className='cursor-pointer'>
              <img src={image4 ? URL.createObjectURL(image4) : assets.upload_area} className='w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] md:w-[100px] md:h-[100px] p-1 border-2 rounded-sm outline outline-primary border-gray-200' />
              <input type="file" id='image4' hidden
                onChange={(event) => { setImage4(event.target.files[0]); }} />
            </label>
          </div>
          {/* Title */}
          <div>
            <label htmlFor='name' className='font-medium text-gray-700 ml-1 mb-1'>Product Name</label>
            <input required onChange={(event) => { setTitle(event.target.value); }} value={title}
              type="text" id='name' placeholder='Type Here ...'
              className='block w-full border border-gray-400 outline-primary rounded-md py-2 px-3' />
          </div>
          {/* Description */}
          <div>
            <label htmlFor='desc' className='font-medium text-gray-700 ml-1 mb-1'>Product Description</label>
            <textarea required onChange={(event) => { setDescription(event.target.value); }} value={description}
              type="text" id='desc' placeholder='Type Here ...'
              className='block w-full h-[80px] resize-none border border-gray-400 outline-primary rounded-md py-2 px-3' />
          </div>
          {/* Price & Discount */}
          <div className='flex flex-col md:flex-row items-cetner gap-5'>
            <div className='flex-1'>
              <label htmlFor='price' className='font-medium text-gray-700 ml-1 mb-1'>Price</label>
              <input required onChange={(event) => { setPrice(event.target.value); }} value={price}
                type="number" id='price' placeholder='Type Here ...'
                className='block w-full border border-gray-400 outline-primary rounded-md py-2 px-3' />
            </div>
            <div className='flex-1'>
              <label htmlFor='discount' className='font-medium text-gray-700 ml-1 mb-1'>Discount (%)</label>
              <input required onChange={(event) => { setDiscount(event.target.value); }} value={discount}
                type="number" id='discount' placeholder='Type Here ...'
                className='block w-full border border-gray-400 outline-primary rounded-md py-2 px-3' />
            </div>
          </div>

          {/* Color & Brand */}
          <div className='flex flex-col md:flex-row items-cetner gap-5'>
            <div className='flex-1'>
              <label htmlFor='color' className='font-medium text-gray-700 ml-1 mb-1'>Color</label>
              <input required onChange={(event) => { setColor(event.target.value); }} value={color}
                type="text" id='color' placeholder='Type Here ...'
                className='block w-full border border-gray-400 outline-primary rounded-md py-2 px-3' />
            </div>
            <div className='flex-1'>
              <label htmlFor='brand' className='font-medium text-gray-700 ml-1 mb-1'>Brand</label>
              <input required onChange={(event) => { setBrand(event.target.value); }} value={brand}
                type="text" id='brand' placeholder='Type Here ...'
                className='block w-full border border-gray-400 outline-primary rounded-md py-2 px-3' />
            </div>
          </div>
          {/* Category */}
          <div>
            <label htmlFor='category' className='font-medium text-gray-700 ml-1 mb-1'>Category</label>
            <select onChange={(event) => { setCategory(event.target.value); }} value={category}
              id="category" className='block cursor-pointer w-full border border-gray-400 outline-primary rounded-md py-2 px-3'>
              <option value={"Select Category"} disabled>Select Category</option>
              <option value={"Men"}>Men</option>
              <option value={"Women"}>Women</option>
              <option value={"Kids"}>Kids</option>
            </select>
          </div>
          {/* Sizes */}
          <div>
            <p className='font-medium text-gray-700 ml-1 mb-1'>Prduct Sizes</p>
            <div className='grid grid-cols-5 lg:flex md:items-cetner gap-4'>
              {
                Array.from({ length: 11 }, (_, index) => index + 35).map((size, index) => (
                  <p key={index} onClick={() => { addSizesHandler(size); }}
                    className={`border border-gray-400 rounded-sm py-2 px-3 cursor-pointer text-center ${sizes.includes(size) ? "bg-black text-white" : "bg-gray-50"}`}>
                    {size}
                  </p>
                ))
              }
            </div>
          </div>
          {/* Button Add Product */}
          <button type='submit' disabled={isLoading ? true : false} className={`bg-primary text-white py-2 px-3 mt-5 rounded-md font-medium ${isLoading ? "cursor-not-allowed" : "cursor-pointer transition-all duration-300 hover:bg-blue-700"}`}>
            {
              isLoading ? "Loading ..." : "Add Product"
            }
          </button>


        </form>
      </div>
    </div>
  );
};

export default AddProduct;
