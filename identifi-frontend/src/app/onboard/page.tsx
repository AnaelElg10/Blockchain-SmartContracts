"use client";

import { useState } from "react";
import { getContract, prepareContractCall } from "thirdweb";
import { TransactionButton } from "thirdweb/react";
import { sepolia } from "thirdweb/chains";
import { client } from "../client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BasicInfo, ProfessionalInfo, SocialMedia, userIdentityInfo, userIdentitySchema, Visibility } from "../utils/types";
import InputUI from "../components/InputUI";
import { useFeedback } from "@/app/context/feadback";


const CreateIdentityModal = () => {
  const { setFeedback } = useFeedback();

  // Récupération du contrat IdentiFi
  const contract = getContract({
    client,
    chain: sepolia,
    address: process.env.NEXT_PUBLIC_TEMPLATE_CONTRACT_address as string,
  });

  const {
    register,
    getValues,
    formState: { errors },
  } = useForm<userIdentityInfo>({
    resolver: zodResolver(userIdentitySchema),
  });

  // Fonction pour préparer la transaction à partir des valeurs du formulaire
  const prepareTx = () => {
    const data = getValues();

    // Construction du BasicInfo
    const basicInfo : BasicInfo = {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username, 
      email: data.email,
      homeAddress: data.homeAddress,
      phone: data.phoneNumber,
      dateOfBirth: (new Date(data.dateOfBirth)).toDateString(),
    };

    // Construction du ProfessionalInfo
    const professionalInfo : ProfessionalInfo = {
      education: data.Education,
      occupation: data.jobTitle,
      workExperience: data.workHistory,
      skills: [], // Valeur par défaut
      info: "",   // Valeur par défaut
      image: "",  // Valeur par défaut
    };

    // Construction du SocialMedia (valeurs par défaut)
    const socialMedia : SocialMedia = {
      x: "",
      instagram: "",
      youtube: "",
      linkedin: "",
    };

    // Définition d'une visibilité par défaut
    const visibility : Visibility = {
      education: true,
      workExperience: true,
      phone: true,
      homeAddress: true,
      dateOfBirth: true,
    };
    // @ts-ignore
    return prepareContractCall({
      contract,
      method:
        "function createUser(string username, (string firstName, string lastName, string username, string email, string homeAddress, string phone, string dateOfBirth) basicInfo, (string education, string occupation, string workExperience, string[] skills, string info, string image) professionalInfo, (string x, string instagram, string youtube, string linkedin) socialMedia, (bool education, bool workExperience, bool phone, bool homeAddress, bool dateOfBirth) visibility)",
      params: [
        data.username,
        basicInfo,
        professionalInfo,
        socialMedia,
        visibility,
      ],
    });
  };

  return (
    <div className="w-full mt-10">
      <div className="bg-white p-4 rounded-md shadow-lg grid gap-8">
          <h1 className="text-2xl text-center font-extrabold text-gray-600">Create Identity</h1>
        {/* Formulaire d'identité */}
        <form className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <InputUI
              id="firstName"
              type="text"
              labelText="First Name"
              register={register("firstName")}
              error={errors.firstName}
            />
            <InputUI
              id="lastName"
              type="text"
              labelText="Last Name"
              register={register("lastName")}
              error={errors.lastName}
            />
          </div>

          <InputUI
            id="username"
            type="text"
            labelText="Username"
            register={register("username")}
            error={errors.username}
          />

          <div className="flex flex-col gap-4 sm:flex-row">
            <InputUI
              id="homeAddress"
              type="text"
              labelText="Home Address"
              register={register("homeAddress")}
              error={errors.homeAddress}
            />
            <InputUI
              id="dateOfBirth"
              type="date"
              labelText="Date of Birth"
              register={register("dateOfBirth")}
              error={errors.dateOfBirth}
            />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <InputUI
              id="Education"
              type="text"
              labelText="Education"
              register={register("Education")}
              error={errors.Education}
            />
            <InputUI
              id="workHistory"
              type="text"
              labelText="Work History"
              register={register("workHistory")}
              error={errors.workHistory}
            />
          </div>

          <InputUI
            id="email"
            type="email"
            labelText="Email"
            register={register("email")}
            error={errors.email}
          />
          <InputUI
            id="phoneNumber"
            type="text"
            labelText="Phone Number"
            register={register("phoneNumber")}
            error={errors.phoneNumber}
          />
          <InputUI
            id="jobTitle"
            type="text"
            labelText="Job Title"
            register={register("jobTitle")}
            error={errors.jobTitle}
          />
        </form>

        {/* Bouton de création d'identité */}
        <TransactionButton
          unstyled
          transaction={prepareTx}
          onTransactionConfirmed={() => {
            setFeedback({ message: "Identity Created Successfully!", type: "success" });
          }}
          onError={(error) => {
            setFeedback({ message: error.message, type: "error" });
          }}
          className="mt-6 w-full bg-purple-600 text-white p-3 rounded-md font-medium shadow-md hover:bg-purple-800 transition-all"
        >
          Create Identity
        </TransactionButton>
      </div>
    </div>
  );
};

export default CreateIdentityModal;
