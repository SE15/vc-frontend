import ProfileContent from '../containers/Profile';
import { useLocation, Redirect } from 'react-router-dom';

const Profile = () => {
  const location = useLocation();

  if (!location.state) return <Redirect to='/' />;

  const user = location.state.user;

  return (
    <ProfileContent
      user={user}
      visit={1}
    />
  );
}

export default Profile;