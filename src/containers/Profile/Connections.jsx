import Connection from '../../components/Connection/Connection';
import CardHolder from '../../components/ContainerTemplates/CardHolder';
import NoResults from '../../components/Alerts/NoResults';

import { useState, useEffect } from 'react';

import { connect } from 'react-redux';

export const Connections  = ({ connectionList, loading, authUser }) => {
    const [connections, setConnections] = useState(connectionList);

    useEffect(() => {setConnections(connectionList)}, [connectionList]);

    return (
        <CardHolder
            heading="Connections"
            isLoading={loading}
        >
            {connections.length === 0 ? <NoResults message="There are no connections"/> 
            : connections.map((connection) => 
                <Connection
                key={connection}
                id={connection.id} 
                name={`${connection.first_name} ${connection.last_name}`}
                image={connection.profile_pic}
                user={connection.id}
                authUser={authUser}/>
            )}
        </CardHolder>
    );
}

const mapStateToProps = state => {
    return {
        authUser: state.user
    };
};


export default connect(mapStateToProps)(Connections);