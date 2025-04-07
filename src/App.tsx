import { useEffect } from "react";
import { RootState } from "./Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchGallery } from "./Redux/gallerySlice";
import { fetchResume } from "./Redux/resumeSlice";
import { API_URL } from "./utils/api";


const App = () => {
  type Resume = {
    name: string;
    imageProfile?: string;
  }

  const dispatch = useDispatch();
  const gallery = useSelector((state: RootState) => state.gallery.items);
  const resume = useSelector((state: RootState) => state.resume.items) as Resume;

  useEffect(() => {
    dispatch<any>(fetchGallery());
  }, [dispatch]);

  useEffect(() => {
    dispatch<any>(fetchResume());
  }, [dispatch]);

  return (
    <div className="w-full h-screen">
      <div className="flex flex-col w-full h-2/4 gap-16 items-center justify-center">
        <header className="flex flex-col items-center justify-start">
          {resume.imageProfile ? (
            <img src={resume.imageProfile} alt={resume.name} />
          ) : (
            <div className="flex flex-col items-center justify-center gap-1 bg-gray-700 rounded-full w-[100px] h-[100px]">
              <div className="bg-gray-400 rounded-full w-[25px] h-[25px]" />
              <div className="bg-gray-400 rounded-t-full w-[50px] h-[25px]" />
            </div>
          )}
          <h1 className="text-2xl">{resume.name}</h1>
        </header>

        {gallery.length === 0 ? (
          <p>No Portofolio Posted</p>
        ) : (
          <section className="flex flex-row w-1/2 gap-4">
            <div className="flex flex-row">
              {gallery.map((item: any) => (
                <img
                  key={item.id}
                  src={`${API_URL}${item.imageUrl}`}
                  alt={item.title}
                  className="flex w-[200px] h-[200px] rounded-md p-0.5 object-cover shadow-lg"
                />
              ))}
            </div>
          </section>
        )}
      </div >
    </div >
  );
}

export default App