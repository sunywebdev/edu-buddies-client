import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const AddTeacher = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const onSubmit = (data, e) => {
    axios
      .put("https://fierce-caverns-90976.herokuapp.com/users/teacher", data)
      .then((res) => {
        console.log(res.data);
      });
    e.target.reset();
  };

  return (
    <div className="teacher-background pt-10 xl:pt-48 lg:pt-48">
      <h1 className="text-3xl text-red-500 font-bold ">Make a Teacher</h1>{" "}
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="text-gray-600 focus:ring-2 focus:ring-red-600 focus:outline-none bg-white font-normal py-2 px-4 w-64 mx-auto text-md border-gray-300 rounded border"
          type={"email"}
          {...register("email", { required: true })}
          placeholder="Email to Make Teacher"
        />{" "}
        <br />
        {errors.exampleRequired && <span>This field is required</span>} <br />
        <input
          className="bg-red-500 hover:bg-transparent border border-red-500 duration-300 text-white py-2 px-6 rounded-lg w-32 mx-auto"
          type="submit"
        />{" "}
        <br />
      </form>
    </div>
  );
};

export default AddTeacher;
