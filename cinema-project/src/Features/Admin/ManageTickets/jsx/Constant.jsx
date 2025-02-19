import { API_BASE_URL_ADMIN } from "../../../Common/Constant";

export const API_TICKET = {
    showingTicket: API_BASE_URL_ADMIN + "/tickets",
    addTicket: API_BASE_URL_ADMIN + "/ticket/add",
    deleteTicket: API_BASE_URL_ADMIN + "/ticket",
    getTicket: API_BASE_URL_ADMIN + "/ticket",
    updateTicket: API_BASE_URL_ADMIN + "/ticket/update",
  };

export const TICKET_STATUS = {
  None: 0,
  Booked: 1,
  Booking: 2,
}

export const TICKET_STATUS_STR = [
  "Trống",
  "Đã đặt",
  "Đang đặt",
]