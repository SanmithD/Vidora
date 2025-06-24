import { UserCircle2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Skeleton from "../components/Skeleton";
import { VideoStore } from "../store/VideoStore";

function Home() {
  const navigate = useNavigate();
  const { allVideos, isLoading, getAllVideos } = VideoStore();

  useEffect(() => {
    getAllVideos();
  }, [getAllVideos]);

  if(isLoading){
    return <div className="h-screen flex justify-center items-center" ><Skeleton/></div> 
  }

  return (
    <div className="columns-1 sm:columns-2 md:columns-2 gap-4 px-4 py-6 w-full">
      {
        Array.isArray(allVideos) && allVideos.length > 0 ? (
          allVideos.slice(0, 50).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt) ).map((data) => (
            <div
              key={data._id}
              onClick={() => navigate(`/singlePage/${data._id}`) }
              className="mb-4 break-inside-avoid cursor-pointer rounded-lg overflow-hidden border p-4 shadow-sm"
            >
              <div className="mb-2">
                <p className="flex items-center gap-2 font-bold text-lg">
                  <UserCircle2 /> {data.user.username}
                </p>
                <p className="text-sm text-gray-500">{new Date(data.createdAt).toLocaleString()}</p>
              </div>

              <video src={data.video} controls className="w-full max-w-2xl max-h-[700px] rounded" />

              <div className="mt-3">
                <p className="text-xl font-semibold">{data.title}</p>
                <p className="text-gray-600">
                  {data.description.length > 100
                    ? data.description.substring(0, 100) + "..."
                    : data.description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No videos found</p>
        )
      }
    </div>
  );
}

export default Home;
