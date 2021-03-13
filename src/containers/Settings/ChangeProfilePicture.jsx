import { useRef, useState } from 'react';
import {
    Button,
    Box,
    Stack,
    Avatar,
    Image,
    useToast
} from '@chakra-ui/react';
import GridComponent from '../../components/ContainerTemplates/GridComponent';

import { changeProfilePic } from '../../api';
import * as actions from '../../store/actions';

import { connect } from 'react-redux';

export const ChangeProfilePicture = ({ user, firstName, lastName, profilePic, updateProfilePicture }) => {
    const uploadedImage = useRef(null);
    const imageUploader = useRef(null);
    const [isImageChanged, setIsImageChanged] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();

    const handleImageUpload = e => {
        const [file] = e.target.files;
        if (file) {
            const reader = new FileReader();
            const { current } = uploadedImage;
            current.file = file;
            reader.onload = e => {
                current.src = e.target.result;
            };
            reader.readAsDataURL(file);
            setIsImageChanged(true);
        }
        console.log([file])
    };

    const submitHandler = async () => {
        setLoading(true);
        console.log(isLoading);
        const { current } = uploadedImage;
        const data = new FormData();
        data.append('method', 'change-profile-pic');
        data.append('picture', current.file);

        const result = await changeProfilePic(user, data);
        if (result.data) {
            toast({
                position: "bottom-left",
                title: `Changed profile picture successfully`,
                description: `You have updated your porfile picture`,
                status: "success",
                isClosable: true,
                htmlWidth: 200
            });
            updateProfilePicture(result.data);
        } else {
            toast({
                position: "bottom-left",
                title: 'Changing profile picture failed',
                description: result.message,
                status: "error",
                isClosable: true,
                htmlWidth: 200
            });
        }
        setLoading(false);
        setIsImageChanged(false);
    }

    return (
        <GridComponent
            heading="Change Your Profile Picture"
            isConfirm
            onClick={submitHandler}
            loading={isLoading}
            disabled={!isImageChanged}>
            <Box align="center">
                <Avatar
                    size="2xl"
                    name={`${firstName} ${lastName}`}
                    src={profilePic}
                    display={isImageChanged ? 'none' : 'block'}
                />
                <Image
                    borderRadius="full"
                    width="140px"
                    height="140px"
                    objectFit="cover"
                    alt='Unable to fetch the image'
                    src={profilePic}
                    ref={uploadedImage}
                    display={!isImageChanged ? 'none' : 'block'}
                />
            </Box>
            <Stack align="center">
                <form encType='multipart/form-data'>
                    <input
                        type="file"
                        accept="image/*"
                        enctype
                        onChange={handleImageUpload.bind(this)}
                        ref={imageUploader}
                        style={{
                            display: "none"
                        }}
                    />
                </form>
                <Button
                    colorScheme="purple"
                    variant="outline"
                    type="submit"
                    alignItems="center"
                    mt={4}
                    onClick={() => imageUploader.current.click()}
                >
                    Change Picture
                </Button>

            </Stack>
        </GridComponent>
    );
}

const mapStateToProps = state => {
    return {
        user: state.user,
        firstName: state.firstName,
        lastName: state.lastName,
        profilePic: state.profilePic
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateProfilePicture: (profilePic) => dispatch(actions.updateProfilePicture(profilePic))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ChangeProfilePicture);