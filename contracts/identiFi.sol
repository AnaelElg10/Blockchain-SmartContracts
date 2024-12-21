// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract IdentiFi {
    struct User {
        string firstName;
        string lastName;
        string username;
        string email;
        string homeAddress;
        string dateOfBirth;
        string education;
        string occupation;
        string phone;
        string workExperience;
        string x;
        string instagram;
        string youtube;
        string linkedin;
        string info;
        string[] skills;
        string image;

        bool exist;

        uint[] appliedJobs;

        Visibility visibility;

    }

    struct Visibility {
        bool education;
        bool workExperience;
        bool phone;
        bool homeAddress;
        bool dateOfBirth;
    }

    struct BasicInfo {
        string firstName;
        string lastName;
        string username;
        string email;
        string homeAddress;
        string phone;
        string dateOfBirth;
    }

    struct SocialMedia {
        string x;
        string instagram;
        string youtube;
        string linkedin;
    }

    struct ProfessionalInfo {
        string education;
        string occupation;
        string workExperience;
        string[] skills;
        string info;
        string image;
    }

    mapping(string => User) private users;
    mapping(address => string) private addresses;
    mapping(string => bool) private usernames;

    modifier onlyUniqueUsername(string memory _username) {
        require(!usernames[_username], "Username already exists");
        _;
    }

    // function createUser is used to create a new user
    function createUser(
        string memory username,
        BasicInfo memory basicInfo,
        ProfessionalInfo memory professionalInfo,
        SocialMedia memory socialMedia,
        Visibility memory visibility
    ) public onlyUniqueUsername(username) {
        User storage user = users[username];
        user.firstName = basicInfo.firstName;
        user.lastName = basicInfo.lastName;
        user.username = basicInfo.username;
        user.email = basicInfo.email;
        user.homeAddress = basicInfo.homeAddress;
        user.dateOfBirth = basicInfo.dateOfBirth;
        user.education = professionalInfo.education;
        user.occupation = professionalInfo.occupation;
        user.phone = basicInfo.phone;
        user.workExperience = professionalInfo.workExperience;
        user.x = socialMedia.x;
        user.instagram = socialMedia.instagram;
        user.youtube = socialMedia.youtube;
        user.linkedin = socialMedia.linkedin;
        user.info = professionalInfo.info;
        user.skills = professionalInfo.skills;
        user.image = professionalInfo.image;
        user.exist = true;
        user.visibility = visibility;

        usernames[username] = true;
        addresses[msg.sender] = username;
    }

    function editUser(
        string memory username,
        BasicInfo memory basicInfo,
        ProfessionalInfo memory professionalInfo,
        SocialMedia memory socialMedia,
        Visibility memory visibility
    ) public {
        require(users[username].exist, "User does not exist");
        User storage user = users[username];
        user.firstName = basicInfo.firstName;
        user.lastName = basicInfo.lastName;
        user.username = basicInfo.username;
        user.email = basicInfo.email;
        user.homeAddress = basicInfo.homeAddress;
        user.dateOfBirth = basicInfo.dateOfBirth;
        user.education = professionalInfo.education;
        user.occupation = professionalInfo.occupation;
        user.phone = basicInfo.phone;
        user.workExperience = professionalInfo.workExperience;
        user.x = socialMedia.x;
        user.instagram = socialMedia.instagram;
        user.youtube = socialMedia.youtube;
        user.linkedin = socialMedia.linkedin;
        user.info = professionalInfo.info;
        user.skills = professionalInfo.skills;
        user.image = professionalInfo.image;
        user.exist = true;
        user.visibility = visibility;
    }

    function getUserbyUsername(string memory username) public view returns (
        BasicInfo memory basicInfo,
        ProfessionalInfo memory professionalInfo,
        SocialMedia memory socialMedia,
        Visibility memory visibility
    ) {
        require(users[username].exist, "User does not exist");
        User storage user = users[username];
        basicInfo = BasicInfo({
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            homeAddress: user.homeAddress,
            phone: user.phone,
            dateOfBirth: user.dateOfBirth
        });
        professionalInfo = ProfessionalInfo({
            education: user.education,
            occupation: user.occupation,
            workExperience: user.workExperience,
            skills: user.skills,
            info: user.info,
            image: user.image
        });
        socialMedia = SocialMedia({
            x: user.x,
            instagram: user.instagram,
            youtube: user.youtube,
            linkedin: user.linkedin
        });
        visibility = user.visibility;
        return (basicInfo, professionalInfo, socialMedia, visibility);
    }

    function getUserByAddress(address userAddress) public view returns (
        BasicInfo memory basicInfo,
        ProfessionalInfo memory professionalInfo,
        SocialMedia memory socialMedia,
        Visibility memory visibility
    ) {
        string memory username = addresses[userAddress];
        return getUserbyUsername(username);
    }

    function getUserByUsername(address userAddress) public view returns (string memory) {
        return addresses[userAddress];
    }

    function setVisibility(
        string memory username,
        bool education,
        bool workExperience,
        bool phone,
        bool homeAddress,
        bool dateOfBirth
    ) public {
        require(users[username].exist, "User does not exist");
        User storage user = users[username];
        user.visibility.education = education;
        user.visibility.workExperience = workExperience;
        user.visibility.phone = phone;
        user.visibility.homeAddress = homeAddress;
        user.visibility.dateOfBirth = dateOfBirth;
    }

    function getVisibility(string memory username) public view returns (Visibility memory) {
        require(users[username].exist, "User does not exist");
        return users[username].visibility;
    }
    

}