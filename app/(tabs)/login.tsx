import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const LoginScreen = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Hi Welcome Back! 👋</Text>
                <Text style={styles.subtitle}>Hello again you have been missed!</Text>

                {/* Hình ảnh minh họa */}
                {/* <Image source={require('./assets/login-illustration.png')} style={styles.image} /> */}

                {/* Ô nhập email */}
                <TextInput style={styles.input} placeholder="Enter your email address" />

                {/* Ô nhập mật khẩu */}
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Enter your password"
                        secureTextEntry={!passwordVisible}
                    />
                    <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                        <FontAwesome name={passwordVisible ? "eye" : "eye-slash"} size={20} color="#888" style={styles.eyeIcon} />
                    </TouchableOpacity>
                </View>

                {/* Nút đăng nhập */}
                <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>

                {/* Đăng nhập với mạng xã hội */}
                <Text style={styles.orText}>Or Login with</Text>
                <View style={styles.socialButtons}>
                    <TouchableOpacity style={styles.facebookButton}>
                        <FontAwesome name="facebook" size={24} color="white" />
                        <Text style={styles.socialText}>Facebook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.googleButton}>
                        <FontAwesome name="google" size={24} color="white" />
                        <Text style={styles.socialText}>Google</Text>
                    </TouchableOpacity>
                </View>

                {/* Điều hướng đến trang đăng ký */}
                <Text style={styles.registerText}>Don't have an account? <Text style={styles.registerLink}>Register</Text></Text>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 20
    },
    image: {
        width: 200,
        height: 150,
        marginBottom: 20
    },
    input: {
        width: '100%',
        height: 45,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15
    },
    passwordContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15
    },
    passwordInput: {
        flex: 1,
        height: 45
    },
    eyeIcon: {
        marginLeft: 10
    },
    loginButton: {
        width: '100%',
        backgroundColor: '#007bff',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15
    },
    loginText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    orText: {
        color: '#666',
        marginBottom: 10
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 15
    },
    facebookButton: {
        flexDirection: 'row',
        backgroundColor: '#3b5998',
        padding: 10,
        borderRadius: 8,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    googleButton: {
        flexDirection: 'row',
        backgroundColor: '#db4437',
        padding: 10,
        borderRadius: 8,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    socialText: {
        color: '#fff',
        marginLeft: 5
    },
    registerText: {
        color: '#666'
    },
    registerLink: {
        color: '#007bff',
        fontWeight: 'bold'
    }
});

export default LoginScreen;
