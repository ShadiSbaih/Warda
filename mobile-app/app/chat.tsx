import React, { useState, useRef } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

interface Message {
  id: number;
  sender: "me" | "driver" | "support";
  text: string;
  time: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    sender: "driver",
    text: "Hello! I have picked up your Warda gift bouquet and am heading to your destination. 🚗🌹",
    time: "10:14 AM",
  },
  {
    id: 2,
    sender: "driver",
    text: "Estimated arrival is in approximately 15 minutes.",
    time: "10:15 AM",
  },
];

const QUICK_REPLIES = [
  "Please call upon arrival",
  "Leave with building reception",
  "Is the greeting card attached?",
  "Thank you so much! ✨",
];

export default function ChatScreen() {
  const router = useRouter();
  const { orderId } = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const sendMessage = (textToSend?: string) => {
    const messageContent = (textToSend || inputText).trim();
    if (!messageContent) return;

    const newMsg: Message = {
      id: Date.now(),
      sender: "me",
      text: messageContent,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMsg]);
    if (!textToSend) setInputText("");

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Simulate smart driver response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let reply = "Got it! I will take extra care of the flower arrangement. See you shortly!";
      if (messageContent.toLowerCase().includes("card")) {
        reply = "Yes! The luxury handwritten card is sealed and safely placed in the satin gift box 💌";
      } else if (messageContent.toLowerCase().includes("call") || messageContent.toLowerCase().includes("ring")) {
        reply = "Understood, I will call the recipient phone number directly once I am outside the building.";
      } else if (messageContent.toLowerCase().includes("reception") || messageContent.toLowerCase().includes("door")) {
        reply = "Perfect, I will deliver to the reception desk and hand over carefully.";
      }

      const autoReply: Message = {
        id: Date.now() + 1,
        sender: "driver",
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, autoReply]);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1400);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FDF6F9" />
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={20} color="#1E1E2D" />
          </TouchableOpacity>

          <View style={styles.headerProfile}>
            <View style={styles.avatarBox}>
              <Text style={styles.avatarText}>T</Text>
              <View style={styles.onlineDot} />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.headerName}>Tariq Al-Harbi</Text>
              <Text style={styles.headerStatus}>Express Gift Courier · Active</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.callBtn}
            onPress={() => router.push("/live-tracking")}
          >
            <Feather name="navigation" size={18} color="#D4588A" />
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          {/* Messages Scroll */}
          <ScrollView
            ref={scrollViewRef}
            style={styles.chatScroll}
            contentContainerStyle={styles.chatContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Timestamp pill */}
            <View style={styles.datePill}>
              <Text style={styles.datePillText}>Today</Text>
            </View>

            {messages.map((msg) => {
              const isMe = msg.sender === "me";
              return (
                <View
                  key={msg.id}
                  style={[
                    styles.messageWrapper,
                    isMe ? styles.messageWrapperMe : styles.messageWrapperOther,
                  ]}
                >
                  <View
                    style={[
                      styles.messageBubble,
                      isMe ? styles.bubbleMe : styles.bubbleOther,
                    ]}
                  >
                    <Text
                      style={[
                        styles.messageText,
                        isMe ? styles.messageTextMe : styles.messageTextOther,
                      ]}
                    >
                      {msg.text}
                    </Text>
                    <Text
                      style={[
                        styles.messageTime,
                        isMe ? styles.messageTimeMe : styles.messageTimeOther,
                      ]}
                    >
                      {msg.time}
                    </Text>
                  </View>
                </View>
              );
            })}

            {isTyping && (
              <View style={styles.typingIndicator}>
                <Text style={styles.typingText}>Tariq is typing...</Text>
              </View>
            )}
          </ScrollView>

          {/* Quick Replies Carousel */}
          <View style={styles.quickRepliesContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.quickRepliesList}
            >
              {QUICK_REPLIES.map((reply, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.quickChip}
                  activeOpacity={0.8}
                  onPress={() => sendMessage(reply)}
                >
                  <Text style={styles.quickChipText}>{reply}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Input Bar */}
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Type message to courier..."
              placeholderTextColor="#A0A0A0"
              value={inputText}
              onChangeText={setInputText}
              style={styles.input}
              onSubmitEditing={() => sendMessage()}
            />

            <TouchableOpacity
              style={[
                styles.sendBtn,
                !inputText.trim() && { backgroundColor: "#F3F3F7" },
              ]}
              disabled={!inputText.trim()}
              activeOpacity={0.85}
              onPress={() => sendMessage()}
            >
              <Ionicons
                name="send"
                size={18}
                color={inputText.trim() ? "#FFFFFF" : "#AAA"}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF6F9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0EEF2",
    backgroundColor: "#FFFFFF",
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8F8FA",
    justifyContent: "center",
    alignItems: "center",
  },
  headerProfile: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginLeft: 12,
  },
  avatarBox: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFF0F5",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderWidth: 1.5,
    borderColor: "#F8D7E8",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#D4588A",
  },
  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#10B981",
    position: "absolute",
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  headerName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E1E2D",
  },
  headerStatus: {
    fontSize: 11.5,
    color: "#10B981",
    fontWeight: "600",
  },
  callBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF0F5",
    justifyContent: "center",
    alignItems: "center",
  },
  chatScroll: {
    flex: 1,
  },
  chatContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  datePill: {
    alignSelf: "center",
    backgroundColor: "#EAEAEF",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 16,
  },
  datePillText: {
    fontSize: 11,
    color: "#7E7E8F",
    fontWeight: "600",
  },
  messageWrapper: {
    marginVertical: 4,
    flexDirection: "row",
  },
  messageWrapperMe: {
    justifyContent: "flex-end",
  },
  messageWrapperOther: {
    justifyContent: "flex-start",
  },
  messageBubble: {
    maxWidth: "80%",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  bubbleMe: {
    backgroundColor: "#D4588A",
    borderBottomRightRadius: 4,
  },
  bubbleOther: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  messageText: {
    fontSize: 14.5,
    lineHeight: 21,
  },
  messageTextMe: {
    color: "#FFFFFF",
  },
  messageTextOther: {
    color: "#1E1E2D",
  },
  messageTime: {
    fontSize: 10.5,
    marginTop: 4,
    alignSelf: "flex-end",
  },
  messageTimeMe: {
    color: "rgba(255, 255, 255, 0.75)",
  },
  messageTimeOther: {
    color: "#AAA",
  },
  typingIndicator: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: "#EFEFF4",
    borderRadius: 12,
    alignSelf: "flex-start",
    marginTop: 6,
  },
  typingText: {
    fontSize: 12,
    color: "#777",
    fontStyle: "italic",
  },
  quickRepliesContainer: {
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F0EEF2",
  },
  quickRepliesList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  quickChip: {
    backgroundColor: "#FFF0F5",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F8D7E8",
  },
  quickChipText: {
    fontSize: 12.5,
    color: "#D4588A",
    fontWeight: "600",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#F3F3F7",
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 10,
    fontSize: 14.5,
    color: "#1E1E2D",
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#D4588A",
    justifyContent: "center",
    alignItems: "center",
  },
});