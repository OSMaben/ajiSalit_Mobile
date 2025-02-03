import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { useToast } from "react-native-toast-notifications";
import RegisterBackImage from "@/assets/images/home.jpg";
import AppGradient from "../../components/AppGradient";
import TooltipComponent from "@/components/TooltipComponent";

const Register: React.FC = () => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("+212 ");
  const toast = useToast();

  const handleSubmit = () => {
    if (phoneNumber.trim().length < 10) {
      toast.show("حاول تكتب الرقم صحيح 😊", { type: "danger" });
      return;
    }
    router.push("OtpVerification");
  };

  return (
    <View className="flex-1">
      <ImageBackground
        source={RegisterBackImage}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.0)"]}>
          <SafeAreaView className="flex-1">
            {/* Header with Back and Info Button */}
            <View className="flex-row justify-between mx-5 mt-4">
              <TouchableOpacity onPress={() => router.back()}>
                <View className="bg-[#461e04b3] rounded-full w-8 h-8 flex justify-center items-center">
                  <Feather name="chevron-left" size={22} color="white" />
                </View>
              </TouchableOpacity>
              <TooltipComponent
                isVisible={tooltipVisible}
                onClose={() => setTooltipVisible(false)}
                onOpen={() => setTooltipVisible(true)}
                content="فهاد الصفحة تقدر تزيد رقم الهاتف تاعك 😊"
                placement="bottom"
              />
            </View>

            <View className="flex-1 justify-center px-0">
              <Text className="text-white text-center text-[20px] leading-[24px] font-tajawal mb-8  pt-4">
                دخل رقم الهاتف ديالك باش تسجل فالطبيق.
              </Text>

              <View className="flex-row items-center mb-8 justify-center">
                <View className="flex-row items-center bg-[#ffffff5f] rounded-full p-[11] pr-2 w-[90%] pl-5">
                  <Feather name="phone" size={21} color="#F52525" className="pl-8" />
                  <TextInput
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                    className="flex-1 text-white text-lg font-tajawal mx-3 rtl:text-right pt-2 "
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    placeholder="+212 123456789"
                    
                  />
                </View>
                <TouchableOpacity
                  onPress={handleSubmit}
                  className="bg-[#F52525] rounded-full p-4 ml-[-56] w-19 h-19 items-center justify-center"
                >
                  <Feather name="arrow-right" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </AppGradient>
      </ImageBackground>
      <StatusBar style="light" />
    </View>
  );
};

export default Register;