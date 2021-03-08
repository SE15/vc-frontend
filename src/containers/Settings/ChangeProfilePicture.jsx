import { useRef } from 'react';
import { useState } from 'react';
import {
    Button,
    Box,
    Stack,
    Avatar,
} from '@chakra-ui/react';
import GridComponent from '../../components/ContainerTemplates/GridComponent';

const ChangeProfilePicture = () => {
    const uploadedImage = useRef(null);
    const imageUploader = useRef(null);
    const [loading, setLoading] = useState(false);

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
        }
        console.log([file])
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);
        console.log("object")
        // const result = await editUserProfile(user, { method: 'edit-info', first_name: first_name, last_name: last_name });
        // if (result.data) {
        //     toast({
        //         position: "bottom-left",
        //         title: `Changed name successfully`,
        //         description: `You have updated your name to '${first_name} ${last_name}'`,
        //         status: "success",
        //         isClosable: true,
        //         htmlWidth: 200
        //     });
        //     updateName(first_name, last_name);
        // } else {
        //     toast({
        //         position: "bottom-left",
        //         title: 'Changing name failed',
        //         description: result.message,
        //         status: "error",
        //         isClosable: true,
        //         htmlWidth: 200
        //     });
        // }

        setLoading(false);
    }

    return (
        <GridComponent heading="Change Your Profile Picture" isConfirm={true} onClick={submitHandler.bind(this)} loading={loading} show={true}>
            <Box align="center">
                    <Avatar
                        size="2xl"
                        name="Hello World" //TODO: Need to take name as props
                        // src={} //TODO: Need to add image
                        ref={uploadedImage}
                    />
                </Box>
                <Stack align="center">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        ref={imageUploader}
                        style={{
                            display: "none"
                        }}
                    />
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

export default ChangeProfilePicture;