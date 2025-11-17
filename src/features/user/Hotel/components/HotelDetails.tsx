// import { useEffect, useState } from "react";
// import hotel1 from "@/assets/hotel1.jpg";
// import hotel2 from "@/assets/hotel2.jpg";
// import hotel3 from "@/assets/hotel3.jpg";
// import hotel4 from "@/assets/hotel4.jpg";
// import hotel5 from "@/assets/hotel5.jpg";
// import hotel6 from "@/assets/hotel6.jpg";
// import hotel7 from "@/assets/hotel7.jpg";
// import hotel8 from "@/assets/hotel8.jpg";

// export default function HotelDetails() {
//   interface HotelImages {
//     src: string;
//   }
//   interface HotelData {
//     name: string;
//     location: string;
//     images: HotelImages[];
//   }

//   const hotelData: HotelData = {
//     name: "New Comfort Inn Giza",
//     location: "Al Mansoureya Road, Giza, 12512 Cairo, Egypt",
//     images: [
//       { src: hotel1 },
//       { src: hotel2 },
//       { src: hotel3 },
//       { src: hotel4 },
//       { src: hotel5 },
//       { src: hotel6 },
//       { src: hotel7 },
//       { src: hotel8 },
//     ],
//   };

//   const images = hotelData.images;

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isOpen, setIsOpen] = useState(false);

//   const openModal = (index: number) => {
//     setCurrentIndex(index);
//     setIsOpen(true);
//   };

//   const closeModal = () => setIsOpen(false);

//   const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);

//   const prevImage = () =>
//     setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

//   useEffect(() => {
//     const handleKey = (e: KeyboardEvent) => {
//       if (!isOpen) return;
//       if (e.key === "Escape") closeModal();
//       if (e.key === "ArrowRight") nextImage();
//       if (e.key === "ArrowLeft") prevImage();
//     };
//     window.addEventListener("keydown", handleKey);
//     return () => window.removeEventListener("keydown", handleKey);
//   }, [isOpen]);

//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isOpen]);
//   const mainImage = images[currentIndex];
//   const sideImages = images.slice(1, 4);
//   const thumbnails = images.slice(0, 3);

//   return (
//     <>
//       <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
//         {/* Left: Image Gallery */}
//         <div className="flex-1">
//           {/* Main & Side Images */}
//           <div className="flex flex-col md:flex-row gap-4">
//             {/* Main Image */}
//             <div className="w-full sm:w-[450px] h-48 sm:h-64 md:h-96 lg:h-[400px]">
//               <img
//                 src={mainImage.src}
//                 alt=""
//                 className="w-full h-full object-cover rounded-lg cursor-pointer"
//                 onClick={() => openModal(currentIndex)}
//               />
//             </div>

//             {/* Side Images */}
//             <div className="hidden md:flex flex-col gap-2 md:w-[200px] lg:w-[200px] h-auto md:h-[380px]">
//               {sideImages.map((img, idx) => (
//                 <img
//                   key={idx}
//                   src={img.src}
//                   onClick={() => openModal(idx + 1)}
//                   className="w-full h-1/3 object-cover rounded-lg cursor-pointer border border-gray-300 hover:border-black"
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Bottom Thumbnails */}
//           <div className="mt-4 flex gap-3 overflow-x-auto">
//             {thumbnails.map((img, idx) => (
//               <img
//                 key={idx}
//                 src={img.src}
//                 onClick={() => openModal(idx)}
//                 className={`h-20 w-36 object-cover rounded-lg cursor-pointer
//           ${
//             currentIndex === idx
//               ? "ring-2 ring-blue-500"
//               : "border border-gray-300"
//           }
//           hover:opacity-80`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Modal */}
//         {isOpen && (
//           <div
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
//             onClick={(e) => {
//               if (e.target === e.currentTarget) closeModal();
//             }}
//           >
//             <div className="relative bg-white rounded-xl max-w-[95%] max-h-[85vh] w-full p-4 flex items-center justify-center shadow-lg sm:p-6">
//               {/* Close Button */}
//               <button
//                 onClick={closeModal}
//                 className="absolute top-2 right-2 text-gray-700 text-2xl font-bold hover:text-black sm:top-4 sm:right-4 sm:text-3xl"
//               >
//                 ✕
//               </button>

//               {/* Left Arrow */}
//               <button
//                 onClick={prevImage}
//                 className="absolute left-2 text-gray-700 text-3xl font-bold px-2 py-1 bg-white/70 rounded-full hover:bg-white/90 sm:left-4 sm:text-4xl"
//               >
//                 ❮
//               </button>

//               {/* Image */}
//               <img
//                 src={images[currentIndex].src}
//                 className="max-w-full max-h-[70vh] object-contain rounded-lg"
//                 alt=""
//               />

//               {/* Right Arrow */}
//               <button
//                 onClick={nextImage}
//                 className="absolute right-2 text-gray-700 text-3xl font-bold px-2 py-1 bg-white/70 rounded-full hover:bg-white/90 sm:right-4 sm:text-4xl"
//               >
//                 ❯
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

import { useParams } from "react-router";
import { useHotel } from "../hook/useHotel";
import HotelImages from "../components/HotelImages";
// import HotelMap from "./HotelMap";
import HotelRooms from "./HotelRooms";

export default function HotelDetails() {
  const { id } = useParams();
  const { data: hotel, isLoading, error } = useHotel(id!);

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6">Error loading hotel</div>;
  if (!hotel) return <div className="p-6">No hotel found</div>;

  return (
    <div className="p-6 mt-10">
      {/* Basic Info */}
      <h1 className="text-5xl font-extrabold mt-4">{hotel.name}</h1>

      <p className="text-gray-600 mt-3   text-lg">
        {hotel.address.city}, {hotel.address.country}
      </p>

      {/* Images */}
      <HotelImages cover={hotel.imageCoverUrl} images={hotel.imagesUrls} />

      {/* Rating */}
      {/*  */}
      {/* <p className="text-yellow-500 font-semibold mt-2">
        ⭐ {hotel.stars} stars — {hotel.averageRating} rating 
      </p> */}

      {/* <div className="w-3xl mt-6 border rounded-2xl p-5 flex items-center justify-evenly shadow-sm bg-white">
        <div className="flex items-center gap-3">
          <svg
            viewBox="0 0 32 32"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            className="w-8 h-8 text-black"
          >
            <path d="M16 3C12 10 6 10 6 16c0 5 4 8 10 12 6-4 10-7 10-12 0-6-6-6-10-13z" />
          </svg>

          <div>
            <p className="font-semibold text-lg">Guest favorite</p>
            <p className="text-gray-600 text-sm -mt-1">
              One of the most loved homes on our platform, according to guests
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="text-center">
            <p className="text-2xl font-semibold">{hotel.averageRating}</p>

            <div className="flex gap-1 text-yellow-500 text-sm ">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <span key={i}>★</span>
                ))}
            </div>
          </div>
        </div>
      </div> */}

      {/* Description */}
      <p className="mt-4 text-gray-700 leading-relaxed">{hotel.Description}</p>

      {/* Rooms */}
      {/* {hotel.rooms && hotel.rooms.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-3">Available Rooms</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hotel.rooms.map((room) => (
              <div key={room._id} className="border rounded-lg p-4 shadow">
                <h3 className="font-semibold text-xl">{room.name}</h3>
                <p className="text-gray-600">Capacity: {room.capacity}</p>
                <p className="text-gray-800 font-medium mt-2">
                  ${room.price} / night
                </p>

                <ul className="list-disc ml-5 mt-2 text-gray-600">
                  {room.amenities?.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )} */}

      <HotelRooms rooms={hotel.rooms || []} />

      {/* <HotelMap
        latitude={hotel.location.coordinates[1]}
        longitude={hotel.location.coordinates[0]}
        name={hotel.name}
      /> */}
    </div>
  );
}
