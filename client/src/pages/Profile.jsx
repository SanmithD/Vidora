import { UserCircle2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "../components/Skeleton";
import { UserStore } from "../store/UserStore";

function Profile() {
  const navigate = useNavigate();
  const { userProfile, profile,logout, isProfile, deleteProfile } = UserStore();

  useEffect(() => {
    profile();
  }, [profile]);

  if(isProfile){
    return <div className="h-screen flex justify-center items-center" ><Skeleton/></div> 
  }

  const videos = Array.isArray(userProfile?.videos)
    ? [...userProfile.videos]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 50)
    : [];

    const handleDelete = async() =>{
      await deleteProfile();
      navigate('/signup');
    }

    const logoutAccount = () =>{
      navigate('/login')
      logout();
    }

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8">
      <div className="flex flex-col items-center mb-8">
        <UserCircle2 className="size-40 md:size-60 mb-4" />
        <p className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-wider">
          {userProfile?.response?.username || "Unknown User"}
        </p>
        <p className="text-lg text-gray-500">
          {userProfile?.response?.email || "No email available"}
        </p>
        <p className="text-gray-500 font-semibold">
          Account created{" "}
          {userProfile?.response?.createdAt
            ? new Date(userProfile.response.createdAt).toLocaleString()
            : "unknown"}
        </p>
        <div className="flex gap-4 ">
          <button onClick={logoutAccount} className="cursor-pointer bg-gray-500 rounded px-1 " >Logout</button>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Delete
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Delete Account</h3>
              <p className="py-4">
                Are you sure delete account ?
              </p>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn bg-red-500 " onClick={handleDelete} >Confirm</button>
                  <button className="btn">Cancel</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>

      <div className="w-full columns-1 sm:columns-2 md:columns-2 gap-4">
        {videos.length > 0 ? (
          videos.map((data) => (
            <div
              key={data._id}
              className="mb-4 break-inside-avoid overflow-hidden rounded-lg border p-2 shadow-sm hover:shadow-md transition"
            >
              <p className="text-gray-500 font-bold ">
                {new Date(data.createdAt).toLocaleDateString()}{" "}
              </p>
              <video
                src={data.video}
                controls
                className="w-full h-auto max-h-[800px] rounded"
              />
              <p className="text-2xl">{data.title} </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 w-full col-span-full">
            No videos found.
          </p>
        )}
      </div>
    </div>
  );
}

export default Profile;
