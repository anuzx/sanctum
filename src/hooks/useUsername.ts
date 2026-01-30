import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

const ANIMALS = [
  "wolf",
  "hawk",
  "bear",
  "shark",
  "eagle",
  "lion",
  "panda",
  "raccoon",
];
const STORAGE_KEY = "chat_username"; //store the username in local_storage

const generateUsername = () => {
  const word = ANIMALS[Math.floor(Math.random() * ANIMALS.length)]; //accessing animals array at random index
  return `anonymous-${word}-${nanoid(5)}`;
};

export const useUsername = () => {
    //to make sure a user get the same username everytime (even after refresh), we gonna put the logic inside useEffect
    const [username, setUsername] = useState("");
    
    useEffect(() => {
      const main = () => {
        const stored = localStorage.getItem(STORAGE_KEY); //checking if username exist in local_storage

        if (stored) {
          setUsername(stored);
          return;
        }
        //if user is connecting for 1st time
        const generated = generateUsername(); //generate the username
        localStorage.setItem(STORAGE_KEY, generated); //save the username
        setUsername(generated); //set the username
      };
      main();
    }, []);

    return {username}
}