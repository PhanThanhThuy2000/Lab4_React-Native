import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Alert,
} from "react-native";

// Định nghĩa kiểu dữ liệu cho một Contact
// Mỗi contact bao gồm tên, email, chức vụ và đường dẫn ảnh

type ContactType = {
  name: string;
  email: string;
  position: string;
  photo: string;
};

// Dữ liệu mẫu ban đầu được khởi tạo
const initialData: ContactType[] = [
  {
    name: "John Doe",
    email: "john@example.com",
    position: "Software Engineer",
    photo: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/07/anh-sieu-xe.jpg",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    position: "Product Manager",
    photo: "https://cdn-i.vtcnews.vn/resize/th/upload/2023/06/14/aventador-ultimae-coupe-1-3961-1625659942-21271132.jpg",
  },
];

export default function HomeScreen() {
  const [contacts, setContacts] = useState(initialData); // Quản lý danh sách contact
  const [modalVisible, setModalVisible] = useState(false); // Quản lý hiển thị modal
  const [editingContact, setEditingContact] = useState<ContactType | null>(null); // Contact đang chỉnh sửa

  const handleSave = () => {
    if (!editingContact?.name || !editingContact?.position) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin."); // Hiển thị lỗi nếu thiếu thông tin
      return;
    }

    setContacts((prev) => {
      if (editingContact.email) {
        // Nếu contact đã có email, cập nhật thông tin
        return prev.map((c) => (c.email === editingContact.email ? editingContact : c));
      }
      // Nếu contact mới, tạo email tự động và thêm vào danh sách
      const newContact = {
        ...editingContact,
        email: `new${prev.length}@example.com`, // Tạo email giả lập
        photo: editingContact.photo || "https://via.placeholder.com/50", // Ảnh mặc định nếu không có
      };
      return [...prev, newContact];
    });

    setModalVisible(false); // Đóng modal sau khi lưu
    setEditingContact(null); // Xóa contact đang chỉnh sửa
  };

  const handleDelete = (email: string) => {
    Alert.alert("Xác nhận", "Bạn có chắc muốn xóa liên hệ này?", [
      { text: "Hủy", style: "cancel" },
      { text: "Xóa", onPress: () => setContacts(contacts.filter((c) => c.email !== email)) },
    ]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image source={{ uri: item.photo }} style={styles.avatar} />
            <View style={styles.bodyItem}>
              <Text style={styles.nameText}>{item.name}</Text>
              <Text>{item.position}</Text>
            </View>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setEditingContact(item); // Gán contact cần chỉnh sửa
                setModalVisible(true); // Hiển thị modal
              }}
            >
              <Text style={styles.btnText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnDelete} onPress={() => handleDelete(item.email)}>
              <Text style={styles.btnText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.email} // Định danh mỗi item bằng email
      />
      <TouchableOpacity
        style={styles.btnAdd}
        onPress={() => {
          setEditingContact({ name: "", email: "", position: "", photo: "" });
          setModalVisible(true);
        }}
      >
        <Text style={styles.btnText}>+ Add Contact</Text>
      </TouchableOpacity>

      {modalVisible && (
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={editingContact?.name}
                onChangeText={(text) =>
                  setEditingContact((prev) => (prev ? { ...prev, name: text } : prev))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Position"
                value={editingContact?.position}
                onChangeText={(text) =>
                  setEditingContact((prev) => (prev ? { ...prev, position: text } : prev))
                }
              />
              <TouchableOpacity style={styles.btnSave} onPress={handleSave}>
                <Text style={styles.btnText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnClose} onPress={() => setModalVisible(false)}>
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
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
  btn: {
    backgroundColor: "#007bff",
    padding: 6,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  btnDelete: {
    backgroundColor: "#dc3545",
    padding: 6,
    borderRadius: 5,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  btnAdd: {
    backgroundColor: "#28a745",
    padding: 10,
    alignItems: "center",
    marginTop: 10,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  btnSave: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  btnClose: {
    backgroundColor: "#6c757d",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});
