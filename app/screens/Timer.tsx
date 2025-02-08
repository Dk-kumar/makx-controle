import React, { useState, useEffect, useCallback } from "react";
import { Keyboard, KeyboardAvoidingView, View, Text, Switch, TextInput, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SettingIndicator } from "@/app/components/homeComponent";
import { updateData } from "../utils/service";
import { usePageNameContext } from "@/app/index";

interface SectionData {
  [key: string]: number | boolean | FieldData;
}

interface FieldData {
  toggle?: boolean;
  [key: string]: number | boolean | FieldData | undefined;
}

interface Field {
  unit?: string;
  value?: string | number;
}

interface EditedFields {
  [sectionKey: string]: {
    [fieldKey: string]: number | { value?: number } | boolean | string | undefined;
  };
}

const Timer = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedFields, setEditedFields] = useState<EditedFields>({});
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });

    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const { userinfo, motorData } = usePageNameContext();
  const sectionData: SectionData = motorData["timeinfo"] || {};

  const handleEdit = useCallback(
    (sectionKey: string, fieldKey: string, value: string | boolean) => {
      setEditedFields((prevState) => {
        const keys = sectionKey.split("-");
        let updatedState = { ...prevState };
        let target = updatedState;
  
        for (let i = 0; i < keys.length - 1; i++) {
          const key = keys[i];
          target[key] = { ...target[key] };
          target = target[key];
        }
  
        const lastKey = keys[keys.length - 1];
        target[lastKey] = {
          ...target[lastKey],
          [fieldKey]: fieldKey === "toggle" ? value : isNaN(Number(value)) ? value : parseFloat(value as string),
        };
  
        return updatedState;
      });
      setIsEditing(true);
    },
    []
  );

  const renderFields = useCallback((fields: SectionData, sectionKey: string) => {
    return Object.entries(fields)
      .filter(([fieldKey]) => fieldKey !== "toggle")
      .map(([fieldKey, field]: [string, any]) => (
        <View key={fieldKey} style={styles.fieldContainer}>
          <View style={styles.inputRow}>
            <Text style={styles.fieldLabel}>{fieldKey}</Text>
            <TextInput
              style={styles.input}
              defaultValue={String(field?.value ?? field)}
              keyboardType="numeric"
              onChangeText={(text) => handleEdit(sectionKey, fieldKey, text)}
            />
            {field?.unit && <Text style={styles.unit}>{field.unit}</Text>}
          </View>
        </View>
      ));
  }, [handleEdit]);

  const renderSection = useCallback(
    (title: string, fields: SectionData, sectionKey: string) => {
      const sectionState = editedFields[sectionKey];
      const toggleValue = sectionState?.toggle ?? fields.toggle;

      return (
        <View style={styles.sectionContainer} key={sectionKey}>
          <View style={styles.headerRow}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {fields.toggle !== undefined && (
              <Switch value={Boolean(toggleValue)} onValueChange={() => handleEdit(sectionKey, "toggle", !toggleValue)} />
            )}
          </View>

          {toggleValue && (
            <View style={styles.fieldsRow}>
              {renderFields(
                Object.fromEntries(Object.entries(fields).filter(([key]) => !key.startsWith("clock"))),
                sectionKey
              )}

              {Object.entries(fields)
                .filter(([key]) => key.startsWith("clock"))
                .map(([key, clockFields]: [string, any]) => (
                  <View key={key}>
                    {renderSection(key, clockFields, `${sectionKey}-${key}`)}
                  </View>
                ))}
            </View>
          )}
        </View>
      );
    },
    [editedFields, handleEdit, renderFields]
  );

  const handleSave = async () => {
    setIsEditing(false);
    const editedData = {
      userid: userinfo.userid,
      motorid: userinfo.motorid,
      data: { timeinfo: editedFields },
    };
    console.log("Saved fields:", editedFields);
    await updateData(editedData);
    setEditedFields({});
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
        <SettingIndicator />
        {Object.entries(sectionData).map(([title, fields]: [string, any]) =>
          renderSection(title, fields, title)
        )}
      </ScrollView>

      {isEditing && !isKeyboardVisible && (
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
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContainer: { flex: 1 },
  contentContainer: { padding: 10 },
  sectionContainer: { marginBottom: 10, padding: 10, borderRadius: 8, backgroundColor: "#f9f9f9", elevation: 2 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 5 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: "#333" },
  fieldsRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  fieldContainer: { width: "50%" },
  fieldLabel: { fontSize: 14, color: "#555", marginBottom: 4, marginRight: 5 },
  inputRow: { flexDirection: "row", alignItems: "center", width: "50%" },
  input: { flex: 1, fontSize: 14, padding: 5, borderWidth: 1, borderColor: "#ddd", borderRadius: 4, paddingHorizontal: 8 },
  unit: { fontSize: 14, color: "#777", marginLeft: 4 },
  buttonContainer: { padding: 5, backgroundColor: "#fff", borderTopWidth: 1, borderColor: "#ddd" },
  saveButton: { backgroundColor: "#007BFF", paddingVertical: 10, borderRadius: 8, alignItems: "center", elevation: 5 },
  saveButtonText: { fontSize: 16, color: "#fff", fontWeight: "bold" },
});

export default Timer;
