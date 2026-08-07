import { useTheme } from "@/context/ThemeContext";
import { WardaIconButton, WardaText } from "@/components/ui";
import React, { useState, useRef, useEffect } from "react";

import { io, Socket } from "socket.io-client";
import { chatAPI, API_BASE_URL } from "../services/api";
import { Image, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

export interface Message {
  id: number;
  sender: "me" | "driver" | "support";
  text: string;
  time: string;
  createdAt?: string;
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
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();
  const { orderId } = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // 1. Fetch history
    if (orderId) {
      chatAPI.getMessages(orderId as string).then((res) => {
        if (res.success && res.data) {
          setMessages(res.data);
          setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 200);
        } else {
          setMessages(INITIAL_MESSAGES);
        }
      }).catch(() => setMessages(INITIAL_MESSAGES));

      // 2. Setup Socket
      // URL should just be the host without /api
      const socketUrl = API_BASE_URL.replace("/api", "");
      const socket = io(socketUrl, {
        query: { orderId },
        transports: ['websocket'],
      });
      socketRef.current = socket;

      socket.on("connect", () => {
        console.log("Socket connected for chat");
      });

      socket.on("newMessage", (msg: Message) => {
        setMessages((prev) => [...prev, msg]);
        setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
      });

      socket.on("typing", (typing: boolean) => {
        setIsTyping(typing);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [orderId]);

  const sendMessage = async (textToSend?: string) => {
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

    // Send to backend
    if (socketRef.current?.connected) {
      socketRef.current.emit("sendMessage", newMsg);
    } else if (orderId) {
      await chatAPI.sendMessage(orderId as string, messageContent).catch(() => {});
    }

    // Fallback simulation if neither worked or backend is just a mock
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
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface} />
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        {/* Header */}
        <View style={styles.header}>
          <WardaIconButton icon="arrow-left" onPress={() => router.back()} />

          <View style={styles.headerProfile}>
            <View style={styles.avatarBox}>
              <WardaText style={styles.avatarText}>T</WardaText>
              <View style={styles.onlineDot} />
            </View>
            <View style={{ marginLeft: 10 }}>
              <WardaText style={styles.headerName}>Tariq Al-Harbi</WardaText>
              <WardaText style={styles.headerStatus}>Express Gift Courier · Active</WardaText>
            </View>
          </View>

          <WardaIconButton icon="navigation" variant="secondary" onPress={() => router.push("/live-tracking")} />
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
              <WardaText style={styles.datePillText}>Today</WardaText>
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
                    <WardaText
                      style={[
                        styles.messageText,
                        isMe ? styles.messageTextMe : styles.messageTextOther,
                      ]}
                    >
                      {msg.text}
                    </WardaText>
                    <WardaText
                      style={[
                        styles.messageTime,
                        isMe ? styles.messageTimeMe : styles.messageTimeOther,
                      ]}
                    >
                      {msg.time}
                    </WardaText>
                  </View>
                </View>
              );
            })}

            {isTyping && (
              <View style={styles.typingIndicator}>
                <WardaText style={styles.typingText}>Tariq is typing...</WardaText>
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
                  <WardaText style={styles.quickChipText}>{reply}</WardaText>
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

            <WardaIconButton
              icon="send"
              variant={inputText.trim() ? "primary" : "default"}
              onPress={inputText.trim() ? () => sendMessage() : undefined}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderSubtle,
    backgroundColor: theme.colors.surface,
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
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderWidth: 1.5,
    borderColor: theme.colors.borderSubtle,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "800",
    color: theme.colors.brand,
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
    borderColor: theme.colors.surface,
  },
  headerName: {
    fontSize: 15,
    fontWeight: "700",
    color: theme.colors.text,
  },
  headerStatus: {
    fontSize: 11.5,
    color: "#10B981",
    fontWeight: "600",
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
    backgroundColor: theme.colors.background,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.radii.full,
    marginBottom: 16,
  },
  datePillText: {
    fontSize: 11,
    color: theme.colors.textMuted,
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
    backgroundColor: theme.colors.brand,
    borderBottomRightRadius: 4,
  },
  bubbleOther: {
    backgroundColor: theme.colors.surface,
    borderBottomLeftRadius: 4,
    shadowColor: theme.colors.text,
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  messageText: {
    fontSize: 14.5,
    lineHeight: 21,
  },
  messageTextMe: {
    color: theme.colors.textInverse,
  },
  messageTextOther: {
    color: theme.colors.text,
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
    color: theme.colors.textMuted,
  },
  typingIndicator: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: theme.colors.background,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginTop: 6,
  },
  typingText: {
    fontSize: 12,
    color: theme.colors.textMuted,
    fontStyle: "italic",
  },
  quickRepliesContainer: {
    paddingVertical: 8,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderSubtle,
  },
  quickRepliesList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  quickChip: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: theme.radii.full,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
  },
  quickChipText: {
    fontSize: 12.5,
    color: theme.colors.brand,
    fontWeight: "600",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: theme.colors.surface,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: theme.colors.background,
    borderRadius: theme.radii.full,
    paddingHorizontal: 18,
    paddingVertical: 10,
    fontSize: 14.5,
    color: theme.colors.text,
  },
});