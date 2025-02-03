import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { useToast } from "react-native-toast-notifications";
import RegisterBackImage from "@/assets/images/home.jpg";
import AppGradient from "../../components/AppGradient";
import TooltipComponent from "@/components/TooltipComponent";

const OtpVerification: React.FC = () => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(6);
  const toast = useToast();

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const handleResendCode = () => {
    if (timer === 0) {
      setTimer(59);
      toast.show("تم ارسال الكود بنجاح✅", { type: "success" });
    }
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
            {/* Header */}
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
                content="فهاد الصفحة غادي تزيد الرقم الي وصلك عبر رسالة نصية✉️"
                placement="bottom"
              />
            </View>

            {/* Main Content */}
            <View className="flex-1 items-center mt-0 justify-center -pt-44">
              <Text className="text-white text-xl mb-4 pt-1 font-tajawal">
                أدخل رمز التأكيد الذي أُرسل إلى
              </Text>
              <Text className="text-white text-lg mb-6 -mt-3 font-tajawal">
                +212 642989876
              </Text>

              {/* OTP Input */}
              <View className="w-[90%]">
                <TextInput
                  value={otp}
                  onChangeText={(text) => setOtp(text.slice(0, 6))}
                  keyboardType="phone-pad"
                  maxLength={6}
                  className="opacity-0 absolute w-full h-10 z-10"
                  autoFocus
                />
                {/* Timer */}
                <TouchableOpacity
                  onPress={handleResendCode}
                  disabled={timer > 0}
                >
                  <Text className="text-white/70 text-center mt-[-20]  mb-0 font-tajawal">
                    تقدر تطلب كود جديد بعد {timer < 10 ? `00:0${timer}` : `00:${timer}`}
                  </Text>
                </TouchableOpacity>
                {/* OTP Display */}
                <View className="flex-row justify-center items-center bg-[#ffffff5f] rounded-full px-2 py-4">
                  {[...Array(6)].map((_, index) => (
                    <View key={index} className="w-8 mx-1 items-center">
                      <Text className="text-white text-xl font-medium">
                        {otp[index] || "-"}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </SafeAreaView>
        </AppGradient>
      </ImageBackground>
      <StatusBar style="light" />
    </View>
  );
};

export default OtpVerification;