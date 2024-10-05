import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import ToggleSwitch from '@/components/button/ToggleSwitch';
import { SettingIndicator } from '@/components/homeComponent';
import { db } from '../../config';
import { set, ref } from 'firebase/database';
// Reusable InputBox component
const InputBox: React.FC<{ label: string; value: string; unit: string; onChange: (text: string) => void }> = ({ label, value, unit, onChange }) => (
    <View style={styles.inputBox}>
        <Text style={styles.inputLabel}>{label}</Text>
        <TextInput style={styles.textInput} value={value} onChangeText={onChange} />
        <Text style={styles.smallText}>{unit}</Text>
    </View>
);

// Reusable ToggleBox component
const ToggleBox: React.FC<{
    label: string;
    toggleState: boolean;
    inputs: Array<{ label: string; value: string; unit: string; onChange: (text: string) => void }>;
    onToggleChange: (state: boolean) => void;
}> = ({ label, toggleState, inputs, onToggleChange }) => (
    <View style={styles.boxContainer}>
        <View style={styles.boxTop}>
            <Text style={styles.label}>{label}</Text>
            <ToggleSwitch
                option1="ON"
                color1="green"
                option2="OFF"
                color2="gray"
                switchStyle={styles.switchStyle}
                isOn={toggleState} // Pass the current state
                onValueChange={onToggleChange} // Handle the toggle state change
            />
        </View>
        <View style={styles.boxBottom}>
            {inputs.map((input, index) => (
                <InputBox key={index} label={input.label} value={input.value} unit={input.unit} onChange={input.onChange} />
            ))}
        </View>
    </View>
);

export const Timer: React.FC = () => {
    // Single state object to handle all inputs and toggle states
    const [formData, setFormData] = useState({
        timeInfo: {
            aTime: '01',
            sdl: '02',
            ext: '03',
        },
        cycleTime: {
            onTime: '0045',
            offTime: '0240',
            present: '0233',
            switch: true,
        },
        runTime: {
            set: '0240',
            present: '0000',
            switch: true,
        },
        dryRunTime: {
            set: '0240',
            present: '0000',
            switch: true,
        },
        clock1: {
            onTime: '0240',
            offTime: '0000',
            switch: true,
        },
    });

    // Handler to update form fields
    const handleInputChange = (section: string, field: string, value: string) => {
        setFormData((prevState) => ({
            ...prevState,
            [section]: {
                ...prevState[section],
                [field]: value,
            },
        }));
    };

    // Handler to update toggle switches
    const handleToggleChange = (section: string, value: boolean) => {
        setFormData((prevState) => ({
            ...prevState,
            [section]: {
                ...prevState[section],
                switch: value,
            },
        }));

        console.log(formData)
    };

    const handleSubmit = () => {
        set(ref(db, 'post/' + 'timer'), {
          data: formData
        })
      }
    

    return (
        <View style={styles.container}>
            <SettingIndicator customStyleDropDown={styles.customStyleDropDown} />

            {/* Time Information */}
            <View style={styles.boxContainer}>
                <View style={styles.boxTop}>
                    <Text style={styles.label}>Time Information</Text>
                </View>
                <View style={styles.boxBottom}>
                    <InputBox
                        label="A.Time"
                        value={formData.timeInfo.aTime}
                        unit="m"
                        onChange={(text) => handleInputChange('timeInfo', 'aTime', text)}
                    />
                    <InputBox
                        label="SDL"
                        value={formData.timeInfo.sdl}
                        unit="s"
                        onChange={(text) => handleInputChange('timeInfo', 'sdl', text)}
                    />
                    <InputBox
                        label="EXT"
                        value={formData.timeInfo.ext}
                        unit="s"
                        onChange={(text) => handleInputChange('timeInfo', 'ext', text)}
                    />
                </View>
            </View>

            {/* Cycle Time */}
            <ToggleBox
                label="Cycle Time"
                toggleState={formData.cycleTime.switch}
                onToggleChange={(value) => handleToggleChange('cycleTime', value)}
                inputs={[
                    {
                        label: 'On Time',
                        value: formData.cycleTime.onTime,
                        unit: 'm',
                        onChange: (text) => handleInputChange('cycleTime', 'onTime', text),
                    },
                    {
                        label: 'Off Time',
                        value: formData.cycleTime.offTime,
                        unit: 'm',
                        onChange: (text) => handleInputChange('cycleTime', 'offTime', text),
                    },
                    {
                        label: 'Present',
                        value: formData.cycleTime.present,
                        unit: 'm',
                        onChange: (text) => handleInputChange('cycleTime', 'present', text),
                    },
                ]}
            />

            {/* Run Time */}
            <ToggleBox
                label="Run Time"
                toggleState={formData.runTime.switch}
                onToggleChange={(value) => handleToggleChange('runTime', value)}
                inputs={[
                    {
                        label: 'Set',
                        value: formData.runTime.set,
                        unit: 'm',
                        onChange: (text) => handleInputChange('runTime', 'set', text),
                    },
                    {
                        label: 'Present',
                        value: formData.runTime.present,
                        unit: 'm',
                        onChange: (text) => handleInputChange('runTime', 'present', text),
                    },
                ]}
            />

            {/* Dry Run Time */}
            <ToggleBox
                label="Dry Run Time"
                toggleState={formData.dryRunTime.switch}
                onToggleChange={(value) => handleToggleChange('dryRunTime', value)}
                inputs={[
                    {
                        label: 'Set',
                        value: formData.dryRunTime.set,
                        unit: 'm',
                        onChange: (text) => handleInputChange('dryRunTime', 'set', text),
                    },
                    {
                        label: 'Present',
                        value: formData.dryRunTime.present,
                        unit: 'm',
                        onChange: (text) => handleInputChange('dryRunTime', 'present', text),
                    },
                ]}
            />

            {/* Clock1 */}
            <ToggleBox
                label="Clock1"
                toggleState={formData.clock1.switch}
                onToggleChange={(value) => handleToggleChange('clock1', value)}
                inputs={[
                    {
                        label: 'On Time',
                        value: formData.clock1.onTime,
                        unit: 'm',
                        onChange: (text) => handleInputChange('clock1', 'onTime', text),
                    },
                    {
                        label: 'Off Time',
                        value: formData.clock1.offTime,
                        unit: 'm',
                        onChange: (text) => handleInputChange('clock1', 'offTime', text),
                    },
                ]}
            />

<Button
        title="Save"
        onPress={handleSubmit}
      />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 2,
    },
    customStyleDropDown: {
        zIndex: 1000,
    },
    boxContainer: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    boxTop: {
        padding: 10,
        // borderBottomWidth: 1,
        // borderBottomColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    boxBottom: {
        padding: 10,
        flexDirection: 'row'
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    inputLabel: {
        fontSize: 14,
        marginRight: 10,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 5,
        width: 40,
    },
    smallText: {
        fontSize: 12,
        marginLeft: 5,
    },
    switchStyle: {
        width: 50,
        height: 30,
        borderRadius: 20,
        // marginBottom: 10,
        justifyContent: 'center',
        padding: 5,
        position: 'relative',
    },
});
