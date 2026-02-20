import React from "react";
import { View, Text, FlatList } from "react-native";

const placeholderInstances = [
  { id: "i-001", name: "AWS EC2 (placeholder)" },
  { id: "i-002", name: "Azure VM (placeholder)" },
  { id: "i-003", name: "GCP Compute (placeholder)" },
];

export default function InstancesScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 12 }}>
        Instances
      </Text>

      <FlatList
        data={placeholderInstances}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 12,
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 16 }}>{item.name}</Text>
            <Text style={{ marginTop: 4, color: "#666" }}>{item.id}</Text>
          </View>
        )}
      />
    </View>
  );
}