
'use client'

import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import axios from "axios";
import { useAppContext } from "@/context/AppContext";
import { getCategorySizeOptions } from "@/lib/sizing.mjs";

const AddProduct = () => {

  const { getToken } = useAppContext();

  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('SUIT');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [availableSizes, setAvailableSizes] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const token = await getToken();

      const formData = new FormData();

      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('price', price);
      formData.append('offerPrice', offerPrice);
      formData.append('availableSizes', JSON.stringify(availableSizes));

      for (let i = 0; i < files.length; i++) {
        if (files[i]) {
          formData.append('images', files[i]);
        }
      }

      const { data } = await axios.post(
        '/api/product/add',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {

        alert(data.message);

        setFiles([]);
        setName('');
        setDescription('');
        setCategory('SUIT');
        setPrice('');
        setOfferPrice('');
        setAvailableSizes([]);

      } else {
        alert(data.message);
      }

    } catch (error) {

      console.error('Add product error:', error);

      alert(
        error.response?.data?.message ||
        error.message ||
        'Something went wrong'
      );

    }
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">

      <form
        onSubmit={handleSubmit}
        className="md:p-10 p-4 space-y-5 max-w-lg"
      >

        <div>

          <p className="text-base font-medium">
            Product Image
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-2">

            {[...Array(4)].map((_, index) => (

              <label
                key={index}
                htmlFor={`image${index}`}
              >

                <input
                  onChange={(e) => {

                    const updatedFiles = [...files];

                    updatedFiles[index] = e.target.files[0];

                    setFiles(updatedFiles);

                  }}
                  type="file"
                  id={`image${index}`}
                  hidden
                  accept="image/*"
                />

                <Image
                  key={index}
                  className="max-w-24 cursor-pointer"
                  src={
                    files[index]
                      ? URL.createObjectURL(files[index])
                      : assets.upload_area
                  }
                  alt=""
                  width={100}
                  height={100}
                />

              </label>

            ))}

          </div>

        </div>

        <div className="flex flex-col gap-1 max-w-md">

          <label
            className="text-base font-medium"
            htmlFor="product-name"
          >
            Product Name
          </label>

          <input
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />

        </div>

        <div className="flex flex-col gap-1 max-w-md">

          <label
            className="text-base font-medium"
            htmlFor="product-description"
          >
            Product Description
          </label>

          <textarea
            id="product-description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          ></textarea>

        </div>

        <div className="flex items-center gap-5 flex-wrap">

          <div className="flex flex-col gap-1 w-32">

            <label
              className="text-base font-medium"
              htmlFor="category"
            >
              Category
            </label>

            <select
              id="category"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => { setCategory(e.target.value); setAvailableSizes([]); }}
              value={category}
            >

              <option value="SUIT">
                SUIT
              </option>

              <option value="SHIRT">
                SHIRT
              </option>

              <option value="JACKET">
                JACKET
              </option>

              <option value="TROUSERS">
                TROUSERS
              </option>

              <option value="T-SHIRT">
                T-SHIRT
              </option>

              <option value="KNITWEAR">
                KNITWEAR
              </option>

              <option value="SWEATSHIRT">
                SWEATSHIRT
              </option>

              <option value="OUTERWEAR">
                OUTERWEAR
              </option>

              <option value="SHOE">
                SHOE
              </option>

              <option value="ACCESSORY">
                ACCESSORY
              </option>

              <option value="TUXEDO">
                TUXEDO
              </option>

              <option value="COMBINATIONS">
                COMBINATIONS
              </option>

              <option value="NEW ARRIVALS">
                NEW ARRIVALS
              </option>

              <option value="OUTLET">
                OUTLET
              </option>

            </select>

          </div>

          <div className="flex flex-col gap-1 w-32">

            <label
              className="text-base font-medium"
              htmlFor="product-price"
            >
              Product Price
            </label>

            <input
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />

          </div>

          <div className="flex flex-col gap-1 w-32">

            <label
              className="text-base font-medium"
              htmlFor="offer-price"
            >
              Offer Price
            </label>

            <input
              id="offer-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
              required
            />

          </div>

        </div>

        {getCategorySizeOptions(category).length > 0 && (
          <fieldset className="max-w-md border border-gray-200 p-4">
            <legend className="font-medium px-1">Available sizes *</legend>
            <p className="text-xs text-gray-500 mb-3">Select only the sizes you can supply.</p>
            <div className="flex flex-wrap gap-2">
              {getCategorySizeOptions(category).map(size => (
                <label key={size} className={`cursor-pointer border px-3 py-2 text-sm ${availableSizes.includes(size) ? "bg-black text-white border-black" : "border-gray-300"}`}>
                  <input className="sr-only" type="checkbox" checked={availableSizes.includes(size)}
                    onChange={(e) => setAvailableSizes(prev => e.target.checked ? [...prev, size] : prev.filter(item => item !== size))}/>
                  {size}
                </label>
              ))}
            </div>
          </fieldset>
        )}
        <button
          type="submit"
          disabled={getCategorySizeOptions(category).length > 0 && availableSizes.length === 0}
          className="px-8 py-2.5 bg-black text-white font-medium rounded"
        >
          ADD
        </button>

      </form>

      {/* <Footer /> */}

    </div>
  );
};

export default AddProduct;
