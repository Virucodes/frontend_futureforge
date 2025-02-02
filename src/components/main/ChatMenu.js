import React, { useState } from "react";
import Button from "../Button";
import ChatGuide from "./chat/ChatGuide";
import ChatTest from "./chat/ChatTest";
import yourImage from "../../assests/images/Architecture.jpeg";

const ChatMenu = () => {
  const [chatType, setChatType] = useState(null);
  const [isChatVisible, setIsChatVisible] = useState(false);

  return (
    <div className="py-8 px-12 overflow-auto h-full bg-blue-50 text-white font-sans">
      {!chatType && (
        <div className="flex flex-col md:flex-row gap-10 mb-6">
          <div className="w-full md:w-1/2">
            <div className="h-44 border border-blue-600 p-6 mb-5 rounded-lg shadow-xl bg-blue-100">
              <p className="text-blue-900 text-lg text-justify font-medium leading-relaxed">
                <span className="font-semibold text-blue-800">
                  Do you want career guidance?
                </span>
                <br />
                <span className="text-blue-700">
                  "We provide personalized career guidance and advice based on your interests and skills with AI technology. Additionally, we provide recommendations to help you navigate and excel in your career path."
                </span>
              </p>
            </div>

            <Button
              type="button"
              name="Career Guidance"
              onClick={() => {
                setChatType("guidance");
                setIsChatVisible(true);
              }}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md"
            />
          </div>

          <div className="w-full md:w-1/2">
            <div className="h-44 border border-blue-600 p-6 mb-5 rounded-lg shadow-xl bg-blue-100">
              <p className="text-blue-900 text-lg text-justify font-medium leading-relaxed">
                <span className="font-semibold text-blue-800">
                  Do you want to test your knowledge level in skills?
                </span>
                <br />
                <span className="text-blue-700">
                  "We provide a facility to check your knowledge level through a chat interface with AI technology."
                </span>
              </p>
            </div>

            <Button
              type="button"
              name="Knowledge Testing"
              onClick={() => {
                setChatType("testing");
                setIsChatVisible(true);
              }}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-200"
            />
          </div>
        </div>
      )}

      {chatType === "guidance" && (
        <ChatGuide
          visible={isChatVisible}
          onClose={() => {
            setIsChatVisible(false);
            setChatType(null);
          }}
        />
      )}
      
      {chatType === "testing" && (
        <ChatTest
          visible={isChatVisible}
          onClose={() => {
            setIsChatVisible(false);
            setChatType(null);
          }}
        />
      )}

      {!chatType && (
        <div className="mt-10 text-center">
          <p className="text-blue-900 text-lg">
            Please provide your feedback:{" "}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdQYT4B_n3r-v_Tb6wAQqCgWG1F7YwYpIDB8I8L-cUsUmgZaA/viewform?usp=header"
              rel="noreferrer"
              className="text-blue-500 hover:underline"
              target="_blank"
            >
              Click here
            </a>
          </p>
        </div>
      )}

      <div className="mt-12 flex justify-center">
        <img
          src={yourImage}
          alt="Chat Illustration"
          className="w-full md:w-3/4 lg:w-2/3 h-auto rounded-xl shadow-2xl border border-blue-400 p-6 bg-white"
        />
      </div>
    </div>
  );
};

export default ChatMenu;