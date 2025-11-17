import type { Room } from "../api/hotel.api";

interface HotelRoomsProps {
  rooms: Room[];
}
export default function HotelRooms({ rooms }: HotelRoomsProps) {
  if (!rooms || rooms.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-3">Available Rooms</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="border rounded-xl p-4 shadow hover:shadow-lg transition cursor-pointer"
          >
            <h3 className="font-semibold text-xl">{room.name}</h3>
            <p className="text-gray-600 mt-1">Capacity: {room.capacity}</p>
            <p className="text-gray-800 font-medium mt-2">
              {room.price}EGP / night
            </p>
            <ul className="list-disc ml-5 mt-2 text-gray-600">
              {room.amenities.map((amenity) => (
                <li key={amenity}>{amenity}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
