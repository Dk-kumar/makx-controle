import React from 'react';
import { View, StyleSheet } from 'react-native';

interface BoxContainerProps {
    children ?: React.ReactNode;
}

export const BoxContainer: React.FC<BoxContainerProps> = ({ children }) => {
    return (
        <View style={styles.boxContainer}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    boxContainer:{
        marginTop: 16,
        borderWidth: 2,
        borderColor: 'lightgray',
        borderRadius: 5,
        padding: 7,
    }
});