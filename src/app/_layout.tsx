import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return <AppNavigator />;
}
