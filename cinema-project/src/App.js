import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './Features/Common/Layouts/jsx/HomePage';
import { Home } from './Features/Home/jsx/Home';
import { Booking } from "./Features/Booking/jsx/Booking";
import { Film } from "./Features/Film/jsx/Film";
import { Event } from "./Features/Event/jsx/Event";
import { AdminPage } from "./Features/Common/Layouts/jsx/AdminPage";
import { Statistical } from "./Features/Admin/Statistical/jsx/Statistical";
import { ManageEmployees } from "./Features/Admin/ManageEmployees/jsx/ManageEmployees";
import { ManageCustomers } from "./Features/Admin/ManageCustomers/jsx/ManageCustomers";
import { ManageFilms } from "./Features/Admin/ManageFilms/jsx/ManageFilms";
import { ManageTickets } from "./Features/Admin/ManageTickets/jsx/ManageTickets";
import { FilmDetail } from "./Features/Film/jsx/FilmDetail";
import { LoginPage } from "./Features/Common/LoginResgister/jsx/LoginPage";
import PrivateRoute from "./Features/Common/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User navigate */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />}>
            <Route path="/login" element={<LoginPage />} />
            <Route index element={<Home />} />
            <Route path="booking" element={<Booking />} />
            <Route path="film" element={<Film />} />
            <Route path="film/detail/:filmId" element={<FilmDetail />} />
            <Route path="corner" element={<Film />} />
            <Route path="event" element={<Event />} />
          </Route>
        </Route>

        {/* Admin navigate */}
        <Route element={<PrivateRoute requiredRoles={[]} />}>
          <Route path="/dashboard/" element={<AdminPage />}>
            <Route index element={<Statistical />} />
            <Route path="manage/employees" element={<ManageEmployees />} />
            <Route path="manage/customers" element={<ManageCustomers />} />
            <Route path="manage/films" element={<ManageFilms />} />
            <Route path="manage/tickets" element={<ManageTickets />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
