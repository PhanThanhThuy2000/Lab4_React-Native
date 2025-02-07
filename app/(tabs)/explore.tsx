import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
  RefreshControl,
  View
} from 'react-native';

// Định nghĩa kiểu dữ liệu cho state
type BarStyleType = 'light-content' | 'dark-content';

export default function TabTwoScreen() {
  const [barStyle, setBarStyle] = useState<BarStyleType>('light-content');
  const [barColor, setBarColor] = useState<string>('#6200EE'); // Màu mặc định
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('Kéo xuống để đổi màu StatusBar');

  const onRefresh = (): void => {
    setRefreshing(true);
    setTimeout(() => {
      // Đổi màu chữ và màu nền StatusBar khi làm mới
      setBarStyle((prev) => (prev === 'light-content' ? 'dark-content' : 'light-content'));
      setBarColor((prev) => (prev === '#6200EE' ? '#03DAC5' : '#6200EE'));

      setMessage((prev) =>
        prev === 'Kéo xuống để đổi màu StatusBar'
          ? 'Đã đổi màu StatusBar!'
          : 'Kéo xuống để đổi màu StatusBar'
      );

      setRefreshing(false);
    }, 1000); // Giả lập thời gian tải 1 giây
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={barStyle} backgroundColor={barColor} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Text style={styles.text}>{message}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});
