import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";

import { InstanceCard } from "@/components/InstanceCard";
import { mockInstances } from "@/data/mockInstances";
import type { InstanceSummary } from "@/types/instances";

export default function InstancesScreen() {
  const renderItem = ({ item }: { item: InstanceSummary }) => (
    <InstanceCard instance={item} />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Instances</Text>
        <Text style={styles.subtitle}>
          EC2 name, ID, state, and type
        </Text>
      </View>

      <FlatList
        data={mockInstances}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#475569",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  separator: {
    height: 12,
  },
});
