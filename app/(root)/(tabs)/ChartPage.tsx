import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

const API_KEY = 'USUQG1LLAVG5ILRN'; // Replace with your API key
const SYMBOL = 'MSFT'; // The stock symbol you want to fetch data for

const ChartPage: React.FC = () => {
    const [htmlContent, setHtmlContent] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${SYMBOL}&apikey=${API_KEY}`);
                const data = await response.json();

                // Transforming the data for chart consumption
                const timeSeries = data['Time Series (Daily)'];
                const chartData = Object.keys(timeSeries).map(date => ({
                    time: date,
                    value: parseFloat(timeSeries[date]['4. close']),
                })).reverse(); // Reverse the data to show oldest to newest

                // Generate the HTML content with the fetched data
                const html = `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                      <meta charset="UTF-8" />
                      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                      <title>Interactive Trading Chart</title>
                      <script src="https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js"></script>
                      <style>
                        body, html {
                          margin: 0;
                          padding: 0;
                          width: 100%;
                          height: 100%;
                        }
                        #chart {
                          width: 100%;
                          height: 100%;
                        }
                      </style>
                    </head>
                    <body>
                      <div id="chart"></div>
                      <script>
                        const chart = LightweightCharts.createChart(document.getElementById('chart'), {
                          width: window.innerWidth,
                          height: window.innerHeight,
                          layout: {
                            backgroundColor: '#ffffff',
                            textColor: '#000000',
                          },
                          grid: {
                            vertLines: {
                              color: '#e0e0e0',
                            },
                            horzLines: {
                              color: '#e0e0e0',
                            },
                          },
                          crosshair: {
                            mode: LightweightCharts.CrosshairMode.Normal,
                          },
                        });

                        const lineSeries = chart.addLineSeries({
                          color: '#FF0000',
                          lineWidth: 2,
                        });

                        // Live data fetched from the API
                        const data = ${JSON.stringify(chartData)};
                        lineSeries.setData(data);
                      </script>
                    </body>
                    </html>
                `;

                setHtmlContent(html);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            {htmlContent ? (
                <WebView
                    originWhitelist={['*']}
                    source={{ html: htmlContent }}
                    style={{ flex: 1 }}
                />
            ) : (
                <ActivityIndicator size="large" color="#0000ff" />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default ChartPage;


// // ChartPage.tsx
// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, ActivityIndicator } from 'react-native';
// import { WebView } from 'react-native-webview';
//
// const API_KEY = 'USUQG1LLAVG5ILRN'; // Replace with your API key
//
// const ChartPage: React.FC = () => {
//     const [htmlContent, setHtmlContent] = useState<string | null>(null);
//
//     useEffect(() => {
//         const fetchData = async () => {
//             const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=${API_KEY}`);
//             const data = await response.json();
//
//             // Transforming the data for chart consumption
//             const timeSeries = data['Time Series (Daily)'];
//             const chartData = Object.keys(timeSeries).map(date => {
//                 return {
//                     time: date,
//                     value: parseFloat(timeSeries[date]['4. close']),
//                 };
//             });
//
//             // Generate the HTML content with the fetched data
//             const html = `
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//           <meta charset="UTF-8" />
//           <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//           <title>Interactive Trading Chart</title>
//           <script src="https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js"></script>
//           <style>
//             body, html {
//               margin: 0;
//               padding: 0;
//               width: 100%;
//               height: 100%;
//             }
//             #chart {
//               width: 100%;
//               height: 100%;
//             }
//           </style>
//         </head>
//         <body>
//           <div id="chart"></div>
//           <script>
//             const chart = LightweightCharts.createChart(document.getElementById('chart'), {
//               width: window.innerWidth,
//               height: window.innerHeight,
//             });
//
//             const lineSeries = chart.addLineSeries({
//               color: '#FF0000',
//               lineWidth: 2,
//             });
//
//             // Live data fetched from the API
//             const data = ${JSON.stringify(chartData)};
//             lineSeries.setData(data);
//           </script>
//         </body>
//         </html>
//       `;
//             setHtmlContent(html);
//         };
//
//         fetchData();
//     }, []);
//
//     return (
//         <View style={styles.container}>
//             {htmlContent ? (
//                 <WebView
//                     originWhitelist={['*']}
//                     source={{ html: htmlContent }}
//                     style={{ flex: 1 }}
//                 />
//             ) : (
//                 <ActivityIndicator size="large" color="#0000ff" />
//             )}
//         </View>
//     );
// };
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
// });
//
// export default ChartPage;
//
//
//
//
// // // ChartPage.tsx
// // import React from 'react';
// // import { View, StyleSheet } from 'react-native';
// // import { WebView } from 'react-native-webview';
// //
// // const ChartPage: React.FC = () => {
// //     const htmlContent = `
// //     <!DOCTYPE html>
// //     <html lang="en">
// //     <head>
// //       <meta charset="UTF-8" />
// //       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
// //       <title>Interactive Trading Chart</title>
// //       <script src="https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js"></script>
// //       <style>
// //         body, html {
// //           margin: 0;
// //           padding: 0;
// //           width: 100%;
// //           height: 100%;
// //         }
// //         #chart {
// //           width: 100%;
// //           height: 100%;
// //         }
// //       </style>
// //     </head>
// //     <body>
// //       <div id="chart"></div>
// //       <script>
// //         const chart = LightweightCharts.createChart(document.getElementById('chart'), {
// //           width: window.innerWidth,
// //           height: window.innerHeight,
// //         });
// //
// //         const lineSeries = chart.addLineSeries({
// //           color: '#FF0000',
// //           lineWidth: 2,
// //         });
// //
// //         // Example data points, replace with real API data
// //         const data = [
// //           { time: '2024-01-01', value: 100 },
// //           { time: '2024-01-02', value: 110 },
// //           { time: '2024-01-03', value: 105 },
// //           { time: '2024-01-04', value: 115 },
// //           { time: '2024-01-05', value: 120 },
// //         ];
// //
// //         lineSeries.setData(data);
// //       </script>
// //     </body>
// //     </html>
// //   `;
// //
// //     return (
// //         <View style={styles.container}>
// //             <WebView
// //                 originWhitelist={['*']}
// //                 source={{ html: htmlContent }} // Load HTML content directly
// //                 style={{ flex: 1 }}
// //             />
// //         </View>
// //     );
// // };
// //
// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         backgroundColor: '#fff',
// //     },
// // });
// //
// // export default ChartPage;
//
//
//
//
// // import React, { useEffect } from 'react';
// // import { StyleSheet, View } from 'react-native';
// // import { WebView } from 'react-native-webview';
// //
// // const ChartPage = () => {
// //     const htmlContent = `
// //     <!DOCTYPE html>
// //     <html lang="en">
// //     <head>
// //       <meta charset="UTF-8" />
// //       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
// //       <title>Interactive Trading Chart</title>
// //       <script src="https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js"></script>
// //       <style>
// //         body, html {
// //           margin: 0;
// //           padding: 0;
// //           width: 100%;
// //           height: 100%;
// //           display: flex;
// //           justify-content: center;
// //           align-items: center;
// //           background-color: #fff;
// //         }
// //         #chart {
// //           width: 100%;
// //           height: 100%;
// //         }
// //       </style>
// //     </head>
// //     <body>
// //       <div id="chart"></div>
// //       <script>
// //         const chart = LightweightCharts.createChart(document.getElementById('chart'), {
// //           width: window.innerWidth,
// //           height: window.innerHeight,
// //           layout: {
// //             backgroundColor: '#ffffff',
// //             textColor: '#000',
// //           },
// //           grid: {
// //             vertLines: {
// //               color: '#e0e0e0',
// //             },
// //             horzLines: {
// //               color: '#e0e0e0',
// //             },
// //           },
// //           crosshair: {
// //             mode: LightweightCharts.CrosshairMode.Normal,
// //           },
// //           priceScale: {
// //             borderColor: '#cccccc',
// //           },
// //           timeScale: {
// //             borderColor: '#cccccc',
// //           },
// //         });
// //
// //         // Create the candlestick series
// //         const candleSeries = chart.addCandlestickSeries({
// //           upColor: '#4caf50',
// //           downColor: '#f44336',
// //           borderDownColor: '#f44336',
// //           borderUpColor: '#4caf50',
// //           wickDownColor: '#f44336',
// //           wickUpColor: '#4caf50',
// //         });
// //
// //         // Fetch data from a sample API and populate the chart
// //         async function fetchChartData() {
// //           try {
// //             const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=hourly');
// //             const data = await response.json();
// //             const formattedData = data.prices.map(([time, price]) => ({
// //               time: Math.floor(time / 1000),
// //               open: price * 0.98,
// //               high: price * 1.02,
// //               low: price * 0.96,
// //               close: price,
// //             }));
// //             candleSeries.setData(formattedData);
// //           } catch (error) {
// //             console.error('Failed to load chart data:', error);
// //           }
// //         }
// //
// //         fetchChartData();
// //
// //         // Handle window resizing
// //         window.addEventListener('resize', () => {
// //           chart.resize(window.innerWidth, window.innerHeight);
// //         });
// //       </script>
// //     </body>
// //     </html>
// //   `;
// //
// //     return (
// //         <View style={styles.container}>
// //             <WebView
// //                 originWhitelist={['*']}
// //                 source={{ html: htmlContent }}
// //                 style={styles.webview}
// //             />
// //         </View>
// //     );
// // };
// //
// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //     },
// //     webview: {
// //         flex: 1,
// //     },
// // });
// //
// // export default ChartPage;
