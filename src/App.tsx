import { useEffect } from "react";
import { RootState } from "./Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchGallery } from "./Redux/gallerySlice";


const App = () => {
  const dispatch = useDispatch();
  const gallery = useSelector((state: RootState) => state.gallery.items);

  useEffect(() => {
    dispatch<any>(fetchGallery());
  }, [dispatch]);

  return (
    <div className="w-full h-screen">
      <div className="flex items-center justify-center">
        {gallery.length === 0 ? (
          <p>No Portofolio Posted</p>
        ) : (
          <div>
            {gallery.map((item: any) => (
              <img src={item.imageUrl} alt={item.title} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App