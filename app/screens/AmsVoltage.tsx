import React, { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button, Switch } from "react-native";
import { SettingIndicator } from "@/app/components/homeComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import detailsContext from '@/app/hooks/FirebaseContext';
import { updateData } from "../utils/service";

const initializeFormData = (motorData: any) => ({
  dryRun: {
    tripTime: motorData.dryRun.tripTime,
    L1: { threeP: motorData.dryRun.L1.threeP, oneP: motorData.dryRun.L1.oneP },
    L2: { threeP: motorData.dryRun.L2.threeP, oneP: motorData.dryRun.L2.oneP },
    toggle: motorData.dryRun.toggle || false,
  },
  overload: {
    tripTime: motorData.overload.tripTime,
    L1: { threeP: motorData.overload.L1.threeP, oneP: motorData.overload.L1.oneP },
    L2: { threeP: motorData.overload.L2.threeP, oneP: motorData.overload.L2.oneP },
    toggle: motorData.overload.toggle || false,
  },
  lowVolt: {
    tripTime: motorData.lowVolt.tripTime,
    L1: { threeP: motorData.lowVolt.L1.threeP, oneP: motorData.lowVolt.L1.oneP },
    toggle: motorData.lowVolt.toggle || false,
  },
  highVolt: {
    tripTime: motorData.highVolt.tripTime,
    L1: { threeP: motorData.highVolt.L1.threeP, oneP: motorData.highVolt.L1.oneP },
    toggle: motorData.highVolt.toggle || false,
  },
  spp: {
    tripTime: motorData.spp.tripTime,
    volt: motorData.spp.volt,
    toggle: motorData.spp.toggle || false,
  },
});

// Reusable InputField component
const InputField = ({ label, value, unit, onChange }: any) => (
  <View style={styles.inputContainerStyle}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputGroup}>
      <TextInput
        style={styles.input}
        value={String(value)}
        onChangeText={onChange}
        keyboardType="numeric"
      />
      {unit && <Text style={styles.smallText}>{unit}</Text>}
    </View>
  </View>
);

export const AmsVoltage = () => {
  const { motorData: { 'amps&volts': ams_voltage = {} } = {} } = useContext(detailsContext);
  const [isDirty, setIsDirty] = useState(false);
  const [formData, setFormData] = useState<any>(() => initializeFormData(ams_voltage));

  useEffect(() => {
    if (ams_voltage.dryRun) {
      setFormData(initializeFormData(ams_voltage));
    }
  }, [ams_voltage]);

  // Handle input changes dynamically
  const handleChange = (section: any, key: any, value: any) => {
    setFormData((prevState: any) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [key]: value,
      },
    }));
    setIsDirty(true);
  };

  const handleToggle = (section: any) => {
    setFormData((prevState: any) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        toggle: !prevState[section].toggle,
      },
    }));
    setIsDirty(true);
  };

  const handleSave = () => {
    const amsObj = {
      motorId: "qJzAIcv03PyaWqxRgO4mSU3l",
      'amps&volts': formData,
    };
    updateData(amsObj);
    setIsDirty(false);
  };

  return (
    <View style={styles.container}>
      <SettingIndicator customStyleDropDown={styles.customStyleDropDown} />
      
      {['dryRun', 'overload', 'lowVolt', 'highVolt', 'spp'].map((section) => (
        <Section key={section} title={section.toUpperCase()}>
          <View style={styles.sectionTop}>
            <Text>{section}</Text>
            <SafeAreaView style={styles.container}>
              <Switch
                trackColor={{ false: "#FF0000", true: "#228B22" }}
                thumbColor={formData[section].toggle ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => handleToggle(section)}
                value={formData[section].toggle}
              />
            </SafeAreaView>
            <InputField
              label="Trip Time"
              value={formData[section].tripTime}
              unit="s"
              onChange={(value: any) => handleChange(section, "tripTime", value)}
            />
          </View>
          {/* Additional fields based on section (L1, L2) */}
          {section !== 'spp' && (
            <>
              <View style={styles.sectionBottom}>
                <Text>L1</Text>
                <InputField
                  label="3P"
                  value={formData[section].L1.threeP}
                  unit="A"
                  onChange={(value: any) => handleChange(section, "L1", { ...formData[section].L1, threeP: value })}
                />
                <InputField
                  label="1P"
                  value={formData[section].L1.oneP}
                  unit="A"
                  onChange={(value: any) => handleChange(section, "L1", { ...formData[section].L1, oneP: value })}
                />
              </View>
              {section !== 'lowVolt' && section !== 'highVolt' && (
                <View style={styles.sectionBottom}>
                  <Text>L2</Text>
                  <InputField
                    label="3P"
                    value={formData[section].L2.threeP}
                    unit="A"
                    onChange={(value: any) => handleChange(section, "L2", { ...formData[section].L2, threeP: value })}
                  />
                  <InputField
                    label="1P"
                    value={formData[section].L2.oneP}
                    unit="A"
                    onChange={(value: any) => handleChange(section, "L2", { ...formData[section].L2, oneP: value })}
                  />
                </View>
              )}
            </>
          )}
          {section === 'spp' && (
            <InputField
              label="SPP Volt"
              value={formData.spp.volt}
              unit="V"
              onChange={(value: any) => handleChange("spp", "volt", value)}
            />
          )}
        </Section>
      ))}
      <Button title="Save" onPress={handleSave} disabled={!isDirty} />
    </View>
  );
};

const Section = ({ title, children }: any) => (
  <View style={styles.boxContainer}>
    <View style={styles.boxTop}>
      {/* <Text style={styles.label}>{title}</Text> */}
    </View>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  customStyleDropDown: {
    zIndex: 1000,
  },
  inputContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  boxContainer: {
    marginTop: 16,
    borderWidth: 2,
    borderColor: "lightgray",
    borderRadius: 5,
    padding: 7,
    flexDirection: "column",
  },
  boxTop: {
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    width: 100,
    marginRight: 5,
  },
  smallText: {
    fontSize: 12,
    color: "gray",
  },
  sectionTop: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  sectionBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
