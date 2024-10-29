import React, { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { SettingIndicator } from "@/app/components/homeComponent";
import ToggleSwitch from "@/app/components/button/ToggleSwitch";

import detailsContext from '@/app/hooks/FirebaseContext';
import { updateData } from "../utils/service";


const initializeFormData = (motorData: any) => ({
  dryRun: {
    tripTime: motorData.dryRun.tripTime,
    L1: { threeP: motorData.dryRun.L1.threeP, oneP: motorData.dryRun.L1.oneP },
    L2: { threeP: motorData.dryRun.L2.threeP, oneP: motorData.dryRun.L2.oneP },
  },
  overload: {
    tripTime: motorData.overload.tripTime,
    L1: { threeP: motorData.overload.L1.threeP, oneP: motorData.overload.L1.oneP },
    L2: { threeP: motorData.overload.L2.threeP, oneP: motorData.overload.L2.oneP },
  },
  lowVolt: {
    tripTime: motorData.lowVolt.tripTime,
    L1: { threeP: motorData.lowVolt.L1.threeP, oneP: motorData.lowVolt.L1.oneP },
  },
  highVolt: {
    tripTime: motorData.highVolt.tripTime,
    L1: { threeP: motorData.highVolt.L1.threeP, oneP: motorData.highVolt.L1.oneP },
  },
  spp: {
    tripTime: motorData.spp.tripTime,
    volt:  motorData.spp.volt,
  },
});


// Reusable InputField component
const InputField = ({ label, value, unit, onChange }: any) => (
  <View style={styles.inputContainerStyle}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputGroup}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        keyboardType="numeric"
      />
      {unit && <Text style={styles.smallText}>{unit}</Text>}
    </View>
  </View>
);

export const AmsVoltage: React.FC = () => {

  const { motorData: {'amps&volts' : ams_voltage = {}} = { } } = useContext(detailsContext);
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

      <Section title="">
        <View style={styles.sectionTop}>
          <View>{"Dry Run"}</View>
          <ToggleSwitch
            option1="ON"
            color1="green"
            option2="OFF"
            color2="gray"
            switchStyle={styles.switchStyle}
            defaultValue={true}
          />
          <InputField
            label="Trip Time"
            value={formData.dryRun.tripTime}
            unit="s"
            onChange={(value: any) => handleChange("dryRun", "tripTime", value)}
          />
        </View>
        <View style={styles.sectionBottom}>
          <View>L1</View>
          <InputField
            label="3P LA"
            value={formData.dryRun.L1.threeP}
            unit="A"
            onChange={(value: any) =>
              handleChange("dryRun", "L1", {
                ...formData.dryRun.L1,
                threeP: value,
              })
            }
          />
          <InputField
            label="1P LA"
            value={formData.dryRun.L1.oneP}
            unit="A"
            onChange={(value: any) =>
              handleChange("dryRun", "L1", {
                ...formData.dryRun.L1,
                oneP: value,
              })
            }
          />
        </View>
        <View style={styles.sectionBottom}>
          <View>L2</View>
          <InputField
            label="3P LA"
            value={formData.dryRun.L2.threeP}
            unit="A"
            onChange={(value: any) =>
              handleChange("dryRun", "L2", {
                ...formData.dryRun.L2,
                threeP: value,
              })
            }
          />
          <InputField
            label="1P LA"
            value={formData.dryRun.L2.oneP}
            unit="A"
            onChange={(value: any) =>
              handleChange("dryRun", "L2", {
                ...formData.dryRun.L2,
                oneP: value,
              })
            }
          />
        </View>
      </Section>

      <Section title="">
        <View style={styles.sectionTop}>
          <View>{"Overload"}</View>
          <ToggleSwitch
            option1="ON"
            color1="green"
            option2="OFF"
            color2="gray"
            switchStyle={styles.switchStyle}
            defaultValue={true}
          />
          <InputField
            label="Trip Time"
            value={formData.overload.tripTime}
            unit="s"
            onChange={(value: any) =>
              handleChange("overload", "tripTime", value)
            }
          />
        </View>
        <View style={styles.sectionBottom}>
          <View>L1</View>
          <InputField
            label="3P HA"
            value={formData.overload.L1.threeP}
            unit="A"
            onChange={(value: any) =>
              handleChange("overload", "L1", {
                ...formData.overload.L1,
                threeP: value,
              })
            }
          />
          <InputField
            label="1P HA"
            value={formData.overload.L1.oneP}
            unit="s"
            onChange={(value: any) =>
              handleChange("overload", "L1", {
                ...formData.overload.L1,
                oneP: value,
              })
            }
          />
        </View>
        <View style={styles.sectionBottom}>
          <View>L2</View>
          <InputField
            label="3P HA"
            value={formData.overload.L2.threeP}
            unit="A"
            onChange={(value: any) =>
              handleChange("overload", "L2", {
                ...formData.overload.L2,
                threeP: value,
              })
            }
          />
          <InputField
            label="1P HA"
            value={formData.overload.L2.oneP}
            unit="s"
            onChange={(value: any) =>
              handleChange("overload", "L2", {
                ...formData.overload.L2,
                oneP: value,
              })
            }
          />
        </View>
      </Section>

      <Section title="">
        <View style={styles.sectionTop}>
          <View>{"Low Volt"}</View>
          <ToggleSwitch
            option1="ON"
            color1="green"
            option2="OFF"
            color2="gray"
            switchStyle={styles.switchStyle}
            defaultValue={true}
          />
          <InputField
            label="Trip Time"
            value={formData.lowVolt.tripTime}
            unit="s"
            onChange={(value: any) =>
              handleChange("lowVolt", "tripTime", value)
            }
          />
        </View>
        <View style={styles.sectionBottom}>
          <InputField
            label="3P LV"
            value={formData.lowVolt.L1.threeP}
            unit="V"
            onChange={(value: any) =>
              handleChange("lowVolt", "L1", {
                ...formData.lowVolt.L1,
                threeP: value,
              })
            }
          />
          <InputField
            label="1P LV"
            value={formData.lowVolt.L1.oneP}
            unit="V"
            onChange={(value: any) =>
              handleChange("lowVolt", "L1", {
                ...formData.lowVolt.L1,
                oneP: value,
              })
            }
          />
        </View>
      </Section>

      <Section title="">
        <View style={styles.sectionTop}>
          <View>{"High Volt"}</View>
          <ToggleSwitch
            option1="ON"
            color1="green"
            option2="OFF"
            color2="gray"
            switchStyle={styles.switchStyle}
            defaultValue={true}
          />
          <InputField
            label="Trip Time"
            value={formData.highVolt.tripTime}
            unit="s"
            onChange={(value: any) =>
              handleChange("highVolt", "tripTime", value)
            }
          />
        </View>
        <View style={styles.sectionBottom}>
          <InputField
            label="3P HV"
            value={formData.highVolt.L1.threeP}
            unit="V"
            onChange={(value: any) =>
              handleChange("highVolt", "L1", {
                ...formData.highVolt.L1,
                threeP: value,
              })
            }
          />
          <InputField
            label="1P HV"
            value={formData.highVolt.L1.oneP}
            unit="V"
            onChange={(value: any) =>
              handleChange("highVolt", "L1", {
                ...formData.highVolt.L1,
                oneP: value,
              })
            }
          />
        </View>
      </Section>

      <Section title="SPP">
        <View style={styles.sectionTop}>
          <View>{"SPP"}</View>
          <ToggleSwitch
            option1="ON"
            color1="green"
            option2="OFF"
            color2="gray"
            switchStyle={styles.switchStyle}
            defaultValue={true}
          />
          <InputField
            label="Trip Time"
            value={formData.spp.tripTime}
            unit="s"
            onChange={(value: any) => handleChange("spp", "tripTime", value)}
          />
        </View>
        <InputField
          label="SPP Volt"
          value={formData.spp.volt}
          unit="V"
          onChange={(value: any) => handleChange("spp", "volt", value)}
        />
      </Section>
      <Button
        title="Save"
        onPress={handleSave} disabled={!isDirty} 
      />
    </View>
  );
};

const Section = ({ title, children }: any) => (
  <View style={styles.boxContainer}>
    <View style={styles.boxTop}>
      <Text style={styles.label}>{title}</Text>
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
  switchStyle: {
    borderRadius: 20,
    width: 100,
    height: 35,
    justifyContent: "flex-end",
    padding: 5,
  },
});
