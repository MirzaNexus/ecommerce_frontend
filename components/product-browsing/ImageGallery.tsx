export const ImageGallery = ({ images }: { images: string[] }) => (
  <div className="grid gap-4">
    <div className="aspect-4/5 relative overflow-hidden rounded-xl bg-muted">
      <img
        src={images[0] || "/placeholder.png"}
        className="object-cover w-full h-full"
        alt="Main"
      />
    </div>
    <div className="grid grid-cols-4 gap-4">
      {images.slice(1).map((img, i) => (
        <div
          key={i}
          className="aspect-square relative rounded-lg bg-muted overflow-hidden"
        >
          <img src={img} className="object-cover w-full h-full" alt="Thumb" />
        </div>
      ))}
    </div>
  </div>
);
