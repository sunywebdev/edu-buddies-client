import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useParams } from "react-router-dom";

const TeachersProfile = () => {
  const { teacherId } = useParams();
  const [singleTeacher, setSingleTeacher] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/singleTeacher/${teacherId}`)
      .then((res) => res.json())
      .then((data) => setSingleTeacher(data));
  }, []);

  return (
    <div className=" container mt-4 px-10">
      <div className="flex flex-row">
        <div className="basis-1/4 text-left border rounded-md">
          <img
            className="rounded-t-md"
            src={singleTeacher?.image}
            alt="Teachers"
          />
          <div className="flex justify-between items-center border-b-2 border-red-500 px-5 py-2 bg-gray-800 font-bold tracking-widest">
            <h4 className="text-lg text-red-500">{singleTeacher?.name}</h4>
            <h4 className="text-white">{singleTeacher?.designation}</h4>
          </div>
          <div className="pl-5 shadow-md text-lg pt-2 pb-7">
            <h4>
              <span className="font-bold">Email:</span> {singleTeacher?.email}
            </h4>
            <h4>
              <span className="font-bold">Phone:</span> {singleTeacher?.phone}
            </h4>
            <h4>
              <span className="font-bold">Age:</span> {singleTeacher?.age}
            </h4>
            <h4>
              <span className="font-bold">Gender:</span> {singleTeacher?.gender}
            </h4>
            <h4>
              <span className="font-bold">Address:</span>{" "}
              {singleTeacher?.address?.street}, {singleTeacher?.address?.city},{" "}
              {singleTeacher?.address?.zipcode}
            </h4>
            <h4>{singleTeacher?.country}</h4>
          </div>
        </div>
        <div className="basis-3/4 ml-10 border rounded-md shadow-md pb-5">
          <h4 className="text-left text-2xl p-5 font-semibold">
            About Of
            <span className="text-red-500 text-3xl">
              {" "}
              {singleTeacher?.name}
            </span>
          </h4>
          <hr />
          <div className="pl-5 text-left">
            <p className="text-gray-500 my-4 tracking-wider">
              {singleTeacher?.about}
            </p>
            <h2 className="text-2xl font-bold">Skills</h2>
            <h4 className="my-6">
              {singleTeacher?.Experties?.map((expert, key) => (
                <span
                  className="mr-4 bg-gray-800 text-red-500 py-2 px-4 rounded-md"
                  key={key}
                >
                  {expert}
                </span>
              ))}
            </h4>
            <h2 className="text-2xl font-bold">Language</h2>
            <h4 className="my-6">
              {singleTeacher?.language?.map((lang, key) => (
                <span
                  className="mr-4 bg-gray-800 py-2 px-4 text-red-500 rounded-md"
                  key={key}
                >
                  {lang}
                </span>
              ))}
            </h4>
            <h2 className="text-lg mb-2">
              <span className="font-bold">Experience: </span>
              {singleTeacher?.experinece} Years
            </h2>
            <h2 className="text-lg mb-2">
              <span className="font-bold">Operation Done: </span>
              <CountUp
                start={0}
                end={singleTeacher?.operationDone}
                duration={4.25}
              />
            </h2>
            <h2 className="text-lg mb-2">
              <span className="font-bold">Join Date: </span> 10-February-2020
            </h2>
            <h2 className="text-lg mb-4">
              <span className="font-bold">Job Type: </span>
              {singleTeacher?.type}
            </h2>
            <button className="bg-red-500 border border-red-500 text-white px-4 py-2 rounded-md hover:bg-transparent hover:text-red-500">
              View Published Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachersProfile;
