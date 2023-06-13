import React, {useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Container from '~/components/Container';
import SliderBar from '~/components/SliderBar';
import MButton from '~/components/MButton';
import {colors} from '~/values/colors';
import {ArrowRight} from '~/assets/icons';

const {width, height} = Dimensions.get('window');
const data = [
  {
    id: 1,
    image: require('~/assets/images/onBoarding1.png'),
    title: 'Choose and customize your Drinks',
    text: 'Customize your own drink exactly how you like it by adding any topping you like!!!',
  },
  {
    id: 2,
    image: require('~/assets/images/onBoarding2.png'),
    title: 'Quickly and Easly',
    text: 'You can place your order quickly and easly without wasting time. You can also schedule orders via your smarthphone.',
  },
  {
    id: 3,
    image: require('~/assets/images/onBoarding3.png'),
    title: 'Get and Redeem Voucher',
    text: 'Exciting prizes await you! Redeem yours by collecting all the points after purchase in the app!',
  },
];
const Slide = ({item}) => {
  return (
    <View style={{width: width - 40}}>
      <View
        style={{
          flex: 0.6,
          justifyContent: 'center',
        }}>
        <Image source={item.image} />
      </View>
      <View style={{flex: 0.4}}>
        <Text
          style={{
            flex: 1,
            fontFamily: 'Quicksand-Bold',
            fontSize: 20,
            color: colors.text_Heading,
          }}>
          {item.title}
        </Text>
        <Text
          style={{
            flex: 3,
            fontFamily: 'Quicksand-SemiBold',
            fontSize: 16,
            color: colors.text_paragraph,
          }}>
          {item.text}
        </Text>
      </View>
    </View>
  );
};

function OnBoarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const goNext = () => {
    const next = currentIndex + 1;
    if (currentIndex < data.length - 1) {
      const offset = next * (width - 40);
      setCurrentIndex(next);
      ref?.current?.scrollToOffset({animated: true, offset});
    }
  };
  return (
    <Container>
      <View style={styles.container}>
        <View style={{alignItems: 'flex-end', flex: 1}}>
          <TouchableOpacity style={styles.skipButton} onPress={goNext}>
            <Text style={styles.text}>Skip</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          ref={ref}
          pagingEnabled
          data={data}
          contentContainerStyle={{height: height * 0.7}}
          horizontal
          bounces={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => <Slide item={item} />}
          scrollEventThrottle={16}
        />

        <View style={[{flex: 2}, styles.flexRow]}>
          <SliderBar
            index={currentIndex}
            nums={data.length}
            scrollX={scrollX}
          />
          {currentIndex !== data.length - 1 ? (
            <MButton style={styles.button} onPress={goNext}>
              <View style={styles.flexRow}>
                <Text style={styles.textButton}>NEXT</Text>
                <ArrowRight />
              </View>
            </MButton>
          ) : (
            <MButton style={styles.button} onPress={goNext}>
              <View style={styles.flexRow}>
                <Text style={styles.textButton}>Login/Register</Text>
                <ArrowRight />
              </View>
            </MButton>
          )}
        </View>
      </View>
    </Container>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  skipButton: {
    flex: 1,
    width: 50,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  text: {
    fontFamily: 'Quicksand-Bold',
    color: colors.text_paragraph,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 24,
  },
  textButton: {
    color: colors.white,
    fontFamily: 'Quicksand-Bold',
    fontSize: 14,
    marginHorizontal: 22,
    // backgroundColor: 'red',
    lineHeight: 16,
  },
});
export default OnBoarding;
