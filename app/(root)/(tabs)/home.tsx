// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import { WebView } from 'react-native-webview';
//
// const Home: React.FC = () => {
//     return (
//         <View style={styles.container}>
//             <WebView source={{ uri: 'https://www.instagram.com' }} style={{ flex: 1 }} />
//         </View>
//     );
// };
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
// });
//
// export default Home;
//

import { useUser, useAuth } from '@clerk/clerk-expo';
import { Text, Card, Button, Icon } from '@rneui/themed';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const devices = [
  { name: 'Device 1', avatar: 'https://via.placeholder.com/150' },
  { name: 'Device 2', avatar: 'https://via.placeholder.com/150' },
  { name: 'Device 3', avatar: 'https://via.placeholder.com/150' },
  { name: 'Device 4', avatar: 'https://via.placeholder.com/150' },
  { name: 'Device 5', avatar: 'https://via.placeholder.com/150' },
  { name: 'Device 6', avatar: 'https://via.placeholder.com/150' },
];

const Home = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleSignOut = () => {
    signOut();
    router.replace('/(auth)/sign-in');
  };

  const handleViewDevice = () => {
    router.push('/chart');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome, {user?.firstName} 👋</Text>
          <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
            <Icon name="logout" type="material-community" color="#fff" />
          </TouchableOpacity>
        </View>

        <Image
          source={{ uri: 'https://example.com/top-image.jpg' }}
          style={styles.topImage}
          resizeMode="cover"
        />

        <View style={styles.cardContainer}>
          {devices.map((device, index) => (
            <Card key={index} containerStyle={styles.deviceCard}>
              <View style={styles.cardHeader}>
                <Card.Title style={styles.cardTitle}>{device.name}</Card.Title>
              </View>
              <Card.Divider />
              <View style={styles.deviceInfo}>
                <Image style={styles.deviceImage} source={{ uri: device.avatar }} />
                <Text style={styles.deviceText}>Device Information</Text>
              </View>
              <Button
                title="View Device"
                buttonStyle={styles.viewButton}
                onPress={handleViewDevice}
              />
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  signOutButton: {
    backgroundColor: '#ff5252',
    borderRadius: 20,
    padding: 10,
  },
  topImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  deviceCard: {
    width: '48%',
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cardHeader: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  deviceImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  deviceText: {
    fontSize: 14,
    color: '#555',
  },
  viewButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
});

export default Home;

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   ScrollView,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
// } from "react-native";
// import { Text, Card, Button, Icon } from "@rneui/themed";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useUser, useAuth } from "@clerk/clerk-expo";
// import * as Location from "expo-location";
// import { router } from "expo-router";
//
// // Users and devices data for the example
// const devices = [
//   { name: "Device 1", avatar: "https://via.placeholder.com/150" },
//   { name: "Device 2", avatar: "https://via.placeholder.com/150" },
//   { name: "Device 3", avatar: "https://via.placeholder.com/150" },
//   { name: "Device 4", avatar: "https://via.placeholder.com/150" },
//   { name: "Device 5", avatar: "https://via.placeholder.com/150" },
//   { name: "Device 6", avatar: "https://via.placeholder.com/150" },
// ];
//
// const Home = () => {
//   const { user } = useUser();
//   const { signOut } = useAuth();
//   const [hasPermission, setHasPermission] = useState<boolean>(false);
//
//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       setHasPermission(status === "granted");
//     })();
//   }, []);
//
//   const handleSignOut = () => {
//     signOut();
//     router.replace("/(auth)/sign-in");
//   };
//
//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView contentContainerStyle={styles.container}>
//         {/* Header with Signout Button */}
//         <View style={styles.header}>
//           <Text style={styles.welcomeText}>Welcome, {user?.firstName} 👋</Text>
//           <TouchableOpacity
//             onPress={handleSignOut}
//             style={styles.signOutButton}
//           >
//             <Icon name="logout" type="material-community" color="#fff" />
//           </TouchableOpacity>
//         </View>
//
//         {/* Top Image */}
//         <Image
//           source={{ uri: "https://example.com/top-image.jpg" }}
//           style={styles.topImage}
//           resizeMode="cover"
//         />
//
//         {/* Device Cards */}
//         <View style={styles.cardContainer}>
//           {devices.map((device, index) => (
//             <Card key={index} containerStyle={styles.deviceCard}>
//               <Card.Title>{device.name}</Card.Title>
//               <Card.Divider />
//               <View style={styles.deviceInfo}>
//                 <Image
//                   style={styles.deviceImage}
//                   source={{ uri: device.avatar }}
//                 />
//                 <Text style={styles.deviceText}>Device Information</Text>
//               </View>
//               <Button title="View Device" buttonStyle={styles.viewButton} />
//             </Card>
//           ))}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };
//
// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },
//   container: {
//     padding: 10,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   welcomeText: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   signOutButton: {
//     backgroundColor: "#ff5252",
//     borderRadius: 20,
//     padding: 10,
//   },
//   topImage: {
//     width: "100%",
//     height: 200,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   cardContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   deviceCard: {
//     width: "48%",
//     marginBottom: 15,
//   },
//   deviceInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   deviceImage: {
//     width: 50,
//     height: 50,
//     marginRight: 10,
//   },
//   deviceText: {
//     fontSize: 16,
//   },
//   viewButton: {
//     backgroundColor: "#007bff",
//   },
// });
//
// export default Home;
//
// // import React, { useState, useEffect } from "react";
// // import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
// // import { SafeAreaView } from "react-native-safe-area-context";
// // import { Card, Button, Icon } from "@rneui/themed";
// // import * as Location from "expo-location";
// // import { useUser, useAuth } from "@clerk/clerk-expo";
// // import { router } from "expo-router";
//
// // const deviceData = Array.from({ length: 6 }, (_, i) => ({
// //   name: `Device ${i + 1}`,
// //   avatar: "https://randomuser.me/api/portraits/lego/1.jpg", // Replace with your device image URLs if available
// // }));
//
// // const Home = () => {
// //   const { user } = useUser();
// //   const { signOut } = useAuth();
//
// //   const handleSignOut = () => {
// //     signOut();
// //     router.replace("/(auth)/sign-in");
// //   };
//
// //   const [hasPermission, setHasPermission] = useState<boolean>(false);
//
// //   useEffect(() => {
// //     (async () => {
// //       const { status } = await Location.requestForegroundPermissionsAsync();
// //       setHasPermission(status === "granted");
// //     })();
// //   }, []);
//
// //   return (
// //     <SafeAreaView style={styles.safeArea}>
// //       {/* Top Image */}
// //       <View style={styles.imageContainer}>
// //         <Image
// //           source={{ uri: "https://example.com/your-image-url.jpg" }} // Replace with your actual image URL
// //           style={styles.image}
// //           resizeMode="cover"
// //         />
// //       </View>
//
// //       {/* Welcome Message */}
// //       <View style={styles.header}>
// //         <Text style={styles.welcomeText}>Welcome {user?.firstName} 👋</Text>
// //         <Icon
// //           name="logout"
// //           type="material"
// //           onPress={handleSignOut}
// //           color="red"
// //           containerStyle={styles.logoutIcon}
// //         />
// //       </View>
//
// //       {/* Device Cards */}
// //       <ScrollView contentContainerStyle={styles.scrollViewContent}>
// //         {deviceData.map((device, index) => (
// //           <Card key={index} containerStyle={styles.card}>
// //             <Card.Title>{device.name}</Card.Title>
// //             <Card.Divider />
// //             <Image source={{ uri: device.avatar }} style={styles.deviceImage} />
// //             <Button
// //               icon={<Icon name="settings" color="#ffffff" />}
// //               buttonStyle={styles.button}
// //               title="Manage"
// //             />
// //           </Card>
// //         ))}
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // };
//
// // const styles = StyleSheet.create({
// //   safeArea: {
// //     flex: 1,
// //     backgroundColor: "#F5F5F5",
// //   },
// //   imageContainer: {
// //     alignItems: "center",
// //     marginVertical: 20,
// //   },
// //   image: {
// //     width: "90%",
// //     height: 200,
// //     borderRadius: 10,
// //   },
// //   header: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     paddingHorizontal: 20,
// //     marginVertical: 10,
// //   },
// //   welcomeText: {
// //     fontSize: 20,
// //     fontWeight: "bold",
// //   },
// //   logoutIcon: {
// //     padding: 5,
// //   },
// //   scrollViewContent: {
// //     paddingHorizontal: 10,
// //   },
// //   card: {
// //     borderRadius: 10,
// //     marginBottom: 15,
// //   },
// //   deviceImage: {
// //     width: "100%",
// //     height: 150,
// //     marginBottom: 10,
// //   },
// //   button: {
// //     backgroundColor: "#2196F3",
// //     borderRadius: 5,
// //   },
// // });
//
// // export default Home;
//
// // import { useUser } from "@clerk/clerk-expo";
// // import { useAuth } from "@clerk/clerk-expo";
// // import * as Location from "expo-location";
// // import { router } from "expo-router";
// // import { useState, useEffect } from "react";
// // import {
// //   Text,
// //   View,
// //   TouchableOpacity,
// //   Image,
// //   FlatList,
// //   ActivityIndicator,
// // } from "react-native";
// // import { SafeAreaView } from "react-native-safe-area-context";
//
// // import GoogleTextInput from "@/components/GoogleTextInput";
// // import Map from "@/components/Map";
// // // import RideCard from "@/components/RideCard";
// // import { icons, images } from "@/constants";
// // import { useFetch } from "@/lib/fetch";
// // // import { useLocationStore } from "@/store";
// // import { Ride } from "@/types/type";
//
// // const Home = () => {
// //   const { user } = useUser();
// //   const { signOut } = useAuth();
//
// //   // const { setUserLocation, setDestinationLocation } = useLocationStore();
//
// //   const handleSignOut = () => {
// //     signOut();
// //     router.replace("/(auth)/sign-in");
// //   };
//
// //   const [hasPermission, setHasPermission] = useState<boolean>(false);
//
// //   const {
// //     data: recentRides,
// //     loading,
// //     error,
// //   } = useFetch<Ride[]>(`/(api)/ride/${user?.id}`);
//
// //   useEffect(() => {
// //     (async () => {
// //       let { status } = await Location.requestForegroundPermissionsAsync();
// //       if (status !== "granted") {
// //         setHasPermission(false);
// //         return;
// //       }
//
// //       let location = await Location.getCurrentPositionAsync({});
//
// //       const address = await Location.reverseGeocodeAsync({
// //         latitude: location.coords?.latitude!,
// //         longitude: location.coords?.longitude!,
// //       });
//
// //       // setUserLocation({
// //       //   latitude: location.coords?.latitude,
// //       //   longitude: location.coords?.longitude,
// //       //   address: `${address[0].name}, ${address[0].region}`,
// //       // });
// //     })();
// //   }, []);
//
// //   // const handleDestinationPress = (location: {
// //   //   latitude: number;
// //   //   longitude: number;
// //   //   address: string;
// //   // }) => {
// //   //   setDestinationLocation(location);
// //   //
// //   //   router.push("/(root)/find-ride");
// //   // };
//
// //   return (
// //     <SafeAreaView className="bg-general-500">
//
// //       <View>
// //         <Text>Akshay Jain</Text>
// //       </View>
//
// //       {/*<FlatList*/}
// //       {/*  data={recentRides?.slice(0, 5)}*/}
// //       {/*  renderItem={({ item }) => <RideCard ride={item} />}*/}
// //       {/*  keyExtractor={(item, index) => index.toString()}*/}
// //       {/*  className="px-5"*/}
// //       {/*  keyboardShouldPersistTaps="handled"*/}
// //       {/*  contentContainerStyle={{*/}
// //       {/*    paddingBottom: 100,*/}
// //       {/*  }}*/}
// //       {/*  ListEmptyComponent={() => (*/}
// //       {/*    <View className="flex flex-col items-center justify-center">*/}
// //       {/*      {!loading ? (*/}
// //       {/*        <>*/}
// //       {/*          <Image*/}
// //       {/*            source={images.noResult}*/}
// //       {/*            className="w-40 h-40"*/}
// //       {/*            alt="No recent rides found"*/}
// //       {/*            resizeMode="contain"*/}
// //       {/*          />*/}
// //       {/*          <Text className="text-sm">No recent rides found</Text>*/}
// //       {/*        </>*/}
// //       {/*      ) : (*/}
// //       {/*        <ActivityIndicator size="small" color="#000" />*/}
// //       {/*      )}*/}
// //       {/*    </View>*/}
// //       {/*  )}*/}
// //       {/*  ListHeaderComponent={*/}
// //       {/*    <>*/}
// //       {/*      <View className="flex flex-row items-center justify-between my-5">*/}
// //       {/*        <Text className="text-2xl font-JakartaExtraBold">*/}
// //       {/*          Welcome {user?.firstName}👋*/}
// //       {/*        </Text>*/}
// //       {/*        <TouchableOpacity*/}
// //       {/*          onPress={handleSignOut}*/}
// //       {/*          className="justify-center items-center w-10 h-10 rounded-full bg-white"*/}
// //       {/*        >*/}
// //       {/*          <Image source={icons.out} className="w-4 h-4" />*/}
// //       {/*        </TouchableOpacity>*/}
// //       {/*      </View>*/}
//
// //       {/*      <GoogleTextInput*/}
// //       {/*        icon={icons.search}*/}
// //       {/*        containerStyle="bg-white shadow-md shadow-neutral-300"*/}
// //       {/*        handlePress={handleDestinationPress}*/}
// //       {/*      />*/}
//
// //       {/*      <>*/}
// //       {/*        <Text className="text-xl font-JakartaBold mt-5 mb-3">*/}
// //       {/*          Your current location*/}
// //       {/*        </Text>*/}
// //       {/*        <View className="flex flex-row items-center bg-transparent h-[300px]">*/}
// //       {/*          <Map />*/}
// //       {/*        </View>*/}
// //       {/*      </>*/}
//
// //       {/*      <Text className="text-xl font-JakartaBold mt-5 mb-3">*/}
// //       {/*        Recent Rides*/}
// //       {/*      </Text>*/}
// //       {/*    </>*/}
// //       {/*  }*/}
// //       {/*/>*/}
// //     </SafeAreaView>
// //   );
// // };
//
// // export default Home;
