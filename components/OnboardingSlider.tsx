import { View, Image, Text, Dimensions, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

const { width, height } = Dimensions.get('window');

const Slide = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <View style={styles.shadowContainer}>
          <Image
            source={item?.image}
            style={styles.image}
          />
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.subtitle}>{item?.subtitle}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: '100%',
    backgroundColor: Colors.primary,
  },
  imageWrapper: {
    paddingHorizontal: 0,
    marginTop: 20,
    height: '80%',
    width:'85%',
    margin:'auto'
  },
  shadowContainer: {
    backgroundColor: 'white',
    borderRadius: 25,
    overflow: 'hidden',
    height: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 25,
  },
  contentContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    width:'100%',
    backgroundColor:'red'
  },
  textContainer: {
    marginBottom: 20,
    backgroundColor:Colors.primary,
    padding:20,
    borderRadius:10,
    margin:'auto',
    borderStyle:'solid',
    borderWidth:1,
    borderColor:'black',
    width:'100%'
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 10,
    fontFamily: 'System',
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
    textAlign: 'right',
    lineHeight: 24,
    fontFamily: 'System',
  }
});

export default Slide;