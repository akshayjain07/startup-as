// MyWebView.tsx
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import ChartPage from './ChartPage'; // Adjust the import path as necessary

const MyWebView: React.FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ChartPage height="90vh" />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default MyWebView;




// import React, { useEffect, useState } from "react";
// import { View, StyleSheet, ActivityIndicator, Dimensions } from "react-native";
// import { LineChart } from "react-native-gifted-charts";
// import axios from "axios";
//
// const Chart = () => {
//     const [chartData, setChartData] = useState([]);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         // Fetch live stock data from Finnhub
//         const fetchStockData = async () => {
//             try {
//                 const response = await axios.get(
//                     `https://finnhub.io/api/v1/quote?symbol=AAPL&token=csl504pr01qq49fgmn40csl504pr01qq49fgmn4g`
//                 );
//                 const { c: currentPrice, h: highPrice, l: lowPrice, o: openPrice } = response.data;
//
//                 // Map data to Gifted Chart format
//                 setChartData([
//                     { value: openPrice, label: "Open" },
//                     { value: highPrice, label: "High" },
//                     { value: lowPrice, label: "Low" },
//                     { value: currentPrice, label: "Close" },
//                 ]);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching stock data:", error);
//             }
//         };
//
//         fetchStockData();
//     }, []);
//
//     if (loading) {
//         return (
//             <View style={styles.loaderContainer}>
//                 <ActivityIndicator size="large" color="#007bff" />
//             </View>
//         );
//     }
//
//     return (
//         <View style={styles.container}>
//             <LineChart
//                 data={chartData}
//                 width={Dimensions.get("window").width * 1.5} // Allows horizontal scroll
//                 height={300}
//                 spacing={50}
//                 initialSpacing={10}
//                 color="#007bff"
//                 adjustmentFactor={2} // Adjusts zoom level
//                 xAxisColor="#000"
//                 yAxisColor="#000"
//                 yAxisLabelSuffix="$"
//                 hideDataPoints
//                 thickness={2}
//                 startFillColor="#007bff"
//                 endFillColor="#d7e3fa"
//                 startOpacity={0.8}
//                 endOpacity={0.2}
//                 curved
//                 isAnimated
//                 scrollable
//             />
//         </View>
//     );
// };
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 10,
//         backgroundColor: "#fff",
//     },
//     loaderContainer: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//     },
// });
//
// export default Chart;
