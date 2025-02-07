import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';

// Dữ liệu mẫu
const data: ContactType[] = [
  {
    name: "John Doe",
    email: "john@example.com",
    position: "Software Engineer",
    photo: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/07/anh-sieu-xe.jpg"
  },

  {
    name: "Jane Smith",
    email: "jane@example.com",
    position: "Product Manager",
    photo: "https://cdn-i.vtcnews.vn/resize/th/upload/2023/06/14/aventador-ultimae-coupe-1-3961-1625659942-21271132.jpg"
  },
  {
    name: "Jane Smith 1",
    email: "jane@example.com",
    position: "Product Manager",
    photo: "https://cdn-i.vtcnews.vn/resize/th/upload/2023/06/14/aventador-ultimae-coupe-1-3961-1625659942-21271132.jpg"
  }
];

type ContactType = {
  name: string;
  email: string;
  position: string;
  photo: string;
};

const ContactItem = ({ contact }: { contact: ContactType }) => (
  <View style={styles.listItem}>
    <Image source={{ uri: contact.photo }} style={styles.avatar} />
    <View style={styles.bodyItem}>
      <Text style={styles.nameText}>{contact.name}</Text>
      <Text>{contact.position}</Text>
    </View>
    <TouchableOpacity style={styles.btnCall}>
      <Text style={styles.callText}>Call</Text>
    </TouchableOpacity>
  </View>
);

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <ContactItem contact={item} />}
        keyExtractor={(item) => item.email}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  bodyItem: {
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  btnCall: {
    backgroundColor: "#007bff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  callText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

