import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from "react-native";
import { launchCamera, launchImageLibrary, ImageLibraryOptions, Asset, CameraOptions } from 'react-native-image-picker';
import ReadImageModule from "./ReadImageModule";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },

  button: {
    width: 250,
    height: 60,
    backgroundColor: "#3740ff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    marginBottom: 12
  },

  buttonText: {
    textAlign: "center",
    fontSize: 15,
    color: "#fff"
  }
});

const imageLibraryOptions: ImageLibraryOptions = {
  mediaType: "photo"
};

const cameraOptions: CameraOptions = {
  mediaType: "photo",
  cameraType: "back"
}

export default function ImagePickerComponent() {
  const [resourcePath, setResourcePath] = useState<Asset>();
  const [recognisedText, setRecognisedText] = useState<String[]>([]);

  const processImage = (uri: string) => {
    ReadImageModule.processImage(uri.replace("file://", "")).then(text => {
      setRecognisedText(text || []);
    }).catch(err => {
      console.error(err);
    })
  }

  const selectFile = () => {
    launchImageLibrary(imageLibraryOptions).then(response => {
      if (response.assets) {
        setResourcePath(response.assets[0]);
        processImage(response.assets[0].uri!);
      }
    });
  };

  const takePhoto = () => {
    launchCamera(cameraOptions).then(response => {
      if (response.assets) {
        setResourcePath(response.assets[0]);
        processImage(response.assets[0].uri!);
      }
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        {resourcePath && recognisedText.length > 0 ? (
          <>
            <Image
              source={{ uri: resourcePath.uri }}
              style={{ width: 200, height: 400 }}
            />
            {recognisedText.map((item, index) => <Text key={`recognisedText${index}`}>{item}</Text>)}
          </>
        ) : (
          <></>
        )}

        <TouchableOpacity onPress={takePhoto} style={styles.button}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={selectFile} style={styles.button}>
          <Text style={styles.buttonText}>Select File</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
