import Connection from '../../components/Connection/Connection';
import CardHolder from '../../components/ContainerTemplates/CardHolder';
import NoResults from '../../components/Alerts/NoResults';

const Connections  = ({ connections, loading, user }) => {
    return (
        <CardHolder
            heading="Connections"
            isLoading={loading}
        >
            {connections.length === 0 ? <NoResults message="There are no connections"/> 
            : connections.map((connection) => 
                <Connection 
                name={`${connection.first_name} ${connection.last_name}`}
                user={33}/> //TODO: Need to assign the connection_id from back-end
            )}
        </CardHolder>
    );
}

export default Connections;