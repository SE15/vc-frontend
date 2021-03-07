import Connection from '../../components/Connection/Connection';
import CardHolder from '../../components/ContainerTemplates/CardHolder';
import NoResults from '../../components/Alerts/NoResults';

import { useState, useEffect } from 'react';

const Connections  = ({ connectionList, loading, user }) => {
    const [connections, setConnections] = useState(connectionList);

    useEffect(() => {setConnections(connectionList); console.log(connections, connectionList)}, [connectionList]);

    return (
        <CardHolder
            heading="Connections"
            isLoading={loading}
        >
            {connections.length === 0 ? <NoResults message="There are no connections"/> 
            : connections.map((connection) => 
                <Connection
                id={connection.id} 
                name={`${connection.first_name} ${connection.last_name}`}
                user={connection.id}/>
            )}
        </CardHolder>
    );
}

export default Connections;