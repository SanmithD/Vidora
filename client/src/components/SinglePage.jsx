import { UserCircle2 } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { VideoStore } from "../store/VideoStore";

function SinglePage() {
  const { id } = useParams();
  const { getVideoById, singleVideo } = VideoStore();

  useEffect(() => {
    if (id) {
      getVideoById(id);
    }
  }, [id, getVideoById]);

  if (!singleVideo) {
    return <p className="p-4 text-gray-500">Loading...</p>;
  }

  return (
    <div className="min-h-screen p-4">
      <div className="space-y-4 max-w-6xl mx-auto">
        <div>
          <p className="flex items-center text-2xl font-bold gap-3">
            <UserCircle2 />
            <span>{singleVideo?.user?.username}</span>
          </p>
          <p className="text-gray-500 text-lg">
            Posted {new Date(singleVideo?.createdAt).toLocaleString()}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 space-y-4">
            <video
              src={singleVideo?.video}
              controls
              className="w-full max-h-[600px] rounded border"
            />
          </div>

          <div className="lg:w-1/3 text-gray-700 text-lg leading-relaxed">
            <p className="text-3xl font-semibold">{singleVideo?.title}</p>
            <p>{singleVideo?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
