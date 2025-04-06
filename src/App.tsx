import { useEffect } from "react";
import { RootState } from "./Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchGallery } from "./Redux/gallerySlice";
import { API_URL } from "./utils/api";


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
          <div className="flex flex-row">
            {gallery.map((item: any) => (
              <div key={item.id}>
                <img src={`${API_URL}${item.imageUrl}`} alt={item.title} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App