import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const MainPage = () => {
  const redir = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) redir('/login');
  });

  return (
    <>
      <h1>MainPage</h1>
    </>
  )
};

export default MainPage;