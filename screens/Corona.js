import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
  Picker,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
  Alert,
} from 'react-native';
const { width, height } = Dimensions.get('window');
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';
const { width: BlockportWidth, height: BlockportHeight } = Dimensions.get('window');
import { PieChart } from 'react-native-svg-charts';
import { useQuery } from '@apollo/react-hooks';
import { LineChart, XAxis, YAxis, Grid } from 'react-native-svg-charts';
import { Block, Text } from 'expo-ui-kit';
import CircularProgress from './Loading/Loading';
import * as scale from 'd3-scale';

function wp(percentage) {
  const value = (percentage * BlockportWidth) / 100;
  return Math.round(value);
}

const itemHorizontalMargin = wp(2);
const slideWidth = wp(75);
import { gql } from 'apollo-boost';

const getSeries = gql`
  {
    results(countries: ["Bangladesh"], date: { gt: "3/1/2020" }) {
      date
      confirmed
      deaths
      recovered
      growthRate
    }
  }
`;

export default ({ style }) => {
  let counter;
  for (counter = 0; counter <= 100; counter++) {
    counter;
  }
  const axesSvg = { fontSize: 8, fill: '#ffa024' };
  const verticalContentInset = { top: 10, bottom: 10 };
  const xAxisHeight = 30;

  const { loading, error, data } = useQuery(getSeries, { fetchPolicy: 'no-cache' });

  const sliderWidth = BlockportWidth;
  const itemWidth = slideWidth + itemHorizontalMargin * 2;
  const [stats, setStats] = useState();
  const [country, setCountry] = useState();
  const [loadingg, setLoading] = useState(true);
  const [detail, setDetail] = useState();
  const [errorr, setError] = useState();
  const [selectedValue, setSelectedValue] = useState('BD');
  const [daily, setDaily] = useState();
  const [maincolor, setMainColor] = useState('#050505');
  const [cardcolor, setCardColor] = useState('#2B2f37');
  const [time, setTime] = useState('');
  const [textcolor, setTextColor] = useState('#ffffff');
  const [myIcon, setIconMY] = useState('moon-o');
  const [selected, setSelected] = useState('default');
  let [pied, setPie] = useState();
  let [countrypie, setCountryPie] = useState();
  const [seriesdata, setseriesData] = useState();

  const caroselvalue = [
    { label: 'Side Block', value: 'default' },
    { label: 'Stack Block', value: 'stack' },
    { label: 'Swipe Block', value: 'tinder' },
  ];

  let date = new Date();
  const month = date.getMonth() + 1;
  const date_now = date.getMonth();
  const year = date.getFullYear();
  let date_no = `${month}-${date_now}-${year}`;

  const url = 'https://covid19.mathdro.id/api';

  useEffect(() => {
    async function fetchData() {
      setError();

      const data = await fetch(url)
        .then(res => res.json())
        .catch(err => {
          setError(err);
        });

      const countrydata = await fetch(`${url}/countries`)
        .then(res => res.json())
        .catch(err => {
          setError(err);
        });
      const countrydetails = await fetch(`${url}/countries/${selectedValue}`)
        .then(res => res.json())
        .catch(err => {
          setError(err);
        });
      if (countrydetails.error) {
        setDetail({
          confirmed: {
            value: 0,
            detail: 'https://covid19.mathdro.id/api/countries/bd/confirmed',
          },
          recovered: {
            value: 0,
            detail: 'https://covid19.mathdro.id/api/countries/bd/recovered',
          },
          deaths: {
            value: 0,
            detail: 'https://covid19.mathdro.id/api/countries/bd/deaths',
          },
          lastUpdate: '2020-03-13T11:09:37.000Z',
        });
      } else {
        setDetail(countrydetails);
      }

      const dailydetail = await fetch(`https://covid19.mathdro.id/api/daily/${date_no}`)
        .then(res => res.json())
        .catch(err => {
          setError(err);
        });

      setPie([
        {
          title: 'Infected',
          value: data.confirmed.value,
          svg: { fill: '#ff5c2c' },
        },
        {
          title: 'Recovered',
          value: data.recovered.value,
          svg: { fill: '#12a059' },
        },
        { title: 'Deaths', value: data.deaths.value, svg: { fill: '#f52227' } },
      ]);

      setCountryPie([
        {
          title: 'Infected',
          value: countrydetails.confirmed.value,
          svg: { fill: '#ff5c2c' },
        },
        {
          title: 'Recovered',
          value: countrydetails.recovered.value,
          svg: { fill: '#12a059' },
        },
        {
          title: 'Deaths',
          value: countrydetails.deaths.value,
          svg: { fill: '#f52227' },
        },
      ]);

      setDaily(dailydetail);
      setCountry(countrydata);
      setStats(data);
      setTime(data.lastUpdate);

      setLoading(false);
    }
    fetchData();
  }, [selectedValue]);

  const randomColor = () =>
    ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7);

  let deathline = [];
  let confirmedline = [];
  let growthline = [];
  const date1 = new Date('2/01/2020');
  const date2 = new Date();
  const diffTime = Math.abs(date2 - date1);
  let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  let dateX = Array(diffDays)
    .fill()
    .map((x, i) => i + 10);

  const renderItem = ({ item, index }) => {
    return (
      <Block
        style={{
          paddingTop: 12,
          backgroundColor: `${cardcolor}`,

          width: width - 50,
          alignContent: 'center',
          alignSelf: 'center',
          borderRadius: 18,
          margin: 20,
          fontSize: 35,
          fontWeight: '200',
          ...style,
        }}>
        <Block style={styles.slide}>
          <Text
            style={{
              paddingTop: 20,
              color: `${textcolor}`,
              textAlign: 'center',
              fontSize: 25,
              fontWeight: 'bold',
              margin: 5,
            }}>
            {item.countryRegion}
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: '500',
              color: `${textcolor}`,
              margin: 0,
            }}>
            PROVINCE
          </Text>

          <Text
            style={{
              color: '#93ccfb',
              textAlign: 'center',
              margin: 15,
              fontSize: 35,
              fontWeight: 'bold',
            }}>
            {item.provinceState}
          </Text>

          <Text
            style={{
              color: `${textcolor}`,
              textAlign: 'center',
              fontSize: 20,
            }}>
            INFECTED
          </Text>

          <Text
            style={{
              color: '#ff5c2c',
              textAlign: 'center',
              margin: 8,
              fontSize: 35,
              fontWeight: 'bold',
            }}>
            {item.confirmed}
          </Text>
          <Text
            style={{
              color: `${textcolor}`,
              textAlign: 'center',
              fontSize: 20,
            }}>
            RECOVERED
          </Text>

          <Text
            style={{
              color: '#12a059',
              textAlign: 'center',
              margin: 8,
              fontSize: 35,
              fontWeight: 'bold',
            }}>
            {item.recovered}
          </Text>

          <Text
            style={{
              color: `${textcolor}`,
              textAlign: 'center',
              fontSize: 20,
            }}>
            DEATHS
          </Text>

          <Text
            style={{
              color: '#f52227',
              textAlign: 'center',
              margin: 8,
              fontSize: 35,
              fontWeight: 'bold',
            }}>
            {item.deaths}
          </Text>
        </Block>
      </Block>
    );
  };

  const handleDarkMode = () => {
    if (maincolor === '#050505') {
      setMainColor('#ffffff');
      setCardColor('#f4f4f4');
      setTextColor('#000000');
      setIconMY('sun-o');
    } else {
      setMainColor('#050505');
      setCardColor('#2B2f37');
      setTextColor('#ffffff');
      setIconMY('moon-o');
    }
  };

  //Array of datasets, following this syntax:
  const dataa = [
    {
      data: deathline,
      svg: { stroke: '#f52227', strokeWidth: 5 },
    },
    {
      data: confirmedline,
      svg: { stroke: '#ff5c2c', strokeWidth: 5 },
    },
    {
      data: growthline,
      svg: { stroke: '#35f804', strokeWidth: 5 },
    },
  ];
  const isVisible = true;

  if (loadingg) return <CircularProgress />;

  return (
    <ScrollView>
      <Block
        style={{
          backgroundColor: `${maincolor}`,
          minHeight: height,
          width: width,
        }}>
        <Icon
          onPress={handleDarkMode}
          style={{ alignContent: 'center', alignSelf: 'center', marginTop: 25 }}
          name={`${myIcon}`}
          size={50}
          color={`${textcolor}`}
        />
        {stats && (
          <Block
            style={{
              paddingTop: 12,
              backgroundColor: `${cardcolor}`,

              width: width - 50,
              alignContent: 'center',
              alignSelf: 'center',
              borderRadius: 18,
              margin: 20,
              fontSize: 35,
              fontWeight: '200',
            }}>
            <Text
              style={{
                color: `${textcolor}`,
                textAlign: 'center',
                fontSize: 20,
                margin: 10,
              }}>
              INFECTED
            </Text>

            <Text
              style={{
                color: '#ff5c2c',
                textAlign: 'center',
                margin: 8,
                fontSize: 35,
                fontWeight: 'bold',
              }}>
              {stats.confirmed.value}
            </Text>
            <Text
              style={{
                color: `${textcolor}`,
                textAlign: 'center',
                fontSize: 20,
                margin: 10,
              }}>
              RECOVERED
            </Text>

            <Text
              style={{
                color: '#12a059',
                textAlign: 'center',
                margin: 8,
                fontSize: 35,
                fontWeight: 'bold',
              }}>
              {stats.recovered.value}
            </Text>
            <Text
              style={{
                color: `${textcolor}`,
                textAlign: 'center',
                fontSize: 20,
                margin: 10,
              }}>
              DEATHS
            </Text>

            <Text
              style={{
                color: '#f52227',
                textAlign: 'center',
                margin: 8,
                fontSize: 35,
                fontWeight: 'bold',
              }}>
              {stats.deaths.value}
            </Text>

            <Text
              style={{
                color: `${textcolor}`,
                textAlign: 'center',
                fontSize: 20,
              }}>
              RECOVERY RATE
            </Text>

            <Text
              style={{
                color: '#35f804',
                textAlign: 'center',
                margin: 8,
                fontSize: 45,
                fontWeight: 'bold',
              }}>
              {Math.floor(
                (parseInt(stats.recovered.value) / parseInt(stats.confirmed.value)) * 100
              )}
              %
            </Text>
            <Text
              style={{
                color: `${textcolor}`,
                textAlign: 'center',
                fontSize: 20,
              }}>
              DEATH RATE
            </Text>

            <Text
              style={{
                color: '#a91f23',
                textAlign: 'center',
                margin: 8,
                fontSize: 45,
                fontWeight: 'bold',
              }}>
              {Math.floor((parseInt(stats.deaths.value) / parseInt(stats.confirmed.value)) * 100)}%
            </Text>
          </Block>
        )}
        {pied && (
          <Block>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 25,
                fontWeight: '500',
                color: `${textcolor}`,
                marginBottom: 20,
                marginTop: 20,
              }}>
              PIE CHART
            </Text>
            <Block
              style={{
                justifyContent: 'center',

                alignItems: 'center',
              }}>
              <Block
                style={{
                  width: 20,
                  height: 20,
                  marginBottom: 10,
                  backgroundColor: '#f52227',
                  borderRadius: 10,
                }}
              />
              <Text style={{ color: '#f52227', marginBottom: 10 }}>DEATH</Text>
              <Block
                style={{
                  width: 20,
                  height: 20,
                  marginBottom: 10,
                  backgroundColor: '#ff5c2c',
                  borderRadius: 10,
                }}
              />
              <Text style={{ color: '#ff5c2c', marginBottom: 10 }}>INFECTED</Text>
              <Block
                style={{
                  width: 20,
                  height: 20,
                  marginBottom: 10,
                  backgroundColor: '#12a059',
                  borderRadius: 10,
                }}
              />
              <Text style={{ color: '#12a059', marginBottom: 10 }}>RECOVERED</Text>
            </Block>
            <PieChart
              on
              style={{ height: 200 }}
              data={pied.map((value, index) => ({
                value: value.value,
                svg: {
                  fill: `${value.svg.fill}`,
                  onPress: () =>
                    Alert.alert(
                      `${value.title}`,
                      `${value.value}`,
                      [
                        {
                          onPress: () => 'Ask me later pressed',
                        },
                      ],
                      { cancelable: false }
                    ),
                },
                key: `pie-${index}`,
              }))}
            />
          </Block>
        )}
        {
          (data &&
            data.results.filter(
              item => (
                deathline.push(item.deaths),
                growthline.push(item.growthRate),
                confirmedline.push(item.confirmed)
              )
            ),
          (
            <Block style={{ marginBottom: 20 }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 25,
                  fontWeight: '500',
                  color: `${textcolor}`,
                  marginBottom: 20,
                  marginTop: 20,
                }}>
                BANGLADESH LINE CHART OF THIS MONTH
              </Text>
              <Block
                style={{
                  justifyContent: 'center',

                  alignItems: 'center',
                }}>
                <Block
                  style={{
                    width: 20,
                    height: 20,
                    marginBottom: 10,
                    backgroundColor: '#f52227',
                    borderRadius: 10,
                  }}
                />
                <Text style={{ color: '#f52227', marginBottom: 10 }}>DEATH</Text>
                <Block
                  style={{
                    width: 20,
                    height: 20,
                    marginBottom: 10,
                    backgroundColor: '#ff5c2c',
                    borderRadius: 10,
                  }}
                />
                <Text style={{ color: '#ff5c2c', marginBottom: 10 }}>CONFIRMED</Text>
                <Block
                  style={{
                    width: 20,
                    height: 20,
                    marginBottom: 10,
                    backgroundColor: '#35f804',
                    borderRadius: 10,
                  }}
                />
                <Text style={{ color: '#35f804', marginBottom: 10 }}>GROWTH RATE</Text>
                <Text style={{ color: '#ffa024', marginBottom: 10 }}>
                  XAxis -- From Feb to Today
                </Text>
                <Text style={{ color: '#ffa024', marginBottom: 10 }}>YAxis -- Value</Text>
              </Block>

              <Block style={{ height: 500, padding: 20, flexDirection: 'row' }}>
                {detail && (
                  <YAxis
                    data={[0, detail.confirmed.value, parseInt(detail.confirmed.value)]}
                    style={{ marginBottom: xAxisHeight }}
                    contentInset={verticalContentInset}
                    svg={axesSvg}
                  />
                )}
                <Block style={{ flex: 1, marginLeft: 10 }}>
                  <LineChart style={{ flex: 1 }} data={dataa} contentInset={verticalContentInset}>
                    <Grid />
                  </LineChart>
                  <XAxis
                    style={{ marginHorizontal: -10, height: xAxisHeight }}
                    data={dateX}
                    formatLabel={(value, index) => {
                      if (value % 10 === 0) {
                        return value;
                      }
                    }}
                    contentInset={{ left: 10, right: 10 }}
                    svg={axesSvg}
                  />
                </Block>
              </Block>
            </Block>
          ))
        }
        <Picker
          selectedValue={selectedValue}
          style={{
            height: 50,
            width: 200,
            alignContent: 'center',
            alignSelf: 'center',

            color: `${textcolor}`,
          }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
          {country &&
            Object.entries(country.countries).map(([country, item]) => (
              <Picker.Item label={item.name} value={item.iso2} key={Math.random()} />
            ))}
        </Picker>
        {detail && (
          <Block
            style={{
              paddingTop: 12,
              backgroundColor: `${cardcolor}`,
              width: width - 50,
              alignContent: 'center',
              alignSelf: 'center',
              borderRadius: 18,
              margin: 20,
              fontSize: 35,
              fontWeight: '200',
            }}>
            <Text
              style={{
                color: `${textcolor}`,
                textAlign: 'center',
                fontSize: 20,
              }}>
              COUNTRY
            </Text>

            <Text
              style={{
                color: '#93ccfb',
                textAlign: 'center',
                margin: 8,
                fontSize: 35,
                fontWeight: 'bold',
              }}>
              {selectedValue}
            </Text>

            <Text
              style={{
                color: `${textcolor}`,
                textAlign: 'center',
                margin: 10,
              }}>
              INFECTED
            </Text>

            <Text
              style={{
                color: '#ff5c2c',
                textAlign: 'center',
                margin: 8,
                fontSize: 35,
                fontWeight: 'bold',
              }}>
              {detail.confirmed.value}
            </Text>
            <Text
              style={{
                color: `${textcolor}`,
                textAlign: 'center',
                fontSize: 20,
                margin: 10,
              }}>
              RECOVERED
            </Text>

            <Text
              style={{
                color: '#12a059',
                textAlign: 'center',
                margin: 8,
                fontSize: 35,
                fontWeight: 'bold',
              }}>
              {detail.recovered.value}
            </Text>

            <Text
              style={{
                color: `${textcolor}`,
                textAlign: 'center',
                fontSize: 20,
                margin: 10,
              }}>
              DEATHS
            </Text>

            <Text
              style={{
                color: '#f52227',
                textAlign: 'center',
                margin: 8,
                fontSize: 35,
                fontWeight: 'bold',
              }}>
              {detail.deaths.value}
            </Text>
            <Text
              style={{
                color: `${textcolor}`,
                textAlign: 'center',
                fontSize: 20,
              }}>
              RECOVERY RATE
            </Text>

            <Text
              style={{
                color: '#35f804',
                textAlign: 'center',
                margin: 8,
                fontSize: 45,
                fontWeight: 'bold',
              }}>
              {Math.floor(
                (parseInt(detail.recovered.value) / parseInt(detail.confirmed.value)) * 100
              )}
              %
            </Text>

            <Text
              style={{
                color: `${textcolor}`,
                textAlign: 'center',
                fontSize: 20,
              }}>
              DEATH RATE
            </Text>

            <Text
              style={{
                color: '#a91f23',
                textAlign: 'center',
                margin: 8,
                fontSize: 45,
                fontWeight: 'bold',
              }}>
              {Math.floor((parseInt(detail.deaths.value) / parseInt(detail.confirmed.value)) * 100)}
              %
            </Text>
          </Block>
        )}
        {countrypie && (
          <Block>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 25,
                fontWeight: '500',
                color: `${textcolor}`,
                marginBottom: 20,
                marginTop: 20,
              }}>
              PIE CHART
            </Text>
            <Block
              style={{
                justifyContent: 'center',

                alignItems: 'center',
              }}>
              <Block
                style={{
                  width: 20,
                  height: 20,
                  marginBottom: 10,
                  backgroundColor: '#f52227',
                  borderRadius: 10,
                }}
              />
              <Text style={{ color: '#f52227', marginBottom: 10 }}>DEATH</Text>
              <Block
                style={{
                  width: 20,
                  height: 20,
                  marginBottom: 10,
                  backgroundColor: '#ff5c2c',
                  borderRadius: 10,
                }}
              />
              <Text style={{ color: '#ff5c2c', marginBottom: 10 }}>INFECTED</Text>
              <Block
                style={{
                  width: 20,
                  height: 20,
                  marginBottom: 10,
                  backgroundColor: '#12a059',
                  borderRadius: 10,
                }}
              />
              <Text style={{ color: '#12a059', marginBottom: 10 }}>RECOVERED</Text>
            </Block>
            <PieChart
              on
              style={{ height: 200 }}
              data={countrypie.map((value, index) => ({
                value: value.value,
                svg: {
                  fill: `${value.svg.fill}`,
                  onPress: () =>
                    Alert.alert(
                      `${value.title}`,
                      `${value.value}`,
                      [
                        {
                          onPress: () => 'Ask me later pressed',
                        },
                      ],
                      { cancelable: false }
                    ),
                },
                key: `pie-${index}`,
              }))}
            />
          </Block>
        )}
        <Text
          style={{
            textAlign: 'center',
            fontSize: 25,
            fontWeight: '500',
            color: `${textcolor}`,
            marginBottom: 20,
            marginTop: 20,
          }}>
          DAILY REPORT
        </Text>
        <Picker
          selectedValue={selected}
          style={{
            height: 50,
            width: 200,
            alignContent: 'center',
            alignSelf: 'center',

            color: `${textcolor}`,
          }}
          onValueChange={(itemValu, itemIndex) => setSelected(itemValu)}>
          {caroselvalue.map(item => (
            <Picker.Item label={item.label} value={item.value} key={Math.random()} />
          ))}
        </Picker>
        {daily && (
          <Carousel
            layout={selected}
            layoutCardOffset={9}
            data={daily}
            renderItem={renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            itemHeight={400}
          />
        )}
      </Block>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    minHeight: height,
    width: width,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
