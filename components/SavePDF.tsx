import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useImagesDetail } from "@/state/storeMulti";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import * as FileSystem from "expo-file-system";
import i18n from "@/constants/LocalLang";

const SavePDF = ({ Cstyle }: any) => {
  const { compressDetailArray, format } = useImagesDetail();

  const encodeImageToBase64 = async (uri: any) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return `data:image/${"jpeg"};base64,${base64}`; // Or change "jpeg" to the appropriate format
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const generateImageElements = async () => {
    const promises = compressDetailArray.map(async (item) => {
      const base64Image = await encodeImageToBase64(item.uri);
      return `
        <div class="page">
            <img src="${base64Image}" class="image" />
        </div>`;
    });
    return await Promise.all(promises);
  };

  const printToFile = async () => {
    // console.log("uri", uri);
    console.log("format", format);
    const imageElement = await generateImageElements();

    const html = `
    <html>
      <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
          <style>
              @media print {
                .page {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh; 
                  page-break-after: always;
                }
                .image {
                  max-width: 90vw;
                  max-height: 90vh;
                  object-fit: contain; 
                }
              }
              body {
                margin: 0;
                padding: 0;
              }
          </style>
      </head>
      <body>
          ${imageElement.join("")}
      </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({
      html,
      base64: false,
    });
    console.log("File has been saved to:", html);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  return (
    <TouchableOpacity onPress={printToFile} style={Cstyle}>
      <Text style={{ fontSize: 16 }}>Save as PDF</Text>
    </TouchableOpacity>
  );
};

export default SavePDF;

const styles = StyleSheet.create({});
