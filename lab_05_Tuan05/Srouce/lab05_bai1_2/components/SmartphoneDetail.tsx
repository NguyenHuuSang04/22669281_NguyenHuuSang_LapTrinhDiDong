import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { SmartphoneData, SmartphoneColor } from "../data/mapApiToLocal";

interface Props {
  smartphone: SmartphoneData;
  selectedColor?: SmartphoneColor | null;
  onPressChooseColor: () => void;
}

const SmartphoneDetail: React.FC<Props> = ({
  smartphone,
  selectedColor,
  onPressChooseColor,
}) => {
  const phoneImg = selectedColor?.img || smartphone.defaultImg;

  return (
    <View style={styles.container}>
      <Image source={phoneImg} style={styles.image} resizeMode="contain" />
      <Text style={styles.name}>{smartphone.name}</Text>
      <View style={styles.row}>
        <Text style={styles.stars}>★★★★★</Text>
        <Text style={styles.review}>{`(Xem ${smartphone.reviewCount} đánh giá)`}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.newPrice}>{smartphone.price.toLocaleString()} đ</Text>
        <Text style={styles.oldPrice}>{smartphone.oldPrice.toLocaleString()} đ</Text>
      </View>
      <Text style={styles.note}>Ở ĐÂU RẺ HƠN HOÀN TIỀN</Text>
      <TouchableOpacity style={styles.chooseColorBtn} onPress={onPressChooseColor}>
        <Text style={styles.chooseColorText}>
          4 MÀU-CHỌN {selectedColor ? "LOẠI" : "MÀU"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buyBtn}>
        <Text style={styles.buyBtnText}>CHỌN MUA</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", alignItems: "center", padding: 20, borderRadius: 12 },
  image: { width: 200, height: 200, marginBottom: 8 },
  name: { fontSize: 16, fontWeight: "bold", textAlign: "center", marginBottom: 4 },
  row: { flexDirection: "row", alignItems: "center", marginVertical: 2 },
  stars: { color: "#FFD700", fontSize: 18, marginRight: 6 },
  review: { color: "#666", fontSize: 13 },
  newPrice: { color: "#d0021c", fontWeight: "bold", fontSize: 22, marginRight: 10 },
  oldPrice: { color: "#888", textDecorationLine: "line-through" },
  note: { color: "#d0021c", marginVertical: 5, fontWeight: "bold" },
  chooseColorBtn: {
    borderWidth: 1, borderColor: "#aaa", borderRadius: 8, padding: 8, marginVertical: 10, width: "90%", alignItems: "center", backgroundColor: "#fff"
  },
  chooseColorText: { fontSize: 16, color: "#222", fontWeight: "bold" },
  buyBtn: { backgroundColor: "red", borderRadius: 8, paddingVertical: 14, width: "90%", alignItems: "center", marginTop: 10 },
  buyBtnText: { color: "#fff", fontWeight: "bold", fontSize: 18 }
});

export default SmartphoneDetail;