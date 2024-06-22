import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider, useUserContext } from "./context/UserContext";

import HomePage from "./pages/homepage";
import LoginPage from "./pages/LoginPage";
import PetDetailsPage from "./pages/PetDetailsPage";
import PetListPage from "./pages/PetListPage";
import RegisterPage from "./pages/RegisterPage";
import PodPage from "./pages/PodPage";
import AddResourcePage from "./pages/resources/AddResourcePage";
import EditResourcePage from "./pages/resources/EditResourcePage";
import ResourceListComponent from "./pages/resources/ResourceListComponent";
import ResourcesPage from "./pages/resources/ResourcesPage";
import AdminResourcesPage from "./pages/admin/AdminResourcesPage";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import UserProfilePage from "./pages/user/UserProfilePage";
// import RoutesWithUserChatComponent from "./components/user/RoutesWithUserChatComponent"; // Comentado para ocultar chat
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminEditUserPage from "./pages/admin/AdminEditUserPage";
import AdminAdoptionsPage from "./pages/admin/AdminAdoptionsPage";
import AdminVerifyUserPage from "./pages/admin/AdminVerifyUserPage";
// import AdminChatsPage from "./pages/admin/AdminChatsPage"; // Comentado para ocultar chat
import AdminEditAdoptionPage from "./pages/admin/AdminEditAdoptionPage";
import AdminAdoptionsDetailsPage from "./pages/admin/AdminAdoptionsDetailsPage";
import AdminPetsPage from "./pages/admin/AdminPetsPage";
import ScrollToTop from "./utils/scrollToTop";
import UserAdoptionsPage from "./pages/user/UserAdoptionsPage";
import "./App.css";

import UserAdoptionDetailsPage from "./pages/user/UserAdoptionDetailsPage";
import UserPetPodDetailsPage from "./pages/user/UserPetPodDetailsPage";
import AddPets from "./pages/pets/AddPets";
import EditPets from "./pages/pets/EditPets";
import SearchResultsPage from "./pages/SearchResultsPage"; // Asegúrate de que este archivo exista

const ProtectedRoute = ({ children }) => {
  const { user } = useUserContext();
  return user ? children : <Navigate to="/LoginPage" />;
};

const AppWrapper = () => (
  <UserProvider>
    <div className="app-container">
      <ScrollToTop />
      <HeaderComponent />
      <div className="content-wrap">
        <Routes>
          {/* Elimina o comenta esta línea si estás ocultando el chat */}
          {/* <Route element={<RoutesWithUserChatComponent />}> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/pets" element={<PetListPage />} />
          <Route path="/PetDetailsPage" element={<PetDetailsPage />} />
          <Route path="/pets/details/:id" element={<PetDetailsPage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/RegisterPage" element={<RegisterPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="*" element="Page not exists 404" />
          {/* </Route> */}

          <Route path="/user/UserProfilePage" element={<UserProfilePage />} />
          <Route
            path="/user/UserAdoptionsPage"
            element={<UserAdoptionsPage />}
          />
          <Route
            path="/user/UserPetPodPage"
            element={
              <ProtectedRoute>
                <PodPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/UserPetPodDetailsPage"
            element={<UserPetPodDetailsPage />}
          />
          <Route
            path="/user/userAdoptionDetailsPage/:id"
            element={<UserAdoptionDetailsPage />}
          />

          <Route path="/pets/add" element={<AddPets />} />
          <Route path="/pets/edit/:id" element={<EditPets />} />

          <Route path="/admin/AdminUsersPage" element={<AdminUsersPage />} />
          <Route
            path="/admin/AdminEditUserPage"
            element={<AdminEditUserPage />}
          />
          <Route path="/admin/users/edit/:id" element={<AdminEditUserPage />} />
          <Route
            path="/admin/AdminAdoptionsPage"
            element={<AdminAdoptionsPage />}
          />
          <Route
            path="/admin/AdminEditAdoptionPage"
            element={<AdminEditAdoptionPage />}
          />
          <Route
            path="/admin/AdminAdoptionsDetailsPage"
            element={<AdminAdoptionsDetailsPage />}
          />
          {/* <Route path="/admin/AdminChatsPage" element={<AdminChatsPage />} /> */}
          <Route path="/admin/AdminPetsPage" element={<AdminPetsPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/users/edit/:id" element={<AdminEditUserPage />} />
          <Route path="/resources" element={<ResourceListComponent />} />
          <Route path="/resources/add" element={<AddResourcePage />} />
          <Route path="/resources/edit/:id" element={<EditResourcePage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/admin/resources" element={<AdminResourcesPage />} />
          <Route
            path="/admin/AdminVerifyUserPage"
            element={<AdminVerifyUserPage />}
          />
        </Routes>
      </div>
      <FooterComponent />
    </div>
  </UserProvider>
);

const App = () => (
  <BrowserRouter>
    <AppWrapper />
  </BrowserRouter>
);

export default App;
