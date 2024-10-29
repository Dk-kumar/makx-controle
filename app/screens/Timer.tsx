import React, { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import ToggleSwitch from "@/app/components/button/ToggleSwitch";
import { SettingIndicator } from "@/app/components/homeComponent";
import detailsContext from "@/app/hooks/FirebaseContext";
import { updateData } from "../utils/service";


// Helper function for deep merging formData with motorData
const initializeFormData = (motorData: any) => ({
    timers: {
        timerInfo: motorData.timeinfo?.timers?.timerInfo || { aTime: '', sdl: '', ext: '' },
        cycleTime: motorData.timeinfo?.timers?.cycleTime || { onTime: '', offTime: '', present: '', switch: false },
        runTime: motorData.timeinfo?.timers?.runTime || { set: '', present: '', switch: false },
        dryRunTime: motorData.timeinfo?.timers?.dryRunTime || { set: '', present: '', switch: false },
    },
    clocks: {
        clock1: motorData.timeinfo?.clocks?.clock1 || { onTime: '', offTime: '', switch: false },
    },
});

// Reusable InputBox component
const InputBox: React.FC<{
  label: string;
  value: string;
  unit: string;
  onChange: (text: string) => void;
}> = ({ label, value, unit, onChange }) => (
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
  inputs: Array<{
    label: string;
    value: string;
    unit: string;
    onChange: (text: string) => void;
  }>;
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
        isOn={toggleState}
        onValueChange={onToggleChange}
      />
    </View>
    <View style={styles.boxBottom}>
      {inputs.map((input, index) => (
        <InputBox
          key={index}
          label={input.label}
          value={input.value}
          unit={input.unit}
          onChange={input.onChange}
        />
      ))}
    </View>
  </View>
);

export const Timer: React.FC = () => {
  const { motorData = {} } = useContext(detailsContext);
  const [isDirty, setIsDirty] = useState(false);

  const [formData, setFormData] = useState(() => initializeFormData(motorData));

  useEffect(() => {
    if (motorData.timeinfo) {
        setFormData(initializeFormData(motorData));
    }
}, [motorData]);

  // Handler to update form fields, accounting for nested objects
  const handleInputChange = (
    section: string,
    subSection: string,
    field: string,
    value: string
  ) => {
    setFormData((prevState: any) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [subSection]: {
          ...prevState[section][subSection],
          [field]: value,
        },
      },
    }));

    setIsDirty(true);
  };

  // Handler to update toggle switches
  const handleToggleChange = (section: string, value: boolean) => {
    setFormData((prevState: any) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        switch: value,
      },
    }));

    setIsDirty(true);
  };

  const handleSave = () => {
    const timerObj = {
      motorId: "qJzAIcv03PyaWqxRgO4mSU3l",
      timeinfo: formData,
    };

    updateData(timerObj);

    setIsDirty(false);
  };
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
            value={formData.timers.timerInfo.aTime}
            unit="m"
            onChange={(text) =>
              handleInputChange("timers", "timerInfo", "aTime", text)
            }
          />
          <InputBox
            label="SDL"
            value={formData.timers.timerInfo.sdl}
            unit="s"
            onChange={(text) =>
              handleInputChange("timers", "timerInfo", "sdl", text)
            }
          />
          <InputBox
            label="EXT"
            value={formData.timers.timerInfo.ext}
            unit="s"
            onChange={(text) =>
              handleInputChange("timers", "timerInfo", "ext", text)
            }
          />
        </View>
      </View>

      {/* Cycle Time */}
      <ToggleBox
        label="Cycle Time"
        toggleState={formData.timers.cycleTime.switch}
        onToggleChange={(value) => handleToggleChange("cycleTime", value)}
        inputs={[
          {
            label: "On Time",
            value: formData.timers.cycleTime.onTime,
            unit: "m",
            onChange: (text) =>
              handleInputChange("timers", "cycleTime", "onTime", text),
          },
          {
            label: "Off Time",
            value: formData.timers.cycleTime.offTime,
            unit: "m",
            onChange: (text) =>
              handleInputChange("timers", "cycleTime", "offTime", text),
          },
          {
            label: "Present",
            value: formData.timers.cycleTime.present,
            unit: "m",
            onChange: (text) =>
              handleInputChange("timers", "cycleTime", "present", text),
          },
        ]}
      />

      {/* Run Time */}
      <ToggleBox
        label="Run Time"
        toggleState={formData.timers.runTime.switch}
        onToggleChange={(value) => handleToggleChange("runTime", value)}
        inputs={[
          {
            label: "Set",
            value: formData.timers.runTime.set,
            unit: "m",
            onChange: (text) =>
              handleInputChange("timers", "runTime", "set", text),
          },
          {
            label: "Present",
            value: formData.timers.runTime.present,
            unit: "m",
            onChange: (text) =>
              handleInputChange("timers", "runTime", "present", text),
          },
        ]}
      />

      {/* Dry Run Time */}
      <ToggleBox
        label="Dry Run Time"
        toggleState={formData.timers.dryRunTime.switch}
        onToggleChange={(value) => handleToggleChange("dryRunTime", value)}
        inputs={[
          {
            label: "Set",
            value: formData.timers.dryRunTime.set,
            unit: "m",
            onChange: (text) =>
              handleInputChange("timers", "dryRunTime", "set", text),
          },
          {
            label: "Present",
            value: formData.timers.dryRunTime.present,
            unit: "m",
            onChange: (text) =>
              handleInputChange("timers", "dryRunTime", "present", text),
          },
        ]}
      />

      {/* Clock1 */}
      <ToggleBox
        label="Clock1"
        toggleState={formData.clocks.clock1.switch}
        onToggleChange={(value) => handleToggleChange("clock1", value)}
        inputs={[
          {
            label: "On Time",
            value: formData.clocks.clock1.onTime,
            unit: "m",
            onChange: (text) =>
              handleInputChange("clocks", "clock1", "onTime", text),
          },
          {
            label: "Off Time",
            value: formData.clocks.clock1.offTime,
            unit: "m",
            onChange: (text) =>
              handleInputChange("clocks", "clock1", "offTime", text),
          },
        ]}
      />

      <Button title="Save" onPress={handleSave} disabled={!isDirty} />
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
    borderColor: "#ccc",
  },
  boxTop: {
    padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  boxBottom: {
    padding: 10,
    flexDirection: "row",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 14,
    marginRight: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
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
    justifyContent: "center",
    padding: 5,
    position: "relative",
  },
});
