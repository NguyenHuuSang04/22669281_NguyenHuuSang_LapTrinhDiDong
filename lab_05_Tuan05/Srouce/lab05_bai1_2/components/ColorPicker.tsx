import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { SmartphoneData, SmartphoneColor } from "../data/mapApiToLocal";

interface Props {
  smartphone: SmartphoneData;
  selectedColor?: SmartphoneColor | null;
  onSelectColor: (color: SmartphoneColor) => void;
  onDone: () => void;
}

const ColorPicker: React.FC<Props> = ({
  smartphone,
  selectedColor,
  onSelectColor,
  onDone,
}) => {
  const phoneImg = selectedColor?.img || smartphone.defaultImg;

  return (
    <View style={{ flex: 1, backgroundColor: "#bbb" }}>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 12 }}>
        <Image source={phoneImg} style={{ width: 90, height: 120, marginRight: 10 }} resizeMode="contain" />
        <View>
          <Text style={{ fontWeight: "bold" }}>{smartphone.name}</Text>
          {selectedColor && (
            <Text style={{ marginTop: 4 }}>
              Màu: <Text style={{ fontWeight: "bold" }}>{selectedColor.name}</Text>
            </Text>
          )}
          {selectedColor && (
            <Text style={{ fontSize: 13, marginTop: 4 }}>
              Cung cấp bởi <Text style={{ fontWeight: "bold" }}>{smartphone.provider}</Text>
            </Text>
          )}
          <Text style={{ fontWeight: "bold", color: "#d0021c", fontSize: 16, marginTop: 4 }}>
            {smartphone.price.toLocaleString()} đ
          </Text>
        </View>
      </View>
      <Text style={{ margin: 18, fontSize: 16, fontWeight: "bold" }}>Chọn một màu bên dưới:</Text>
      <View style={{ alignItems: "center" }}>
        {smartphone.colors.map((color) => (
          <TouchableOpacity
            key={color.name}
            style={[
              styles.colorBox,
              {
                backgroundColor: color.value,
                borderWidth: selectedColor?.name === color.name ? 2 : 0,
              },
            ]}
            onPress={() => onSelectColor(color)}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.doneBtn} onPress={onDone}>
        <Text style={styles.doneBtnText}>XONG</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  colorBox: {
    width: 80,
    height: 60,
    borderRadius: 6,
    marginVertical: 8,
    borderColor: "#333",
  },
  doneBtn: {
    marginTop: 18,
    backgroundColor: "#3b63c6",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "red",
  },
  doneBtnText: { color: "#fff", fontWeight: "bold", fontSize: 18, letterSpacing: 2 },
});

export default ColorPicker;