import React from "react";
import { View, Text } from "react-native";

export default function MetricsScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 12 }}>
        Metrics
      </Text>

      <View
        style={{
          padding: 12,
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 10,
        }}
      >
        <Text style={{ fontSize: 16 }}>CPU: placeholder</Text>
        <Text style={{ fontSize: 16, marginTop: 8 }}>Memory: placeholder</Text>
        <Text style={{ fontSize: 16, marginTop: 8 }}>Network: placeholder</Text>
      </View>
    </View>
  );
}