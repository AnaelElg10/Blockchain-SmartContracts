"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useReadContract } from "thirdweb/react";
import InputUI from "../components/InputUI";
import { getContract } from "thirdweb";
import { client } from "../client";
import { sepolia } from "thirdweb/chains";

export default function Verify() {
  // Load IdentiFi contract
  const contract = getContract({
    client,
    chain: sepolia,
    address: process.env.NEXT_PUBLIC_TEMPLATE_CONTRACT_address as string,
  });

  const [username, setUsername] = useState("");
  const [searchedUsername, setSearchedUsername] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);

  // Read contract hook (disabled by default, triggered manually)
  const { data, isPending, error, refetch } = useReadContract({
    contract,
    method:
      "function getUserbyUsername(string username) view returns ((string firstName, string lastName, string username, string email, string homeAddress, string phone, string dateOfBirth) basicInfo, (string education, string occupation, string workExperience, string[] skills, string info, string image) professionalInfo, (string x, string instagram, string youtube, string linkedin) socialMedia, (bool education, bool workExperience, bool phone, bool homeAddress, bool dateOfBirth) visibility)",
    params: [searchedUsername],
  });

  const handleSearch = async () => {
    if (username.trim() === "" || username === searchedUsername) return;
    setSearchedUsername(username);
    setSearchTriggered(true);
    await refetch();
  };

  const handleClear = () => {
    setUsername("");
    setSearchedUsername("");
    setSearchTriggered(false);
  };

  // Reset search when username is empty
  useEffect(() => {
    if (!username) {
      setSearchTriggered(false);
    }
  }, [username]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-4">
      {/* Header */}
      <h1 className="font-medium text-4xl sm:text-5xl text-center mb-6">
        Verify Any Identity
      </h1>

      {/* Search Input */}
      <div className="flex flex-col w-full max-w-md">
        <InputUI
          id="searchUsername"
          type="text"
          labelText="Enter Username"
          register={{
            //@ts-ignore
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value),
            value: username,
          }}
        />
        <div className="flex justify-center gap-3">
          <button
            onClick={handleSearch}
            disabled={!username.trim()}
            className="bg-gray-700 text-slate-50 px-4 py-2 rounded-md shadow-md transition-all duration-500 hover:bg-sky-600/90 hover:shadow-lg font-medium text-sm mt-4 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            Search Identity
          </button>
          {searchTriggered && (
            <button
              onClick={handleClear}
              className="bg-red-600 text-white px-4 py-2 rounded-md shadow-md transition-all duration-500 hover:bg-red-800 font-medium text-sm mt-4"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Search Results Section */}
      <div className="w-full max-w-lg mt-8">
        {searchTriggered && isPending && (
          <p className="text-center text-gray-500">Loading identity...</p>
        )}
        {searchTriggered && error && (
          <p className="text-center text-red-600 font-medium">
            Error: User not found
          </p>
        )}
        {searchTriggered && data && (
          <div className="bg-white p-6 rounded-md shadow-lg text-left">
            <h2 className="text-xl font-bold mb-4 text-center">User Found</h2>

            {/* Extracting data from contract response */}
            <p>
              <strong>First Name:</strong> {data[0]?.firstName || "N/A"}
            </p>
            <p>
              <strong>Last Name:</strong> {data[0]?.lastName || "N/A"}
            </p>
            <p>
              <strong>Username:</strong> {data[0]?.username || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {data[0]?.email || "N/A"}
            </p>
            <p>
              <strong>Home Address:</strong> {data[0]?.homeAddress || "N/A"}
            </p>
            <p>
              <strong>Date of Birth:</strong> {data[0]?.dateOfBirth || "N/A"}
            </p>
            <p>
              <strong>Phone:</strong> {data[0]?.phone || "N/A"}
            </p>
            <hr className="my-4" />

            {/* Professional Info */}
            <p>
              <strong>Education:</strong> {data[1]?.education || "N/A"}
            </p>
            <p>
              <strong>Occupation:</strong> {data[1]?.occupation || "N/A"}
            </p>
            <p>
              <strong>Work Experience:</strong> {data[1]?.workExperience || "N/A"}
            </p>
            <hr className="my-4" />

            {/* Visibility */}
            <div>
              <strong>Visibility:</strong>
              <p>Education: {data[3]?.education ? "Visible" : "Hidden"}</p>
              <p>Work Experience: {data[3]?.workExperience ? "Visible" : "Hidden"}</p>
              <p>Phone: {data[3]?.phone ? "Visible" : "Hidden"}</p>
              <p>Home Address: {data[3]?.homeAddress ? "Visible" : "Hidden"}</p>
              <p>Date of Birth: {data[3]?.dateOfBirth ? "Visible" : "Hidden"}</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <p className="mt-8 text-2xl text-center w-2/3 mx-auto">
        Create Once, Identify Everywhere with{" "}
        <span className="text-sky-500 font-bold">IdentiFi</span>
      </p>

      {/* Hero Image */}
      <div className="pt-10 xl:pt-20 flex justify-center">
        <Image
          src="/assets/ReadingSideDoodle.svg"
          alt="hero image"
          width={1000}
          height={1000}
          className="w-60 xl:w-80"
        />
      </div>
    </div>
  );
}
