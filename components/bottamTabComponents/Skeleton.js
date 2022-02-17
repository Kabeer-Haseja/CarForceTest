import React from "react"
import {StyleSheet, View} from "react-native"

const Skeleton = (props) => {
    return (
        <>
            {Array(6).fill().map((item, index) => {
                return (
                    <View key={index} style={styles.placeholderStyle}>
                        <View>
                            <View style={styles.leadIdContainer}/>
                            <View style={styles.leadStatusContainer}/>
                            <View style={styles.leadNameContainer}/>
                            <View style={styles.leadTypeContainer}/>
                            <View style={styles.leadDateContainer}/>
                        </View>
                    </View>
                )
            })}
        </>
    )
}

export default Skeleton

const styles = StyleSheet.create({
    placeholderStyle: {
        height: 90,
        backgroundColor: 'white',
        marginTop: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        paddingTop: 10,
        marginBottom: 10
    },
    leadIdContainer: {
        height: 10,
        width: 60,
        backgroundColor: "#e1e4e8",
        top: 15,
        marginStart: 10,
        borderRadius: 20,
    },
    leadStatusContainer: {
        height: 10,
        width: 60,
        borderRadius: 30,
        backgroundColor: "#e1e4e8",
        top: 5,
        marginStart: 10,
        left: 250,
    },
    leadNameContainer: {
        height: 10,
        width: 150,
        borderRadius: 20,
        backgroundColor: "#e1e4e8",
        top: 10,
        marginStart: 10
    },
    leadTypeContainer: {
        height: 10,
        width: 130,
        borderRadius: 20,
        backgroundColor: "#e1e4e8",
        top: 15,
        marginStart: 10
    },
    leadDateContainer: {
        height: 10,
        width: 70,
        borderRadius: 15,
        backgroundColor: "#e1e4e8",
        top: 10,
        marginStart: 10,
        left: 250,
    },
})
