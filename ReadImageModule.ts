import { NativeModules } from "react-native";
const{ ReadImageModule } = NativeModules;

interface ReadImageInterface {
    processImage(imageLocation: String): Promise<String[]>
};

export default ReadImageModule as ReadImageInterface;