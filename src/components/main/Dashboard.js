import React, { useState, useEffect } from "react";
import { annalysAPI } from "../../config/api.config.js";
import Chart from "../Chart";
import Button from "../Button";

function Dashboard() {
  const [careerAnnalys, setCareerAnnalys] = useState(null);
  const [testAnnalys, setTestAnnalys] = useState(null);

  useEffect(() => {
    fetchAnnalys();
  }, []);

  const fetchAnnalys = async () => {
    try {
      const email = localStorage.getItem("email");
      const response = await annalysAPI.getAnnalys(email);

      setCareerAnnalys(response.data?.careerAnnalys);
      setTestAnnalys(response.data?.testAnnalys);
    } catch (error) {
      console.error("Failed to fetch analysis:", error);
    }
  };

  const resetCareerAnnalys = async () => {
    try {
      const email = localStorage.getItem("email");
      await annalysAPI.updateAnnalys(email, { newCareerSummary: [] });
      fetchAnnalys();
    } catch (error) {
      console.error("Failed to reset career analysis:", error);
    }
  };

  const resetTestAnnalys = async () => {
    try {
      const email = localStorage.getItem("email");
      await annalysAPI.updateAnnalys(email, { newTestSummary: [] });
      fetchAnnalys();
    } catch (error) {
      console.error("Failed to reset test analysis:", error);
    }
  };

  return (
    <div className="flex flex-row gap-6 px-8 py-6 h-screen overflow-auto bg-blue-50">
      <div className="flex flex-col w-1/2 p-6 bg-blue-100 rounded-lg shadow-lg border border-blue-200 overflow-auto">
        <h1 className="text-blue-900 font-bold tracking-wider underline text-xl text-center">
          Career Guidance Analysis
        </h1>

        {careerAnnalys?.length > 0 ? (
          <div className="flex flex-col ml-4 mt-2">
            <div className="flex justify-end">
              <div className="w-20">
                <Button type="button" name="Reset" onClick={resetCareerAnnalys} className="bg-blue-600 text-white hover:bg-blue-700" />
              </div>
            </div>

            {careerAnnalys?.map((item, idx) => (
              <div key={idx} className="flex flex-row gap-6 mt-2 mb-5 p-3 bg-blue-200 rounded-md shadow-sm">
                <div>
                  <div className="text-blue-800 font-semibold">
                    {new Date(item?.date).toLocaleDateString(undefined, { day: "numeric", month: "long" })},{" "}
                    {new Date(item?.date).toLocaleTimeString(undefined, {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </div>
                </div>
                <div className="text-blue-900">
                  {item.summary.split(",").map((line, index) => {
                    const [profession, score] = line.trim().split(":");
                    return (
                      <div key={index}>
                        <span className="font-semibold">{profession}</span> : <span className="text-blue-600">{score} %</span>
                        {index !== item.summary.split(",").length - 1 && <br />} {" "}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            <div className="rounded-md bg-blue-200 p-4 shadow-md">
              <Chart type="pie" chartData={careerAnnalys} />
            </div>
          </div>
        ) : (
          <div className="mt-1 text-blue-600">Please first go to chat and follow the steps...</div>
        )}
      </div>

      <div className="flex flex-col w-1/2 p-6 bg-blue-100 rounded-lg shadow-lg border border-blue-200 overflow-auto">
        <h1 className="text-blue-900 font-bold tracking-wider underline text-xl text-center">
          Knowledge Test Analysis
        </h1>

        {testAnnalys?.length > 0 ? (
          <div className="flex flex-col ml-4 mt-2">
            <div className="flex justify-end">
              <div className="w-20">
                <Button type="button" name="Reset" onClick={resetTestAnnalys} className="bg-blue-600 text-white hover:bg-blue-700" />
              </div>
            </div>
            {testAnnalys?.map((item, idx) => (
              <div key={idx} className="flex flex-row gap-6 p-3 mt-2 bg-blue-200 rounded-md shadow-sm">
                <div className="text-blue-800 font-semibold">
                  {new Date(item?.date).toLocaleDateString(undefined, { day: "numeric", month: "long" })},{" "}
                  {new Date(item?.date).toLocaleTimeString(undefined, {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </div>
                <div className="text-blue-900">{item?.summary}</div>
              </div>
            ))}
            <div className="mt-4 rounded-md bg-blue-200 p-4 shadow-md">
              <Chart type="column" chartData={testAnnalys} />
            </div>
            <div className="flex flex-row gap-4 justify-between bg-blue-600 text-white p-2 rounded-md mt-4">
              <p>1 - Beginner</p>
              <p>2 - Intermediate</p>
              <p>3 - Advanced</p>
              <p>4 - Expert</p>
            </div>
          </div>
        ) : (
          <div className="mt-1 text-blue-600">Please first go to chat and follow the steps...</div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
