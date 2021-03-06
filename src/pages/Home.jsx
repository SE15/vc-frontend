import ProfileContent from '../containers/Profile';
import { connect } from 'react-redux'

const Home = ({isAuthenticated, user}) => {
    return (
        <ProfileContent
            user={user}
        />
    );
}

const mapStateToProps = state => {
    return {
      isAuthenticated: state.token !== null,
      user: state.user
    };
  };

export default connect( mapStateToProps )( Home );