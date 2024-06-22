import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import UserChatComponent from './user/UserChatComponent';
import { useUserContext } from '../context/UserContext'; // Importa el hook useUserContext

const ProtectedRoutesComponent = ({ admin }) => {
  const { user, loading } = useUserContext(); // Usa el hook useUserContext

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/LoginPage" />;
  }

  if (admin && !user.isAdmin) {
    return <Navigate to="/" />;
  }

  return admin ? <Outlet /> : (
    <>
      <UserChatComponent />
      <Outlet />
    </>
  );
};

export default ProtectedRoutesComponent;
