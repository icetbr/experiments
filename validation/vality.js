import { v, Parse } from "vality";

const Person = {
  name: v.string({maxLength}),
  age: v.number({ min: 6 }),
  email: v.email,
  referral: ["friends", "ad", "media", null],
  languages: [["de", "en", "fr", "se"]],
};
