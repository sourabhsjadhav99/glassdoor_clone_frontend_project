import React from "react";
import { useFirebase } from "../FirebaseProvider";
import EditProfileForm from "../components/forms/EditProfileForm";
import CreateProfileForm from "../components/forms/CreateProfileForm";

function CreateEditProfilePage() {
  let {userData} =useFirebase()
  return (
    <div className=" flex justify-center p-5 ">
      <div className="w-[100%] md:w-[50%] lg:w-[40%] border  p-5 rounded bg-white">
        {userData ?<EditProfileForm/> :<CreateProfileForm/>}
      </div>
    </div>
  );
}

export default CreateEditProfilePage;
