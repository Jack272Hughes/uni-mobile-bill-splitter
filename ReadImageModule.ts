import { NativeModules } from "react-native";
const{ ReadImageModule } = NativeModules;

interface ReadImageInterface {
    processImage(name: String, location: String): Promise<Number>
};

export default ReadImageModule as ReadImageInterface;