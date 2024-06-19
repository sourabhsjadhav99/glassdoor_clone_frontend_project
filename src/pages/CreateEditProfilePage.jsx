// import React from "react";
// import { useFirebase } from "../FirebaseProvider";
// import EditProfileForm from "../components/forms/EditProfileForm";
// import CreateProfileForm from "../components/forms/CreateProfileForm";

// function CreateEditProfilePage() {
//   let {userData} =useFirebase()
//   return (
//     <div className=" flex justify-center p-5 ">
//       <div className="w-[100%] md:w-[50%] lg:w-[40%] border  p-5 rounded bg-white">
//         {userData ?<EditProfileForm/> :<CreateProfileForm/>}
//       </div>
//     </div>
//   );
// }

// export default CreateEditProfilePage;
import React from "react";
import { useSelector } from "react-redux";
import EditProfileForm from "../components/forms/EditProfileForm";
import CreateProfileForm from "../components/forms/CreateProfileForm";

function CreateEditProfilePage() {
  const userData = useSelector((state) => state.user.userData);

  return (
    <div className="flex justify-center p-5">
      <div className="w-[100%] md:w-[50%] lg:w-[40%] border p-5 rounded bg-white">
        {userData ? <EditProfileForm /> : <CreateProfileForm />}
      </div>
    </div>
  );
}

export default CreateEditProfilePage;
