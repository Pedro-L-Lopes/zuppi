import React, { useEffect, useState } from "react";
import { ActivityIndicator, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { loadDb } from "../db/db";
import AppNavigator from "../navigation/AppNavigator";

export default function RootLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await loadDb();
      setLoading(false);
    };
    init();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator size="large" color="#007AFF" />
      </SafeAreaView>
    );
  }

  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor="#0A0E14"
        barStyle="light-content"
      />

      <SafeAreaView
        style={styles.container}
        edges={["left", "right", "bottom"]}
      >
        <AppNavigator />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0E14",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A0E14",
  },
});
