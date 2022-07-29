import {
  cancelBooking,
  createBooking,
  getAllBookings,
  getBookingsOfUser,
} from "../services/bookingServices.js";

const handleCreateBooking = async (req, res) => {
  let result = await createBooking(req.body);
  return res.json(result);
};

const handleGetAllBookings = async (req, res) => {
  let result = await getAllBookings(Booking);
  return res.json(result);
};

const handleGetOneBooking = async (req, res) => {
  let result = await getBookingsOfUser(req.params.id);
  return res.json(result);
};

const handleDeleteBooking = async (req, res) => {
  let result = await cancelBooking(req.params.id);
  return res.json(result);
};

export {
  handleCreateBooking,
  handleDeleteBooking,
  handleGetAllBookings,
  handleGetOneBooking,
};
