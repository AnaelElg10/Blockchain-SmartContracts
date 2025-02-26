import { z } from "zod"

export const userIdentitySchema = z.object({
  firstName : z.string().min(2).max(10), 
  lastName : z.string().min(2).max(10), 
  username : z.string().min(3).max(10), 
  homeAddress : z.string().min(5).max(20), 
  email : z.string().email(), 
  Education : z.string().min(2), 
  phoneNumber : z.string().refine((value) => /^[+]{1}(?:[0-9-()/.]\s?){6,15}[0-9]{1}$/.test(value)), 
  workHistory : z.string().min(2), 
  jobTitle : z.string().min(1), 
  dateOfBirth : z.date()
});

export type userIdentityInfo = z.infer<typeof userIdentitySchema>;

export type BasicInfo = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  homeAddress: string;
  phone: string;
  dateOfBirth: string;
};

export type ProfessionalInfo = {
  education: string;
  occupation: string;
  workExperience: string;
  skills: string[];
  info: string;
  image: string;
};

export type SocialMedia = {
  x: string;
  instagram: string;
  youtube: string;
  linkedin: string;
};

export type Visibility = {
  education: boolean;
  workExperience: boolean;
  phone: boolean;
  homeAddress: boolean;
  dateOfBirth: boolean;
};
