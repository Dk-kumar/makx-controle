import React, { useState } from "react";
import { View, Text, Switch, TextInput, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SettingIndicator } from '@/app/components/homeComponent';
import { updateData } from '../utils/service';
import { usePageNameContext } from '@/app/index';

interface SectionData {
  [key: string]: {
    [key: string]: 
      | number
      | { unit: string; value: string }
      | { [key: string]: { value: string; unit: string } }
      | boolean
      | undefined;
  };
}

interface Field {
  unit: string | undefined;
  value: string | undefined;
}

interface Section {
  [key: string]: Field | undefined;
}

interface EditedFields {
  [sectionKey: string]: {
    [fieldKey: string]: 
      | number
      | { value?: number }
      | boolean
      | undefined
      | string;
  };
}

const AmpsVoltage = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedFields, setEditedFields] = useState<EditedFields>({});

  const { userinfo, motorData } = usePageNameContext();
  const sectionData: SectionData = motorData["amps&volts"] || {};

  const handleEdit = (sectionKey: string, fieldKey: string, value: string | boolean) => {
    console.log(fieldKey, value);
    setEditedFields((prevState: EditedFields) => ({
      ...prevState,
      [sectionKey]: {
        ...prevState[sectionKey],
        [fieldKey]:
          fieldKey === "toggle"
            ? value
            : isNaN(Number(value)) ? value : parseFloat(value as string),
      },
    }));
    setIsEditing(true);
  };

  const renderSection = (title: string, fields: Section, sectionKey: string) => {
    const sectionState = editedFields[sectionKey];
    const toggleValue = (sectionState?.toggle ?? sectionData[sectionKey]?.toggle);
  
    return (
      <View style={styles.sectionContainer} key={sectionKey}>
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>{title}</Text>
          {fields.toggle !== undefined && (
            <Switch
              value={Boolean(toggleValue)}
              onValueChange={() => handleEdit(sectionKey, "toggle", Boolean(!toggleValue))}
            />
          )}
        </View>
        {toggleValue && (
          <View style={styles.fieldsRow}>
            {Object.entries(fields)
              .filter(([fieldKey, field]) => field !== undefined && fieldKey !== "toggle")
              .map(([fieldKey, field]: [string, Field | number | undefined]) => (
                <View key={`${sectionKey}-${fieldKey}`} style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>{fieldKey}</Text>
                  {typeof field === "object" && field?.value !== undefined ? (
                    <View style={styles.inputRow}>
                      <TextInput
                        style={styles.input}
                        defaultValue={String(field.value)}
                        keyboardType="numeric"
                        onChangeText={(text) => handleEdit(sectionKey, fieldKey, text)}
                      />
                      <Text style={styles.unit}>{field.unit}</Text>
                    </View>
                  ) : (
                    <View style={styles.inputRow}>
                      <TextInput
                        style={styles.input}
                        defaultValue={String(field)}
                        keyboardType="numeric"
                        onChangeText={(text) => handleEdit(sectionKey, fieldKey, text)}
                      />
                    </View>
                  )}
                </View>
              ))}
          </View>
        )}
      </View>
    );
  };

  const handleSave = async () => {
    console.log("Saved fields:", editedFields);
    setIsEditing(false);
    const editedData = {
      userid: userinfo.userid,
      motorid: userinfo.motorid,
      data:{
        "amps&volts": editedFields
      }
    }
    await updateData(editedData);
    setEditedFields({});
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <SettingIndicator />
        {Object.entries(sectionData).map(([title, fields]: any, index) =>
          renderSection(title, fields, title)
        )}
      </ScrollView>
      {isEditing && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 11,
  },
  timestamp: {
    fontSize: 14,
    color: "#555",
    marginBottom: 16,
  },
  sectionContainer: {
    marginBottom: 7,
    padding: 7,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  fieldsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  fieldContainer: {
    width: "30%",
    marginBottom: 12,
  },
  fieldLabel: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    padding: 3,
  },
  unit: {
    fontSize: 14,
    color: "#777",
    marginLeft: 4,
  },
  buttonContainer: {
    padding: 5,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  saveButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    elevation: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AmpsVoltage;