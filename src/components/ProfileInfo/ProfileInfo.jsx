import React from 'react';

import {
    Skeleton,
    SkeletonCircle,
    Heading,
    Avatar
} from '@chakra-ui/react';

const ProfileInfo = ({ name, isLoading, profilePic }) => {
    return (
        <center>
            {isLoading ? <SkeletonCircle size="120px" /> :
                <Avatar
                    name={name}
                    src={profilePic}
                    size="2xl"
                    borderColor="purple.500"
                    showBorder
                    loading="lazy"
                />
            }
            <Skeleton isLoaded={!isLoading} w="50%">
                <Heading fontSize="20px" color="purple.700" py={2}> {name} </Heading>
            </Skeleton>
        </center>
    );
}
export default ProfileInfo;