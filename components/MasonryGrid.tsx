import { generateImagePaths } from "@/utils/generateImagePath";
import { AlbumProps } from "@/utils/types";

export default function MasonryGrid({ album }: { album: AlbumProps }) {
  const images = generateImagePaths(
    album.directory,
    album.fileName,
    album.count
  );

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 px-12 md:px-24 lg:px-36 ">
      {images.map((image, index) => (
        <img
          src={image}
          key={index}
          className="rounded-lg mb-4"
          alt={`alt-${image}`}
        />
      ))}
    </div>
  );
}
