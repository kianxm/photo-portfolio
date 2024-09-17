import MasonryGrid from "@/components/MasonryGrid";
import { imageGalleries, AlbumProps } from "@/utils/types";

export default function ViewAlbumPage({ params }: { params: { id: string } }) {
  const album = imageGalleries.find(
    (gallery: AlbumProps) => gallery.id === params.id
  );

  if (!album) {
    return (
      <div className="w-full flex h-full justify-center items-center text-black py-24">
        <h1 className="text-6xl">Album Not Found</h1>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center text-black py-24">
      <h1 className="text-4xl mb-6">{album.albumName}</h1>
      <MasonryGrid album={album} />
    </div>
  );
}
