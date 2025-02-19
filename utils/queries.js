import { ethers } from "ethers";
import { contract } from "./index";

// Function to parse error messages
function parseErrorMsg(e) {
  const json = JSON.parse(JSON.stringify(e));
  return json?.reason || json?.error?.message || "Unknown error occurred";
}

// Function to handle contract interactions
async function handleContractInteraction(callback) {
  try {
    const contractObj = await contract();
    return await callback(contractObj);
  } catch (e) {
    console.error("Error in contract interaction:", e);
    return parseErrorMsg(e);
  }
}

// Function to get username by address
export async function getUsernameByAddress(userAddress) {
  return handleContractInteraction(async (contractObj) => {
    return await contractObj.getUsernameByAddress(userAddress);
  });
}

// Function to create a new user
export async function createUser(username, basicInfo, professionalInfo, socialLinks, visibility) {
  return handleContractInteraction(async (contractObj) => {
    const transactionResponse = await contractObj.createUser(
      username,
      basicInfo,
      professionalInfo,
      socialLinks,
      visibility
    );
    return await transactionResponse.wait();
  });
}

// Function to edit user information
export async function editUser(username, basicInfo, professionalInfo, socialLinks, visibility) {
  return handleContractInteraction(async (contractObj) => {
    const transactionResponse = await contractObj.editUser(
      username,
      basicInfo,
      professionalInfo,
      socialLinks,
      visibility
    );
    return await transactionResponse.wait();
  });
}

// Function to get user information by username
export async function getUserByUsername(username) {
  return handleContractInteraction(async (contractObj) => {
    const user = await contractObj.getUserByUsername(username);
    return {
      basicInfo: {
        firstName: user.basicInfo.firstName,
        lastName: user.basicInfo.lastName,
        email: user.basicInfo.email,
        homeAddress: user.basicInfo.homeAddress,
        dateOfBirth: user.basicInfo.dateOfBirth,
        phoneNumber: user.basicInfo.phoneNumber,
      },
      professionalInfo: {
        education: user.professionalInfo.education,
        workHistory: user.professionalInfo.workHistory,
        jobTitle: user.professionalInfo.jobTitle,
        info: user.professionalInfo.info,
        skills: user.professionalInfo.skills,
        imageURL: user.professionalInfo.imageURL,
      },
      socialLinks: {
        x: user.socialLinks.x,
        instagram: user.socialLinks.instagram,
        tiktok: user.socialLinks.tiktok,
        youtube: user.socialLinks.youtube,
        linkedin: user.socialLinks.linkedin,
      },
      visibility: {
        education: user.visibility.education,
        workHistory: user.visibility.workHistory,
        phoneNumber: user.visibility.phoneNumber,
        homeAddress: user.visibility.homeAddress,
        dateOfBirth: user.visibility.dateOfBirth,
      },
    };
  });
}

// Function to get user information by address
export async function getUserByAddress(userAddress) {
  return handleContractInteraction(async (contractObj) => {
    const user = await contractObj.getUserByAddress(userAddress);
    return {
      basicInfo: {
        firstName: user.basicInfo.firstName,
        lastName: user.basicInfo.lastName,
        email: user.basicInfo.email,
        homeAddress: user.basicInfo.homeAddress,
        dateOfBirth: user.basicInfo.dateOfBirth,
        phoneNumber: user.basicInfo.phoneNumber,
      },
      professionalInfo: {
        education: user.professionalInfo.education,
        workHistory: user.professionalInfo.workHistory,
        jobTitle: user.professionalInfo.jobTitle,
        info: user.professionalInfo.info,
        skills: user.professionalInfo.skills,
        imageURL: user.professionalInfo.imageURL,
      },
      socialLinks: {
        x: user.socialLinks.x,
        instagram: user.socialLinks.instagram,
        tiktok: user.socialLinks.tiktok,
        youtube: user.socialLinks.youtube,
        linkedin: user.socialLinks.linkedin,
      },
      visibility: {
        education: user.visibility.education,
        workHistory: user.visibility.workHistory,
        phoneNumber: user.visibility.phoneNumber,
        homeAddress: user.visibility.homeAddress,
        dateOfBirth: user.visibility.dateOfBirth,
      },
    };
  });
}

// Function to add a job ID that a user has applied to
export async function addJob(username, jobId) {
  return handleContractInteraction(async (contractObj) => {
    const transactionResponse = await contractObj.addJob(username, jobId);
    return await transactionResponse.wait();
  });
}

// Function to get all job IDs applied by a user
export async function getJobs(username) {
  return handleContractInteraction(async (contractObj) => {
    const jobIds = await contractObj.getJobs(username);
    return jobIds.map((jobId) => jobId.toString());
  });
}

// Function to set the visibility of user information
export async function setVisibility(username, education, workHistory, phoneNumber, homeAddress, dateOfBirth) {
  return handleContractInteraction(async (contractObj) => {
    const transactionResponse = await contractObj.setVisibility(
      username,
      education,
      workHistory,
      phoneNumber,
      homeAddress,
      dateOfBirth
    );
    return await transactionResponse.wait();
  });
}

// Function to get the visibility of user information
export async function getVisibility(username) {
  return handleContractInteraction(async (contractObj) => {
    const visibility = await contractObj.getVisibility(username);
    return {
      education: visibility.education,
      workHistory: visibility.workHistory,
      phoneNumber: visibility.phoneNumber,
      homeAddress: visibility.homeAddress,
      dateOfBirth: visibility.dateOfBirth,
    };
  });
}