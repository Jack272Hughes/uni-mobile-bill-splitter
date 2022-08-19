import { NativeModules } from "react-native";
const { ReadImageModule } = NativeModules;

interface ReadImageInterface {
	processImage(imageLocation: string): Promise<string[] | undefined>;
}

export default ReadImageModule as ReadImageInterface;
