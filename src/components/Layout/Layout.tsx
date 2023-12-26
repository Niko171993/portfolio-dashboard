import Menu from '../menu/Menu';
import Navbar from '../navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../footer/Footer';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
const Layout = () => {
  return (
    <div className="main">
      <Navbar />
      <div className="container">
        <div className="menuContainer">
          <Menu />
        </div>
        <div className="contentContainer">
          <QueryClientProvider client={queryClient}>
            <Outlet />
          </QueryClientProvider>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
