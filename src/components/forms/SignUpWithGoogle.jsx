import { FcGoogle } from "react-icons/fc";
import { useFirebase } from "../../FirebaseProvider";
function SignUpWithGoogle({ onClose }) {
  let { googleLogin } = useFirebase();

  return (
    <div className="w-full ">
      <button
        className="flex justify-between items-center border border-gray-500 p-2 px-5 w-full font-semibold rounded"
        onClick={() => {
          googleLogin()
          onClose()
        }}
      >
        <span className="text-2xl">
          <FcGoogle />
        </span>
        <span className="w-[90%]">Continue with google</span>
      </button>
    </div>
  );
}

export default SignUpWithGoogle;
