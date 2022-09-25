import {
  cancelBooking,
  createBooking,
  getAllBookings,
  getBookingsOfUser,
} from "../services/bookingServices.js";

const handleCreateBooking = async (req, res) => {
  let result = await createBooking(req.body);
  return res.status(200).json(result);
};

const handleGetAllBookings = async (req, res) => {
  let result = await getAllBookings();
  return res.status(200).json(result);
};

const handleGetOneBooking = async (req, res) => {
  let result = await getBookingsOfUser(req.params.id);
  return res.status(200).json(result);
};

const handleDeleteBooking = async (req, res) => {
  let result = await cancelBooking(req.params.id);
  return res.status(200).json(result);
};

export {
  handleCreateBooking,
  handleDeleteBooking,
  handleGetAllBookings,
  handleGetOneBooking,
};
