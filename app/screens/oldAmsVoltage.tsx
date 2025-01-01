import React, { useState, useContext, useEffect } from "react";
import { View, ScrollView, RefreshControl, Text, TextInput, StyleSheet, Button, Switch } from "react-native";
import { SettingIndicator } from "@/app/components/homeComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePageNameContext } from '@/app/index';
import useRefresh from '@/app/hooks/useRefresh';
import { updateData } from "../utils/service";

const initializeFormData = (motorData: any) => ({
  dryrun: {
    triptime: motorData.dryrun.triptime,
    L1: { threep: motorData.dryrun.L1.threep, onep: motorData.dryrun.L1.onep },
    L2: { threep: motorData.dryrun.L2.threep, onep: motorData.dryrun.L2.onep },
    toggle: motorData.dryrun.toggle || false,
  },
  overload: {
    triptime: motorData.overload.triptime,
    L1: { threep: motorData.overload.L1.threep, onep: motorData.overload.L1.onep },
    L2: { threep: motorData.overload.L2.threep, onep: motorData.overload.L2.onep },
    toggle: motorData.overload.toggle || false,
  },
  lowvolt: {
    triptime: motorData.lowvolt.triptime,
    L1: { threep: motorData.lowvolt.L1.threep, onep: motorData.lowvolt.L1.onep },
    toggle: motorData.lowvolt.toggle || false,
  },
  highvolt: {
    triptime: motorData.highvolt.triptime,
    L1: { threep: motorData.highvolt.L1.threep, onep: motorData.highvolt.L1.onep },
    toggle: motorData.highvolt.toggle || false,
  },
  spp: {
    triptime: motorData.spp.triptime,
    volt: motorData.spp.volt,
    toggle: motorData.spp.toggle || false,
  },
});

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

const AmsVoltage = () => {
  const { motorData, userinfo } = usePageNameContext();
  const [isDirty, setIsDirty] = useState(false);
  const [formData, setFormData] = useState<any>(() => initializeFormData(motorData));
  console.log("overload",motorData["overload"]);
  console.log("dryrun",motorData["dryrun"]);


  const fetchData = async (): Promise<void> => {
    console.log("refreshing and fetching data.....");
  };
  const { refreshing , onRefresh } = useRefresh(fetchData);

  useEffect(() => {
    setFormData(initializeFormData(motorData));
  }, [motorData]);

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
      userId: userinfo.userid,
      motorId: userinfo.motorid,
      data: {
        'amps&volts': formData
      }
    };
    updateData(amsObj);
    setIsDirty(false);
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <SettingIndicator customStyleDropDown={styles.customStyleDropDown} />
      
      {['dryrun', 'overload', 'lowvolt', 'highvolt', 'spp'].map((section) => (
        <Section key={section} title={section.toUpperCase()}>
          <View style={styles.sectionTop}>
            <Text>{section}</Text>
            <SafeAreaView style={styles.container}>
              <Switch
                trackColor={{ false: "#FF0000", true: "#228B22" }}
                thumbColor={formData[section]?.toggle ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => handleToggle(section)}
                value={formData[section]?.toggle}
              />
            </SafeAreaView>
            <InputField
              label="Trip Time"
              value={formData[section]?.triptime}
              unit="s"
              onChange={(value: any) => handleChange(section, "triptime", value)}
            />
          </View>
          {/* Additional fields based on section (L1, L2) */}
          {section !== 'spp' && (
            <>
              <View style={styles.sectionBottom}>
                <Text>L1</Text>
                <InputField
                  label="3P"
                  value={formData[section]?.L1.threep}
                  unit="A"
                  onChange={(value: any) => handleChange(section, "L1", { ...formData[section].L1, threep: value })}
                />
                <InputField
                  label="1P"
                  value={formData[section]?.L1.onep}
                  unit="A"
                  onChange={(value: any) => handleChange(section, "L1", { ...formData[section].L1, onep: value })}
                />
              </View>
              {section !== 'lowvolt' && section !== 'highvolt' && (
                <View style={styles.sectionBottom}>
                  <Text>L2</Text>
                  <InputField
                    label="3P"
                    value={formData[section]?.L2?.threep}
                    unit="A"
                    onChange={(value: any) => handleChange(section, "L2", { ...formData[section].L2, threep: value })}
                  />
                  <InputField
                    label="1P"
                    value={formData[section]?.L2?.onep}
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
    </ScrollView>
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
    flex: 1, // Ensure the container takes the full height of the screen
    padding: '2%',
  },
  customStyleDropDown: {
    zIndex: 1000,
  },
  inputContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  boxContainer: {
    marginTop: '1%',
    borderWidth: 2,
    borderColor: "lightgray",
    borderRadius: 5,
    padding: '1%',
    flexDirection: "column",
  },
  boxTop: {
    marginBottom: '1%',
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
    padding: '1%',
    width: '50%',
    marginRight: '5%',
  },
  smallText: {
    fontSize: 12,
    color: "gray",
  },
  sectionTop: {
    marginBottom: '1%',
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  sectionBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: '3%',
  },
  buttonContainer: {
    position: "absolute",
    bottom: '5%',
    left: '5%',
    right: '5%',
    width: '90%',
    alignSelf: "center",
  },
});
export default AmsVoltage;