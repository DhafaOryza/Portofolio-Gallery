import { useEffect } from "react";
import { RootState } from "./Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchGallery } from "./Redux/gallerySlice";
import { fetchResume } from "./Redux/resumeSlice";
import { API_URL } from "./utils/api";


const App = () => {
  type Resume = {
    name: string;
    description: string;
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

  const galleryByYear: { [year: number]: any[] } = [];

  gallery.forEach((item: any) => {
    const year = new Date(item.date).getFullYear();
    if (!galleryByYear[year]) {
      galleryByYear[year] = [];
    }
    galleryByYear[year].push(item);
  });

  const sortedYears = Object.keys(galleryByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="w-full h-screen">
      <div className="flex flex-col w-full gap-16 py-16 items-center justify-center">
        <header className="flex flex-col items-center justify-start gap-1">
          <div className="image-profile mb-2 drop-shadow-2xl">
            {resume.imageProfile ? (
              <img src={resume.imageProfile} alt={resume.name} />
            ) : (
              <div className="flex flex-col items-center justify-center gap-1 bg-gray-700 rounded-full w-[100px] h-[100px]">
                <div className="bg-gray-400 rounded-full w-[25px] h-[25px]" />
                <div className="bg-gray-400 rounded-t-full w-[50px] h-[25px]" />
              </div>
            )}
          </div>
          <h1 className="text-3xl">{resume.name}</h1>
          <h4 className="text-lg">{resume.description}</h4>
        </header>

        {gallery.length === 0 ? (
          <section className="flex justify-center w-1/3 h-1/4 p-6 rounded-xl shadow-2xl">
            <p>No Portofolio Posted</p>
          </section>
        ) : (
          <section className="flex p-6 rounded-xl shadow-2xl">
            {sortedYears.map((year) => (
              <div key={year}>
                <h2 className="text-xl font-bold mb-2">{year}</h2>
                <div className="grid grid-cols-3 gap-4">
                  {galleryByYear[year].map((item: any) => (
                    <img
                      key={item.id}
                      src={`${API_URL}${item.imageUrl}`}
                      alt={item.title}
                      className="w-[200px] h-[200px] rounded-xl object-cover shadow-lg"
                    />
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

export default App;