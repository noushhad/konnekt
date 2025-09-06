import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { supabase } from "../../src/lib/supabase"; // adjust path

type Profile = {
  id: string;
  username: string;
  display_name?: string;
  bio?: string;
  avatar_url?: string;
  handles: Record<string, string>;
  is_public: boolean;
};

export default function MyCardScreen() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter();
  const navigation = useNavigation();

  // Set headerRight logout button
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={handleLogout}
          style={{ marginRight: 16 }}
        >
          <MaterialIcons name="logout" size={24} color="#000" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // Load profile
  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        Alert.alert("Error", error.message);
      } else {
        setProfile(data as Profile);
      }
      setLoading(false);
    })();
  }, []);

  // Pick Image from Gallery
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      uploadImage(result.assets[0].uri);
    }
  };

  // Take Photo from Camera
  const takePhoto = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    if (!cameraPermission.granted) {
      Alert.alert("Permission required", "Camera permission is needed to take photo");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      uploadImage(result.assets[0].uri);
    }
  };

  // Upload image to Supabase Storage
  const uploadImage = async (localUri: string) => {
    if (!profile) return;
    const fileName = `${profile.id}-${Date.now()}.jpg`;

    try {
      const response = await fetch(localUri);
      const blob = await response.blob();

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, blob, { upsert: true });

      if (uploadError) {
        Alert.alert("Upload Error", uploadError.message);
        return;
      }

      const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);
      const publicUrl = data.publicUrl;

      setProfile((prev) => prev && { ...prev, avatar_url: publicUrl });
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to upload image");
    }
  };

  // Save profile
  const saveProfile = async () => {
    if (!profile) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        username: profile.username,
        display_name: profile.display_name,
        bio: profile.bio,
        avatar_url: profile.avatar_url,
        handles: profile.handles,
        is_public: profile.is_public,
      })
      .eq("id", profile.id);

    if (error) Alert.alert("Error", error.message);
    else Alert.alert("Success", "Profile updated!");
  };

  // Logout
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert("Error", error.message);
    else router.replace("/(auth)/login"); // redirect to login
  };

  if (loading) return <Text style={{ padding: 20 }}>Loading…</Text>;
  if (!profile) return <Text style={{ padding: 20 }}>No profile found.</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Picture */}
      {profile.avatar_url ? (
        <Image source={{ uri: profile.avatar_url }} style={styles.avatar} />
      ) : (
        <View style={[styles.avatar, styles.placeholder]}>
          <MaterialIcons name="person" size={60} color="#888" />
        </View>
      )}

      <View style={styles.photoButtons}>
        <TouchableOpacity onPress={pickImage} style={styles.photoBtn}>
          <Text style={styles.photoBtnText}>Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={takePhoto} style={styles.photoBtn}>
          <Text style={styles.photoBtnText}>Camera</Text>
        </TouchableOpacity>
      </View>

      {/* Username */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={profile.username}
        onChangeText={(text) =>
          setProfile((prev) => prev && { ...prev, username: text })
        }
      />

      {/* Display Name */}
      <TextInput
        style={styles.input}
        placeholder="Display Name"
        value={profile.display_name || ""}
        onChangeText={(text) =>
          setProfile((prev) => prev && { ...prev, display_name: text })
        }
      />

      {/* Bio */}
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Bio"
        value={profile.bio || ""}
        multiline
        onChangeText={(text) =>
          setProfile((prev) => prev && { ...prev, bio: text })
        }
      />

      {/* Social Links */}
      <View style={styles.socialBox}>
        <RNPickerSelect
          onValueChange={(value) => setSelectedCategory(value)}
          placeholder={{ label: "Select Social Category", value: null }}
          items={[
            { label: "Personal Mail", value: "personal_mail" },
            { label: "Business Mail", value: "business_mail" },
            { label: "Facebook", value: "facebook" },
            { label: "Instagram", value: "instagram" },
            { label: "Twitter", value: "twitter" },
            { label: "Other", value: "other" },
          ]}
        />

        {selectedCategory ? (
          <TextInput
            style={styles.input}
            placeholder={`Enter ${selectedCategory}`}
            value={profile.handles[selectedCategory] || ""}
            onChangeText={(text) =>
              setProfile((prev) =>
                prev
                  ? {
                      ...prev,
                      handles: { ...prev.handles, [selectedCategory]: text },
                    }
                  : prev
              )
            }
          />
        ) : null}
      </View>

      {/* Public Toggle */}
      <View style={styles.toggleRow}>
        <Text>Make Profile Public</Text>
        <Switch
          value={profile.is_public}
          onValueChange={(val) =>
            setProfile((prev) => prev && { ...prev, is_public: val })
          }
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity onPress={saveProfile} style={styles.saveBtn}>
        <Text style={{ color: "#fff", fontWeight: "600" }}>Save Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", padding: 20 },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 16 },
  placeholder: {
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  photoButtons: { flexDirection: "row", marginBottom: 16 },
  photoBtn: {
    backgroundColor: "#2f95dc",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  photoBtnText: { color: "#fff", fontWeight: "600" },
  input: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
  },
  socialBox: { width: "90%", marginVertical: 10 },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 12,
  },
  saveBtn: {
    backgroundColor: "green",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    width: "90%",
    alignItems: "center",
  },
});
