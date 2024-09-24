import { imageGalleries } from "@/utils/types";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleAlbumClick = (id: string) => {
    router.push(`/album/${id}`);
  };

  return (
    <div
      id="albums"
      className="my-14 flex-1 flex justify-center items-center p-4 md:p-12 h-screen"
    >
      <div className="min-h-full w-full max-w-6xl space-y-4">
        <span className="text-6xl text-black">Albums</span>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {imageGalleries.map((gallery) => (
            <div
              key={gallery.id}
              className="relative flex flex-col items-center justify-center text-black text-center cursor-pointer"
              onClick={() => handleAlbumClick(gallery.id)}
            >
              <div className="relative w-full h-[300px] overflow-hidden rounded-md">
                <img
                  src={gallery.logoSrc}
                  className="w-full h-full object-cover"
                  alt="Descriptive Alt Text"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-md">
                  <span className="text-white text-xl p-4">
                    {gallery.description}
                  </span>
                </div>
              </div>
              <span className="text-xl mt-2">{gallery.albumName}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
