import { useRef } from 'react';
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
    };

    return (
        <GridComponent heading="Change Your Profile Picture" isConfirm={true}>
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